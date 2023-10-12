const path = require('path');
const gulp = require('gulp');
const less = require('gulp-less');
const insert = require('gulp-insert');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const ts = require('gulp-typescript');
const merge2 = require('merge2');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const libDir = path.resolve(__dirname, '../lib');
const esDir = path.resolve(__dirname, '../dist');
const src = path.resolve(__dirname, '../packages');
const esConfig = path.resolve(__dirname, '../tsconfig.json');
const exampleDistDir = path.resolve(__dirname, '../example/dist');
const baseCssPath = path.resolve(__dirname, '../packages/common/index.wxss');

/** ts 文件转成 js 文件 */
const tsCompiler = (dist, config) => function compileTs() {
  const tsProject = ts.createProject(config, {
    declaration: true,
  });
  const tsResult = tsProject.src().pipe(tsProject());

  return merge2(
    tsResult.js
      .pipe(
        insert.transform((contents, file) => {
          // 打包到 dist 文件夹的路径存在 demo 的文件
          if (dist === exampleDistDir && file.path.includes(`${path.sep}demo${path.sep}`)) {
            const iconConfig = '@vant/icons/src/config';
            contents = contents.replace(
              iconConfig,
              path.replace(
                path.dirname(file.path),
                `${exampleDistDir}/${iconConfig}`
              ).replace(/\\/g, '/')
            )
          }
          return contents
        })
      ).pipe(gulp.dest(dist)),

    // 并生成 d.ts 类型文件
    tsResult.dts.pipe(gulp.dest(dist))
  )
}

/** 将 less文件转成 wxss 文件 */
const lessCompiler = (dist) =>
  function compileLess() {
    // 打包 packages 文件夹下的所有 less 文件，但是不打包 demo 下的 less 文件
    const srcPath = [`${src}/**/*.less`];
    if ([esDir, libDir].indexOf(dist) !== -1) {
      srcPath.push(`!${src}/**/demo/**/*.less`);
    }

    return gulp
      .src(srcPath) // 需要打包的文件夹
      .pipe(less()) // 使用 gulp-less 将 less 转换成 css
      .pipe(postcss()) // 使用 gulp-postcss 将 css 兼容化压缩化
      .pipe(
        insert.transform((contents, file) => {
          // 每个组件都自动引入 @import '../common/index.wxss'; 共用样式文件
          if (!file.path.includes('packages' + path.sep + 'common')) { // 除了 common 本身
            const relativePath = path
              .relative(
                path.normalize(`${file.path}${path.sep}..`),
                baseCssPath
              )
              .replace(/\\/g, '/');
            contents = `@import '${relativePath}';${contents}`;
          }
          return contents;
        })
      )
      .pipe(rename({ extname: '.wxss' })) // 将转换好的文件后缀名改成 wxss
      .pipe(gulp.dest(dist)); // 将转换好的文件传入 dist 文件夹
  };


  /** 复制对应后缀名的文件 */
const copier = (dist, ext) =>
  function copy() {
    // 复制对应后缀名的文件，但不复制 demo 目录下的文件
    const srcPath = [`${src}/**/*.${ext}`];
    if ([esDir, libDir].indexOf(dist) !== -1) {
      srcPath.push(`!${src}/**/demo/**/*.${ext}`);
    }
    return gulp
      .src(srcPath)
      .pipe(
        insert.transform((contents, file) => {
          if (ext === 'json' &&  file.path.includes(`${path.sep}demo${path.sep}`)  ) {
            contents = contents.replace('/example', '');
          }
          return contents;
        })
      )
      .pipe(gulp.dest(dist));
  };

const staticCopier = (dist) =>
  gulp.parallel(
    copier(dist, 'wxml'),
    copier(dist, 'wxs'),
    copier(dist, 'json')
  );

const cleaner = (path) => function clean() {
  return exec(`npx rimraf ${path}`);
}

const tasks = [
  ['buildEs', esDir, esConfig],
].reduce((prev, [name, ...args]) => {
  prev[name] = gulp.series(
    cleaner(...args), // 先删除打包文件夹
    gulp.parallel(
      tsCompiler(...args), // ts 转 js
      lessCompiler(...args), // less 转成 wxss
      staticCopier(...args) // 其他文件直接复制
    )
  )
  return prev
}, {})


module.exports = tasks;