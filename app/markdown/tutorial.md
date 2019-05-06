#Satyrn Help

Satyrn is a standalone educational framework for learning JavaScript. It uses standard markdown files to present both curriculum and interactive sandboxes for entering, editing, and running JavaScript.

```javascript
console.log('Hello World1!');
```

# Combine content and interactivity
Satyrn uses markdown, aka .md files, to present JavaScript lessons. Use the markdown for static content, like this paragraph, and use the JavaScript code sections to present interactive lessons for your readers.

For instance, you can enter your name after the comma in the sandbox below.

```javascript
console.log('Hello, '); 
```

Now press the arrow in the upper left of the sandbox to execute the JavaScript.

#A few tricks

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