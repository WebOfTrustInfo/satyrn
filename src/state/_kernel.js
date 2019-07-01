// This is the kernel process. This gets forked by the parent process.
// we actually run the code.


const KEEP_ALIVE_INTERVAL = 5000;
const log = console.log; // save this so we can restore it later if we need it
const os = require('os');
const SES = require('ses');

const sesOptions = {
    consoleMode: 'allow', errorStackMode: 'allow'
};

const domain = SES.makeSESRootRealm(sesOptions);

process.on('message', processMessage);


function processMessage(message){
//    console.log('processing',message);
    if('cmd' in message) {
        switch(message.cmd){
            case 'RUN':
                runCmd(message.key, message.code);
                break;
            default:
                console.log('unknown cmd', message);
        }
    }
}

function myConsole(key, a) {
//    process.stdout.write('\nARGS:\n',JSON.stringify(args,null,2));
    const output = {
        type: 'console',
        key: key,
        args: a};
    process.send(output);
}


function runCmd(key, cmd) {

    var process = {};
    process.stdout = {};
    var console={};
    console.log = function () {
        myConsole(key, arguments);
        process.stdout.write('\nconsole:'+key+'\n'+JSON.stringify(arguments,null,2));
    };
    var result;
    try {
        
        result = eval(cmd);

        const o1 = {
            type: 'result',
            key: key,
            result: result
        };
        process.send(o1);
        return;

    } catch (e) {
        const o2 = {
            type: 'exception',
            key: key,
            exception: e.what
        };
        process.send(o2);
    }        return;
    
};

function keepAlive(){
    process.send('ALIVE');
}

//setInterval(keepAlive,KEEP_ALIVE_INTERVAL);
log('_kernel start complete');
