/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/12/31 - 18:33
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * ES2015 JS ライブラリ
 *
 * `babels/src` でファイルを作成します
 * fileName object を編集し出力ファイル名を設定します
 * dir.app.babel へ出力されます
 */

import module from '../gulp_setting.babel';

const gulp = module.gulp;
/**
 * gulp-load-plugins instance
 * ```
 * import gulpLoadPlugins from 'gulp-load-plugins';
 * const $ = gulpLoadPlugins();
 * ```
 * @type {*}
 */
const $ = module.$;
/**
 * @type {{
 *  reload: function,
 *  browserSync: function,
 *  runSequence: function,
 *  webpack: function,
 *  del: function,
 * }}
 */
const $$ = module.$$;

const dir = module.dir;

const patterns = module.patterns;

const wpk = module.wpk;

// --------------------------------------
//  TASK
// --------------------------------------

const files = [
  `${dir.mlb.src}/**/*.{js,jsx}`,
];
// console.log('files dir.dist.theme', dir.dist.theme);
const fileName = {
  raw: 'mlb_stats_app.js',
  bundle: 'mlb_stats_app.bundle.js',
};

// ESLintst
// --------------------------------------
gulp.task('mlb:lint', () => (
  gulp.src(files)
  .pipe($.eslint({ useEslintrc: true }))
  .pipe($.eslint.format())
  .pipe($.eslint.failAfterError())
  .pipe($.size({ title: '*** mlb:lint ***' }))
  ),
);

// babel
// --------------------------------------
gulp.task('mlb:babel', () => (
  gulp.src(files)
  // .pipe($.babel({
  //   presets: [
  //     // 'es2017',
  //     // 'es2016',
  //     'es2015',
  //     'react',
  //     'stage-0',
  //   ],
  //   plugins: [
  //     'transform-runtime',
  //     'transform-class-properties',
  //   ],
  // }))
  .pipe($.babel())
  .pipe($.replaceTask({ patterns }))
  .pipe(gulp.dest(dir.mlb.compile))
  .pipe($.size({ title: '*** mlb:babel ***' }))
  ),
);

// webpack [DEV]
// --------------------------------------
gulp.task('mlb:pack:dev', (callback) => {
  const config = Object.assign({}, wpk);
  // remove, since webpack 2.x, @see https://webpack.js.org/guides/migrating/
  // config.plugins = [
  //   new $$.webpack.optimize.DedupePlugin(),
  // ];
  config.entry = `${wpk.entry}/babels-mlb/01_compile/${fileName.raw}`;
  // config.output.path = dir.babels.dist;
  config.output.path = `${wpk.entry}/babels-mlb/02_dest`;
  config.output.filename = fileName.bundle;
  // webpack
  return $$.webpack(config, (error, stats) => {
    if (error) {
      throw new $.util.PluginError('mlb:webpack:dev', error);
    }
    $.util.log('[mlb:webpack:dev]', stats.toString({
      colors: true,
      progress: true,
    }));
    callback();
  });
});

// webpack [BUILD]
// --------------------------------------
gulp.task('mlb:pack:build', (callback) => {
  // const config = Object.create(wpk);
  const config = Object.assign({}, wpk);
  config.plugins = [
    // remove, since webpack 2.x, @see https://webpack.js.org/guides/migrating/
    // new $$.webpack.optimize.DedupePlugin(),
    new $$.webpack.optimize.UglifyJsPlugin({ compress: { warnings: true } }),
  ];
  config.entry = `${config.entry}/babels-mlb/01_compile/${fileName.raw}`;
  config.output.path = `${wpk.entry}/babels-mlb/02_dest`;
  config.output.filename = fileName.bundle;
  // webpack
  return $$.webpack(config, (error, stats) => {
    if (error) {
      throw new $.util.PluginError('mlb:webpack:build', error);
    }
    $.util.log('[mlb:webpack:build]', stats.toString({
      colors: true,
      progress: true,
    }));
    callback();
  });
});

// copy
// --------------------------------------
gulp.task('mlb:copy', () => (
  gulp.src(
    [
      // `${dir.app.root}/**/*.bundle.js`,
      `${wpk.entry}/babels-mlb/02_dest/**/*.bundle.js`,
    ],
  )
    .pipe($.debug({ title: '[BABELS:MLB]' }))
    // .pipe(gulp.dest(dir.dist.root))
    // .pipe(gulp.dest(dir.app.js))
    .pipe(gulp.dest(`${dir.dist.assets.mlb}/js`))
    .pipe(gulp.dest(`${dir.root}/test/assets/js`))
    // .pipe(gulp.dest(`${dir.root}/app/assets/js`))
    .pipe($.size({ title: '*** mlb:copy ***' }))
  ),
);

// --------------------------------------
//  TASK > SEQUENCE
// --------------------------------------
gulp.task('mlb:dev', callback =>
  $$.runSequence(
    'mlb:lint',
    'mlb:babel',
    'mlb:pack:dev',
    'mlb:copy',
    callback,
  ),
);

gulp.task('mlb:build', callback =>
  $$.runSequence(
    'mlb:lint',
    'mlb:babel',
    'mlb:pack:build',
    'mlb:copy',
    callback,
  ),
);
