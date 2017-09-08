'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    csscomb = require('gulp-csscomb'),
    combineMq = require('gulp-combine-mq'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css'),
    fontName = 'awesome-font',
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    src: {
        html: 'src/*.html',
        cache: 'src/components/**/*.html',
        js: 'src/js/*.js',
        style: 'src/css/*.*',
        img: 'src/components/images/**/*.*',
        fonts: 'src/components/common/fonts/**/*.*',
        iconfont: 'src/components/common/icons/*.svg'
    },
    build: {
        html: 'app/',
        cache: 'src/cache/',
        js: 'app/js/',
        css: 'app/css/',
        img: 'app/images/',
        fonts: 'app/fonts/',
        iconSCSS: '../_icons.scss'
    },
    watch: {
        html: 'src/cache/**/*.html',
        cache: 'src/components/**/*.html',
        js: 'src/components/**/*.js',
        style: 'src/components/**/*.scss',
        img: 'src/components/images/**/*.*',
        fonts: 'src/components/common/fonts/**/*.*'
    }
};

var config = {
    server: {
        baseDir: "./app"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Server"
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('iconfont', function(){
    gulp.src(path.src.iconfont)
        .pipe(iconfontCss({
            fontName: fontName,
            targetPath: path.build.iconSCSS,
            fontPath: '../fonts/' + fontName + '/'
        }))
        .pipe(csscomb())
        .pipe(iconfont({
            fontName: fontName,
            appendCodepoints: true,
            normalize: true,
            fontHeight: 1001,
            formats: ['ttf', 'svg', 'eot', 'woff', 'woff2']
        }))
        .pipe(gulp.dest('src/components/common/fonts/'));
});

gulp.task('cache', function () {
    gulp.src(path.src.cache)
        .pipe(plumber(
            notify.onError({
                title: 'Cache:',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(rigger())
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(path.build.cache))
        .pipe(reload({stream: true}));
});

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(plumber(
            notify.onError({
                title: 'JS:',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(plumber(
            notify.onError({
                title: 'SASS:',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(sourcemaps.init())
        .pipe(sass({
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer())
        // .pipe(cssmin())
        // .pipe(sourcemaps.write())
        // .pipe(combineMq())
        .pipe(csscomb())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        // .pipe(imagemin({
        //     progressive: true,
        //     svgoPlugins: [{removeViewBox: false}],
        //     use: [pngquant()],
        //     interlaced: true
        // }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(reload({stream: true}));
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    // 'fonts:build',
    'image:build'
]);

gulp.task('start', ['cache', 'iconfont']);

gulp.task('watch', function(){
    watch([path.watch.html, path.watch.cache], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});


gulp.task('default', ['build', 'webserver', 'watch']);
