const showdown  = require('showdown');
import state from '../state/satyrnicon';

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
          text = text.replace(new RegExp(pat, 'gi'), state.getEditorHtml(content[i], key));
          state.editors[key] = null;
        }
        //reset array
        content = [];
        return text;
      }
    }
  ]
});

