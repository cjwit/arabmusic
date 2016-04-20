var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');

// creates main.js
gulp.task('bundle', function() {
    return browserify({
        entries: './app/main.jsx',
        debug: true
    }).transform(reactify)
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('app/dist'))
})

// convert sass to css
gulp.task('styles', function() {
    gulp.src('app/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/dist'));
});

// watch sass conversion
gulp.task('watch-sass', function() {
    gulp.watch('app/*.sass', ['styles'])
});

// moves the static files into app/dist
gulp.task('copy', ['bundle'], function() {
    return gulp.src(['app/index.html',
                     'app/lib/bootstrap/dist/css/bootstrap.min.css',
                     'app/lib/bootstrap/js/collapse.js',
                     'app/lib/jquery/dist/jquery.min.js',
                     'app/style.css'])
        .pipe(gulp.dest('app/dist'));
});

gulp.task('default', ['copy'], function() {
    console.log('Gulp completed...');
});
