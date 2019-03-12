
const apiLoader = (descriptorFile) => {
    const descriptor = require(descriptorFile)
    return descriptor
        .apis
        .map (_ => _)
}

module.exports = apiLoader
