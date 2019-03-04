const satyrnicon = {
  editors: {},
  state: {},
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
  run: (key) => {
    document.querySelector("#output-"+key).innerHTML = "....";

    let editor = satyrnicon.getEditor(key);
    console.oldLog = console.log;
    let output = '';
    console.log = function(value)
    {
      console.oldLog(value);
      output+=value;
      output += '\n';
      return value;
    };

    const code = editor.getValue()

    eval(code)
    document.querySelector("#output-"+key).innerHTML = output

    console.log = console.oldLog
  },
  getEditorHtml: (content, key) => {
    return "<div class=\"showdown-js-editor\">\n" +
      "    <input type=\"button\" onclick=\"state.run('"+key+"')\" value=\"Run\" />\n" +
      "    <input type=\"button\" onclick=\"state.reset('"+key+"')\" value=\"Refresh\" />\n" +
      "\n" +
      "    <pre id=\""+key+"\" class=\"editor\">" + content +
      "    </pre>\n" +
      "    <pre class='editor-output' id=\"output-"+key+"\">\n" +
      "    </pre>\n" +
      "  </div>";
  }
};


export default satyrnicon;
