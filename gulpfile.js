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

// creates discussions.js
gulp.task('bundle-discussions', function() {
    return browserify({
        entries: './app/discussions.jsx',
        debug: true
    }).transform(reactify)
        .bundle()
        .pipe(source('discussions.js'))
        .pipe(gulp.dest('app/dist'))
})

// creates discussions.js
gulp.task('bundle-discussionPage', function() {
    return browserify({
        entries: './app/discussionPageScript.jsx',
        debug: true
    }).transform(reactify)
        .bundle()
        .pipe(source('discussionPageScript.js'))
        .pipe(gulp.dest('app/dist'))
})

// creates eventPage.js
gulp.task('bundle-eventPage', function() {
    return browserify({
        entries: './app/eventPageScript.jsx',
        debug: true
    }).transform(reactify)
        .bundle()
        .pipe(source('eventPageScript.js'))
        .pipe(gulp.dest('app/dist'))
})

// creates events.js
gulp.task('bundle-events', function() {
    return browserify({
        entries: './app/events.jsx',
        debug: true
    }).transform(reactify)
        .bundle()
        .pipe(source('events.js'))
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
gulp.task('copy', function() {
    return gulp.src(['app/index.html',
                     'app/discussions.html',
                     'app/events.html',
                     'app/eventPage.html',
                     'app/discussionPage.html',
                     'app/lib/bootstrap/dist/css/bootstrap.min.css',
                     'app/lib/bootstrap/dist/js/bootstrap.min.js',
                     'app/lib/jquery/dist/jquery.min.js',
                     'app/lib/moment/moment.js',
                     'app/lib/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
                     'app/lib/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
                     'app/style.css'])
        .pipe(gulp.dest('app/dist'));
});

gulp.task('default', ['copy', 'bundle', 'bundle-discussions', 'bundle-events', 'bundle-eventPage', 'bundle-discussionPage'], function() {
    console.log('Gulp completed...');
});
