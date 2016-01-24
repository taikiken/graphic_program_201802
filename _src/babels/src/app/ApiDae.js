/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/12 - 21:26
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {Env} from './Env';
import {Types} from '../net/Types';
import {Type} from '../net/types/Type';
import {Permalink} from '../net/types/Permalink';
import {Queries} from '../net/types/Queries';
import {Query} from '../net/types/Query';
import {CommentType} from '../net/types/CommentType';
import {Loc} from '../util/Loc';

// test mode 時に api アクセス先を 0.0.0.0: + (port +2) へ
// develop mode
// - IP: 52.69.203.137
// - HOST: undotsushin.com
let apiRoot = ( port:string ) => {

  let n = parseInt( port, 10 );

  switch ( Env.mode ) {

    case Env.TEST :
      return `http://0.0.0.0:${n + 2}`;

    case Env.DEVELOP :
      return 'http://undotsushin.com';

    case Env.PRODUCTION :
      return '';

    default :
      console.warn( `illegal option: ${Env.mode}. instead use production.` );
      return '';

  }

};

let buildPath = () => {
  let API_PATH = apiRoot( Loc.port ) + '/api/v1';

  return {
    'login': new Types(
      new Type( `${API_PATH}/oauth/token`, 'POST' ),
      new Permalink(),
      new Queries()
    ),
    // home / self
    'home': new Types(
      new Type( `${API_PATH}/articles/home` ),
      new Permalink( [ 'pickup', 'headline' ] ),
      new Queries( [ new Query( 'offset', 'number', 0 ), new Query( 'length', 'number', 10 ) ] )
    ),
    'self': new Types(
      new Type( `${API_PATH}/articles/self` ),
      new Permalink( [ 'pickup', 'headline' ] ),
      new Queries( [ new Query( 'offset', 'number', 0 ), new Query( 'length', 'number', 10 ) ] ),
      true
    ),
    // 記事一覧
    'category': new Types(
      new Type( `${API_PATH}/articles/category/` ),
      new Permalink( [ 'all', '*' ], true ),
      new Queries( [ new Query( 'offset', 'number', 0 ), new Query( 'length', 'number', 10 ) ] )
    ),
    // 検索
    'search': new Types(
      new Type( `${API_PATH}/articles/search/` ),
      new Permalink( [ '*' ], true ),
      new Queries( [ new Query( 'offset', 'number', 0 ), new Query( 'length', 'number', 10 ) ] )
    ),
    // 詳細
    'detail': new Types(
      new Type( `${API_PATH}/articles/` ),
      new Permalink( [ '*' ], true ),
      new Queries()
    ),
    // 'bookmark': new Types(
    //  new Type( `${API_PATH}/articles/bookmark`, 'POST|DELETE' ),
    //  new Permalink( [ '*' ], true ),
    //  new Queries(),
    //  true
    // ),
    // ブックマーク 登録
    'bookmark:add': new Types(
      new Type( `${API_PATH}/articles/bookmark`, 'POST' ),
      new Permalink( [ '*' ], true ),
      new Queries(),
      true
    ),
    // ブックマーク 削除
    'bookmark:delete': new Types(
      new Type( `${API_PATH}/articles/bookmark`, 'DELETE' ),
      new Permalink( [ '*' ], true ),
      new Queries(),
      true
    ),
    // 記事詳細でのコメント一覧表示
    'comment': new Types(
      new Type( `${API_PATH}/comments/article/` ),
      new Permalink( [ '*' ], true ),
      new Queries( [ new CommentType( 'normal|official|self' ), new Query( 'offset', 'number', 0 ), new Query( 'length', 'number', 10 ) ] )
    ),
    // 記事へのコメント
    'comment:send': new Types(
      new Type( `${API_PATH}/comments/article/`, 'POST' ),
      new Permalink( [ '*' ], true ),
      new Queries( [ new Query( 'body', 'number', '', true ) ] ),
      true
    ),
    // コメント返信
    'comment:reply': new Types(
      new Type( `${API_PATH}/comments/article/`, 'POST' ),
      new Permalink( [ '*/*' ], true ),
      new Queries( [ new Query( 'body', 'number', '', true ) ] ),
      true
    ),
    // 記事へのコメント編集
    'comment:send:edit': new Types(
      new Type( `${API_PATH}/comments/article/`, 'PUT' ),
      new Permalink( [ '*/*' ], true ),
      new Queries(),
      true
    ),
    // コメント返信コメント編集
    'comment:reply:edit': new Types(
      new Type( `${API_PATH}/comments/article/`, 'PUT' ),
      new Permalink( [ '*/*/*' ], true ),
      new Queries(),
      true
    ),
    // 記事へのコメント 削除
    'comment:send:delete': new Types(
      new Type( `${API_PATH}/comments/article/`, 'DELETE' ),
      new Permalink( [ '*/*' ], true ),
      new Queries(),
      true
    ),
    // コメント返信コメント 削除
    'comment:reply:delete': new Types(
      new Type( `${API_PATH}/comments/article/`, 'DELETE' ),
      new Permalink( [ '*/*/*' ], true ),
      new Queries(),
      true
    ),
    // コメントGood 追加
    'comment:good:add': new Types(
      new Type( `${API_PATH}/comments/like/`, 'POST' ),
      new Permalink( [ '*' ], true ),
      new Queries(),
      true
    ),
    // コメントGood 削除
    'comment:good:delete': new Types(
      new Type( `${API_PATH}/comments/like/`, 'DELETE' ),
      new Permalink( [ '*' ], true ),
      new Queries(),
      true
    ),
    // コメントBad 追加
    'comment:bad:add': new Types(
      new Type( `${API_PATH}/comments/bad/`, 'POST' ),
      new Permalink( [ '*' ], true ),
      new Queries(),
      true
    ),
    // コメントBad 削除
    'comment:bad:delete': new Types(
      new Type( `${API_PATH}/comments/bad/`, 'DELETE' ),
      new Permalink( [ '*' ], true ),
      new Queries(),
      true
    ),
    // お知らせ
    'users:notice': new Types(
      new Type( `${API_PATH}/users/USER_ID/notifications/` ),
      new Permalink(),
      new Queries(),
      true
    ),
    // お知らせ 既読
    'users:notice:read': new Types(
      new Type( `${API_PATH}/users/USER_ID/notifications/read`, 'POST' ),
      new Permalink(),
      new Queries(),
      true
    ),
    // ユーザー詳細
    'users': new Types(
      new Type( `${API_PATH}/users/USER_ID` ),
      new Permalink(),
      new Queries()
    ),
    // ユーザーページのブックマーク一覧
    'users:bookmark': new Types(
      new Type( `${API_PATH}/users/USER_ID/bookmark` ),
      new Permalink(),
      new Queries( [ new Query( 'offset', 'number', 0 ), new Query( 'length', 'number', 10 ) ] )
    ),
    // マイページの自分のアクティビティ一覧
    'users:activity': new Types(
      new Type( `${API_PATH}/users/USER_ID/activity`),
      new Permalink(),
      new Queries( [ new Query( 'offset', 'number', 0 ), new Query( 'length', 'number', 10 ) ] ),
      true
    )
  };
};

let _symbol = Symbol();
let _api = buildPath();

/**
 * <h3>Api 詳細情報</h3>
 * 全てstaticです
 * <hr>
 *  <code>/net/Api</code> が呼び出します。<br>
 *  直接呼び出し使うことは想定されていません。
 *  <p><code>ApiDae.someMethod</code> を実行しなくてはいけない時は関数設計を見直した方が良いでしょう</p>
 */
export class ApiDae {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target:Symbol ) {

    if ( _symbol !== target ) {

      throw new Error( `ApiDae is static Class. not use new ApiDae().` );

    }

  }
  /**
   * <p>/api/ 前 domain を再生成します<br>
   * develop, production 切り替えに使用します</p>
   * <p>**注意** 変更の必要がある時は
   * <code>App.develop(), App.production()</code>
   * を使用してください</p>
   */
  static rebuild():void {
    _api = buildPath();
  }
  /**
   * api list を取得します
   * @return {Object} 全ての API list を返します
   */
  static all():Object {

    return _api;

  }
  /**
   * 指定キー情報を取得します
   * @param {string} key api key を指定します
   * @return {Types} key に基づいた Types instance を返します
   */
  static api( key:string ):Types {

    return _api[ key ];

  }
}
