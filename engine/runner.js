const factory = require('./operationFactory.js'),
  assertion = require('./assertions.js');

const runner = (session, apis) => {
    session
        .operations
        .map (_ => factory(_, session, apis))
        .forEach(_ => _( (operation, response) => assertion(operation, response), 
                         e => { 'ERROR:' + console.log(e)}));
}

module.exports = runner;