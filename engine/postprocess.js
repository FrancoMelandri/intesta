const assertion = require('./assertions.js')

const postprocess = (context, operation, response) => {
    context.add (operation.name, response)
    assertion(context, operation, response)
}

module.exports = postprocess;