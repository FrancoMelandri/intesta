angular.module('yate').factory('asyncqueue', ['$http', function(http) {

    var factory = {};

    factory.create = function (context) {
        var thisQueue = {};

        thisQueue.context = context;
        thisQueue.finishCallback = null;
        thisQueue.queue = [];
        thisQueue.currentRunningStep = 0;

        thisQueue.runStep = function (step) {
            if (step >= thisQueue.queue.length) {
                if(thisQueue.finishCallback)
                    thisQueue.finishCallback();
                return;
            }
            thisQueue.currentRunningStep = step;
            var deq = thisQueue.queue[thisQueue.currentRunningStep];
            http[deq.verb](deq.url, thisQueue.context[deq.inputKey] || {})
                .then(function (res) {
                    if (deq.outputKey !== null)
                        thisQueue.context[deq.outputKey] = res.data;
                    if(deq.callback !== null)
                        deq.callback(true);
                    thisQueue.runStep(step + 1);
                }, function (err) {
                    if(deq.callback)
                        deq.callback(false, err);
                });
        };

        thisQueue.enqueue = function (verb, operationUrl, contextInputKey, contextOutputKey, callback) {
            thisQueue.queue.push({
                verb: verb,
                url: operationUrl,
                inputKey: contextInputKey,
                outputKey: contextOutputKey,
                callback: callback
            });
        };

        thisQueue.run = function (callback) {
            thisQueue.finishCallback = callback;
            thisQueue.running = true;
            thisQueue.runStep(0);
        };

        return thisQueue;
    }
    return factory;
}]);