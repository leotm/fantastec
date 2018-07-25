'use strict';

import app from "./src/server/app.js";

import gulp from "gulp";
import gulpSequence from "gulp-sequence";
import gutil from "gulp-util";
import del from "del";
import sass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
const browserSync = require('browser-sync').create();
import useref from "gulp-useref";

import babel from "gulp-babel";
import uglify from "gulp-uglify";
// Uncaught ReferenceError: require is not defined

// const uglify = require('gulp-uglify-es').default; // Uncaught SyntaxError: Unexpected identifier

import gulpIf from "gulp-if";
import cssnano from "gulp-cssnano";
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');

// Development Tasks 
// -----------------

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src/main'
    },
  })
})

// Start local server
gulp.task('server', function() {
  app.listen(3456);
  gutil.log('Online at http://localhost:3456/');
  return app;
});

// Convert Sass to CSS
gulp.task('sass', function () {
  return gulp.src('src/main/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('src/main/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Watchers
gulp.task('watch', function () {
  gulp.watch('src/main/scss/**/*.scss', ['sass']);
  gulp.watch('src/main/*.html', browserSync.reload); 
  gulp.watch('src/main/js/**/*.js', browserSync.reload);
});

// Optimisation Tasks 
// ------------------

// Optimise CSS and JavaScript
gulp.task('useref', function(){
  return gulp.src('src/main/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', babel({
      presets: ['es2015']
    })))
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

// Optimise Images
gulp.task('images', function(){
  return gulp.src('src/main/images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

// Clean
gulp.task('clean', function () {
  return del('dist/');
});

// Sequences
// ---------------

gulp.task('default', gulpSequence(['sass', 'browserSync'], ['watch', 'server']));

gulp.task('build', gulpSequence('clean', 'sass', ['useref', 'images']));
