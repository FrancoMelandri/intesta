const request = require('request');

const factory = (operation, session, apis) => {

    const api = apis.find ( _ => _.name == operation.operation)
    const options = {
        headers: {
                'User-Agent': session.settings.userAgent
        },      
        method : api.verb,
        url : session.settings.url + api.path,
    };

    return (onFail, onSucces) => {
        request(options, (err, _, body) => {
            if (err) {
                onFail(err)
                return
            }
            let json = JSON.parse(body);
            onSucces(json);
        }
     )}
}

module.exports = factory