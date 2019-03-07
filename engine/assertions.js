
const assertion = (operation, response) => {
    console.log('RESPONSE for ' + operation.name + ' is ' + JSON.stringify(response))
}

module.exports = assertion;