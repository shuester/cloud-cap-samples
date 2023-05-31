// install OData v2 adapter
const cds = require("@sap/cds")
const proxy = require('@cap-js-community/odata-v2-adapter')
const opts = global.it ? { target:'auto' } : {}   // for tests, set 'auto' to detect port dynamically
cds.on('bootstrap', app => app.use(proxy(opts)))  // install proxy
cds.log('cov2ap','silent') // suppress anoying log outpout, e.g. for `npm run mocha -- --reporter nyan`

if (process.env.NODE_ENV !== 'production') {
  // Enable launchpad plugin
  const { cds_launchpad_plugin } = require('cds-launchpad-plugin');
  cds.once('bootstrap', (app) => {
    const handler = new cds_launchpad_plugin();
    app.use(handler.setup({ theme: 'sap_horizon', appConfigPath: cds.root + '/app/appconfig/fioriSandboxPlugins.json' }));
  });
}

module.exports = require('@capire/bookstore/server.js')
