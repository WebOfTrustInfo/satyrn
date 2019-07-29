const showdown  = require('showdown');
import state from '../state/state';

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
        for (var index=0; index< content.length; ++index) {
          var pat = '<p>%EDITOR' + index + '% *<\/p>';
          text = text.replace(new RegExp(pat, 'gi'), state.getEditorHtml(content[index], index));
          state.editors[index] = null;
        }
        //reset array
        content = [];
        return text;
      }
    }
  ]
});

