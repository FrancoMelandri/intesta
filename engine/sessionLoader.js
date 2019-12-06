const sessionLoader = (sessionFile, apis) => {
    const descriptor = require(sessionFile)

    validateSettings(descriptor.settings)

    const session = {}
    session.settings = { ... descriptor.settings }
    session.operations = descriptor
        .operations
        .map (_ => {
            const api = apis.find ( __ => __.name == _.operation)
            validateApi(api, _, session)
            return { ..._ }
        })
    return session
}

const validateSettings = settings => {
    if (!settings)
        throw 'No settings defined in descriptor file'
    if (!settings.urls)
        throw 'No urls defined for settings in descriptor file'
};

const validateApi = (api, operation, session) => {
    if (!api)
        throw 'No api defined for ' + operation.operation
    if (!session.settings.urls[operation.url])
        throw 'Wrong url defined for ' + operation.operation
}

module.exports = sessionLoader