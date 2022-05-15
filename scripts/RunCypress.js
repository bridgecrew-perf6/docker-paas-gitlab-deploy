const ShellExec = require('./ShellExec.js')
const path = require('path')

async function main() {
  
  console.log('=========================================')
  console.log('Start cypress test')
  console.log('=========================================')

  // 切回去原本的路徑
  const BUILD_DIR = path.join('/builds/', process.env.CI_PROJECT_NAMESPACE, process.env.CI_PROJECT_NAME)
  process.chdir(BUILD_DIR)

  await ShellExec(`ls`)
  await ShellExec('npm link js-yaml')
  await ShellExec('cypress run --headed --project test')
}

module.exports = main