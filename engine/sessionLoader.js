const sessionLoader = (sessionFile, apis) => {
    const descriptor = require(sessionFile)

    const session = {}
    session.settings = { ... descriptor.settings }
    session.operations = descriptor
        .operations
        .map (_ => {
            const api = apis.find ( __ => __.name == _.operation)
            if (!api) {
                throw 'No api defined for ' + _.operation
            }
            return { ..._ }
        })
    return session
}

module.exports = sessionLoader