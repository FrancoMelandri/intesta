angular.module('yate')
    .service('session', function() {

        var operationParams = [];
        this.getParamValues = function(operation) {
            if(operationParams[operation.key] == null) {
                operationParams[operation.key] = {};
                for(var o in operation.params)
                    operationParams[operation.key][operation.params[o]] = '';
            }

            return operationParams[operation.key];
        };

        this.setParamValues = function(opId, paramValues) {
            console.log('salvare...');
        }
    });