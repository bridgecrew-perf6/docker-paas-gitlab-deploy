const yaml = require('js-yaml')

//const config = yaml.load(fs.readFileSync(path.join(__dirname, '../deploy/values.yaml'), 'utf8'))
const LoadYAMLConfig = require('./scripts/LoadYAMLConfig.js')

// -----------------------------------

const ShellExec = require('./scripts/ShellExec.js')

const createApp = require('./scripts/ArgocdCreateApplication.js')
const refreshApp = require('./scripts/ArgocdRefreshApplication.js')
const restartResource = require('./scripts/ArgocdRestartApplication.js')
//const BuildDeployYamlValues = require('./BuildDeployYamlValues.js')
const BuildDeployYaml = require('./scripts/BuildDeployYaml.js')
const RunCypress = require('./scripts/RunCypress.js')

async function main () {
  const config = await LoadYAMLConfig()

  const enableDeploy = config.deploy.enable

  if (enableDeploy === false) {
    console.log('Deploy is disabled.')
  }
  
  if (config.deploy.git_mode !== true) {
    console.log('=========================================')
    console.log('Deploy Helm Charts to gitlab')
    console.log('=========================================')

    await BuildDeployYaml()

    await createApp()
    await refreshApp()
    //await shellExec('/app/scripts/build_deploy_yaml.sh')
    // node /app/scripts/argocd-create-application.js
    // node /app/scripts/argocd-refresh-application.js
  }
  else {
    await restartResource()
  }
    

  await RunCypress()

}

main()