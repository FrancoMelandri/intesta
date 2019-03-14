
const optionsBuilder = (context, session, api, operation) => {
    const _context = context
    const _session = session
    const _api = api
    const _operation = operation
    const _result = {}

    const fill = (context, descriptors, values) => {
        const params = {}
        descriptors
            .forEach (_ => params[_] = context.getValue(values[_]))
        return params
    }

    return {
        qs: function () {
            _result.qs = fill(_context, _api.params, _operation.params)
            return this
        },

        body: function () {
            _result.json = true
            _result.body = fill(_context, _api.params, _operation.params)
            return this
        },

        build: function () {
            _result.headers = fill(_context, _api.headers, _operation.headers)
            _result.method = _api.verb
            _result.url = _session.settings.url + _api.path
            return _result
        }
    }
}

const resolvers = {
    GET: {
        options: (context, session, api, operation) => optionsBuilder(context, session, api, operation).qs().build(),
        getBody: (body) => JSON.parse(body)
    },
    POST: {
        options: (context, session, api, operation) => optionsBuilder(context, session, api, operation).body().build(),
        getBody: (body) => body
    },
    PUT: {
        options: (context, session, api, operation) => optionsBuilder(context, session, api, operation).body().build(),
        getBody: (body) => body
    }
}

module.exports = resolvers