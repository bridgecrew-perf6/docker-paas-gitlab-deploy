// const yaml = require('js-yaml')

//const config = yaml.load(fs.readFileSync(path.join(__dirname, '../deploy/values.yaml'), 'utf8'))
// const LoadYAMLConfig = require('./scripts/lib/LoadYAMLConfig.js')

// -----------------------------------

// const ShellExec = require('./scripts/lib/ShellExec.js')

// const createApp = require('./scripts/ArgocdCreateApplication.js')
// const refreshApp = require('./scripts/ArgocdRefreshApplication.js')
// const restartResource = require('./scripts/ArgocdRestartApplication.js')
// //const BuildDeployYamlValues = require('./BuildDeployYamlValues.js')
// const BuildDeployYaml = require('./scripts/BuildDeployYaml.js')
const RunCypress = require('./scripts/RunCypress.js')
const WaitForLock = require('./scripts/lib/WaitForLock.js')

async function main () {
  throw new Error('TODO')
}

main()