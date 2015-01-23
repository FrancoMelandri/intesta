require('shelljs/global');
var fs = require('fs');
var path = require('path');
var prettyjson = require('prettyjson');
var chalk = require('chalk');
var apiTestModule = require('../apitest/ApiTestModule.js');
var httpProxy = require('./HttpProxy');
var async = require('async');

var execCmd = "node singleTest.js ";
var tests = [];
var filename = "";

var intro = ""+
"\t   \t                   \t   \t\n"+
"\t###\t     ,        ,    \t###\t\n"+
"\t###\t*._ -+- _  __-+- _.\t###\t\n"+
"\t###\t|[ ) | (/,_)  | (_]\t###\t\n"+
"\t   \t                   \t   \t\n";

var verbose = false;

var currentPath = process.argv[2];
var folderAbsPath = fs.realpathSync(currentPath);
var filenames = fs.readdirSync(folderAbsPath);	
var singleTestFunctionArray = [];


function createSingleTestFunction(path){
	return function(callback){ 

		///////////////////////////////////

		var verbose = false;
		var OperationsLoader = function() {
			this.load = function(){
				return JSON.parse(fs.readFileSync('./operations.json', 'utf8'));
			};
		};
		var SessionLoader = function() {
			var sessionFileName = './savedSession.json'
			if (process.argv[2])
				sessionFileName = path;
			
			console.log(chalk.bold("\n\n\n###\tTESTING FILE:"+sessionFileName));
			
			// TODO: manage verbose output
				
			this.load = function() {
				var session = JSON.parse(fs.readFileSync(sessionFileName, 'utf8'));	
				// TODO: manage setting on call argv
				/*if (process.argv[3]) {
					var sesttings = session['settings'] = {};
					sesttings['Environment'] = process.argv[3];
					if (process.argv[4])
						sesttings['siteCode'] = process.argv[4];
					else				
						sesttings['siteCode'] = 'YOOX_IT';
					if (process.argv[5])
						sesttings['userAgent'] = process.argv[5];
					else
						sesttings['userAgent'] = 'native-mobile-yoox/2.0 v.4.2.1(build 3370) iPhone4,1 iPhone OS 7.1.2';
				}*/
				return session;
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

		var onOperationsCompletedCallback = function(err, results){
			callback(null, path);
		}.bind(this);

		var apiTester = new apiTestModule.ApiTester(
			new httpProxy.HttpProxy(), 
			new OperationsLoader(), 
			new SessionLoader(),
			new EnvironmentsLoader(),
			new Logger(),
			async,
			onOperationsCompletedCallback, 
			chalk,
			verbose);
			
		apiTester.load();
		apiTester.run();
	};
};


var testFiles = function(currentPath, testPaths){
	if (path.extname(currentPath) === ".json"){
		testPaths.push(createSingleTestFunction(currentPath));
	} else {
		var folderAbsPath = fs.realpathSync(currentPath);
		var filenames = fs.readdirSync(folderAbsPath);	
		for(var i = 0; i<filenames.length; i++){
			var p = folderAbsPath+"\\"+filenames[i];
			testFiles(currentPath+"\\"+filenames[i], testPaths);
		}
	}
}

testFiles(currentPath, singleTestFunctionArray);

var onOperationsCompletedCallback = function(err, results){
	if(err) { 
		console.log(chalk.red("\n\n###\tTEST is RED\n\n\n"));
		if(verbose){
			console.log(chalk.bold('error: '+JSON.stringify(err)+'\nresult: '+JSON.stringify(results)+'\n')); 
		}
		exit(0);
	}		    
	console.log(chalk.bold('\n###\tTEST is GREEN\n\n\n'));
	exit(1);
	
}.bind(this); 

async.series(singleTestFunctionArray, onOperationsCompletedCallback);