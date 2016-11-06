const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const minifyCSS = require('gulp-minify-css');
const webpack = require('gulp-webpack');

gulp.task('scripts', function(){
    return gulp.src(['source/jsx/App.jsx'])
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('dist/js'));
});
gulp.task('less', function(){
    console.log(new Date().toTimeString() + ": rebuilding styles...");
    return gulp.src(['source/less/**/*.less'])
        .pipe(less())
        .pipe(sourcemaps.init())
        .pipe(concat('style.css'))
        .pipe(minifyCSS())      
        .pipe(sourcemaps.write())  
        .pipe(gulp.dest('dist/css'))
});
gulp.task('build', ['scripts', 'less']);
gulp.task('dev', ['build'], function(){
    gulp.watch(['source/jsx/**/*'], ['scripts']);
    gulp.watch(['source/less/**/*'], ['less']);
});
console.log("startup");
gulp.start('dev');