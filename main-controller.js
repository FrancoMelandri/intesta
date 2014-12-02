angular.module('yate')
	.controller('mainController', ['$scope', 'OperationSet', function(scope, operationSet){

		scope.$on('requestToAppendOperation', function(event, operation) {
			scope.$broadcast('appendOperation', operation);
		});

		scope.$on('operationSelectedInConsole', function(event, operation) {
			scope.$broadcast('operationSelected', operation);
		});

		//scope.chosenFileEntry = null;

		//scope.openFile = function() {
        //
		//	chrome.fileSystem.chooseEntry({type: 'openFile'}, function(entry) {
		//		console.log(entry);
		//		entry.file(function(file) {
		//			var reader = new FileReader();
		//			reader.onloadend = function(e) {
		//				angular.copy(JSON.parse(e.target.result), operationSet);
		//				scope.$broadcast('OperationSetLoaded');
		//			};
		//			reader.readAsText(file);
		//		});
		//	});
		//};
	}]);