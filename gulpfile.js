var gulp = require('gulp');
var gulpWebpack = require('gulp-webpack');
var webpack = require('webpack');
var named = require('vinyl-named');
var rename = require('gulp-rename');
var path = require('path');
var watch = require('gulp-watch');
gulp.task('js', function () {
    return gulp.src(['js/**/**.entry.js'])
        .pipe(named())
        .pipe(gulpWebpack({
            module: {
                noParse: [/bower_components/],
                loaders: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules|bower_components/,
                        loader: 'babel-loader'
                    }
                ]
            },
            resolve: {
                root: [path.join(__dirname, "bower_components")]
            },
            plugins: [
                new webpack.ResolverPlugin(
                    new webpack.ResolverPlugin
                        .DirectoryDescriptionFilePlugin("bower.json", ["main"]))
            ]
        }))
        .pipe(rename(function (path) {
            path.basename = path.basename.replace('.entry', '.bundle');
        }))
        .pipe(gulp.dest('dist/js'));
});
gulp.task('default', ['js']);
gulp.task('watch', ['default'], function() {
    watch(['js/**/**.js', 'spec/**/**.js'], function() {
        gulp.start(['js']);
    });
});
