const resolvers = {
    'GET': {
        options: (session, api, params) => {
            return {
                headers: {
                    'User-Agent': session.settings.userAgent,
                    'Accept': 'application/json'
                },
                qs: params,
                method : api.verb,
                url : session.settings.url + api.path,
            }
        },
        getBody: (body) => JSON.parse(body)
    },
    'POST': {
        options: (session, api, params) => {
            return {
                headers: {
                    'User-Agent': session.settings.userAgent,
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                },
                json: true,
                body: params,
                method : api.verb,
                url : session.settings.url + api.path,
            }
        },
        getBody: (body) => body
    }
}

module.exports = resolvers