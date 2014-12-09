

var ApiTester = function(httpProxy, operationsLoader, sessionLoader, environmentsLoader, logger, async) {
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

	this.async.series(this.getSeries(),
		  function(err, results) {
		    if(err) { 
		    	console.log ('TEST is RED [' + results + ']'); 
		    	return; 
		    }		    
			console.log ('TEST is GREEN');
		  }
	  );
};

ApiTester.prototype.getSeries = function() {

	var series = [];
	for(var op in this.session.operationsToRun) {
		var operation = this.session.operationsToRun[op];
		series.push(createFunction(operation));
	};
	return series;
};

/*
function getProperty( propertyName, object ) {
	var parts = propertyName.split( "." ), 
				length = parts.length,
				i,
				property = object || this;

	for ( i = 0; i < length; i++ ) {
		var part = parts[i];
		var openSquare = parts[i].indexOf('[');
		if(openSquare)
		property = property[parts[i]];
	}

	return property;
};
*/

/*
function getProperty(propertyName, object ) {
	var parts = propertyName.split( "." ), 
				length = parts.length,
				i,
				property = object || this;

	for ( i = 0; i < length; i++ ) {
		
		var part = parts[i];
		var openSquare = parts[i].indexOf('[');
		var closeSquare = parts[i].indexOf(']');
		if(openSquare !== -1 && closeSquare !== -1) {
			var index = parts[i].substring(openSquare + 1, closeSquare);
			var list = parts[i].substring(0, openSquare);
			property = property[list];
			property = property[index];
		}
		else
			property = property[part];
	}

	return property;
};

*/

function getProperty(propertyName, object ) {
	var parts = propertyName.split( "." ), 
				length = parts.length,
				i,
				property = object || this;

	for ( i = 0; i < length; i++ ) {
		
		var part = parts[i];

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
				for ( var obj in property) {
					var o = property[obj];
					if (o[fields[0]] == fields[1]){						
						property = o;
						break;
					}
				}
			}
			else
				property = property[part];
		}
	}
	return property;
};

function createFunction (operation) {
	return function(callback) { 
		var parameters = {};
		for(var p in operation.params) {
			var parameter = operation.params[p];
			if (parameter){
				if (parameter.from) {
					var source = operation.context.results[parameter.from];				
					parameters[p] = getProperty(parameter.path, source);
				}
				else {
					parameters[p] = operation.params[p].value;
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

};

Operation.prototype.check = function(statusCode, result) {
	if (statusCode) {
		if (statusCode !== 0 && statusCode !== 200)
			return 'StatusCode ' + statusCode + ' different from 200';
	}
	if (this.assertions) {
		for (var assertion in this.assertions) {
			var a = this.assertions[assertion];
			var field = getProperty (a.field, result);
			if (field && field !== a.value){
				return a.field + ' different from ' + a.value;
			}				
		}			
	}
};

Operation.prototype.execute = function(request, options, callback, getResult) {
	var operation = this;
	request(options, function(err, response, body) {
	    if(err) { 
	        console.log(err);
	    	callback(true, { 
	                        ErrorCode : 500,
				            ErrorMessage : err,
			             }); 
	    	return; 
	    }
	    var result = getResult(body);
	    var validation = operation.check(response.statusCode, result);
	    if (validation) {
	        callback(true, validation);
	        return;
	    }
	    operation.context.results[operation.name] = result;
	    callback(false, result);
	  });
};

exports.ApiTester = ApiTester;
exports.Oeration = Operation;
