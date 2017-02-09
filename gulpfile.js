var gulp = require('gulp');
    mocha = require('gulp-mocha'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint');

gulp.task('default', ['jshint', 'test']);

function handleError(err) {
  //this.emit('end');
}

//run all tests
gulp.task("test", function() {;
    return gulp.src("test/test-*.js", {read:false})
    .pipe(mocha({ reporter: "nyan" })
    .on("error", handleError));
});

//watch for changes is tests folder and run tests in changed file
gulp.task('tdd', function() {
  return gulp.watch('test/*.js')
    .on('change', function(file) {
      gulp.src(file.path)
        .pipe(mocha({ reporter: "nyan" }));
    });
});

gulp.task('jshint', function() {
  return gulp.src('test/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

