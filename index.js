var cssjanus = require('cssjanus');

/**
 * Extend LESS with ltr/rtl autogeneration
 */
module.exports = function rtltrForLess(options) {

  /**
   * Path preprocessing lets us call X.rtl.less
   * but process it as X.less
   */
  var preprocessPath = function(path) {
    return path.replace(".ltr",'').replace(".rtl",'');
  };

  if(options.preprocessPath) {
    var _oldFn = options.preprocessPath;
    options.preprocessPath = function() {
      _oldFn.apply(options, arguments);
      preprocessPath.apply(options, arguments);
    }
  }
  else { options.preprocessPath = preprocessPath; }

  /**
   * Postprocessing lets us write both an .rtl and .ltr
   * version of the same .less
   */
  var postprocessor = function (cssPath, css, writeToDisk) {
    // note: we don't have to call writeToDisk()
    var warning = "/* DO NOT MODIFY THIS FILE - IT GETS REBUILT FROM .LESS SOURCE WHEN WEBMAKER.ORG IS RUN */\n",
        rtl = cssjanus.transform(css),
        rtlPath = cssPath.replace(".css", ".rtl.css"),
        ltrPath = cssPath.replace(".css", ".ltr.css");
    fs.writeFile(rtlPath, warning + rtl, 'utf8', function(err, result) {
      fs.writeFile(ltrPath, warning + css, 'utf8', function(err, result) {
        writeToDisk(cssPath, warning + css);
      });
    });
  };

  if(options.postprocessor) {
    var _oldFn = options.postprocessor;
    options.postprocessor = function() {
      _oldFn.apply(options, arguments);
      postprocessor.apply(options, arguments);
    }
  }
  else { options.postprocessor = postprocessor; }

  return options;
};
