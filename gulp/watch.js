/**
 * @action 任务名称watch
 * 执行watch任务之前先执行build任务
 * watch任务的功能就是监听pages文件夹中文件的变动，然后执行build
 */
module.exports = function (gulp) {
    gulp.task('watch', ['build'], function () {
        gulp.watch('./src/**/*.*', ['build']);
    });
};