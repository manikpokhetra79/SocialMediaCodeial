const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');

//done is a callback function. It returns the result to a function you pass to it.
//It's just the name of the callback
gulp.task('css', function (done) {
  console.log('minifying css..');
  // minifying CSS (SCSS) files
  // run command `gulp css` in the terminal
  // ** stands for any folder & * stands for any file
  gulp
    .src('./assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets/css'));
  gulp
    .src('./assets/**/*.css')
    .pipe(rev())
    .pipe(cssnano())
    .pipe(gulp.dest('./public/assets'))
    .pipe(
      rev.manifest({
        cwd: 'public',
        merge: true,
      })
    )
    .pipe(gulp.dest('./public/assets'));
  done();
});

gulp.task('js', function (done) {
  console.log('minifying js..');
  gulp
    .src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(
      rev.manifest({
        cwd: 'public',
        merge: true,
      })
    )
    .pipe(gulp.dest('./public/assets'));
  done();
});

gulp.task('images', function (done) {
  console.log('minifying images');
  // we have used "regex" (regular expression) below
  gulp
    .src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(
      rev.manifest({
        cwd: 'public',
        merge: true,
      })
    )
    .pipe(gulp.dest('./public/assets'));
  done();
});
//empty the public/assets directory
gulp.task('clean:assets', function (done) {
  del.sync('./public/assets');

  done();
});
//calling all the above tasks
gulp.task(
  'build',
  gulp.series('clean:assets', 'js', 'css', 'images'),
  function (done) {
    console.log('building assets');
    done();
  }
);
