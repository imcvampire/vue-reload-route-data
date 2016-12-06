const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglifyjs');
const rename = require('gulp-rename');

gulp.task('default', () => {
  return gulp.src('vue-reload-route-data.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(rename('vue-reload-route-data.es5.js'))
    .pipe(gulp.dest('.'))
    .pipe(uglify())
    .pipe(rename('vue-reload-route-data.min.js'))
    .pipe(gulp.dest('.'));
});
