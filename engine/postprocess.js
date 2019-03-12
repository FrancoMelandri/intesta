const assertion = require('./assertions.js')

const postprocess = (context, operation, response, onSuccess, onFail) => {
    context.add (operation.name, response)
    assertion(context, operation, onSuccess, onFail)
}

module.exports = postprocess