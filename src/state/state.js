import { Kernel } from './kernel'
import converter from '../helpers/converter';

// This handles the state of a single notebook document.
const state = {
  editors: {},
  state: {},

  isEditMode: false,
  shouldRealTimeRender: true,
  currentFile: "",
  kernel: undefined,

  initialiseEditors: () => {
    for (let key in state.editors) {
      state.addEditor(key);
    }
  },
  getEditor: (key) => {
    return state.editors[key]
  },
  addEditor: (key) => {
    let editor = ace.edit(key);
    editor.setTheme("ace/theme/twilight");
    editor.session.setMode("ace/mode/javascript");
    state.editors[key]=editor;
    state.state[key]=editor.getValue()
  },
  reset: (key) => {
    let editor = state.getEditor(key);
    document.querySelector("#output-"+key).innerHTML = "";

    editor.setValue(state.state[key])
  },

  toggleRealTimeRender: () => {
    state.shouldRealTimeRender = !state.shouldRealTimeRender;
    state.handleTextChange();
  },
  resetKernel: () => {
    if(state.kernel) {
      // TODO kill is not a function? Seems to work without killing - probably not good!
      // state.kernel.kill()
    }
    state.kernel = new Kernel(state)
  },

  openFile: (fname,data) => {
    state.resetKernel();
    state.editors = {};
    state.currentFile = fname

    const text = data.toString();
    state.renderDocument(text);
    state.handleTextChange();
  },

  run: (key) => {
    document.querySelector("#output-"+key).innerHTML = "....";
    let editor = state.getEditor(key);
    const code = editor.getValue()
    state.kernel.run(key,code)
    document.querySelector("#output-"+key).innerHTML = ""
  },

  receiveTextOutput: (data,key) => {
    console.log("RECIEVE ", data)
    const current = document.querySelector("#output-"+key).innerHTML
    const replacement = current + data
    document.querySelector("#output-"+key).innerHTML = replacement
  },

  receiveUnsolicitedTextOutput: (data) => {
    console.log('UNSOLICITED:', data);
  },

  receiveTextError: (data, key) => {
    const current = document.querySelector("#output-"+key).innerHTML
    const replacement = current + data
    document.querySelector("#output-"+key).innerHTML = replacement
  },

  receiveUnsolicitedTextError: (data) => {
    console.log('UNSOLICITED ERROR', data.toString('utf-8'));
  },

  receiveStdOut: (key, args) => {
    const current = document.querySelector("#output-"+key).innerHTML
    const replacement = current + args
    document.querySelector("#output-"+key).innerHTML = replacement
}
receiveException: (key, data.exception)=> {
  const current = document.querySelector("#output-"+key).innerHTML
  const replacement = current + '\nEXCEPTION THROWN:\n'  + data
  document.querySelector("#output-"+key).innerHTML = replacement
}
receiveResult: (key, data.result) => {
  const current = document.querySelector("#output-"+key).innerHTML
  const replacement = current + '\nRESULT:\n'  + data
  document.querySelector("#output-"+key).innerHTML = replacement
}
receiveUnknownTypedOutput: (key, type, output) => {
  const current = document.querySelector("#output-"+key).innerHTML
  const replacement = current + '\nUNKNOWN TYPE from KERNEL: '+\n'  + data
  document.querySelector("#output-"+key).innerHTML = replacement
}

  reportKernelDeath: () => {
    console.log("Kernel died")
    state.kernel = undefined
  },

  getEditorHtml: (content, key) => {
    return "<div class=\"showdown-js-editor\">\n" +
      "    <div>\n" +
      "    <i class=\"fas fa-play\" onclick=\"state.run('"+key+"')\" value=\"Run\" ></i>\n" +
      "    <i class=\"fas fa-redo\" onclick=\"state.reset('"+key+"')\" value=\"Refresh\" ></i>\n" +
      "    </div>\n" +
      "\n" +
      "    <pre id=\""+key+"\" class=\"editor\">" + content +
      "    </pre>\n" +
      "    <pre class='editor-output' id=\"output-"+key+"\">\n" +
      "    </pre>\n" +
      "  </div>";
  },

  handleTextChange: () => {
    if (state.shouldRealTimeRender) {
      const text = document.getElementById("teacher").value;
      state.renderDocument(text)
    }

  },

  renderDocument: (text) => {
    const html  = converter.makeHtml(text);
    document.querySelector("#markdown").innerHTML = html;
    document.querySelector("#teacher").innerHTML = text;
    state.initialiseEditors();
  }

};


export default state;
