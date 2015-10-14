var fs = require('fs');
var browserify = require('browserify');
var stringify = require('stringify');
var gulp = require('gulp');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var replace = require('gulp-replace');
var uglify = require('gulp-uglify');
var prefix = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var through = require('through');

var scriptBuilder = function (edition) {
  var bundler = browserify({debug: true});

  bundler.transform(stringify(['.html']));

  bundler.transform(function(file) {
    if (file.indexOf('bootstrap') === -1) {
      return through();
    }

    var data = '';
    return through(write, end);

    function write (buf) { data += buf }
    function end () {
      data = "var jQuery = require('jquery');\n\n" + data;
      this.queue(data);
      this.queue(null);
    }
  }, {global: true});

  bundler.add('./client/scripts/app-' + edition + '.js');

  return bundler
    .bundle()
    .pipe(source('app.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true, debug: true}))
      .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/' + edition + '/scripts'));
};

var styleBuilder = function (edition) {
  sass('./client/styles/app.scss', {sourcemap: true, style: 'compact'})
  
  gulp.src([
      './node_modules/font-awesome/css/font-awesome.css',
      './node_modules/bootstrap/dist/css/bootstrap.css',
      './node_modules/bootstrap/dist/css/bootstrap-theme.css',
      './client/styles/**/*.scss'
    ])
    // Compile Sass
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(prefix("> 5%"))
      .pipe(minifyCss())
      .pipe(concat('app.min.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/' + edition + '/styles'))
};

var htmlBuilder = function (edition) {
  var friendlyName = edition;
  var templateFile = './client/templates/editions/' + edition + '/ms.html';
  var templateContents = fs.readFileSync(templateFile);

  if (edition === 'jquery') {
    friendlyName = 'jQuery';
  } else if (edition === 'angular') {
    friendlyName = 'Angular';
  }

  return gulp.src('./client/templates/index.html')
    .pipe(replace('!!!EDITION!!!', friendlyName))
    .pipe(replace('!!!MS!!!', templateContents))
    .pipe(gulp.dest('./public/' + edition + '/'));
};

var glyphiconsBuilder = function (edition) {
  return gulp.src('./node_modules/bootstrap/fonts/**/*')
    .pipe(gulp.dest('./public/' + edition + '/fonts/'));
};

var fontAwesomeBuilder = function (edition) {
  return gulp.src('./node_modules/font-awesome/fonts/**/*')
    .pipe(gulp.dest('./public/' + edition + '/fonts/'));
};

gulp.task('build-jquery', ['lint'], function () {
  scriptBuilder('jquery');
  styleBuilder('jquery');
  htmlBuilder('jquery');
  glyphiconsBuilder('jquery');
  fontAwesomeBuilder('jquery');
});

gulp.task('build-angular', ['lint'], function () {
  scriptBuilder('angular');
  styleBuilder('angular');
  htmlBuilder('angular');
  glyphiconsBuilder('angular');
  fontAwesomeBuilder('angular');
});

gulp.task('build', ['build-jquery', 'build-angular']);

gulp.task('lint', function() {
  return gulp.src('./client/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('default', ['build']);