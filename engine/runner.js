const factory = require('./operationFactory.js'),
    postprocess = require('./postprocess.js'),
    context = require('./context.js')(),
    async = require('async');

const runner = (session, apis, onSuccess, onFail) => {

    const success = (operation, response, callback) => {
        postprocess(context, operation, response, onSuccess, onFail)
        callback(null, callback)
    }

    const fail = (err, callback) => {
        onFail(err)
        callback(err, null)
    }

    const series = session
        .operations
        .map (_ => factory(context, _, session, apis, success, fail))

    async.series(series, null)
}

module.exports = runner