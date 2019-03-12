const request = require('request'),
    resolvers = require('./resolvers')

const factory = (context, operation, session, apis, success, fail) => {
    return (callback) => {
        const api = apis.find (_ => _.name == operation.operation)

        const qs = {}
        api
            .params
            .forEach (_ => qs[_] = context.getValue(operation.params[_]))

        let resolver = resolvers[api.verb]

        request(resolver.options(session, api, qs), (err, res, body) => {
            if (err) {
                fail(err)
                callback(err, null)
                return
            }
            let json = resolver.getBody(body)
            success(operation, json)
            callback(null, json)
        })
    }
}

module.exports = factory