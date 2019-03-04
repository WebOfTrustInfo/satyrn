const showdown  = require('showdown');

window.satyrnicon = null;

function addEditor(key) {
  let editor = ace.edit(key);
  editor.setTheme("ace/theme/twilight");
  editor.session.setMode("ace/mode/javascript");
  window.satyrnicon.editors[key]=editor
  window.satyrnicon.state[key]=editor.getValue()
};
function initialiseEditors() {
  for (let key in window.satyrnicon.editors) {
    console.log("Initializing Editors",key)
    addEditor(key);
  }
  console.log("Initialized",window.satyrnicon.editors)
}

function getEditor(key) {
  console.log("GET EDITOR",key,window.satyrnicon.editors)
  return window.satyrnicon.editors[key]
}

function reset(key) {
  let editor = getEditor(key)
  editor.setValue(window.satyrnicon.state[key])
}

function run(key) {
  document.querySelector("#output-"+key).innerHTML = "....";

  let editor = getEditor(key);
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
  console.log("OUTPUT : " + output)

  console.log = console.oldLog
}

function getEditorHtml(content, key) {
  return "<div class=\"showdown-js-editor\">\n" +
    "    <input type=\"button\" onclick=\"run('"+key+"')\" value=\"Run\" />\n" +
    "    <input type=\"button\" onclick=\"reset('"+key+"')\" value=\"Refresh\" />\n" +
    "\n" +
    "    <pre id=\""+key+"\" class=\"editor\">" + content +
    "    </pre>\n" +
    "    <pre class='editor-output' id=\"output-"+key+"\">\n" +
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
          window.satyrnicon.editors[key] = null;
        }
        //reset array
        content = [];
        console.log(window.satyrnicon.editors);
        return text;
      }
    }
  ]
});
const converter = new showdown.Converter({extensions: ['aceEditor']});

function renderDocument(text) {
  window.satyrnicon = {
    editors:{},
    state:{}
  };
  const html  = converter.makeHtml(text);
  document.querySelector("#markdown").innerHTML = html;
  console.log("SAT:",window.satyrnicon);
  document.querySelector("#textarea").innerHTML = text;
  initialiseEditors();
}
function init() {
  const text = document.getElementById("textarea").value;
  renderDocument(text);
}

function handleTextChange() {
  const text = document.getElementById("textarea").value;
  renderDocument(text)
}

module.exports = {
  initialiseEditors:initialiseEditors,
  renderDocument:renderDocument
}

//init();
