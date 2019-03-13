const runner = require('./engine/runner'),
    apiLoader = require('./engine/apiLoader'),
    sessionLoader = require('./engine/sessionLoader')

// const args = minimist(process.argv.slice(2))
// const descriptorFile = path.join(__dirname, args.descriptor)
// const sessionFile = path.join(__dirname, args.session)
// const apis = apiLoader(descriptorFile)
// const session = sessionLoader(sessionFile, apis)

// const onSuccess = operation => {
//     console.log (operation.name + ' OK')
// }

// const onFail = (operation, assertion) => {
//     console.log (operation.name + ' FAIL')
// }

// runner(session, apis, onSuccess, onFail)

const entryPoint = (descriptorFile, sessionFile, onSuccess, onFail) =>{

    const apis = apiLoader(descriptorFile)
    const session = sessionLoader(sessionFile, apis)

    runner(session, apis, onSuccess, onFail)
}

module.exports = entryPoint