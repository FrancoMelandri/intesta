const request = require('request');

const factory = (context, operation, session, apis, success, fail) => {

    return (callback) => {
        const api = apis.find (_ => _.name == operation.operation)
        const qs = {}
        api
            .params
            .forEach (_ => qs[_] = context.getValue(operation.params[_]))
        const options = {
            headers: {
                'User-Agent': session.settings.userAgent
            },
            method : api.verb,
            qs: qs,
            url : session.settings.url + api.path,
        };
        request(options, (err, res, body) => {
            if (err) {
                fail(err)
                callback(err, null)
                return
            }
            let json = JSON.parse(body);
            success(operation, json)
            callback(null, json);
        })
    }
}

module.exports = factory