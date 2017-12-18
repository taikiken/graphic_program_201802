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
import View from '../../view/View';
// view/carousel
import { ComponentCarousel } from '../carousel/ComponentCarousel';
// view/categories
import { ComponentHeadlineOption } from './ComponentHeadlineOption';

// model
import { Model } from '../../model/Model';
import { ModelCategoriesSlug } from '../../model/categoires/ModelCategoriesSlug';

// data
import { Result } from '../../data/Result';

// dae
import { CategoriesSlugDae } from '../../dae/categories/CategoriesSlugDae';

// tick
import { Polling } from '../../tick/Polling';

// --------------------------------------------
// Sagen
const Sagen = self.Sagen;

// Gasane
// const Polling = self.Gasane.Polling;

// React
const ReactDOM = self.ReactDOM;

/**
 * カテゴリ記事一覧に「PICKUP」「HEADLINE」を表示オプション追加します
 * `ModelCategoriesSlug` で「記事カテゴリー情報」を取得し表示するか否かを決定します
 * @see https://docs.google.com/spreadsheets/d/1Vngb6I2khKtkFBezsvUy0Fc1ZofYkHDJMgD0aTIYkHw/edit#gid=848283478
 * @see https://github.com/undotsushin/undotsushin/issues/970#issuecomment-238405645
 * @since 2016-09-17
 */
export class ComponentCategoryOption extends View {
  /**
   * category slug を使用し API request を開始します
   * @param {string} [slug=all] category.slug
   */
  constructor(slug:string = 'all') {
    super(null, null);

    // const boundFail = this.fail.bind(this);
    const callback = {};
    callback[Model.COMPLETE] = this.done.bind(this);
    // callback[Model.UNDEFINED_ERROR] = boundFail;
    // callback[Model.RESPONSE_ERROR] = boundFail;

    /**
     * JSON 取得 action instance
     * @type {ModelCategoriesSlug}
     */
    this.action = new ModelCategoriesSlug(slug, callback);
    /**
     * bind 済み executeSafely
     * @type {Function}
     */
    this.boundSafety = this.executeSafely.bind(this);
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
    // console.log('ComponentCategoryOption.done', category.pickup, category.headline);

    if (category.pickup.has()) {
      this.pickup(category);
    }
    if (category.headline.has()) {
      this.headline(category);
    }
  }
  // /**
  //  * API 失敗 callback
  //  */
  // fail():void {
  //   return;
  // }
  /**
   * 記事一覧に pickup を表示します
   * @param {CategoriesSlugDae} category JSON
   */
  pickup(category:CategoriesSlugDae):void {
    const element = Dom.pickup();
    if (element === null) {
      return;
    }

    ReactDOM.render(
      <ComponentCarousel
        list={category.pickup.articles}
        callback={this.boundSafety}
        polling={new Polling(1000 * 5)}
        index={0}
        sp={Sagen.Browser.Mobile.phone()}
        home={false}
      />,
      element
    );
  }
  /**
   * 記事一覧に headline を表示します
   * @param {CategoriesSlugDae} category JSON
   */
  headline(category:CategoriesSlugDae):void {
    const element = Dom.headlineParent();
    if (element === null) {
      return;
    }

    const browser = Sagen.Browser.Mobile.phone() ? 'sp' : 'pc';
    ReactDOM.render(
      <ComponentHeadlineOption
        list={category.headline.articles}
        callback={this.boundSafety}
        home={false}
        ad={category.headline.ad}
        browser={browser}
        category={category}
      />,
      element
    );
  }
}
