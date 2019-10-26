Deprecation Notice for Atom editor packages
===

This is a simple utility to display a deprecation notice for your package to the user to indicate that your package is deprecated. Used by [`remember-folds`](https://github.com/forivall/atom-remember-folds).

## Usage
For packages without any code, create an index.js with the following:
```js
module.exports = require('atom-deprecation-notice');
```

For packages with existing code, add the following to your `activate` function:
```js
  require('atom-deprecation-notice')();
```
or
```ts
import showDeprecationNotice from 'atom-deprecation-notice';

// ... in activate()
  showDeprecationNotice();
```



## Related things
* [depd](https://github.com/dougwilson/nodejs-depd)
