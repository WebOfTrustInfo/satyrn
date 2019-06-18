const child_process = require('child_process');
const os = require('os');

// This handles the state of a single notebook document.
export class Kernel {

  constructor(satyrnicon) {
    this.satyrnicon = satyrnicon
    //this.nodePath = "/Users/korsimoro/.nvm/versions/node/v8.1.1/bin/node"
    //this.nodePath = "/tmp/wrapper"
    this.nodePath = "node"
    this.proc = undefined
    this.outputKey = undefined

    // https://dzone.com/articles/understanding-execfile-spawn-exec-and-fork-in-node
    const options = {}
    //const child = child_process.spawn(this.nodePath,['-i'],options)
    //const child = child_process.fork('./test.js',{silent:true})
    const child = child_process.fork('src/state/_kernel.js',{silent:true});
    console.log("FORKED:",child.pid)

    child.stdin._writableState.highWaterMark = 0
    child.stdout._readableState.highWaterMark = 1
    child.stderr._readableState.highWaterMark = 1

    this.proc = child

    const kernel=this
    child.stdout.on('data', (data) => {
      let d = String(data, 'UTF-8');
      console.log("KERNEL.js GOT DATA", d);

      if (!('type' in data))
        return kernel.satyrnicon.receiveUnsolicitedTextOutput(String(data, 'UTF-8'));

      switch (data.type) {
        case 'console':
          return kernel.satyrnicon.receiveStdOut(data.key, data.args);
          break;
        case 'exception':
          return kernel.satyrnicon.receiveException(data.key, data.exception);
          break;
        case 'result':
            return kernel.satyrnicon.receiveResult(data.key, data.result);
          break;
        default:
            return kernel.satyrnicon.receiveUnknownTypedOutput(data.key, data.type,String(data, 'UTF-8'));
      }
    });

    child.stdout.on('close', () => {
      console.log("CLOSE")
    })
    child.stdout.on('end', () => {
      console.log("END")
    })
    child.stdout.on('error', () => {
      console.log("ERROR")
    })

    child.stderr.on('data', (data) => {
      console.log("ERROR")
      if(kernel.outputKey)
        kernel.satyrnicon.receiveTextError(data,kernel.outputKey)
      else
        kernel.satyrnicon.receiveUnsolicitedTextError(data)
    });

    // not sure if we want to handle this differently
    child.on('exit', (code,signal) => {
      kernel.satyrnicon.reportKernelDeath()
    });

    child.on('close', (code,signal) => {
      kernel.satyrnicon.reportKernelDeath()
    });

    // TODO - what to do?
    child.on('error', (error) => {
      console.log("FAILED TO START",error)
    });


    // TODO - what to do?
    child.on('message', (msg,handle) => {
      console.log("MESSAGE",msg)
    });


  }

  run(key,code) {
    //const escapedCode = code.
      //replace(/"/g, '\\"')
      //replace(/\n/g,'\\\\n')

    const escapedCode = code;
//    console.log("eval(\""+escapedCode+"\")")

    if (code[code.length - 1] != os.EOL)
      code = code + os.EOL;
    
    // this.proc.stdin.cork()
    // const result = this.proc.stdin.write(code);
    // console.log("RESULT",result)
    // this.proc.stdin.uncork()

    const runPackage = {
      cmd:'RUN',
      key: key,
      code: code
    }
    var result = this.proc.send(runPackage);

//    this.outputKey = key
  }
  // run(key,code) {
  //   //const escapedCode = code.
  //     //replace(/"/g, '\\"')
  //     //replace(/\n/g,'\\\\n')

  //   const escapedCode = code;
  //   console.log("eval(\""+escapedCode+"\")")

  //   if (code[code.length - 1] != os.EOL)
  //     code = code + os.EOL;

  //   this.proc.stdin.cork()
  //   const result = this.proc.stdin.write(code);
  //   this.proc.stdin.uncork()
  //   console.log("RUN CODE")
  //   this.outputKey = key
  // }

  quit() {
    this.proc.kill()
  }

}
