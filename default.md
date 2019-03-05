# Satyrn
A Markdown-based JavaScript sandbox 

&lt;a href="https://github.com/WebOfTrustInfo/satyrn" target="_blank"&gt; https://github.com/WebOfTrustInfo/satyrn&lt;/a&gt; 

Created by 

* Joe Andrieu joe@legreq.com 

* Eric Welton eric@korsimoro.com

* Will Abramson will.abramson@napier.ac.uk

* Ganesh Annan gannan@digitalbazaar.com 


Satyrn helps people learn how to use JavaScript. It combines static markdown text with interactive JavaScript blocks. The markdown can be used to teach concepts while the JavaScript blocks can be used to explore the concepts and test comprehansion.

The tool is meant to be lightweight shell around the content.

#A few tricks

## Glossaries
Using the built-in ability to put local [links](#link) and [anchors](#anchor) and generic HTML, you can construct a useful hyperlinked gloassary.

Start by created a dictionary list, using ```&lt;dl&gt;```
```&lt;dt&gt;```
```&lt;dd&gt;``` elements.
```text
&lt;dl&gt;
&lt;dt&gt;anchor&lt;/dt&gt;
&lt;dd&gt;A hyperlink element in HTML. In addition to linking to other URLs, it can be used to name points inside a document which can be referenced by a URL fragment.&lt;/dd&gt;

&lt;dt&gt;link&lt;/dt&gt;
&lt;dd&gt;a clickable HTML element that triggers the viewer application, typically to load a new URL or change focus and scroll to a new location in the current document.&lt;/dd&gt;
&lt;/dd&gt;
&lt;/dl&gt;
```

This will render as 
&lt;dl&gt;
&lt;dt&gt;anchor&lt;/dt&gt;
&lt;dd&gt;A hyperlink element in HTML. In addition to linking to other URLs, it can be used to name points inside a document which can be referenced by a URL fragment.&lt;/dd&gt;

&lt;dt&gt;link&lt;/dt&gt;
&lt;dd&gt;a clickable HTML element that triggers the viewer application, typically to load a new URL or change focus and scroll to a new location in the current document.&lt;/dd&gt;
&lt;/dd&gt;
&lt;/dl&gt;

Now, add anchors to the dictionary terms
```text
&lt;dl&gt;
&lt;dt&gt;&lt;a name="anchor"&gt;anchor&lt;/a&gt;&lt;/dt&gt;
&lt;dd&gt;A hyperlink element in HTML. In addition to linking to other URLs, it can be used to name points inside a document which can be referenced by a URL fragment.&lt;/dd&gt;

&lt;dt&gt;&lt;a name="link"&gt;link&lt;/a&gt; &lt;/dt&gt;
&lt;dd&gt;a clickable HTML element that triggers the viewer application, typically to load a new URL or change focus and scroll to a new location in the current document.&lt;/dd&gt;
&lt;/dl&gt;
```
This will render similarly. However, the anchors will be colored as hyperlinks (we'll fix that later) :
&lt;dl&gt;
&lt;dt&gt;&lt;a name="anchor"&gt;anchor&lt;/a&gt;&lt;/dt&gt;
&lt;dd&gt;A hyperlink element in HTML. In addition to linking to other URLs, it can be used to name points inside a document which can be referenced by a URL fragment.&lt;/dd&gt;

&lt;dt&gt;&lt;a name="link"&gt;link&lt;/a&gt; &lt;/dt&gt;
&lt;dd&gt;a clickable HTML element that triggers the viewer application, typically to load a new URL or change focus and scroll to a new location in the current document.&lt;/dd&gt;
&lt;/dl&gt;

Now you can link to those definitions with local links using markdown:

```text
Using the built-in ability to put local [links](#link) and [anchors](#anchor) and generic HTML, 
you can construct a useful hyperlinked gloassary.
```

We'll fix the hyperlink coloring and allow users to click to go back to the original reference, by adding a bit of javascript in the anchors' href:
```text
&lt;dl&gt;
&lt;dt&gt;
&lt;a name="anchor" href="javascript:history.back()"&gt;anchor&lt;/a&gt;&lt;/dt&gt;
&lt;dd&gt;A hyperlink element in HTML. In addition to linking to other URLs, 
it can be used to name points inside a document which can be referenced 
by a URL fragment.&lt;/dd&gt;

&lt;dt&gt;&lt;a name="link" href="javascript:history.back()"&gt;link&lt;/a&gt; &lt;/dt&gt;
&lt;dd&gt;a clickable HTML element that triggers the viewer application, 
typically to load a new URL or change focus and scroll to a new 
location in the current document.&lt;/dd&gt;
&lt;/dl&gt;
```

This will now render a well formed glossary that can be linked to from anywhere in the document with automatic links back to the original reference. 

#Glossary
&lt;dl&gt;
&lt;dt&gt;
&lt;a name="anchor" href="javascript:history.back()"&gt;anchor&lt;/a&gt;&lt;/dt&gt;
&lt;dd&gt;A hyperlink element in HTML. In addition to linking to other URLs, it can be used to name points inside a document which can be referenced by a URL fragment.&lt;/dd&gt;

&lt;dt&gt;&lt;a name="link" href="javascript:history.back()"&gt;link&lt;/a&gt; &lt;/dt&gt;
&lt;dd&gt;a clickable HTML element that triggers the viewer application, typically to load a new URL or change focus and scroll to a new location in the current document.&lt;/dd&gt;
&lt;/dl&gt;

```javascript
console.log("Hey! 1")
```

```javascript
console.log("Hey! 2")
```

```javascript
console.log("Hey! 3")
```

## Requirements
* File format is markdown
* In the app, the markdown is unmodifiable, but rendered
* If viewed outside the app, files will be sensibly renderable (it is compatible markdown)
* Custom code section(s) render as an “interactive” editor
* Code in editor sections is executable, with console output
* Focus on teaching/testing node.js modules
* JavaScript execution context
* Standalone executable app
* Vanilla JavaScript
* Creators and users may install additional node modules which will be installed in the file’s directory, under node_modules (as typical with node.js apps). Installation is outside the app, however, such modules may be require()'d within a file.
Node modules that conflict with modules  already in use by Satyrn, must be avoided. 

## Nice to have features
* Teacher mode
* REPL
* Module info to help users avoid conflicts

## Out of scope
* Browser libraries (Vue, React, Angular, etc.)
* Native bindings
* Non-javascript languages
* External editor
* Minimal external dependencies

## Electron Resources
https://github.com/sindresorhus/awesome-electron


## Components
* Electron
* Electron template https://github.com/sindresorhus/awesome-electron#boilerplates
* Markdown renderer https://github.com/showdownjs/showdown
* Inline Editor Ace
* Console (output)
* Editor control buttons



