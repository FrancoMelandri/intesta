const factory = require('./operationFactory.js');

const runner = (session, apis) => {
    session
        .operations
        .map ( _ => factory(_, session, apis))
        .forEach(_ => _( response =>{ 'DATA:' + console.log(response)}, 
                         e => { 'ERROR:' + console.log(e)}));
}

module.exports = runner;