/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/04 - 12:39
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// action
import {Category} from '../action/archive/Category';
import {CategoryAuth} from '../action/archive/CategoryAuth';
// view
import {ViewArchiveMasonry} from './ViewArchiveMasonry';
// app
import {User} from '../app/User';

// // dae
// import {ArticleDae} from '../dae/ArticleDae';
//
// // ga
// import {GaData} from '../ga/GaData';
// import {Ga} from '../ga/Ga';

/**
 * category 一覧表示
 */
export class ViewCategory extends ViewArchiveMasonry {
  /**
   * category 一覧表示 要 **slug**
   * @param {string} slug category slug, default 'all'
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {Object} [option={}] optional event handler
   */
  constructor( slug:string, element:Element, moreElement:Element, option:Object = {} ) {
    super( element, moreElement, null, option, true );
    // Category Action を使う
    // slug を送り 表示(render)は ViewArchiveMasonry を使う
    this.action = User.sign ?
      new CategoryAuth( slug, '', this.done.bind( this ), this.fail.bind( this ) ) :
      new Category( slug, '', this.done.bind( this ), this.fail.bind( this ) );

    this.slug = slug;
  }

  // /**
  //  * <p>render 実施後呼び出されます</p>
  //  * Ga するために使用します
  //  * <p>記事詳細での提供元&カテゴリートラッキング</p>
  //  * https://github.com/undotsushin/undotsushin/issues/744
  //  *
  //  * <pre>
  //  * 対象スクリーン：/p/ [ 記事ID ]
  //  * イベントカテゴリ : category
  //  * イベントアクション：view
  //  * イベントラベル：[response.categories.label] ex. 海外サッカー
  //  * </pre>
  //  */
  // postRender():void {
  //   // 送信済みフラッグチェック
  //   if ( this.gaSend ) {
  //     return;
  //   }
  //   // 送信済みフラッグオン
  //   this.gaSend = true;
  //
  //   const articles:Array<ArticleDae> = this.articlesList;
  //   const article:ArticleDae = articles[ 0 ];
  //   const categories = article.categories;
  //
  //   // categories 配列チェック
  //   if ( !Array.isArray( categories ) ) {
  //     return;
  //   }
  //
  //   const category = 'category';
  //   const action = 'view';
  //
  //   categories.map( (value:string) => {
  //     const gaData = new GaData( category, action, value );
  //     Ga.add( gaData );
  //   } );
  //
  // }
}
