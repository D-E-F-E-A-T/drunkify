var gulp = require("gulp");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var cssmin = require("gulp-cssmin");
var htmlmin = require("gulp-htmlmin");
var rename = require("gulp-rename");
var pump = require("pump");
var del = require("del");
var runSequence = require("run-sequence");
var connect = require('gulp-connect');

gulp.task('webserver', function () {
    connect.server({
        livereload: true,
        port: 3000,
        host: '0.0.0.0',
        root: ['build']
    });
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "./src"
    }
  });
});

gulp.task('html', function () {
  gulp.src('src/*.html')
    .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src('src/js/*.js')
    .pipe(connect.reload());
});

gulp.task('css', function () {
  gulp.src('src/css/*.scss')
    .pipe(connect.reload());
});

gulp.task("minify-css", function(cb) {
  console.log("========> Minificando SCSS...");
  pump(
    [
      gulp.src("./src/css/*.scss"),
      sass(),
      cssmin(),
      rename({
        suffix: ".min"
      }),
      gulp.dest("./build")
    ],
    cb
  );
});

gulp.task("minify-js", function(cb) {
  console.log("========> Minificando JS...");
  pump(
    [
      gulp.src("./src/js/*.js"),
      // uglify(),
      rename({
        suffix: ".min"
      }),
      gulp.dest("./build")
    ],
    cb
  );
});

gulp.task("pwaify", function(cb) {
  console.log("========> Minificando JS...");
  pump(
    [
      gulp.src("./sw.js"),
      uglify(),
      gulp.dest("./build"),
      gulp.src("./manifest.json"),
      gulp.dest("./build")
    ],
    cb
  );
});

gulp.task("minify-html", function(cb) {
  console.log("========> Minificando HTML...");
  pump(
    [
      gulp.src("./src/*.html"),
      htmlmin({ collapseWhitespace: true }),
      gulp.dest("./build")
    ],
    cb
  );
});

gulp.task("copy-assets", function() {
  gulp.src(["./assets/**/*"]).pipe(gulp.dest("./build/assets/"));
});

gulp.task("clean", function() {
  return del(["./build/"]);
});

gulp.task("build", function() {
  runSequence("clean", [
    "minify-html",
    "minify-js",
    "minify-css",
    "copy-assets",
    "pwaify"
  ]);
});

gulp.task("watch", function() {
  gulp.watch("./src/css/*.scss", ["css", "minify-css"]);
  gulp.watch("./src/js/*.js", ["js", "minify-js"]);
  gulp.watch("./src/*.html", ["html", "minify-html"]);
});

gulp.task('default', ['build', 'webserver', 'watch']);
