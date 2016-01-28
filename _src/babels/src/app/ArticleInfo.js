/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/28 - 18:44
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {ArticleDae} from '../dae/ArticleDae';

let _symbol = Symbol();
let _article;

/**
 * <h3>articles の個別記事詳細情報</h3>
 * 全てstaticです<br>
 * **Singleton**
 * <p>
 * ArticleDae を保持します。
 * </p>
 */
export class ArticleInfo {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target:Symbol ) {

    if ( _symbol !== target ) {

      throw new Error( `Article is static Class. not use new Article().` );

    }

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * 現在表示の記事詳細情報
   * @return {ArticleDae} 現在表示の記事詳細情報 ArticleDae instance を返します
   */
  static get dae():ArticleDae {
    return _article;
  }

  /**
   * @param {ArticleDae} article 現在表示の記事詳細情報 ArticleDae instance
   */
  static set dae( article:ArticleDae ):void {
    _article = article;
  }
}
