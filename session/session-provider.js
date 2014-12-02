angular.module('yate')
    .service('session', function() {
        var currentSession = null;

        this.getCurrent = function() {
            return currentSession;
        };

        this.load = function(source) {
            console.log('load is not yet implemented');
        };

        this.save = function() {
            console.log('save is not yet implemented');
        };
    });