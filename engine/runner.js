const factory = require('./operationFactory.js'),
    postprocess = require('./postprocess.js'),
    context = require('./context.js')(),
    async = require('async');

const runner = (session, apis, onSuccess, onFail) => {

    const success = (operation, response) => postprocess(context, operation, response, onSuccess, onFail)

    const series = session
        .operations
        .map (_ => factory(context, _, session, apis, success, onFail))

    async.series(series, null)
}

module.exports = runner