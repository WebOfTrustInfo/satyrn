import { Kernel } from './kernel'
import converter from '../helpers/converter';

// This handles the state of a single notebook document.
const satyrnicon = {
  editors: {},
  state: {},

  isEditMode: false,
  shouldRealTimeRender: true,
  currentFile: "",
  kernel: undefined,

  initialiseEditors: () => {
    for (let key in satyrnicon.editors) {
      satyrnicon.addEditor(key);
    }
  },
  getEditor: (key) => {
    return satyrnicon.editors[key]
  },
  addEditor: (key) => {
    let editor = ace.edit(key);
    editor.setTheme("ace/theme/twilight");
    editor.session.setMode("ace/mode/javascript");
    satyrnicon.editors[key]=editor;
    satyrnicon.state[key]=editor.getValue()
  },
  reset: (key) => {
    let editor = satyrnicon.getEditor(key);
    document.querySelector("#output-"+key).innerHTML = "";

    editor.setValue(satyrnicon.state[key])
  },

  resetKernel: () => {
    if(satyrnicon.kernel) {
      // TODO kill is not a function? Seems to work without killing - probably not good!
      // satyrnicon.kernel.kill()
    }
    satyrnicon.kernel = new Kernel(satyrnicon)
  },

  openFile: (fname,data) => {
    satyrnicon.resetKernel();
    satyrnicon.currentFile = fname

    const text = data.toString();
    satyrnicon.renderDocument(text)
    satyrnicon.handleTextChange();
  },

  run: (key) => {
    document.querySelector("#output-"+key).innerHTML = "....";
    let editor = satyrnicon.getEditor(key);
    const code = editor.getValue()
    satyrnicon.kernel.run(key,code)
    document.querySelector("#output-"+key).innerHTML = ""
  },

  receiveTextOutput: (data,key) => {
    const current = document.querySelector("#output-"+key).innerHTML
    const replacement = current + data
    document.querySelector("#output-"+key).innerHTML = replacement
  },

  receiveUnsolicitedTextOutput: (data) => {
    console.log(data)
  },

  receiveTextError: (data,key) => {
    const current = document.querySelector("#output-"+key).innerHTML
    const replacement = current + data
    document.querySelector("#output-"+key).innerHTML = replacement
  },

  receiveUnsolicitedTextError: (data) => {
    console.log(data)
  },

  reportKernelDeath: () => {
    console.log("Kernel died")
    satyrnicon.kernel = undefined
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
    if (satyrnicon.shouldRealTimeRender) {
      const text = document.getElementById("teacher").value;
      satyrnicon.renderDocument(text)
    }

  },

  renderDocument: (text) => {
    const html  = converter.makeHtml(text);
    document.querySelector("#markdown").innerHTML = html;
    document.querySelector("#teacher").innerHTML = text;
    satyrnicon.initialiseEditors();
  }

};


export default satyrnicon;
