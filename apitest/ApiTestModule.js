
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
		    	console.log ('TEST is RED [' + err + ']'); 
		    	return; 
		    }		    
			console.log ('TEST is GREEN');
		  }
	  );
};

function createFunction (operation) {
	return function(callback) { 
		var parameters = {};
		for(var p in operation.params) {
			var parameter = operation.params[p];
			if (parameter.from) {
				var source = operation.context.results[parameter.from];
				parameters[p] = source[p];
			}
			else {
				parameters[p] = operation.params[p].value;
			}			
		}
		operation.httpProxy.get(operation, parameters, callback);
	};
};

ApiTester.prototype.getSeries = function() {

	var series = [];
	for(var op in this.session.operationsToRun) {
		var operation = this.session.operationsToRun[op];
		series.push(createFunction(operation));
	};
	return series;
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

Operation.prototype.check = function(result) {
	if (this.assertions) {
		for (var assertion in this.assertions) {
			var a = this.assertions[assertion];
			var field = result[a.field];
			if (field !== a.value)
				return a.field + ' different from ' + a.value;
		}			
	}
};

exports.ApiTester = ApiTester;
exports.Oeration = Operation;
