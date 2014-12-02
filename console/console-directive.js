angular.module('yate')
    .directive('console', function() {
        return {
            restrict: 'E',
            scope: {
            },
            templateUrl: 'console/console.html',
            link: function(scope) {
                scope.operations = [];
                scope.$on('appendOperation', function(event, operation){
                    scope.operations.push(operation);
                });

                scope.selectOperation = function(op) {
                    scope.$emit('operationSelectedInConsole', op);
                };
            }
        };
    });