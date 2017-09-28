// Use 'gulp build' to get pretty project files

//
// ─── PLUGINS LIST ───────────────────────────────────────────────────────────────
//
let gulp = require('gulp'),
    jade = require('gulp-jade'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    prefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    combineMq = require('gulp-combine-mq'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

//
// ─── CORE PATHS ───────────────────────────────────────────────────────────────────────
//
let base = './src/',
    dev = './dev/',
    build = './build/';
//
// ─── TASK LIST ────────────────────────────────────────────────────────────────
//
let tasks = [
        'html',
        'jade2html',
        'style',
        'js',
        'image',
        'webserver',
        'watch'
    ],
    build_tasks = [
        'build:html',
        'build:style',
        'build:js',
        'build:image'
    ];

//
// ─── WEBSERVER ──────────────────────────────────────────────────────────────────
//
gulp.task('webserver', () => {
    browserSync({
        server: {
            baseDir: dev
        },
        tunnel: true,
        host: 'localhost',
        port: 9000,
        logPrefix: "Server"
    });
});

//
// ─── HTML ───────────────────────────────────────────────────────────────────────
//
// Paths
let _html = {
    src: base + '*.html',
    dev: dev,
    watch: base + '**/*.html',
    build: {
        src: dev + '*.html',
        dist: build
    }
};
// Working task "gulp"
gulp.task('html', () => {
    gulp.src(_html.src)
    .pipe(plumber(
        notify.onError({
            title: 'JADE:',
            message: 'Error: <%= error.message %>'
        })
    ))
    .pipe(rigger())
    .pipe(gulp.dest(_html.dev))
    .pipe(reload({stream: true}));
});
// Build task "gulp build"
gulp.task(build_tasks[0], () => {
    gulp.src(_html.build.src)
        .pipe(gulp.dest(_html.build.dist));
});
//
// ─── JADE ───────────────────────────────────────────────────────────────────────
//
// Paths
let _jade = {
    src: base + '**/*.jade',
    dev: dev,
    watch: base + '**/*.jade'
};
// Working task "gulp"
gulp.task('jade2html', () => {
    let YOUR_LOCALS = {};
    
    gulp.src(_jade.src)
    .pipe(plumber(
        notify.onError({
            title: 'JADE:',
            message: 'Error: <%= error.message %>'
        })
    ))
    .pipe(jade({
        locals: YOUR_LOCALS,
        pretty: '    '
    }))
    .pipe(gulp.dest(_jade.dev))
    .pipe(reload({stream: true}));
});
// Build task is the same as for build:html "gulp build"

//
// ─── STYLES ─────────────────────────────────────────────────────────────────────
//
// Paths
let _style = {
    src: base + '**/*.scss',
    dev: dev + 'css/',
    watch: base + '**/*.scss',
    build: {
        src: dev + '**/*.css',
        dist: build
    }
};
// Working task "gulp"
gulp.task('style', () => {
    gulp.src(_style.src)
    .pipe(plumber(
        notify.onError({
            title: 'SASS:',
            message: 'Error: <%= error.message %>'
        })
    ))
    .pipe(sass())
    .pipe(prefixer())
    .pipe(combineMq())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(_style.dev))
    .pipe(reload({stream: true}));
});
// Build task "gulp build"
gulp.task(build_tasks[1], () => {
    gulp.src(_style.build.src)
    .pipe(cssmin())
        .pipe(gulp.dest(_style.build.dist));
});

//
// ─── JS ─────────────────────────────────────────────────────────────────────────
//
// Paths
let _js = {
    src: base + '*.js',
    dev: dev + 'js/',
    watch: base + '**/*.js',
    build: {
        src: dev + 'js/*.js',
        dist: build + 'js'
    }
};
// Working task "gulp"
gulp.task('js', () => {
    gulp.src(_js.src)
    .pipe(plumber(
        notify.onError({
            title: 'JS:',
            message: 'Error: <%= error.message %>'
        })
    ))
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(_js.dev))
    .pipe(reload({stream: true}));
});
// Build task "gulp build"
gulp.task(build_tasks[2], () => {
    gulp.src(_js.build.src)
        .pipe(uglify())
        .pipe(gulp.dest(_js.build.dist));
});

//
// ─── IMAGES ─────────────────────────────────────────────────────────────────────
//
// Paths
let _image = {
    src: base + 'images/**/*.*',
    dev: dev + 'images',
    watch: base + 'images/**/*.*',
    build: {
        src: dev + 'images/**/*.*',
        dist: build + 'images/'
    }
}
// Working task "gulp"
gulp.task('image', () => {
    gulp.src(_image.src)
        .pipe(gulp.dest(_image.dev))
        .pipe(reload({stream: true}));
});
// Build task "gulp build"
gulp.task(build_tasks[3], () => {
    gulp.src(_image.build.src)
        .pipe(gulp.dest(_image.build.dist));
});

//
// ─── WATCHES ────────────────────────────────────────────────────────────────────
//
gulp.task('watch', () => {
    watch(_html.watch, () => {
        gulp.start('html');
    });
    watch([_jade.watch, _html.watch], () => {
        gulp.start('jade2html');
    });
    watch(_style.watch, () => {
        gulp.start('style');
    });
    watch(_js.watch, () => {
        gulp.start('js');
    });
    watch(_image.watch, () => {
        gulp.start('image');
    });
});

//
// ─── DEFAULT AND BUILD ────────────────────────────────────────────────────────────────────
//
gulp.task('build', [...build_tasks]);
gulp.task('default', [...tasks]);
