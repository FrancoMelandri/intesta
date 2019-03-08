const runner = require('./engine/runner'),
    apiLoader = require('./engine/apiLoader'),
    sessionLoader = require('./engine/sessionLoader'),
    minimist = require('minimist');

const args = minimist(process.argv.slice(2));
const apis = apiLoader(args.descriptor)
const session = sessionLoader(args.session, apis)

const onSuccess = operation => { console.log (operation.name + ' OK')}
const onFail = (operation, assertion) => {
    console.log (operation.name + ' FAIL')
}

runner(session, apis, onSuccess, onFail)

