const ShellExec = require('./lib/ShellExec.js')
const LoadYAMLConfig = require('./lib/LoadYAMLConfig.js')
const path = require('path')
const fs = require('fs')

async function main (tempDir) {
  let config = await LoadYAMLConfig()
  // console.log(1)

  let {WORKDIR, USER, CMD, EXPOSE, ENV} = config.environment.app.Dockerfile

  // console.log(2, {WORKDIR, USER, CMD, EXPOSE, ENV})

  let replaceVariables = {
    PROJECT_NAME: process.env.CI_PROJECT_NAME,
    PROJECT_NAMESPACE: process.env.CI_PROJECT_NAMESPACE,
    PROJECT_ID: process.env.CI_PROJECT_ID,
    DOCKERFILE_USER: USER,
    DOCKERFILE_WORKDIR: WORKDIR,
    DOCKERFILE_CMD: CMD,
    DOCKERFILE_EXPOSE: EXPOSE,
    DOCKERFILE_ENV: JSON.stringify(ENV),
  }

  // console.log(3, replaceVariables)

  let replaceFiles = [
    path.join(tempDir, '/values.yaml'),
    path.join(tempDir, './Chart.yaml')
  ]
  
  for (const [key, value] of Object.entries(replaceVariables)) {
    for (let i = 0; i < replaceFiles.length; i++) {
      let file = replaceFiles[i]
      console.log({file, key, value})
      await ShellExec(`sed -i " s/{{ ${key} }}/${value}/g" ${file}`)
    }
  }

  for (let i = 0; i < replaceFiles.length; i++) {
    let file = replaceFiles[i]
    let fileContent = fs.readFileSync(file, 'utf8')

    for (const [key, value] of Object.entries(replaceVariables)) {
      fileContent = fileContent.replaceAll(`{{ ${key} }}`, value)
    }
    fs.writeFileSync(file, fileContent, 'utf8')
  }

  // console.log('4', '完成')
}

module.exports = main