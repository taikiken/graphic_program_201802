/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/19 - 18:42
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import { Dom } from '../../app/Dom';

// view
import { ViewCarousel } from '../carousel/ViewCarousel';

// model
import { Model } from '../../model/Model';
import { ModelCategoriesSlug } from '../../model/categoires/ModelCategoriesSlug';

// data
import { Result } from '../../data/Result';

// dae
import { CategoriesSlugDae } from '../../dae/caegories/CategoriesSlugDae';

// --------------------------------------------
// Sagen
const Sagen = self.Sagen;

// Gasane
const Polling = self.Gasane.Polling;

// React
const ReactDOM = self.ReactDOM;

/**
 * カテゴリ記事一覧に「PICKUP」「HEADLINE」を表示オプション追加します
 * `ModelCategoriesSlug` で「記事カテゴリー情報」を取得し表示するか否かを決定します
 * @see https://docs.google.com/spreadsheets/d/1Vngb6I2khKtkFBezsvUy0Fc1ZofYkHDJMgD0aTIYkHw/edit#gid=848283478
 * @see https://github.com/undotsushin/undotsushin/issues/970#issuecomment-238405645
 * @since 2016-09-17
 */
export class ViewCategoryOption {
  /**
   * category slug を使用し API request を開始します
   * @param {string} [slug=all] category.slug
   */
  constructor(slug:string = 'all') {
    const boundFail = this.fail.bind(this);
    const callback = {};
    callback[Model.COMPLETE] = this.done.bind(this);
    callback[Model.UNDEFINED_ERROR] = boundFail;
    callback[Model.RESPONSE_ERROR] = boundFail;

    this.action = new ModelCategoriesSlug(slug, callback);
  }
  /**
   * request を開始します
   */
  start():void {
    this.action.start();
  }
  /**
   * API 成功 callback
   * @param {Result} result JSON Result instance
   */
  done(result:Result):void {
    const response = result.response;
    if (typeof response === 'undefined' || response === null) {
      return;
    }

    const category = new CategoriesSlugDae(response);
    if (category.pickup.has()) {
      this.pickup(category);
    }
    if (category.headline.has()) {
      this.headline(category);
    }
  }
  /**
   * API 失敗 callback
   */
  fail():void {
    return;
  }
  pickup(category:CategoriesSlugDae):void {
    const element = Dom.pickup();
    if (element === null) {
      return;
    }

    ReactDOM.render(
      <ViewCarousel
        list={category.pickup.articles}
        callback={this.safety.bind(this)}
        polling={new Polling(1000 * 5)}
        index={0}
        sp={Sagen.Browser.Mobile.phone()}
        home={false}
      />,
      element
    );
  }
  headline(category:CategoriesSlugDae):void {
    const element = Dom.headline();
    if (element === null) {
      return;
    }

    ReactDOM.render(
      <ViewCarousel
        list={category.pickup.articles}
        callback={this.safety.bind(this)}
        polling={new Polling(1000 * 5)}
        index={0}
        sp={Sagen.Browser.Mobile.phone()}
        home={false}
      />,
      element
    );
  }
  safety() {}
}
