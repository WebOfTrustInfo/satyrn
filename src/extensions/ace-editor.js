const showdown  = require('showdown');

function getEditorHtml(content, key) {
  return "<div id=\"showdown-js-editor\">\n" +
    "    <input type=\"button\" onclick=\"run("+key+")\" value=\"Run\" />\n" +
    "    <input type=\"button\" onclick=\"reset("+key+")\" value=\"Refresh\" />\n" +
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
