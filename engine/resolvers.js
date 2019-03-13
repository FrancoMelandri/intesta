const fillHeaders = (context, api, operation) => {
    const headers = {}
    api
        .headers
        .forEach (_ => headers[_] = context.getValue(operation.headers[_]))
    return headers
}

const fillParams = (context, api, operation) => {
    const params = {}
    api
        .params
        .forEach (_ => params[_] = context.getValue(operation.params[_]))
    return params
}

const resolvers = {
    GET: {
        options: (context, session, api, operation) => {
            return {
                headers: fillHeaders(context, api, operation),
                qs: fillParams(context, api, operation),
                method : api.verb,
                url : session.settings.url + api.path,
            }
        },
        getBody: (body) => JSON.parse(body)
    },
    POST: {
        options: (context, session, api, operation) => {
            return {
                headers: fillHeaders(context, api, operation),
                json: true,
                body: fillParams(context, api, operation),
                method : api.verb,
                url : session.settings.url + api.path,
            }
        },
        getBody: (body) => body
    }
}

module.exports = resolvers