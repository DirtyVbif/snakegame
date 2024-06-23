// =====================================================================
// project settings
const src = {
        assets: {
            css: 'assets/css/**/*.+(scss|sass)',
            js:  [
                'assets/js/*/**/*.js',
                'assets/js/*.js',
            ],
            img: 'assets/img/**/*.+(png|jpg|webp|tiff)'
        },
        dest: {
            pub: 'public/',
            img: 'public/images/'
        }
    },
    opt = {
        css: {
            // "sourcemap=none": true,
            // noCache: true,
            // compass: true,
            // style: sassStyle,
            // lineNumbers: false,
            outputStyle: 'expanded'
        },
        src:  {
            base: 'assets/',
            sourcemap: true
        },
        img: {
            base: 'assets/img/',
            sourcemap: true
        }
    },
    // =====================================================================
    // gulp packages
    gulp         = require('gulp'),
    sass         = require('gulp-sass')(require('sass')),
    minifyJS     = require('gulp-terser'),
    autoPrefixer = require('gulp-autoprefixer'),
    rename       = require('gulp-rename'),
    delFiles     = require('del'),
    cssMin       = require('gulp-csso'),
    concat       = require('gulp-concat'),
    addHeader    = require('gulp-header'),
    webp         = require('gulp-webp'),
    fs           = require('fs');

let sources;

function initialize () {
    return new Promise(
        (resolve, reject) =>
        {
            fs.readFile(
                'assets/sources.json',
                'utf-8',
                (error, data) =>
                {
                    sources = JSON.parse(data);
                    resolve();
                }
            )
        }
    );
}

// =====================================================================
//clean target directories
function clean() {
    return delFiles([
        src.dest.pub + 'css/',
        sources.js.directory
    ], {
        force: true
    });
}

// =====================================================================
// compile SASS/SCSS files into target css public directory
function css() {
    return gulp.src(src.assets.css, opt.src)
        .pipe(
            sass(opt.css)
                .on('error', sass.logError)
        )
        .pipe(autoPrefixer())
        .pipe(cssMin())
        .pipe(
            rename(
                {
                    suffix: '.min'
                }
            )
        )
        .pipe(gulp.dest(src.dest.pub));
}

// =====================================================================
// watch css changes
function watch_css() {
    return gulp.watch(src.assets.css, css);
}

// =====================================================================
// minifine and put main.js scripts into target directories
function js() {
    return gulp.src(sources.js.files)
        .pipe(concat(sources.js.name))
        .pipe(addHeader('"use strict";\n'))
        // .pipe(minifyJS())
        .pipe(gulp.dest(sources.js.directory));
}

// =====================================================================
// watch js changes
function watch_js() {
    return gulp.watch(src.assets.js, js);
}

// =====================================================================
// converting images into webp
function img() {
    return gulp.src(src.assets.img, opt.img)
        .pipe(webp({
            quality: 100,
            method: 6
        }))
        .pipe(gulp.dest(src.dest.img));
}

function watch_img() {
    return gulp.watch(src.assets.img, img);
}

// =====================================================================
// BUILD TASKS
exports.default = gulp.series(
    initialize,
    clean,
    gulp.parallel(
        css, js, img
    ),
    gulp.parallel(
        watch_css, watch_js, watch_img
    )
);
