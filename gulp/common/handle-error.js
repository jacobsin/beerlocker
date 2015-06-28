handleError = function(err) {
  var displayErr = gutil.colors.red(err);
  if (watching) {
    gutil.log(displayErr);
    gutil.beep();
    this.emit('end');
  } else {
    throw displayErr;
  }
}
module.exports = handleError
