```javascript
console.log('Hello World1!');
```

```javascript
var a = 'Hi!';
```

```javascript
console.log(a);
```

# Need @require tests!!

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

