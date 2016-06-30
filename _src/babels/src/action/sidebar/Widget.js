/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/17 - 17:16
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */



import {Ranking} from '../archive/Ranking';
import {Videos} from '../archive/Videos';
import {Length} from '../../app/const/Length';
import {Safety} from '../../data/Safety';

let _symbol = Symbol();

/**
 * <p>Sidebar, ranking / video 一覧表示</p>
 * <p>全て static</p>
 * <p>{@link Ranking}, {@link Videos} インスタンスを作成します</p>
 *
 * @example
 * // ranking instance
 * let ranking = Widget.ranking();
 * // video instance
 * let video = Widget.video();
 */
export class Widget {
  /**
   * static class です、instance を作成できません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {

    if ( _symbol !== target ) {

      throw new Error( 'Widget is not new Widget().' );

    }

  }
  /**
   * Ranking instance を作成し length を 5にセットします
   * @param {string} [slug=all] category slug です
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @param {Number} [length=Length.ranking] 読み込む length
   * @return {Ranking} Ranking instance を返します
   */
  static ranking( slug:string = 'all', resolve:Function = null, reject:Function = null, length:Number = Length.ranking ):Ranking {

    slug = Safety.string( slug, 'all' );
    length = Safety.integer( length, Length.ranking );

    let rankings = new Ranking( slug, resolve, reject );
    rankings.length = length;
    return rankings;

  }
  /**
   * Videos instance を作成し length を 5にセットします
   * @param {string} [slug=all] category slug です
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @param {Number} [length=Length.ranking] 読み込む length
   * @return {Videos} Videos instance を返します
   */
  static video( slug:string = 'all', resolve:Function = null, reject:Function = null, length:Number = Length.video ):Videos {

    slug = Safety.string( slug, 'all' );
    length = Safety.integer( length, Length.video );

    let videos = new Videos( slug, resolve, reject );
    videos.length = length;
    return videos;

  }
}
