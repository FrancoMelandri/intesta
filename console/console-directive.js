angular.module('yate')
    .directive('console', ["$http", function(http) {
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

                scope.start = function() {
                    console.log('getting...');
                    http.get('http://rc.api.yoox.net/YooxCore.API/1.0/yoox_it/keepAlive')
                        .then(function(resp) {
                            console.log(resp);
                        });

                    //console.log('posting...');
                    //http.post('http://api.yoox.lcl/YooxCore.API/1.0/myoox/login', {
                    //    "email": "test.it@yoox.com",
                    //    "password": "password"
                    //}).then(function(resp) {
                    //    console.log('resp', resp);
                    //});
                };
            }
        };
    }]);