/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/06/07 - 18:31
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {Model} from '../Model';
import {CategoriesSlug} from '../../action/categories/CategoriesSlug';
import {CategoriesSlugDae} from '../../dae/caegories/CategoriesSlugDae';
import {Result} from '../../data/Result';

/**
 * 記事カテゴリー情報を取得します
 *
 * @since 2016-05-28
 */
export class ModelCategoriesSlug extends Model {
  /**
   * Action class CategoriesSlug を使用し記事カテゴリー情報を取得します
   * @param {string} [slug] 取得対象 category slug
   * @param {Object} [option] callback handler
   */
  constructor( slug:string, option:Object = {} ) {
    super( option );
    /**
     * Action instance を設定します
     * @override
     * @type {CategoriesSlug}
     */
    this.action = new CategoriesSlug( slug, this.done.bind( this ), this.fail.bind( this ) );
  }
  /**
   * Ajax request を開始します
   */
  start():void {

    this.action.start();

  }
  /**
   * Ajax response success
   * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
   */
  done( result:Result ):void {

    let response = result.response;

    if ( typeof response === 'undefined' ) {

      // articles undefined
      // JSON に問題がある
      let error = new Error( '[MODEL_CATEGORIES:UNDEFINED]サーバーレスポンスに問題が発生しました。' );
      this.executeSafely( Model.UNDEFINED_ERROR, error );

    } else {

      // 成功 callback
      this.executeSafely( Model.COMPLETE, new CategoriesSlugDae( response ) );

    }

  }
  /**
   * Ajax response error
   * @param {Error} error Error instance
   */
  fail( error:Error ):void {

    this.executeSafely( Model.RESPONSE_ERROR, error );

  }
}
