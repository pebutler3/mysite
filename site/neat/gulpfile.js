var gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  minifyCss = require('gulp-minify-css'),
  plumber = require('gulp-plumber'),
  concat = require('gulp-concat'),
  fileinclude = require('gulp-file-include');

var paths = {
  'assets' : './assets'
}
gulp.task('copy', function () {
        return gulp.src('./public/img/**/*', {
         base: './public/img'
        }).pipe(gulp.dest('_site/assets/img'));
});
gulp.task('serve', ['styles','fileinclude'], function() {

    browserSync.init({
        server: "./_site",
        open: false,
        ui: false,
        notify: false
    });

   gulp.watch(paths.assets + '/styles/**/*.scss', ['styles']),
   gulp.watch(paths.assets + '/includes/**/*.html', ['fileinclude']),
   gulp.watch(paths.assets + '/templates/**/*.html',['fileinclude']);
   gulp.watch("assets/**/*").on('change', browserSync.reload);
});
gulp.task('fileinclude', function() {
  gulp.src(['./assets/templates/**/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./_site/'));
});

gulp.task('styles', function(){
  gulp.src([
   paths.assets + '/styles/app.scss'
  ])
  .pipe(plumber())
  .pipe(sass())
  .pipe(concat('app.css'))
  .pipe(minifyCss())
  .pipe(gulp.dest('./_site/css'));
});

gulp.task('default', ['styles','scripts']);
