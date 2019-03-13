const runner = require('./engine/runner'),
    apiLoader = require('./engine/apiLoader'),
    sessionLoader = require('./engine/sessionLoader')

const entryPoint = (descriptorFile, sessionFile, onSuccess, onFail) =>{

    const apis = apiLoader(descriptorFile)
    const session = sessionLoader(sessionFile, apis)

    runner(session, apis, onSuccess, onFail)
}

module.exports = entryPoint