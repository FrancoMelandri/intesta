const factory = require('./operationFactory.js'),
  postprocess = require('./postprocess.js'),
  context = require('./context.js')();

const runner = (session, apis, onSuccess, onFail) => {
    session
        .operations
        .map (_ => factory(_, session, apis))
        .forEach(_ => _( (operation, response) => postprocess(context, operation, response, onSuccess, onFail), 
                         e => { 'ERROR:' + console.log(e)}));
}

module.exports = runner;