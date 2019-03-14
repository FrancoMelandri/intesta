
const fill = (context, descriptors, values) => {
    const headers = {}
    descriptors
        .forEach (_ => headers[_] = context.getValue(values[_]))
    return headers
}

const options = (context, session, api, operation)  => {
    return {
        headers: fill(context, api.headers, operation.headers),
        method: api.verb,
        json: true,
        qs: fill(context, api.params, operation.params),
        body: fill(context, api.params, operation.params),
        url: session.settings.url + api.path,
    }
}

const resolvers = {
    GET: {
        options: (context, session, api, operation) => {
            const result = options(context, session, api, operation)
            result.qs = fill(context, api.params, operation.params)
            return result
        },
        getBody: (body) => JSON.parse(body)
    },
    POST: {
        options: (context, session, api, operation) => {
            const result = options(context, session, api, operation)
            result.body = fill(context, api.params, operation.params)
            return result
        },
        getBody: (body) => body
    },
    PUT: {
        options: (context, session, api, operation) => {
            const result = options(context, session, api, operation)
            result.body = fill(context, api.params, operation.params)
            return result
        },
        getBody: (body) => body
    }
}

module.exports = resolvers