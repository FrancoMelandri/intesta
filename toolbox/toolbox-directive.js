angular.module('yate')
	.directive('toolbox', ['OperationSet', function(operationSet) {
		return {
			restrict: 'E',
			scope: {

			},
			templateUrl: 'toolbox/toolbox.html',
			link: function(scope, elem, attrs) {

				scope.appendOperation = function(operation) {
					scope.$emit('requestToAppendOperation', operation);
				};

				scope.operationSet = [];
				for(i in operationSet) {
					scope.operationSet.push({
						name: i,
						info: operationSet[i]
					});
				}
			}
		};
	}]);