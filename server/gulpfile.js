var gulp = require("gulp");
var merge = require("merge2");
var watch = require("gulp-watch");
var runSequence = require("run-sequence");
var clean = require("gulp-clean");
var gutil = require("gulp-util");
var ts = require('gulp-typescript');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var webpack = require("webpack");
var webpackConfig = require("./webpack.config");

var tsProject = ts.createProject('src/server/tsconfig.json');
gulp.task("server-scripts", function() {
    var tsResult = tsProject.src()
		.pipe(ts(tsProject));
	return tsResult.js.pipe(gulp.dest('dist'));
});


gulp.task("client-scripts", function() {    
    var config = Object.create(webpackConfig);
    var compiler = webpack(config);
    compiler.run(function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true,
            chunks: false
        }));
    });    
});

gulp.task("client-watch-scripts", function() {    
    var config = Object.create(webpackConfig);
    var compiler = webpack(config);
    compiler.watch({}, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true,
            chunks: false
        }));
    });  
});


gulp.task("scripts", ["client-scripts", "server-scripts"] , function() {
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
         .pipe(gulp.dest("dist/public"));
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

gulp.task("watch", ["client-watch-scripts"], function() {
    watch(["src/server/**/*.ts"], function () { runSequence("server-scripts", "server"); });
    watch(["src/**/tsconfig.json"], function () { runSequence("scripts"); });
    watch(["resources/**/*.*"], function() { runSequence("resources") });
});
