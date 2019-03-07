const request = require('request');

const factory = (operation, session, apis) => {

    const api = apis.find (_ => _.name == operation.operation)
    const options = {
        headers: {
                'User-Agent': session.settings.userAgent
        },      
        method : api.verb,
        qs: operation.params,
        url : session.settings.url + api.path,
    };

    return (onSucces, onFail) => {
        request(options, (err, res, body) => {
            if (err) {
                onFail(err)
                return
            }
            let json = JSON.parse(body);
            onSucces(operation, json);
        }
     )}
}

module.exports = factory