delete require.cache[module.id];

import showDeprecationNoticeInternal from './internal'

export function activate() {
  return showDeprecationNoticeInternal(module.parent);
}

export default activate;

// Add exports to default for compatability
module.exports = Object.getOwnPropertyNames(exports).reduce(
  (x, p) => Object.defineProperty(x, p, Object.getOwnPropertyDescriptor(exports, p)!),
  exports.default
)
