var gutil = require('gulp-util');
var watching = false;

errorHandler = {

  setWatchingMode: function() {
    watching = true;
  },

  process: function(err) {
    var displayErr = gutil.colors.red(err);
    if (watching) {
      gutil.log(displayErr);
      gutil.beep();
      this.emit('end');
    } else {
      throw displayErr;
    }
  }
}


module.exports = errorHandler
