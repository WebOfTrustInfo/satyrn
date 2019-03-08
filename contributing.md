# Contributing to Satyrn

We welcome any contributions to the code base.

## App (BROWSER?)

## Background

## Showdown Extensions

Showdown extensions can convert markdown or html into different text content. See the showdown [documentation](https://github.com/showdownjs/showdown/wiki/extensions).

When writing an extension, create a new JS file for the extension under the extensions folder. Then when complete import this file into the app.js file and add the converter name to showdown.Converter({extensions: [...]).

See mailto-email.js for an example. This parses the markdown file for any emails, replaces them with the temporary string EMAIL< INDEX > using the lang type extension. Then it uses the output type extension to replace these holding variables with mailto anchor tags for each email.

## Testing
