const aceEditor = function() {
  let matches = [];
  const aceMarkdown = {
      type: 'lang',
      regex: /```javascript([^]+?)```/gi,
      replace: function(s, match) {
        matches.push(match);
        console.log(match);
        var n = matches.length - 1;
        return '%PLACEHOLDER' + n + '%';
      }
    };
  return [aceMarkdown]
};


