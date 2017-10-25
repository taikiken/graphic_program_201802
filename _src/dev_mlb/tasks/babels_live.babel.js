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
console.log('dir.draft.src', dir.draft.src);
const files = [
  `${dir.draft.src}/**/*.{js,jsx}`,
];
// console.log('files dir.dist.theme', dir.dist.theme);
const fileName = {
  raw: 'bull_draft_2017_live.js',
  bundle: 'bull_draft_2017_live.bundle.js',
};

// ESLintst
// --------------------------------------
gulp.task('live:lint', () => (
  gulp.src(files)
    .pipe($.eslint({ useEslintrc: true }))
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError())
    .pipe($.size({ title: '*** live:lint ***' }))
),
);

// babel
// --------------------------------------
gulp.task('live:babel', () => (
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
    .pipe(gulp.dest(dir.draft.compile))
    .pipe($.size({ title: 'live' }))
),
);

// webpack [DEV]
// --------------------------------------
gulp.task('live:pack:dev', (callback) => {
  const config = Object.assign({}, wpk);
  // remove, since webpack 2.x, @see https://webpack.js.org/guides/migrating/
  // config.plugins = [
  //   new $$.webpack.optimize.DedupePlugin(),
  // ];
  config.entry = `${wpk.entry}/babels-draft/01_compile/${fileName.raw}`;
  // config.output.path = dir.babels.dist;
  config.output.path = `${wpk.entry}/babels-draft/02_dest`;
  config.output.filename = fileName.bundle;
  // for isotope
  // @see http://isotope.metafizzy.co.s3-website-us-east-1.amazonaws.com/extras.html#webpack
  config.resolve = {
    alias: {
      masonry: 'masonry-layout',
      isotope: 'isotope-layout',
    },
  };
  // webpack
  return $$.webpack(config, (error, stats) => {
    if (error) {
      throw new $.util.PluginError('live:webpack:dev', error);
    }
    $.util.log('[live:webpack:dev]', stats.toString({
      colors: true,
      progress: true,
    }));
    callback();
  });
});

// webpack [BUILD]
// --------------------------------------
gulp.task('live:pack:build', (callback) => {
  // const config = Object.create(wpk);
  const config = Object.assign({}, wpk);
  config.plugins = [
    // remove, since webpack 2.x, @see https://webpack.js.org/guides/migrating/
    // new $$.webpack.optimize.DedupePlugin(),
    new $$.webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    // https://facebook.github.io/react/docs/optimizing-performance.html#use-the-production-build
    new $$.webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ];
  config.entry = `${config.entry}/babels-draft/01_compile/${fileName.raw}`;
  config.output.path = `${wpk.entry}/babels-draft/02_dest`;
  config.output.filename = fileName.bundle;
  // for isotope
  // @see http://isotope.metafizzy.co.s3-website-us-east-1.amazonaws.com/extras.html#webpack
  config.resolve = {
    alias: {
      masonry: 'masonry-layout',
      isotope: 'isotope-layout',
    },
  };
  // webpack
  return $$.webpack(config, (error, stats) => {
    if (error) {
      throw new $.util.PluginError('live:webpack:build', error);
    }
    $.util.log('[live:webpack:build]', stats.toString({
      colors: true,
      progress: true,
    }));
    callback();
  });
});

// copy
// --------------------------------------
gulp.task('live:copy', () => (
  gulp.src(
    [
      // `${dir.app.root}/**/*.bundle.js`,
      `${wpk.entry}/babels-draft/02_dest/**/*.bundle.js`,
    ],
  )
    // .pipe(gulp.dest(dir.dist.root))
    // .pipe(gulp.dest(dir.app.js))
    .pipe(gulp.dest(`${dir.dist.assets.draft}/js`))
    .pipe($.debug({ title: '[BABELS:live]' }))
    // .pipe(gulp.dest(`${dir.root}/test/assets/js`))
    .pipe($.debug({ title: '[BABELS:live]' }))
    .pipe(gulp.dest('../app/assets/draft/js'))
    .pipe($.debug({ title: '[BABELS:live]' }))
    .pipe($.size({ title: '*** live:copy ***' }))
),
);

// --------------------------------------
//  TASK > SEQUENCE
// --------------------------------------
gulp.task('live:dev', callback =>
  $$.runSequence(
    'live:lint',
    'live:babel',
    'live:pack:dev',
    'live:copy',
    callback,
  ),
);

gulp.task('live:build', callback =>
  $$.runSequence(
    'live:lint',
    'live:babel',
    'live:pack:build',
    'live:copy',
    callback,
  ),
);
