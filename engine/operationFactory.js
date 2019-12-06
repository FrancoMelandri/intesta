const request = require('request'),
    constants = require('./constants.js'),
    resolvers = require('./resolvers')

const factory = (context, operation, session, apis, success, fail, log) => {
    return (callback) => {
        log(constants.STEP, operation.operation)

        const api = apis.find (_ => _.name == operation.operation)
        const resolver = resolvers[api.verb]
        const options = resolver.options(context, session, api, operation)

        request(options, (err, _, body) => {
            log(constants.RESPONSE, operation.operation)
            if (err) {
                fail(err, callback)
                return
            }
            const json = resolver.getBody(body)
            success(operation, json, callback)
        })
    }
}

module.exports = factory