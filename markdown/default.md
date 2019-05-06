# Satyrn
A Markdown-based JavaScript sandbox 

```javascript
console.log('Hello World1!');
```

```javascript
console.log('Hello World2!');
```





Source specified targets
* No target html (open in new browser). <a href="http://blog.joeandrieu.com"> http://blog.joeandrieu.com</a>
* No target md (open in new browser). [http://blog.joeandrieu.com](http://blog.joeandrieu.com) 
* Arbitrary target (open in new browser). 
<a href="http://blog.joeandrieu.com" target="fancy"> http://blog.joeandrieu.com</a>
* _blank target (open in new browser) <a href="https://github.com/WebOfTrustInfo/satyrn" target="_blank"> https://github.com/WebOfTrustInfo/satyrn</a> 
* satyrn target (open in current Satyrn) <a href="https://github.com/WebOfTrustInfo/satyrn/raw/master/README.md" target="satyrn"> https://github.com/WebOfTrustInfo/satyrn/raw/master/README.md</a> 
* _satyrn target (open in new Satyrn window) <a href="https://github.com/WebOfTrustInfo/satyrn/raw/master/README.md" target="_satyrn"> https://github.com/WebOfTrustInfo/satyrn/raw/master/README.md</a> 
* _satyrn target but not a markdown file (open in new Satyrn window) <a href="http://blog.joeandrieu.com" target="_satyrn"> http://blog.joeandrieu.com</a> 
* local #fragment url html (just scroll within current document) <a href="#example">Example</a> 
* local #fragment url markdown (just scroll within current document) [Example](#example)]


<a name="example">Example anchor</a>


Satyrn helps people learn how to use JavaScript. It combines static markdown text with interactive JavaScript blocks. The markdown can be used to teach concepts while the JavaScript blocks can be used to explore the concepts and test comprehansion.

The tool is meant to be lightweight shell around the content.

## Example JavaScript Code Block
```javascript
console.log('Hello World!');
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

---

Satyrn is created by 
* Joe Andrieu joe@legreq.com
* Eric Welton eric@korsimoro.com
* Will Abramson will.abramson@napier.ac.uk
* Ganesh Annan gannan@digitalbazaar.com 

Originally a collaborative work of [Rebooting the Web of Trust](http://weboftrust.info) 8 in Barcelona, Spain.

