
const loader = (descriptorFile) => {
	let resources = [];
	let descriptor = require(descriptorFile)
	descriptor.apis.map (api => resources.push (api))
	return resources
}

module.exports = loader;
