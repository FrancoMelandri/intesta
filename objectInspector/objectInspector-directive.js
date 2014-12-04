angular.module('yate')
	.directive('objectInspector', ['session', function(session) {
		return {
			restrict: 'E',
			scope: {
			},
			templateUrl: 'objectInspector/objectInspector.html',
			link: function(scope, elem, attrs) {
				scope.editing = {};

				scope.$on('operationSelected', function(event, operation) {
					scope.endEdit();
					scope.editing.object = operation;
					//scope.editing.objectType = 'operation';
					scope.editing.paramValues = session.getParamValues(operation);
					console.log(scope.editing.paramValues);
					//scope.editing.currentParam = null;
				});

				scope.startEdit = function(paramName) {
					scope.endEdit();
					scope.editing.currentParam = paramName;
				};

				scope.endEdit = function() {
					if(scope.editing.object == null || scope.editing.currentParam == null)
						return;
					// todo: salvare i dati dei parametri nella test session
					// session.save();
				};
			}
		};
	}]);