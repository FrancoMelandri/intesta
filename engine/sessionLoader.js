const sessionLoader = (sessionFile, apis) => {
    let session = {}
    let descriptor = require(sessionFile)
    session.settings = { ...descriptor.settings }
    return session
}

module.exports = sessionLoader;