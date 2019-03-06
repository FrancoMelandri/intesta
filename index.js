const runner = require('./engine/runner'),
    apiLoader = require('./engine/apiLoader'),
    sessionLoader = require('./engine/sessionLoader'),
    minimist = require('minimist');

const args = minimist(process.argv.slice(2));
const apis = apiLoader(args.descriptor)
const session = sessionLoader(args.session, apis)

runner(session, apis)

