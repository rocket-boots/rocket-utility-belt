# Rocket Utility Belt
***Small ECMAScript Modules for game development***

<img alt="Rocket utility belt logo" src="./rocket-utility-belt-logo.jpeg" width="200" />

## How to Use

1. Bring the library into your project by version or tag:

	```
	npm install github:rocket-boots/rocket-utility-belt#v1.0.0
	```
	- Where the text after the hash ("v1.0.0") is any valid tag
	- Or without specifying version: `npm install github:rocket-boots/rocket-utility-belt`


2. Import whichever modules you like, e.g., ...

	```javascript
	import { PseudoRandomizer } from 'rocket-utility-belt';
	```

	- OR `import PseudoRandomizer from 'rocket-utility-belt/src/PseudoRandomizer.js';`

### Conventions

* Something in PascalCase is a class
* Something in lowercase or camelCase is either a stand-alone function or an object.
