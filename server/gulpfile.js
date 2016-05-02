var gulp = require("gulp");
var merge = require("merge2");
var watch = require("gulp-watch");
var runSequence = require("run-sequence");
var clean = require("gulp-clean");
var gutil = require("gulp-util");
var ts = require('gulp-typescript');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

var tsProject = ts.createProject('tsconfig.json');
gulp.task("scripts", function() {
    var tsResult = tsProject.src()
		.pipe(ts(tsProject));
	return tsResult.js.pipe(gulp.dest('dist'));
});

var node;
gulp.task('server', function() {
  if (node)
    node.kill()

  node = spawn('node', ['dist/server.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
})

gulp.task("libs", function() {
});

gulp.task("resources", function () {
      return gulp.src(["resources/**/*.*"])
         .pipe(gulp.dest("dist"));
});

gulp.task("copy-client", function () {
      return gulp.src(["../client/dist/**/*.*"])
         .pipe(gulp.dest("dist/public"));
});

gulp.task("build", ["scripts", "resources", "libs", "copy-client"], function() {
});

gulp.task("default", ["build", "watch", "server"], function() {
});

gulp.task("clean", function() {
    return gulp.src(["dist"])
        .pipe(clean({ force: true }));
});

gulp.task("release", function (done) {
      return gulp.src(["dist/**/*.*", "package.json", "Procfile"])
         .pipe(gulp.dest("../heroku"));
});

gulp.task("watch", function() {
    watch(["src/**/*.ts"], function () { runSequence("scripts", "server"); });
    watch(["../client/dist/**/*.*"], function () { runSequence("copy-client"); });
    watch(["src/**/tsconfig.json"], function () { runSequence("scripts"); });
    watch(["resources/**/*.*"], function() { runSequence("resources") });
});
