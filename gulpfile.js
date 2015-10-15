var fs = require('fs');
var browserify = require('browserify');
var babel = require('babelify');
var stringify = require('stringify');
var gulp = require('gulp');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var replace = require('gulp-replace');
var uglify = require('gulp-uglify');
var prefix = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var through = require('through');

var createScriptTask = function (edition) {
  return function () {
    var bundler = browserify({debug: true});

    bundler.transform(stringify(['.html']));
    bundler.transform(babel);

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
};

var createStyleTask = function (edition) {
  return function () {
    sass('./client/styles/app.scss', {sourcemap: true, style: 'compact'})
    
    return gulp.src([
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
};

var createHtmlTask = function (edition, title) {
  return function () {
    var templateFile = './client/templates/editions/' + edition + '/ms.html';
    var templateContents = fs.readFileSync(templateFile);

    return gulp.src('./client/templates/index.html')
      .pipe(replace('!!!EDITION!!!', title || edition))
      .pipe(replace('!!!MS!!!', templateContents))
      .pipe(gulp.dest('./public/' + edition + '/'));
  };
};

var createGlyphiconsTask = function (edition) {
  return function () {
    return gulp.src('./node_modules/bootstrap/fonts/**/*')
      .pipe(gulp.dest('./public/' + edition + '/fonts/'));
  };
};

var createFontAwesomeTask = function (edition) {
  return function () {
    return gulp.src('./node_modules/font-awesome/fonts/**/*')
      .pipe(gulp.dest('./public/' + edition + '/fonts/'));
  };
};

var createTasks = function (edition, title) {
  // many of these tasks could be run in parallel, but I'm
  //   using depedent tasks to get them running sequentially
  //   because it's easier to read the output flow when
  //   running gulp -- and the speed difference is not significant
  //   enough for that to be a problem
  gulp.task(
    edition + '-script',
    ['lint'], 
    createScriptTask(edition));
  gulp.task(
    edition + '-style',
    [edition + '-script'],
    createStyleTask(edition));
  gulp.task(
    edition + '-html',
    [edition + '-style'],
    createHtmlTask(edition, title));
  gulp.task(
    edition + '-glyphicons',
    [edition + '-html'],
    createGlyphiconsTask(edition));
  gulp.task(
    edition + '-fontawesome',
    [edition + '-glyphicons'],
    createFontAwesomeTask(edition));
};

var getBuildTaskArray = function (edition) {
  return [
    edition + '-script',
    edition + '-style',
    edition + '-html',
    edition + '-glyphicons',
    edition + '-fontawesome'
  ];
};

// lint task - shared across all editions
gulp.task('lint', function() {
  return gulp.src('./client/scripts/**/*.js')
    .pipe(eslint({jsx: true}))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

// create tasks for each edition we want to build
createTasks('react', 'React');
createTasks('angular', 'Angular');
createTasks('jquery', 'jQuery');

// create build tasks
gulp.task('build-react', getBuildTaskArray('react'));
gulp.task('build-angular', getBuildTaskArray('angular'));
gulp.task('build-jquery', getBuildTaskArray('jquery'));

// combined build task
gulp.task('build', ['build-jquery', 'build-angular', 'build-react']);

// default task
gulp.task('default', ['build']);