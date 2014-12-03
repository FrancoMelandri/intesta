var AsyncQueue = function(context, finishCallback) {
    this.queue = [];
    this.currentRunningStep = 0;

    this.runStep = function(step) {
        var thisAsqyncQueue = this;
        this.currentRunningStep = step;
        this.queue[this.currentRunningStep](parameters)
            .then(function() {
                if(thisAsqyncQueue.queue.length === step-1){
                    finishCallback();
                    return;
                }
                thisSqyncQueue.runStep(step+1);
            });
    };
};

AsyncQueue.prototype.enqueue = function(contextOutputKey, callback, parameters){
    this.queue.push({
        key: key,
        callback: callback,
        parameters: parameters
    });
};

AsyncQueue.prototype.run = function(){
    this.running = true;
    this.runStep(0);
};

exports.AsyncQueue = AsyncQueue;