'use strict';

var gulp = require('gulp');  // Base gulp package
var babelify = require('babelify'); // Used to convert ES6 & JSX to ES5
var browserify = require('browserify'); // Providers "require" support, CommonJS
var notify = require('gulp-notify'); // Provides notification to both the console and Growel
var rename = require('gulp-rename'); // Rename sources
var sourcemaps = require('gulp-sourcemaps'); // Provide external sourcemap files
var livereload = require('gulp-livereload'); // Livereload support for the browser
var gutil = require('gulp-util'); // Provides gulp utilities, including logging and beep
var chalk = require('chalk'); // Allows for coloring for logging
var source = require('vinyl-source-stream'); // Vinyl stream support
var buffer = require('vinyl-buffer'); // Vinyl stream support
var watchify = require('watchify'); // Watchify for source changes
var merge = require('utils-merge'); // Object merge tool
var duration = require('gulp-duration'); // Time aspects of your gulp process
var sass = require('gulp-sass');
var concatCSS = require('gulp-concat-css');
var uglifyCSS = require('gulp-uglifycss');

// Configuration for Gulp
var config = {
  js: {
    src: './app/main.jsx',
    watch: './js/**/*',
    outputDir: './app/dist/',
    outputFile: 'scripts.js',
  },
};

// Error reporting function
function mapError(err) {
  if (err.fileName) {
    // Regular error
    gutil.log(chalk.red(err.name)
      + ': ' + chalk.yellow(err.fileName.replace(__dirname + '/src/js/', ''))
      + ': ' + 'Line ' + chalk.magenta(err.lineNumber)
      + ' & ' + 'Column ' + chalk.magenta(err.columnNumber || err.column)
      + ': ' + chalk.blue(err.description));
  } else {
    // Browserify error..
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.message));
  }
}

// convert sass to css (revert to moving to soures instead of dist for production)
gulp.task('styles', function() {
    gulp.src('app/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/styles'));
	return gulp.src('app/styles/*.css')
        .pipe(concatCSS('concatStyles.css'))
        .pipe(gulp.dest('app/dist'))
        .pipe(uglifyCSS())
        .pipe(gulp.dest('app/dist'))
		.pipe(notify({
		  message: 'Generated file: <%= file.relative %>',
		})) // Output the file being created
});

// watch sass conversion, run 'styles' on changes
gulp.task('watch-sass', function() {
    gulp.watch('app/*.sass', ['styles'])
});


// Completes the final file outputs
function bundle(bundler) {
  var bundleTimer = duration('Javascript bundle time');

  bundler
    .bundle()
    .on('error', mapError) // Map error reporting
    .pipe(source('main.jsx')) // Set source name
    .pipe(buffer()) // Convert to gulp pipeline
    .pipe(rename(config.js.outputFile)) // Rename the output file
    .pipe(sourcemaps.init({loadMaps: true})) // Extract the inline sourcemaps
    .pipe(sourcemaps.write('./map')) // Set folder for sourcemaps to output to
    .pipe(gulp.dest(config.js.outputDir)) // Set the output folder
    .pipe(notify({
      message: 'Generated file: <%= file.relative %>',
    })) // Output the file being created
    .pipe(bundleTimer) // Output time timing of the file creation
    .pipe(livereload()); // Reload the view in the browser
}

// Gulp task for build
gulp.task('default', function() {
  //livereload.listen(); // Start livereload server, removed to stop watching
  var args = merge(watchify.args, { debug: true }); // Merge in default watchify args with browserify arguments
  var bundler = browserify(config.js.src, args) // Browserify
//    .plugin(watchify, {ignoreWatch: ['**/node_modules/**', '**/bower_components/**']}) // Watchify to watch source file changes, removed to stop watching
    .transform(babelify, {presets: ['es2015', 'react', 'stage-0']}); // Babel tranforms

  bundle(bundler); // Run the bundle the first time (required for Watchify to kick in)
  bundler.on('update', function() {
    bundle(bundler); // Re-run bundle on source updates
  });
});

/*
gulp.task('finalize-scripts', function() {
    return gulp.src(['app/lib/jquery/dist/jquery.min.js',
                     'app/lib/moment/moment.js',
                     'app/lib/bootstrap/dist/js/bootstrap.min.js',
                     'app/lib/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
                     'app/main.js'])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('app/dist'))
        .pipe(uglify())
        .pipe(gulp.dest('app/dist'));
});

// creates main.js
gulp.task('bundle', function() {
    return browserify({
        entries: './app/main.jsx',
        debug: true
    }).transform(reactify)
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('app'))
})

gulp.task('copy', function() {
    return gulp.src('app/index.html')
        .pipe(gulp.dest('app/dist'));
});

gulp.task('default', ['copy',
                      'bundle',
                      'styles',
                      'finalize-scripts',
                      'finalize-css'], function() {
    console.log('Gulp completed...');
});
*/
