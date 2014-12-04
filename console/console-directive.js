angular.module('yate')
    .directive('console', ["asyncqueue", function(asyncqueue) {
        return {
            restrict: 'E',
            scope: {
            },
            templateUrl: 'console/console.html',
            link: function(scope) {
                scope.operationCounter = 0;
                scope.operations = [];
                scope.queue = null;

                scope.$on('appendOperation', function(event, operation){
                    if(scope.queue === null)
                        scope.queue = asyncqueue.create(scope.context);

                    scope.operations.push({
                        key: scope.operationCounter,
                        name: operation.name,
                        params: operation.info.params
                    });

                    scope.queue.enqueue(
                        operation.info.verb,
                        'http://rc.api.yoox.net/YooxCore.API/1.0/yoox_it' + operation.info.url,
                        null,
                        scope.operationCounter,
                        scope.createStepCallback(scope.operationCounter)
                    );
                    scope.operationCounter = scope.operationCounter+1;
                });

                scope.selectOperation = function(op) {
                    scope.$emit('operationSelectedInConsole', op);
                };

                scope.queue = null;
                scope.context = {};

                scope.createStepCallback = function(step) {
                    return function(ok, error) {
                        if(ok) {
                            console.log(step, "ok");
                        }
                        else {
                            console.log(step, error);
                        };
                    }
                };

                scope.start = function() {
                    scope.queue.run(function() {
                        console.log("finito! context:", scope.context);
                    });
                };
            }
        };
    }]);