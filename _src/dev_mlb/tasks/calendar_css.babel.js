/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/14 - 17:58
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * react-big-calendar css をコピーします
 */

import { module } from '../gulp_setting.babel';

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

const dir = module.dir;

// --------------------------------------
//  TASK
// --------------------------------------
gulp.task('calendar:css', () =>
  gulp.src(
    [
      `${dir.app.root}/node_modules/react-big-calendar/lib/css/react-big-calendar.css`,
    ],
  )
    .pipe($.debug({ title: 'CALENDER' }))
    .pipe($.if(module.compress.css, $.cssnano({ zindex: false })))
    .pipe(gulp.dest(`${dir.dist.assets.mlb}/css`))
    .pipe(gulp.dest(`${dir.root}/test/assets/css`))
    .pipe(gulp.dest(`${dir.root}/app/assets/css`))
    .pipe($.size({ title: '*** calendar:css ***' })),
);
