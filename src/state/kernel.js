const child_process = require('child_process')

// This handles the state of a single notebook document.
export class Kernel {

  constructor(satyrnicon) {
    this.satyrnicon = satyrnicon
    this.nodePath = "/Users/korsimoro/.nvm/versions/node/v8.1.1/bin/node"
    //this.nodePath = "/tmp/wrapper"
    this.proc = undefined
    this.outputKey = undefined

    // https://dzone.com/articles/understanding-execfile-spawn-exec-and-fork-in-node
    const options = {}
    const child = child_process.spawn(this.nodePath,['-i'],options)
    //const child = child_process.fork('./test.js',{silent:true})
    console.log("FORKED:",child)

    child.stdin._writableState.highWaterMark = 0
    child.stdout._readableState.highWaterMark = 1
    child.stderr._readableState.highWaterMark = 1

    this.proc = child

    const kernel=this
    child.stdout.on('data', (data) => {
      console.log("GOT DATA");
      if(kernel.outputKey)
        kernel.satyrnicon.receiveTextOutput(data,kernel.outputKey)
      else
        kernel.satyrnicon.receiveUnsolicitedTextOutput(data)
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
    child.stdout.on('readable', () => {
      console.log("READABLE")
    })


    child.stderr.on('data', (data) => {
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

  }


  run(key,code) {
    //const escapedCode = code.
      //replace(/"/g, '\\"')
      //replace(/\n/g,'\\\\n')

    const escapedCode = code;
    console.log("eval(\""+escapedCode+"\")")

    this.proc.stdin.cork()
    const result = this.proc.stdin.write(code)
    console.log("RESULT",result)
    this.proc.stdin.uncork()

    this.outputKey = key
  }

  quit() {
    this.proc.kill()
  }

}
