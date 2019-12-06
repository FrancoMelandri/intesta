const factory = require('./operationFactory.js'),
    postprocess = require('./postprocess.js'),
    context = require('./context.js')(),
    constants = require('./constants.js'),
    async = require('async');

const runner = (session, apis, onSuccess, onFail, onLog) => {

    const success = (operation, response, callback) => {
        postprocess(context, operation, response, onSuccess, onFail)
        callback(null, callback)
    }

    const fail = (err, callback) => {
        onFail(err)
        callback(err, null)
    }

    context.add(constants.SETTINGS, session.settings)

    const series = session
        .operations
        .map (_ => factory(context, _, session, apis, success, fail, onLog))

    async.series(series, null)
}

module.exports = runner