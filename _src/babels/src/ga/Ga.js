/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/04/13 - 12:22
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {Env} from '../app/Env';
import {GaData} from './GaData';

/**
 * 送信データをストックします<br>
 * `ga` 存在が確認できたら順に送信を開始します
 * @type {Array<GaData>}
 * @private
 */
const _requests:Array<GaData> = [];
/**
 * 記事 ID 事に ga data をまとめます
 * @type {{}}
 * @private
 */
const _tardy = {};

/**
 * ga: イベント トラッキング
 *
 * @see https://docs.google.com/spreadsheets/d/19TcKHx0FFE7iN2JQ9R7a5GVK9HxCTfhPP2ij_NywZ7w/edit#gid=1062313071
 * @see https://developers.google.com/analytics/devguides/collection/analyticsjs/events?hl=ja#implementation
 */
export class Ga {
  /**
   * ga 遅延実行 する場合は instance を作成します
   * @param {ga} ga ga object
   * @param {Array<GaData>} arr GaData セット配列
   * @param {boolean} production false 時に開発log出力します
   * @since 20161-11-14
   */
  constructor(ga, arr, production) {
    // console.log('constructor', arr);
    /**
     * ga object
     * @type {ga}
     */
    this.ga = ga;
    /**
     * GaData セット配列
     * @type {Array.<GaData>}
     */
    this.arr = arr;
    /**
     * production / develop flag
     * @type {boolean}
     */
    this.production = production;
    /**
     * timeout id
     * @type {number}
     */
    this.timer = 0;
  }
  /**
   * ga 送信を行います
   * @since 20161-11-14
   */
  tracking() {
    const arr = this.arr;
    while(arr.length > 0) {
      const data = arr.shift();
      Ga.tracking(this.ga, data);
      if (!this.production) {
        console.warn(`${data.method}: ga, send, `, data);
      }
    }
    // console.log('=======================', Date.now());
  }
  /**
   * timer を使い遅延実行します
   * @param {number} [delay=2000] 遅延ms
   * @since 20161-11-14
   */
  delayTrack(delay = 1000 * 2) {
    // console.log('----------------------', Date.now());
    this.timer = setTimeout(() => {
      this.tracking();
    }, delay);
  }
  /**
   * 遅延実行をキャンセルします
   */
  clearTrack() {
    clearTimeout(this.timer);
  }
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * 記事詳細・次の記事一覧 インビューイベント hitType
   * @const PAGEVIEW
   * @return {string} 'pageview' を返します
   */
  static get PAGEVIEW():string {
    return 'pageview';
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * <p>外部からトラッキングコード送信ができるようにします</p>
   * <p>GA / CRAZY系コンテンツ用トラッキングを追加 - バナー & 動画 / Web版 #842</p>
   * @since 2016-06-22
   * @param {string} method 発生場所（関数名）
   * @param {string} category 必須 通常は接点に使用されたオブジェクト（例: Video）
   * @param {string} action 必須 接点の種類（例: play）
   * @param {string} label イベントの分類に便利です（例: Fall Campaign）
   * @param {Boolean} [eventInteraction=false] オプション イベントをインタラクション以外のイベントとして送信できます。その場合、nonInteraction フィールドを true に指定します（send コマンドの fieldsObject を使用）
   */
  static click( method:string, category:string, action:string, label:string, eventInteraction:Boolean = false ):void {
    // ----------------------------------------------
    // GA 計測タグ
    Ga.add( new GaData( method, category, action, label, 0, eventInteraction ) );
    // ----------------------------------------------
  }
  /**
   * 送信予約
   * @param {GaData} data 送信するデータ
   */
  static add( data:GaData ):void {
    _requests.push( data );
    Ga.send();
  }
  /**
   * 送信予約を記事詳細・次の記事一覧の ga 送信を記事ID別に delay させます
   * @see https://github.com/undotsushin/undotsushin/issues/1274
   * @param {number} id article ID
   * @param {GaData} data GaData instance, 送信するデータ
   * @since 2016-11-14
   */
  static addTardy(id, data) {
    if (Object.keys(_tardy).indexOf(id) === -1) {
      _tardy[id] = [];
    }
    _tardy[id].push(data);
    Ga.send();
  }
  /**
   * 記事詳細・次の記事一覧・インビュー 送信予約
   * @param {number} id 記事 ID
   * @param {string} method 発生場所(関数)
   * @param {boolean} [delay=false] 遅延実行フラッグ, true の時は tardy へ `queue` 追加します <- 2016-11-14
   */
  static addPage(id, method, delay = false):void {
    const data = new GaData(method);
    data.hitType = Ga.PAGEVIEW;
    data.setPage(id);
    if (!delay) {
      Ga.add(data);
    } else {
      Ga.addTardy(id, data);
    }
  }
  /**
   * 送信実行
   * global object `ga` 存在をチェックし送信する
   */
  static send():void {
    // ga 存在チェック
    let ga = self.ga;
    if ( typeof ga === 'undefined' ) {
      // ga undefined
      setTimeout( Ga.send, 25 );
      return;
    }

    // // log を出力するかを選択する
    // if (Env.mode === Env.PRODUCTION) {
    //   Ga.production(ga);
    // } else {
    //   Ga.develop(ga);
    // }
    const production = Env.mode === Env.PRODUCTION;
    while(_requests.length > 0) {
      // @type {GaData}
      const data = _requests.shift();
      Ga.tracking(ga, data);
      if (!production) {
        console.warn(`${data.method}: ga, send, `, data);
      }
    }
    // 遅延実行
    // @since 2016-11-14
    const tardy = Object.keys(_tardy);
    while(tardy.length > 0) {
      const id = tardy.shift();
      const arr = _tardy[id];
      if (arr.length > 0) {
        // console.log('id', _tardy, id, arr);
        const instance = new Ga(ga, arr, production);
        instance.delayTrack();
      }
    }
  }
  // /**
  //  * 本番（ログなし）
  //  * @param {Function} ga ga関数
  //  */
  // static production( ga:Function ):void {
  //   // _requests 内のデータがなくなるまで実行する
  //   while( _requests.length > 0 ) {
  //     let data:GaData = _requests.shift();
  //     // ga( 'send', 'event', data.eventCategory, data.eventAction, data.eventLabel, data.eventValue );
  //     Ga.tracking( ga, data );
  //   }
  // }
  // /**
  //  * 開発（ログあり）
  //  * @param {Function} ga ga関数
  //  */
  // static develop( ga:Function ):void {
  //   // _requests 内のデータがなくなるまで実行する
  //   while( _requests.length > 0 ) {
  //     let data:GaData = _requests.shift();
  //     // ga( 'send', 'event', data.eventCategory, data.eventAction, data.eventLabel, data.eventValue );
  //     Ga.tracking( ga, data );
  //     console.log( `${data.method}: ga, send, `, data);
  //   }
  // }
  /**
   * ga 関数を実行し tracking を行います
   * @since 2016-07-04
   * @param {Function} ga Google.ga
   * @param {GaData} data 送信する GaData Object
   * @return {*} ga 戻り値を返します
   */
  static tracking( ga:Function, data:GaData ):void {
    if (data.page !== null) {
      return Ga.page(ga, data);
    }
    if ( data.eventInteraction ) {
      return ga( 'send', data.hitType, data.eventCategory, data.eventAction, data.eventLabel, data.eventValue, GaData.nonInteraction() );
    }

    return ga( 'send', data.hitType, data.eventCategory, data.eventAction, data.eventLabel, data.eventValue );
  }
  /**
   * Web版記事詳細無限スクロールに `hitType: 'pageview'` 追加送信
   *
   * @see https://github.com/undotsushin/undotsushin/issues/1151
   * @param {Function} ga Google.ga
   * @param {GaData} data 送信する GaData Object
   * @return {*} ga 戻り値を返します
   * @since 2016-10-05
   */
  static page(ga:Function, data:GaData) {
    return ga('send', { hitType: data.hitType, page: data.page });
  }
  /**
   * <p>記事詳細での提供元&カテゴリートラッキング</p>
   * https://github.com/undotsushin/undotsushin/issues/744
   *
   * <pre>
   * 対象スクリーン：/p/ [ 記事ID ]
   * イベントカテゴリ : provider
   * イベントアクション：view
   * イベントラベル：[response.user.name]
   *  APIの response.user.name ex. 運動通信編集部 を設定
   * </pre>
   *
   * <pre>
   * 対象スクリーン：/p/ [ 記事ID ]
   * イベントカテゴリ : category
   * イベントアクション：view
   * イベントラベル：[response.categories.label] ex. 海外サッカー
   * </pre>
   *
   * @param {SingleDae} single API 取得 JSON.response を SingleDae instance に変換したもの
   * @param {string} method 発生場所関数名
   * @param {boolean} [delay=false] 遅延実行フラッグ, true の時は tardy へ `queue` 追加します <- 2016-11-14
   * @since 2016-10-05 ViewSingle から移動
   */
  static single(single, method = 'Ga.single', delay = false):void {
    let category = 'provider';
    const action = 'view';
    const label = single.user.userName;
    // const method = 'Ga.single';

    // ----------------------------------------------
    // GA 計測タグ
    // 記事詳細の提供元のアクセス数を測定する
    Ga.add(new GaData(method, category, action, label, 0, true));
    // ----------------------------------------------

    // category label 送信
    // @type {CategoriesDae}
    const categories = single.categories;

    category = 'category';
    categories.all.map((value) => {
      // @type {SlugDae} - value
      if (!delay) {
        // ----------------------------------------------
        // GA 計測タグ
        // 記事カテゴリーのアクセス数を測定する
        Ga.add(new GaData(method, category, action, value.label, 0, true));
        // ----------------------------------------------
      } else {
        Ga.addTardy(single.id, new GaData(method, category, action, value.label, 0, true));
      }
    });
  }
}
