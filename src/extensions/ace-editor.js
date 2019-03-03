const showdown  = require('showdown');

let satyrnicon = {
  editors:{},
  state:{}
};

function addEditor(key) {
  let editor = ace.edit(key);
  editor.setTheme("ace/theme/twilight");
  editor.session.setMode("ace/mode/javascript");
  satyrnicon.editors[key]=editor
  satyrnicon.state[key]=editor.getValue()
}
function getEditor(key) {
  return satyrnicon.editors[key]
}

function reset(key) {
  let editor = getEditor(key)
  editor.setValue(satyrnicon.state[key])
}

function run(key) {
  let editor = getEditor(key);
  console.oldLog = console.log;
  console.log = function(value)
  {
    console.oldLog(value);
    return value;
  };

  const code = editor.getValue()
  const output = eval(code)
  document.querySelector("#output-"+key).innerHTML = output
  console.log = console.oldLog
}

function getEditorHtml(content, key) {
  return "<div class=\"showdown-js-editor\">\n" +
    "    <input type=\"button\" onclick=\"run('"+key+"')\" value=\"Run\" />\n" +
    "    <input type=\"button\" onclick=\"reset('"+key+"')\" value=\"Refresh\" />\n" +
    "\n" +
    "    <pre id=\""+key+"\" class=\"editor\">" + content +
    "    </pre>\n" +
    "    <pre id=\"output-"+key+"\">\n" +
    "    </pre>\n" +
    "  </div>";
}

showdown.extension('aceEditor', () => {
  let content = [];

  return [
    {
      type: 'lang',
      regex: /```javascript([^]+?)```/gi,
      replace: function(s, match) {
        content.push(match);
        var n = content.length - 1;
        return '%EDITOR' + n + '%';
      }
    },
    {
      type: 'output',
      filter: function (text) {
        for (var i=0; i< content.length; ++i) {
          let key = "editor-"+i;
          var pat = '<p>%EDITOR' + i + '% *<\/p>';
          text = text.replace(new RegExp(pat, 'gi'), getEditorHtml(content[i], key));
          satyrnicon.editors[key] = null;
        }
        //reset array
        content = [];
        console.log(satyrnicon.editors);
        return text;
      }
    }
  ]
});
const converter = new showdown.Converter({extensions: ['aceEditor']});

function init() {
  const text = document.getElementById("textarea").value;
  const html  = converter.makeHtml(text);
  document.querySelector("#markdown").innerHTML = html;
  initialiseEditors();
}

function handleTextChange() {
  const text = document.getElementById("textarea").value;
  const html  = converter.makeHtml(text);

  document.querySelector("#markdown").innerHTML = html;
  initialiseEditors();
}

function initialiseEditors() {
  for (let key in satyrnicon.editors) {
    addEditor(key);
  }
}

init();
