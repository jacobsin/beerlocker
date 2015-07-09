var gutil = require('gulp-util');
var runtime = require('./runtime');

module.exports = {

    handle: function(err) {
        var displayErr = gutil.colors.red(err);
        if (runtime.isWatching()) {
            gutil.log(displayErr);
            gutil.beep();
            this.emit('end');
        } else {
            throw displayErr;
        }
    }
};
