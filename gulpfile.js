const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');


function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        }
    });
}

function cleanDist() {
    return del('dist')
}

function images() {
    return src('app/images/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(dest('dist/images'))
}

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/mixitup/dist/mixitup.js',
        'node_modules/rateyo/src/jquery.rateyo.js',
        'app/js/main.js',
        'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
        'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
        

        
    ])

        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())

}

function style() {
    return src([
        'node_modules/normalize.css/normalize.css',
        'node_modules/slick-carousel/slick/slick.css',
        'node_modules/rateyo/src/jquery.rateyo.css',
        'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css',
        'node_modules/jquery-form-styler/dist/jquery.formstyler.css',
        'node_modules/jquery-form-styler/dist/jquery.formstyler.theme.css',
    ])

        .pipe(concat('libs.min.css'))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())

}

function styles() {
    return src('app/scss/**/*.scss')
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())

}

function watching() {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
    watch(['app/*.html']).on('change', browserSync.reload);
}

function build() {
    return src([
        'app/css/**/*.css',
        'app/js/main.min.js',
        'app/fonts/**/*',
        'app/*.html'
    ], { base: 'app' })
        .pipe(dest('dist'))
}


exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;


exports.build = series(cleanDist, images, build);
exports.default = parallel(style, styles, scripts, browsersync, watching);