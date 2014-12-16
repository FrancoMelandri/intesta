var fs = require('fs');
require('shelljs/global');
var path = require('path');

var execCmd = "node singleTest.js ";
var tests = [];
var filename = "";

var intro = ""+
"\t###\t     ,        ,    \t###\n"+
"\t###\t*._ -+- _  __-+- _.\t###\n"+
"\t###\t|[ ) | (/,_)  | (_]\t###\n";

var testSingleFile = function(filename){
	console.log("test: "+fs.realpathSync(filename)+"\n");
	console.log("------------------");	
	exec(execCmd+fs.realpathSync(filename));
	console.log("\n\n");
}
var testFiles = function(currentPath){
	if (path.extname(currentPath) === ".json"){
		testSingleFile(currentPath);
	} else {
		var folderAbsPath = fs.realpathSync(currentPath);
		var filenames = fs.readdirSync(folderAbsPath);	
		for(var i = 0; i<filenames.length; i++){
			var p = folderAbsPath+"\\"+filenames[i];
			testFiles(currentPath+"\\"+filenames[i])
		}
	}
}

console.log("\n\n\n"+intro+"\n\n\n");
console.log("\n\tstart time:\t"+ 
	new Date().toISOString().replace(/T/, ' ')
	.replace(/\..+/, '')+"\n\n\n\n");
	
testFiles(process.argv[2])

console.log("\n\tend time:\t"+
	new Date().toISOString().replace(/T/, ' ')
	.replace(/\..+/, '')+"\n\n\n\n");