const factory = require('./operationFactory.js'),
  postprocess = require('./postprocess.js'),
  context = require('./context.js')();

const runner = (session, apis) => {
    session
        .operations
        .map (_ => factory(_, session, apis))
        .forEach(_ => _( (operation, response) => postprocess(context, operation, response), 
                         e => { 'ERROR:' + console.log(e)}));
}

module.exports = runner;