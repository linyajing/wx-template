/**
 * @action 自动打包scss => wxss
 * 1. 开发项目文件在src目录中
 * 2. watch和build会将文件处理完成后打包到build文件夹
 */
var DIST_PATH = './build';
var fs = require('fs');
var sass = require('gulp-sass');
var del = require('del');
var copydir = require('copy-dir');
var filter = require('gulp-filter');

// 将文件夹中的文件以数组形式抽出
var walk = function (fileList, path) {
    var dirList = fs.readdirSync(path);
    dirList.forEach(function (item) {
        if (fs.statSync(path + '/' + item).isDirectory()) {
            walk(fileList, path + '/' + item);
        } else {
            fileList.push(path + '/' + item);
        }
    });
};
// task事件是同时、异步执行的，回调函数参数接收回调函数的方式来实现同步执行
module.exports = function (gulp) {
    gulp.task('clear', (cb) => {
        del.sync(DIST_PATH);
        cb();
    });

    gulp.task('sass', (cb) => {
        gulp.src('./src/**/*.scss')
            .pipe(sass.sync().on('error', sass.logError))
            .pipe(gulp.dest(DIST_PATH))
            .on('end', cb);
    });

    // 将.css文件后缀重命名为.wxss
    gulp.task('wxss', ['sass'], () => {
        let fileList = [];
        walk(fileList, DIST_PATH);
        fileList.forEach(filePath => {
            let prefix = filePath.replace(/\.s?css$/, '');
            let tail = (filePath.match(/\.s?css/) || [])[0];

            if (tail === '.scss') {
                fs.unlinkSync(filePath);
            } else if (tail === '.css') {
                // 判断是否存在对应的wxml文件，如果不存在，则可以移除当前css文件
                if (fileList.indexOf(prefix + '.wxml') === -1 && filePath !== './build/app.css') {
                    fs.unlinkSync(filePath);
                } else {
                    fs.renameSync(filePath, prefix + '.wxss');
                }
            }
        });
    });

    /**
     * @action 复制文件路径, 回调函数自带循环
     * @stat 'file'| 'directory'
     * @filepath 文件相对于根目录路径
     * @filename 文件名
     * @ return true 复制该文件  false 不复制该文件
     */
    gulp.task('copy-dir', (cb) => {
        copydir.sync('./src', DIST_PATH);
        cb();
    });

    gulp.task('build', ['clear', 'copy-dir', 'wxss'], (cb) => {
        cb();
    });
};
