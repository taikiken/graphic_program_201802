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
  `${dir.popup.src}/**/*.{js,jsx}`,
];
// console.log('files dir.dist.theme', dir.dist.theme);
const fileName = {
  raw: 'banner_popup_app.js',
  bundle: 'banner_popup_app.bundle.js',
};

// ESLintst
// --------------------------------------
gulp.task('popup:lint', () => (
  gulp.src(files)
    .pipe($.eslint({ useEslintrc: true }))
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError())
    .pipe($.size({ title: '*** popup:lint ***' }))
),
);

// babel
// --------------------------------------
gulp.task('popup:babel', () => (
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
    .pipe(gulp.dest(dir.popup.compile))
    .pipe($.size({ title: '*** popup:babel ***' }))
),
);

// webpack [DEV]
// --------------------------------------
gulp.task('popup:pack:dev', (callback) => {
  const config = Object.assign({}, wpk);
  // remove, since webpack 2.x, @see https://webpack.js.org/guides/migrating/
  // config.plugins = [
  //   new $$.webpack.optimize.DedupePlugin(),
  // ];
  config.entry = `${wpk.entry}/babels-popup/01_compile/${fileName.raw}`;
  // config.output.path = dir.babels.dist;
  config.output.path = `${wpk.entry}/babels-popup/02_dest`;
  config.output.filename = fileName.bundle;
  // webpack
  return $$.webpack(config, (error, stats) => {
    if (error) {
      throw new $.util.PluginError('popup:webpack:dev', error);
    }
    $.util.log('[popup:webpack:dev]', stats.toString({
      colors: true,
      progress: true,
    }));
    callback();
  });
});

// webpack [BUILD]
// --------------------------------------
gulp.task('popup:pack:build', (callback) => {
  // const config = Object.create(wpk);
  const config = Object.assign({}, wpk);
  config.plugins = [
    // remove, since webpack 2.x, @see https://webpack.js.org/guides/migrating/
    // new $$.webpack.optimize.DedupePlugin(),
    new $$.webpack.optimize.UglifyJsPlugin({ compress: { warnings: true } }),
    // https://facebook.github.io/react/docs/optimizing-performance.html#use-the-production-build
    new $$.webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ];
  config.entry = `${config.entry}/babels-popup/01_compile/${fileName.raw}`;
  config.output.path = `${wpk.entry}/babels-popup/02_dest`;
  config.output.filename = fileName.bundle;
  // webpack
  return $$.webpack(config, (error, stats) => {
    if (error) {
      throw new $.util.PluginError('popup:webpack:build', error);
    }
    $.util.log('[popup:webpack:build]', stats.toString({
      colors: true,
      progress: true,
    }));
    callback();
  });
});

// copy
// --------------------------------------
gulp.task('popup:copy', () => (
  gulp.src(
    [
      // `${dir.app.root}/**/*.bundle.js`,
      `${wpk.entry}/babels-popup/02_dest/**/*.bundle.js`,
    ],
  )
    .pipe($.debug({ title: '[BABELS:POPUP]' }))
    // .pipe(gulp.dest(dir.dist.root))
    // .pipe(gulp.dest(dir.app.js))
    .pipe(gulp.dest(`${dir.dist.assets.popup}/js`))
    .pipe(gulp.dest(`${dir.root}/test/assets/js`))
    // .pipe(gulp.dest(`${dir.root}/app/assets/js`))
    .pipe($.size({ title: '*** popup:copy ***' }))
),
);

// --------------------------------------
//  TASK > SEQUENCE
// --------------------------------------
gulp.task('popup:dev', callback =>
  $$.runSequence(
    'popup:lint',
    'popup:babel',
    'popup:pack:dev',
    'popup:copy',
    callback,
  ),
);

gulp.task('popup:build', callback =>
  $$.runSequence(
    'popup:lint',
    'popup:babel',
    'popup:pack:build',
    'popup:copy',
    callback,
  ),
);
