# Satyrn Tutorial

Satyrn is a standalone educational framework for learning JavaScript. It uses standard markdown (.md) files to present both curriculum and interactive sandboxes for entering, editing, and running JavaScript.

Educators and curriculum creators use markdown for educational material, and Saturn automatically turns all JavaScript code blocks into editable, runnable widgets.

# First Example
We can introduce the canonical Hello World application with a bit of static text (this paragraph), then use a code block to display sample code:
```javascript
console.log('Hello World1!');
```

Readers of the file can edit the code and run it directly in Satyrn, without affecting the static content.

# Combine content and interactivity
For instance, you can enter your name after the comma in the sandbox below.

```javascript
console.log('Hello, '); 
```

Now press the arrow in the upper left of the sandbox to execute the JavaScript.

# Variable scope

To simplify breaking a tutorial down into small steps, all of the code blocks on a given page share a global context. That means variables you set in one code block will be accessible from other code blocks executed later.

A typical scenario would be to create a set of variables, perform various operations, and print the results out through stdout or the console log. 

For example, let's evolve Hello World to use a variable.
```javascript
var a = 'Hello';
```

If you run this code block, you won't see much visually, but behind the scenes, the variable "a" is set to the string 'Hello!', perhaps the most common operation in JavaScript.

Now you can use the variable in another code block:
```javascript
console.log(a);
```

You can even change the value
```javascript
a += ' World';
```

NOW, if you run the code block above (with the console.log line), you'll see "Hello World" as the output.

# Output

Satyrn displays code errors and output in an output box below the code block. Anything the code sends to process.stdout and process.stderr will be directed to this text block, including all normal use of console.log.

Currently, code errors and output are directed to the output box of the most recently executed code block. 

# Node.js modules
Satyrn was designed to be used with standard npm-style JavaScript packages, but your results may vary. 

Saturn should be able to load any node.js packages accessible to the context of the markdown file.

I don't even know if we've tried this out!

# No support for DOM libraries, CSS, and Web Apps
There are other, better tools, such as JsFiddle, that provide tools for testing interactions with the DOM (the HTML rendered in a web page), including exploring how CSS, HTML, and JavaScript combine to create interactive web apps.

Satyrn is not designed for that. Testing or exploring front-end app frameworks like Vue.js, Angular, or even JQuery within Satyrn is likely to be more trouble than its worth, as Satyrn runs your code in a Node.js context.


# Security
Satyrn is a risky application and should be used with content ONLY from parties you trust, and you should only execute code you understand. 

The markdown files you load into Satyrn run at a higher privilege than JavaScript in the browser--making it possible for malicious code to read files from your hard drive, execute arbitrary files, even erase your files.

Future versions of Satyrn will have a way to lock down the privileges for added security, but for now, YOU, the user must be careful about the .md files you load and the sections of code you run.

HOWEVER, Satyrn itself will not auto-execute any code in JavaScript code blocks, making it relatively safe to open a .md file--just be extra certain you understand the consequences before you hit "run".

# A few tricks

## Links
Links in Satyrn work according to three rules.
1. Relative fragment references link within the document
2. Relative .md urls load the target .md file within saturn
3. Absolute .md urls
4. All other urls  

## Glossaries
Using the built-in ability to put local [links](#link) and [anchors](#anchor) and generic HTML, you can construct a useful hyperlinked gloassary.

Start by created a dictionary list, using ```<dl>```
```<dt>```
```<dd>``` elements.
```text
<dl>
<dt>anchor</dt>
<dd>A hyperlink element in HTML. In addition to linking to other URLs, it can be used to name points inside a document which can be referenced by a URL fragment.</dd>

<dt>link</dt>
<dd>a clickable HTML element that triggers the viewer application, typically to load a new URL or change focus and scroll to a new location in the current document.</dd>
</dd>
</dl>
```

This will render as 
<dl>
<dt>anchor</dt>
<dd>A hyperlink element in HTML. In addition to linking to other URLs, it can be used to name points inside a document which can be referenced by a URL fragment.</dd>

<dt>link</dt>
<dd>a clickable HTML element that triggers the viewer application, typically to load a new URL or change focus and scroll to a new location in the current document.</dd>
</dd>
</dl>

Now, add anchors to the dictionary terms
```text
<dl>
<dt><a name="anchor">anchor</a></dt>
<dd>A hyperlink element in HTML. In addition to linking to other URLs, it can be used to name points inside a document which can be referenced by a URL fragment.</dd>

<dt><a name="link">link</a> </dt>
<dd>a clickable HTML element that triggers the viewer application, typically to load a new URL or change focus and scroll to a new location in the current document.</dd>
</dl>
```
This will render similarly. However, the anchors will be colored as hyperlinks (we'll fix that later) :
<dl>
<dt><a name="anchor">anchor</a></dt>
<dd>A hyperlink element in HTML. In addition to linking to other URLs, it can be used to name points inside a document which can be referenced by a URL fragment.</dd>

<dt><a name="link">link</a> </dt>
<dd>a clickable HTML element that triggers the viewer application, typically to load a new URL or change focus and scroll to a new location in the current document.</dd>
</dl>

Now you can link to those definitions with local links using markdown:

```text
Using the built-in ability to put local [links](#link) and [anchors](#anchor) and generic HTML, 
you can construct a useful hyperlinked gloassary.
```

We'll fix the hyperlink coloring and allow users to click to go back to the original reference, by adding a bit of javascript in the anchors' href:
```text
<dl>
<dt>
<a name="anchor" href="javascript:history.back()">anchor</a></dt>
<dd>A hyperlink element in HTML. In addition to linking to other URLs, 
it can be used to name points inside a document which can be referenced 
by a URL fragment.</dd>

<dt><a name="link" href="javascript:history.back()">link</a> </dt>
<dd>a clickable HTML element that triggers the viewer application, 
typically to load a new URL or change focus and scroll to a new 
location in the current document.</dd>
</dl>
```

This will now render a well formed glossary that can be linked to from anywhere in the document with automatic links back to the original reference. 

#Glossary
<dl>
<dt>
<a name="anchor" href="javascript:history.back()">anchor</a></dt>
<dd>A hyperlink element in HTML. In addition to linking to other URLs, it can be used to name points inside a document which can be referenced by a URL fragment.</dd>

<dt><a name="link" href="javascript:history.back()">link</a> </dt>
<dd>a clickable HTML element that triggers the viewer application, typically to load a new URL or change focus and scroll to a new location in the current document.</dd>
</dl>

```javascript
console.log("Hey! 1")
```

```javascript
console.log("Hey! 2")
```

```javascript
console.log("Hey! 3")
```