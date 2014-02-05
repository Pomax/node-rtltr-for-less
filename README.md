# RTL/LTR for Less

This is an extension module that adds automatic rtl/ltr file generation for
code that uses https://npmjs.org/package/less-middleware for less generation.

Asking for "style.css" will generate "style.css", "style.ltr.css" and "style.rtl.css"

Conversly, asking for "style.rtl.css" or "style.ltr.css" will internally look
for "style.less" and convert it to the abovementioned three files.

**NOTE** This only works with version of less-middleware for which the PR at
https://github.com/emberfeather/less.js-middleware/pull/76 has been merged in.
