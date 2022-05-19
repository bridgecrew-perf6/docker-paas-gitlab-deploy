const ShellExec = require('./ShellExec.js')
const path = require('path')
const LoadYAMLConfig = require('./LoadYAMLConfig')

async function main() {
  
  console.log('=========================================')
  console.log('Start cypress test')
  console.log('=========================================')

  // 切回去原本的路徑
  const BUILD_DIR = path.join('/builds/', process.env.CI_PROJECT_NAMESPACE, process.env.CI_PROJECT_NAME)
  process.chdir(BUILD_DIR)

  //await ShellExec(`ls`)
  // await ShellExec(`cat /proc/sys/fs/inotify/max_user_instances`)
  // await ShellExec(`echo 256 > /proc/sys/fs/inotify/max_user_instances`)


  await ShellExec('npm link js-yaml fast-glob')
  try {
    await ShellExec('cypress run --headless --project test')
  }
  catch (e) {
    let config = await LoadYAMLConfig()

    console.log(`===================================
Test is failed. Please check your main domain:
http://${process.env.CI_PROJECT_NAMESPACE}.${process.env.CI_PROJECT_NAME}.${config.environment.project.domain_suffix}
http://admin.${process.env.CI_PROJECT_NAMESPACE}.${process.env.CI_PROJECT_NAME}.${config.environment.project.domain_suffix}
===================================`)
    throw e
  }
  

  // await ShellExec('/app/docker-paas-gitlab-deploy/scripts/RunCypress.sh')
}

module.exports = main