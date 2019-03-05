const sessionLoader = (sessionFile, apis) => {
    let session = {}
    let descriptor = require(sessionFile)
    session.settings = { ...descriptor.settings }
    session.operations = descriptor
                            .operations
                            .map (_ => {
                                let api = apis.find ( __ => __.name == _.operation)
                                if (!api) {
                                    throw "No api defined for " + _.operation
                                }
                                return { ..._ }
                            })
    return session
}

module.exports = sessionLoader;