
const apiLoader = (descriptorFile) => {
    const resources = [];
    const descriptor = require(descriptorFile)
    descriptor
        .apis
        .map (_ => resources.push(_))
    return resources
}

module.exports = apiLoader
