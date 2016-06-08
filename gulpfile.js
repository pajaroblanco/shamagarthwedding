var gulp = require("gulp");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var addsrc = require("gulp-add-src");
var minify = require('gulp-minifier');
var $    = require('gulp-load-plugins')();

var distPath = 'app/dist';

var sassPaths = [
    'app/bower_components/foundation-sites/scss',
    'app/bower_components/motion-ui/src'
    //'app/scss/**/*.scss'
];

var externalJsPaths = [
    "app/bower_components/jquery/dist/jquery.js",
    "app/bower_components/lodash/dist/lodash.js",

    "app/bower_components/foundation-sites/js/foundation.core.js",
    "app/bower_components/foundation-sites/js/foundation.abide.js",
    "app/bower_components/foundation-sites/js/foundation.accordion.js",
    "app/bower_components/foundation-sites/js/foundation.accordionMenu.js",
    "app/bower_components/foundation-sites/js/foundation.drilldown.js",
    "app/bower_components/foundation-sites/js/foundation.dropdown.js",
    "app/bower_components/foundation-sites/js/foundation.dropdownMenu.js",
    "app/bower_components/foundation-sites/js/foundation.equalizer.js",
    "app/bower_components/foundation-sites/js/foundation.interchange.js",
    "app/bower_components/foundation-sites/js/foundation.magellan.js",
    "app/bower_components/foundation-sites/js/foundation.offcanvas.js",
    "app/bower_components/foundation-sites/js/foundation.orbit.js",
    "app/bower_components/foundation-sites/js/foundation.responsiveMenu.js",
    "app/bower_components/foundation-sites/js/foundation.responsiveToggle.js",
    "app/bower_components/foundation-sites/js/foundation.reveal.js",
    "app/bower_components/foundation-sites/js/foundation.slider.js",
    "app/bower_components/foundation-sites/js/foundation.sticky.js",
    "app/bower_components/foundation-sites/js/foundation.tabs.js",
    "app/bower_components/foundation-sites/js/foundation.toggler.js",
    "app/bower_components/foundation-sites/js/foundation.tooltip.js",
    "app/bower_components/foundation-sites/js/foundation.util.box.js",
    "app/bower_components/foundation-sites/js/foundation.util.keyboard.js",
    "app/bower_components/foundation-sites/js/foundation.util.mediaQuery.js",
    "app/bower_components/foundation-sites/js/foundation.util.motion.js",
    "app/bower_components/foundation-sites/js/foundation.util.nest.js",
    "app/bower_components/foundation-sites/js/foundation.util.timerAndImageLoader.js",
    "app/bower_components/foundation-sites/js/foundation.util.touch.js",
    "app/bower_components/foundation-sites/js/foundation.util.triggers.js",

    "app/bower_components/sweetalert/dist/sweetalert-dev.js",
    "app/bower_components/velocity/velocity.js",
    "app/bower_components/velocity/velocity.ui.js",
    "app/bower_components/angular/angular.js",
    "app/bower_components/angular-animate/angular-animate.js",
    "app/bower_components/angular-route/angular-route.js",
    "app/bower_components/angular-velocity-revival/angular-velocity.js",
    "app/bower_components/angular/angular.js",
    "app/registerComponent.js",
     "app/app.es6",
     "app/angular-app/**/*.es6"
];

var externalJsPathsNoBabel = [
    "app/bower_components/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js"
];

var appJsPaths = [
    "app/app.es6",
    "app/angular-app/**/*.es6",
    "app/angular-app/**/*.js"
];

gulp.task('sass', function() {
    return gulp.src('app/scss/app.scss')
        .pipe($.sass({
            includePaths: sassPaths
        })
            .on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(minify({
            minify: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            minifyJS: false,
            minifyCSS: true
        }))
        .pipe(gulp.dest(distPath));
});

gulp.task("js.external", function () {
    return gulp.src(externalJsPaths)
        //.pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(addsrc(externalJsPathsNoBabel))
        .pipe(concat("dependencies.js"))
        //.pipe(sourcemaps.write("."))
        .pipe(minify({
            minify: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            minifyJS: true,
            minifyCSS: false
        }))
        .pipe(gulp.dest(distPath));
});

gulp.task("js.internal", function () {
    return gulp.src(appJsPaths)
    //.pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat("app.js"))
        //.pipe(sourcemaps.write("."))
        .pipe(gulp.dest(distPath));
});

// gulp.task("html", function() {
//     return gulp.src("app/*.html")
//         .pipe(gulp.dest(distPath));
// });

gulp.task("fonts", function () {
    return gulp.src('app/bower_components/font-awesome/fonts/**')
        .pipe(gulp.dest(distPath + '/fonts'));
});

gulp.task('default', ['sass', 'js.external', 'js.internal', 'fonts'], function() {
    gulp.watch(['app/scss/**/*.scss'], ['sass']);
    gulp.watch(['app/**/*.js', 'app/**/*.es6'], ['js.internal']);
});
