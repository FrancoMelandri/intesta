const request = require('request');

const factory = (context, operation, session, apis) => {

    return (onSucces, onFail) => {
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
                onFail(err)
                return
            }
            let json = JSON.parse(body);
            onSucces(operation, json);
        })
    }
}

module.exports = factory