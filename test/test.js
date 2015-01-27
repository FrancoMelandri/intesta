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

var intro = "\n\n\n"+
"             ,        ,    \n"+
"####### *._ -+- _  __-+- _.\n"+
"####### |[ ) | (/,_)  | (_]\n";

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
			
			console.log(chalk.gray(chalk.bold("\n\n\n####### TESTING: "+path+"\n#")));
			
			// TODO: manage verbose output
				
			this.load = function() {
				var session = JSON.parse(fs.readFileSync(path, 'utf8'));	
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
			if(err){
				console.log(chalk.gray(chalk.bold("#######")), chalk.red(chalk.bold("KO")), chalk.gray(chalk.bold("for: "+path)));
				callback(err, path);		
				return;
			}
			console.log(chalk.gray(chalk.bold("#######")), chalk.green(chalk.bold("OK")), chalk.gray(chalk.bold("for: "+path)));	
			callback(err, path);		
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


var populateArrayFromPath = function(currentPath, funArray){
	if (path.extname(currentPath) === ".json"){
		funArray.push(createSingleTestFunction(currentPath));
	} else {
		var folderAbsPath = fs.realpathSync(currentPath);
		var filenames = fs.readdirSync(folderAbsPath);	
		for(var i = 0; i<filenames.length; i++){
			var p = folderAbsPath+"\\"+filenames[i];
			populateArrayFromPath(p, funArray);
		}
	}
}

var onOperationsCompletedCallback = function(err, results){
	if(err) { 
		console.log(chalk.white(chalk.bold('\n\n\n\n#######')), chalk.red(chalk.bold("A TEST is RED\n\n\n")));
		if(verbose){
			console.log(chalk.red(chalk.bold('error: '+JSON.stringify(err)+'\nresult: '+JSON.stringify(results)+'\n')));
		}
		exit(0);
	}
	console.log(chalk.bold(chalk.white('\n\n\n\n#######')), chalk.green('ALL TESTS ARE GREEN\n\n\n'));
	exit(1);
}.bind(this); 



console.log(chalk.white(chalk.bold(intro)));
populateArrayFromPath(currentPath, singleTestFunctionArray);
async.series(singleTestFunctionArray, onOperationsCompletedCallback);