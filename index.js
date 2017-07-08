#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2));
const path = require('path');
const fs = require('fs');
const util = require('util');

const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprites');
const filter    = require('gulp-filter');
const svg2png   = require('gulp-svg2png');

const relative = !!argv.relative;

const template = fs.readFileSync(__dirname + "/template/sprite.scss", "utf-8");

var src;
var dest;

var input = argv._;

src = path.resolve(input[0] || '.');
dest = input[1] ? path.resolve(input[1]) : src;

if(!(fs.existsSync(src) || fs.existsSync(dest))){
  throw ('path not valid');
  process.abort();
  return;
}

// path.relative(from, to)
// console.log(src, dest, argv);

var config = argv.config || {
    mode: "sprite",
    common: "svg-icon",
    templates: {
      scss: template
    },
    cssFile: 'scss/sprite.css',
    svg: {
      sprite: 'sprite/sprite.svg'
    },
    padding: 10,
    selector: "%f"
};




gulp.task('default', function() {
  return gulp.src(src + '/*.svg')
  // .pipe(svgSprite({mode: "defs"}))
    .pipe(svgSprite(config))
    .pipe(gulp.dest(dest))
    .pipe(filter('**/*.svg'))
    .pipe(svg2png())
    .pipe(gulp.dest(dest))
});


gulp.start('default');
