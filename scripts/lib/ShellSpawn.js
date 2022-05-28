const { spawn } = require("child_process");

module.exports = function (cmdArray, options = {}) {

  let {stderrHandler, errorHandler, verbose = true} = options

  if (typeof(stderrHandler) !== 'function') {
    stderrHandler = function (stderr) {
      console.log(`[STDERR] ${stderr}`);
    }
  }

  if (typeof(errorHandler) !== 'function') {
    errorHandler = function (error, reject) {
      //console.log(`[ERROR]\n${error.message}`)
      reject(error)
      return
    }
  }

  return new Promise(function (resolve, reject) {
    const job = spawn(cmdArray[0], cmdArray.splice(1));

    job.stdout.on("data", data => {
      if (verbose) {
        console.log(`${data}`);
      }
    });
    
    job.stderr.on("data", data => {
      stderrHandler(`${data}`, reject);
    });
    
    job.on('error', (error) => {
      stderrHandler(`error: ${error.message}`, reject);
    });
    
    job.on("close", code => {
        if (verbose) {
          console.log(`child process exited with code ${code}`);
        }
        if (code !== 0) {
          return reject(code)
        }
        resolve()
    });
  })
}