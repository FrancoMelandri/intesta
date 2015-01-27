var ApiTester = function(httpProxy, operationsLoader, sessionLoader, environmentsLoader, logger, async, onOperationsCompletedCallback, chalk, verbose) {
	this.httpProxy = httpProxy;
	this.operationsLoader = operationsLoader;
	this.sessionLoader = sessionLoader;
	this.environmentsLoader = environmentsLoader;
	this.logger = logger;
	this.operationDefinition = null;
	this.context = null;
	this.async = async;		
	this.session = { 
		stepDefinition: [], 
		operationsToRun: [],
		environments: {}
	};
	
	this.context = {
		results: {}
	};
	this.operationDefinition = this.operationsLoader.load();
	
	this.onOperationsCompletedCallback = onOperationsCompletedCallback;
	
	this.chalk = chalk;
	this.verbose = verbose;
};

ApiTester.prototype.load = function() {

	var session = this.sessionLoader.load();

	this.session.environments = this.environmentsLoader.load();
	var env = this.session.environments[session.settings['Environment']];

	Array.prototype.push.apply(this.session.stepDefinition, session.operations);

	for(var i in this.session.stepDefinition) {
		step = this.session.stepDefinition[i];
		var op_def = this.operationDefinition[step.operation];
		var params = {};
		for(var param in op_def.params) {
			params[op_def.params[param]] = step.paramSources[op_def.params[param]];
		}
		var operation = new Operation(session, env, this, step.name, op_def.url, op_def.verb, params, step.assertions);
		this.session.operationsToRun.push(operation);
	}
};

ApiTester.prototype.run = function() {
	this.async.series(this.getSeries(), this.onOperationsCompletedCallback);
};

ApiTester.prototype.getSeries = function() {
	var series = [];
	for(var op in this.session.operationsToRun) {
		var operation = this.session.operationsToRun[op];
		series.push(createFunction(operation));
	};
	return series;
};

function split(propertyName) {

	var openRound = propertyName.indexOf('(');
	var closeRound = propertyName.indexOf(')');
	if(openRound === -1 && closeRound === -1) {
		return propertyName
					.replace('%','')
					.replace('%','')
					.split( "." );
	}
	var left = propertyName.substring(0, openRound).replace('%','');
	var right = propertyName.substring(closeRound+1).replace('%','');
	var inner = propertyName.substring(openRound +1, closeRound );

	var arrleft = left.split('.');
	var arrRight = right.split('.');
	var result = [];

	var i;
	for (i = 0; i < arrleft.length - 1; i++) {
		if ( arrleft[i] !== '')
			result.push(arrleft[i]);
	};
	result.push(arrleft[arrleft.length - 1] + '(' + inner + ')');
	for (i = 0; i < arrRight.length; i++) {
		if ( arrRight[i] !== '')
			result.push(arrRight[i]);
	};
	
	return result;
};


function getProperty(prop, operation) {
	
	if(typeof(prop) !== 'string')
		return prop;
	
	if (prop.indexOf('%') === -1 )
		return prop;

	var i;
	var parts = split(prop);
	var length = parts.length;
	var property = operation.context.results[parts[0]];

	if(typeof(property) === 'undefined' ) 
		return undefined

	for ( i = 1; i < length; i++ ) {
		
		var part = parts[i];

		if(typeof(property[part]) === 'undefined') 
			return undefined

		var openSquare = parts[i].indexOf('[');
		var closeSquare = parts[i].indexOf(']');
		if(openSquare !== -1 && closeSquare !== -1) {
			var index = parts[i].substring(openSquare + 1, closeSquare);
			var list = parts[i].substring(0, openSquare);
			property = property[list];
			property = property[index];
		}
		else {
			var openRound = parts[i].indexOf('(');
			var closeRound = parts[i].indexOf(')');
			if(openRound !== -1 && closeRound !== -1) {
				var fields = parts[i].substring(openRound + 1, closeRound).split('=');
				var list = parts[i].substring(0, openRound);
				property = property[list];
				for (var obj in property) {

					var o = property[obj];
					var value = getProperty(fields[1], operation);

					if (o[fields[0]] == value) {						
						property = o;
						break;
					}
				}
			}
			else {
				property = property[part];
			}
		}
	}
	return property;
};

function createFunction (operation) {
	return function(callback) { 
		var parameters = {};
		for(var p in operation.params) {
			var parameter = operation.params[p];
			if (parameter) {
				if (p.indexOf('.') === -1){
					parameters[p] = getProperty(parameter, operation);
				}
				else {
					var pars = p.split('.');
					var i;
					var par = parameters;
					for (i = 0; i < pars.length - 1; i++) {
						if (!parameters[pars[i]])
							parameters[pars[i]] = {};
						p = parameters[pars[i]];
					}
					p[pars[pars.length - 1]] = getProperty(parameter, operation);
				}
			}
		}
		operation.httpProxy.get(operation, parameters, callback);
	};
};

var Operation = function(session, env, apitester, name, url, verb, params, assertions) {
	this.session = session;
	this.env = env;
	this.httpProxy = apitester.httpProxy;
	this.name = name;
	this.url = url;
	this.params = params;
	this.verb = verb;
	this.context = apitester.context;
	this.logger = apitester.logger;
	this.assertions = assertions;

	this.compares = {};
	this.compares["eq"] = function(field, assField, assValue) {
									if (field !== assValue)	
										return "# " + assField + "\n" +
											   "# " + field + ' is different from \n' + 
											   "# " + assValue;
								};;
	this.compares["neq"] = function(field, assField, assValue) {
									if (field === assValue)
										return "# " + assField + "\n" +
											   "# " + field + ' is equal to \n' + 
											   "# " + assValue;
								};
	this.chalk = apitester.chalk;
	this.verbose = apitester.verbose;
};

Operation.prototype.check = function(statusCode, result) {
	if (this.assertions) {
		for (var assertion in this.assertions) {
			var ass = this.assertions[assertion];
			var field = getProperty (ass.field, this);
			var compare = this.compares[ass.comparison];
			var value = getProperty(ass.value, this);
			if (typeof(field) !== 'undefined' && compare) {
				return compare (field, ass.field, value);
			}
			return "# " + ass.field + ' is undefined';			
		}			
	}
};

Operation.prototype.execute = function(request, options, callback, getResult) {
	var operation = this;
	var chalk = this.chalk;
	var prefix = 
	console.log(chalk.gray("# "), chalk.gray("run "), chalk.white(chalk.bold(operation.name)));
	console.log(chalk.gray("# "), chalk.gray("op  "), chalk.gray(chalk.bold(operation.verb)), chalk.gray(chalk.bold((operation.url))));
	console.log(chalk.gray("# "), chalk.gray("url "), chalk.gray(chalk.bold(options.url)));
	console.log(chalk.gray("# "), chalk.gray("par "), chalk.gray(chalk.bold(JSON.stringify(operation.params))));

	if(operation.session.settings.Environment === 'DEV'){
		options.strictSSL = false;
	}

	request(options, function(err, response, body) {
	    if(err) { 
			console.log(chalk.gray("# "), chalk.gray("res "), chalk.red(chalk.bold("KO")));
			console.log(chalk.gray("# "), chalk.gray("description: "), chalk.red("fail on calling operation name: '"), chalk.red(operation.name), chalk.gray("', error:"));
			console.log(chalk.gray("# "), chalk.red(err));
	    	callback(true, { 
	                        ErrorCode : 500,
				            ErrorMessage : err,
			             });
	    	return; 
	    }
		if(this.verbose){
			console.log(chalk.gray("# "), chalk.gray("\t-> response status code: "+response.statusCode));
			console.log(chalk.gray("# "), chalk.gray("\t-> response body: "+response.body));
		}
	    var result = getResult(body);
	    operation.context.results[operation.name] = result;

	    var validation = operation.check(response.statusCode, result);
	    if (validation) {
			console.log(chalk.gray("# "), chalk.gray("res "), chalk.red(chalk.bold("KO")));
			console.log(chalk.gray("# "), chalk.gray("description: "), chalk.red("fail on validating assertion of operation name: '"+operation.name+"', error:"));
			console.log(chalk.gray("# "));
			console.log(chalk.gray(validation));
			console.log(chalk.gray("# "));
	        callback(true, validation);
	        return;
	    }
		console.log(chalk.gray("# "), chalk.gray("res "), chalk.green(chalk.bold("OK")));
		console.log(chalk.gray("# "));
	    callback(false, result);
	  });
};

exports.ApiTester = ApiTester;
exports.Oeration = Operation;
