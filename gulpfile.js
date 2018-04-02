var gulp 	   = require('gulp');
var rev        = require('gulp-rev');//给每个文件计算个哈希码
var revReplace = require('gulp-rev-replace');//更新index里面的引用
var useref     = require('gulp-useref');//合并通用样式
var filter 	   = require('gulp-filter');//过滤器过滤文件
var uglify 	   = require('gulp-uglify');//压缩js代码的插件
var csso       = require('gulp-csso');//压缩css代码的插件

gulp.task('default', function(){
	var jsFilter = filter('**/*.js',{restore:true});
	var cssFilter = filter('**/*.css',{restore:true});
	var indexHtmlFilter = filter(['**/*','!**/index.html'],{restore:true});

	return gulp.src('src/index.html')
		.pipe(useref())
		.pipe(jsFilter)
		.pipe(uglify())
		.pipe(jsFilter.restore)
		.pipe(cssFilter)
		.pipe(csso())
		.pipe(cssFilter.restore)
		.pipe(indexHtmlFilter)
		.pipe(rev())
		.pipe(indexHtmlFilter.restore)
		.pipe(revReplace())
		.pipe(gulp.dest('dist'));
});