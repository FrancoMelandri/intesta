const request = require('request');

const factory = (context, operation, session, apis, success, fail) => {

    return (callback) => {
        const api = apis.find (_ => _.name == operation.operation)
        const qs = {}
        api
            .params
            .forEach (_ => qs[_] = context.getValue(operation.params[_]))

        let getBody = (body) => body
        let options = {}
        if (api.verb == 'GET') {
            options = {
                headers: {
                    'User-Agent': session.settings.userAgent,
                    'Accept': 'application/json'
                },
                qs: qs,
                method : api.verb,
                url : session.settings.url + api.path,
            }
            getBody = (body) => JSON.parse(body)
        }
        else {
            options = {
                headers: {
                    'User-Agent': session.settings.userAgent,
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                },
                json: true,
                body: qs,
                method : api.verb,
                url : session.settings.url + api.path,
            }
        }
        request(options, (err, res, body) => {
            if (err) {
                fail(err)
                callback(err, null)
                return
            }
            let json = getBody(body);
            success(operation, json)
            callback(null, json);
        })
    }
}

module.exports = factory