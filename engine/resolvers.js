
const fill = (context, descriptors, values) => {
    const headers = {}
    descriptors
        .forEach (_ => headers[_] = context.getValue(values[_]))
    return headers
}

const resolvers = {
    GET: {
        options: (context, session, api, operation) => {
            return {
                headers: fill(context, api.headers, operation.headers),
                qs: fill(context, api.params, operation.params),
                method : api.verb,
                url : session.settings.url + api.path,
            }
        },
        getBody: (body) => JSON.parse(body)
    },
    POST: {
        options: (context, session, api, operation) => {
            return {
                headers: fill(context, api.headers, operation.headers),
                json: true,
                body: fill(context, api.params, operation.params),
                method : api.verb,
                url : session.settings.url + api.path,
            }
        },
        getBody: (body) => body
    }
}

module.exports = resolvers