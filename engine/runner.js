const factory = require('./operationFactory.js'),
  postprocess = require('./postprocess.js'),
  context = require('./context.js')();

const runner = (session, apis, onSuccess, onFail) => {

  let success = (operation, response) => postprocess(context, operation, response, onSuccess, onFail)
  let fail = e => { 'ERROR:' + console.log(e)}
  
  session
      .operations
      .map (_ => factory(context, _, session, apis))
      .forEach(_ => {
                      console.log('CALLING ' + JSON.stringify(context.current()))
                      _(success, fail)
                      console.log('CALLED ' + JSON.stringify(context.current()))
                    });
}

module.exports = runner;