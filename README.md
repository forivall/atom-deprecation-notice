Deprecation Notice for Atom editor packages
===

This is a simple utility to display a deprecation notice for your package to the user to indicate that your package is deprecated. Used by [`remember-folds`](https://github.com/forivall/atom-remember-folds).

## Usage
```js
require('atom-deprecation-notice')(require('./package.json'));
```
or
```ts
// this is the package json of your package
import pkg from './package.json';
import deprecationNotice from 'atom-deprecation-notice';
deprecationNotice(pkg);
```

## Related things
* [depd](https://github.com/dougwilson/nodejs-depd)
