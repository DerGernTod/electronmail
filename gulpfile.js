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
    return gulp.src(['source/less/**/*.less'])
        .pipe(less())
        .pipe(sourcemaps.init())
        .pipe(minifyCSS())      
        .pipe(concat('style.css'))
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