var fs = require('fs');
var apiTestModule = require('../apitest/ApiTestModule.js');
var httpProxy = require('./HttpProxy');
var async = require('async');

var OperationsLoader = function() {
	this.load = function(){
		return JSON.parse(fs.readFileSync('./operations.json', 'utf8'));
	};
};

var SessionLoader = function() {
	var sessionFileName = './savedSession.json'
	if (process.argv[2])
		sessionFileName = process.argv[2];
	this.load = function() {
		return JSON.parse(fs.readFileSync(sessionFileName, 'utf8'));	
	}
};

var EnvironmentsLoader = function() {
	this.load = function() {
		return JSON.parse(fs.readFileSync('./environments.json', 'utf8'));	
	}
};

var Logger = function() {
	this.log = function(value) {
		console.log (value);	
	}
};

var apiTester = new apiTestModule.ApiTester(
	new httpProxy.HttpProxy(), 
	new OperationsLoader(), 
	new SessionLoader(),
	new EnvironmentsLoader(),
	new Logger(),
	async);

apiTester.load();
apiTester.run();