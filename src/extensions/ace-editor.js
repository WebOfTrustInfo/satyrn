const aceEditor = {
  type: 'lang',
  regex: /%start%```javascriptend%/```,
  replace: function() {
    return (  <div id="showdown-js-editor">\n' +
      '    <input type="button" onclick="window.alert()" value="Run" />\n' +
      '    <input type="button" onclick="window.alert()" value="Refresh" />\n' +
      '\n' +
      '    <pre id="editor"></pre>\n' +
      '  </div>')
  }
}
