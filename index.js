const runner = require('./engine/runner'),
    apiLoader = require('./engine/apiLoader'),
    sessionLoader = require('./engine/sessionLoader'),
    minimist = require('minimist');

let args = minimist(process.argv.slice(2));

console.log('Starting ' + args.descriptor + ' - ' + args.session)
const apis = apiLoader(args.descriptor)
const session = sessionLoader(args.session, apis)
runner(session)

