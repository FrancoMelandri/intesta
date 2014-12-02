angular.module('yate')
	.directive('objectInspector', ['session', function(session) {
		return {
			restrict: 'E',
			scope: {
			},
			templateUrl: 'objectInspector/objectInspector.html',
			link: function(scope, elem, attrs) {
				scope.editing = {
					object: null,
					objectType: null,
					property: null,
					value: null
				};

				scope.$on('operationSelected', function(event, operation) {
					scope.endEdit();
					scope.editing.object = operation;
					scope.editing.objectType = 'operation';
					scope.editing.property = null;
					scope.editing.value = null;
				});

				scope.startEdit = function(propName, propValue) {
					scope.endEdit();
					scope.editing.property = propName;
					scope.editing.value = propValue;
				};

				scope.endEdit = function() {
					if(scope.editing.object == null || scope.editing.property == null)
						return;
					// todo: salvare i dati dei parametri nella test session
					session.save();
				};
			}
		};
	}]);