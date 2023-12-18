const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const sourcemaps = require("gulp-sourcemaps");

// compile scss into css
function style() {
  return gulp
    .src("asset/sass/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(
      sass({
        outputStyle: "compressed", //expand or compact or compressed
      }).on("error", sass.logError)
    )
    .pipe(gulp.dest("asset/css"))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  gulp.watch("./asset/sass/*.scss", style);
  gulp.watch("./asset/sass/*/*.scss", style);
  gulp.watch("./*.html").on("change", browserSync.reload);
  gulp.watch("./*/*.html").on("change", browserSync.reload);

  gulp.watch("./asset/css/*.css").on("change", browserSync.reload);
  gulp.watch("./asset/js/*.js").on("change", browserSync.reload);
  gulp.watch("./asset/js/*/*.js").on("change", browserSync.reload);
}

exports.style = style;
exports.watch = watch;
