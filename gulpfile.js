/**
 * @action gulp 任务
 * @author linyajing
 * @create 2018.04.27
 */
var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
// fs.readdirSyn 返回一个所包含的文件和子目录的数组
var gulpTaskList = fs.readdirSync(path.join('./gulp/'));

gulpTaskList.forEach(function (taskFilePath) {
    var suffix = taskFilePath.split('.').pop();
    if (suffix === 'js') {
        require('./gulp/' + taskFilePath)(gulp);
    }
});