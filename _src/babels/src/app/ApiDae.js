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
import {Path} from './const/Path';
import {Types} from '../net/Types';
import {Type} from '../net/types/Type';
import {Permalink} from '../net/types/Permalink';
import {Queries} from '../net/types/Queries';
import {Query} from '../net/types/Query';
// import {Loc} from '../util/Loc';

// test mode 時に api アクセス先を 0.0.0.0: + (port +2) へ
// develop mode
// - IP: 52.69.203.137
// - HOST: undotsushin.com
let apiRoot = () => {

  // let n = parseInt( port, 10 );

  switch ( Env.mode ) {

    case Env.LOCAL :
      return `http://192.168.33.50`;

    case Env.TEST :
      return `http://www.undotsushin.local`;

    case Env.DEVELOP :
      return 'http://www.undotsushin.com';

    // online
    case Env.PRODUCTION :
      return '';

    // online
    case Env.DEV :
      return '';

    // online
    case Env.STG :
      return '';

    default :
      console.warn( `illegal option: ${Env.mode}. instead use production.` );
      return '';

  }

};
// https://docs.google.com/spreadsheets/d/1Vngb6I2khKtkFBezsvUy0Fc1ZofYkHDJMgD0aTIYkHw/edit#gid=986840481
// API 一覧より
let buildPath = () => {
  // 共通パス
  // 先頭 protocol + host 部分を develop / production で変える
  let API_ROOT = apiRoot();
  let API_PATH = API_ROOT + '/api/v1';

  return {
    // --------------------------------------------
    // 登録
    'users:add': new Types(
      new Type( `${API_PATH}/users/`, 'POST' ),
      new Permalink(),
      new Queries()
    ),
    // login / logout
    'users:login': new Types(
      new Type( `${API_PATH}/sessions/`, 'POST' ),
      new Permalink(),
      new Queries()
    ),
    'users:logout': new Types(
      new Type( `${API_PATH}/sessions/`, 'DELETE' ),
      new Permalink(),
      new Queries()
    ),

    // email 登録済み? を調べる
    'users:email': new Types(
      new Type( `${API_PATH}/users/email/`, 'POST' ),
      new Permalink(),
      new Queries()
    ),

    // ----------------------------------
    // OAuth (sns)

    // login by SNS
    // API から auth 情報を取得する
    'auth:sns': new Types(
      new Type( `${API_PATH}/sessions/social` ),
      new Permalink(),
      new Queries()
    ),

    // https://github.com/undotsushin/undotsushin/issues/334#issuecomment-197198817
    // 登録 by sns - Facebook
    // auth 遷移するURL
    'auth:fb': new Types(
      new Type( `${API_ROOT}/api/v1/auth/facebook` ),
      /*
      new Type( `${API_ROOT}/api/auth_facebook.php` ),
      new Type( `http://www.undotsushin.com/api/auth_facebook.php` ),
      */
      new Permalink(),
      new Queries()
    ),
    // 登録 by sns - Twitter
    'auth:tw': new Types(
      new Type( `${API_ROOT}/api/v1/auth/twitter` ),
      /*
      new Type( `${API_ROOT}/api/v1/auth/twitter` ),
      new Type( `http://www.undotsushin.com/api/auth_twitter.php` ),
      */
      new Permalink(),
      new Queries()
    ),

    // --------------------------------------------
    // カテゴリー一覧
    'categories': new Types(
      new Type( `${API_PATH}/category` ),
      new Permalink(),
      new Queries()
    ),
    // --------------------------------------------
    // home / self
    // /api/v1/articles/home[/|/pickup|/headline]
    'home': new Types(
      new Type( `${API_PATH}/articles/home` ),
      new Permalink( [ 'pickup', 'headline' ] ),
      new Queries( [ new Query( 'offset', 'number', 0 ), new Query( 'length', 'Number', 10 ) ] )
    ),
    'self': new Types(
      new Type( `${API_PATH}/articles/self` ),
      new Permalink( [ 'pickup', 'headline' ] ),
      new Queries( [ new Query( 'offset', 'number', 0 ), new Query( 'length', 'number', 10 ) ] ),
      true
    ),
    // --------------------------------------------
    // 記事一覧
    // /api/v1/articles/category/{all|:category_slug}[/|/ranking|/video]
    'category': new Types(
      new Type( `${API_PATH}/articles/category` ),
      new Permalink( [ 'all', '*' ], true ),
      new Queries( [ new Query( 'offset', 'number', 0 ), new Query( 'length', 'Number', 10 ) ] )
    ),
    // --------------------------------------------
    // 検索
    // /api/vi/articles/search/{:keywords}
    'search': new Types(
      new Type( `${API_PATH}/articles/search` ),
      new Permalink( [ '*' ], true ),
      new Queries( [ new Query( 'offset', 'number', 0 ), new Query( 'length', 'Number', 10 ) ] )
    ),
    // --------------------------------------------
    // 記事詳細
    // /api/v1/articles/{:article_id}
    'single': new Types(
      new Type( `${API_PATH}/articles/${Path.ARTICLE_ID}` ),
      new Permalink( [ '*' ], true ),
      new Queries()
    ),
    // --------------------------------------------
    // ブックマーク 登録
    // /api/v1/articles/{:article_id}/bookmark
    'bookmark:add': new Types(
      new Type( `${API_PATH}/articles/ARTICLE_ID/bookmark`, 'PUT' ),
      new Permalink( [ '*' ], true ),
      new Queries(),
      true
    ),
    // ブックマーク 削除
    'bookmark:delete': new Types(
      new Type( `${API_PATH}/articles/ARTICLE_ID/bookmark`, 'DELETE' ),
      new Permalink( [ '*' ], true ),
      new Queries(),
      true
    ),
    // --------------------------------------------
    // コメント取得
    // --------------------------------------------
    // 記事へのすべてのコメントを人気順で取得する
    // /api/v1/comments/article/{:article_id}
    'comment': new Types(
      new Type( `${API_PATH}/comments/article/${Path.ARTICLE_ID}` ),
      new Permalink( [ '*' ], true ),
      new Queries( [ new Query( 'offset', 'number', 0 ), new Query( 'length', 'Number', 10 ) ] )
    ),
    // 記事への公式コメントを人気順で取得する
    // /api/v1/comments/article/{:article_id}/official
    'comment:official': new Types(
      new Type( `${API_PATH}/comments/article/${Path.ARTICLE_ID}/official` ),
      new Permalink( [ '*' ], true ),
      new Queries( [ new Query( 'offset', 'number', 0 ), new Query( 'length', 'Number', 10 ) ] )
    ),
    // 記事へのみんなのコメントを人気順で取得する
    // /api/v1/comments/article/{:article_id}/normal
    'comment:normal': new Types(
      new Type( `${API_PATH}/comments/article/${Path.ARTICLE_ID}/normal` ),
      new Permalink( [ '*' ], true ),
      new Queries( [ new Query( 'offset', 'number', 0 ), new Query( 'length', 'Number', 10 ) ] )
    ),
    // 自分のコメントを取得する
    // /api/v1/comments/article/{:article_id}/self
    'comment:self': new Types(
      new Type( `${API_PATH}/comments/article/${Path.ARTICLE_ID}/self` ),
      new Permalink( [ '*' ], true ),
      new Queries( [ new Query( 'offset', 'number', 0 ), new Query( 'length', 'Number', 10 ) ] )
    ),
    // 特定のコメントを取得する
    // /api/v1/comments/article/{:article_id}/{:comment_id}
    'comment:single': new Types(
      new Type( `${API_PATH}/comments/article/${Path.ARTICLE_ID}/${Path.COMMENT_ID}` ),
      new Permalink( [ '*' ], true ),
      new Queries()
    ),
    // --------------------------------------------
    // コメント操作
    // --------------------------------------------
    // 記事へのコメント
    // /api/v1/comments/article/{:article_id}
    'comment:send': new Types(
      new Type( `${API_PATH}/comments/article/${Path.ARTICLE_ID}`, 'POST' ),
      new Permalink( [ '*' ], true ),
      new Queries( [] ),
      true
    ),
    // コメント返信
    // /api/v1/comments/article/{:article_id}/{:comment_id}
    'comment:reply': new Types(
      new Type( `${API_PATH}/comments/article/${Path.ARTICLE_ID}/${Path.COMMENT_ID}`, 'POST' ),
      new Permalink( [ '*' ], true ),
      new Queries( [ new Query( 'body', 'number', '', true ) ] ),
      true
    ),
    // コメント返信
    // /api/v1/comments/article/{:article_id}/{:comment_id}
    'comment:reply:reply': new Types(
      new Type( `${API_PATH}/comments/article/${Path.ARTICLE_ID}/${Path.COMMENT_ID}/${Path.REPLY_ID}`, 'POST' ),
      new Permalink( [ '*' ], true ),
      new Queries( [ new Query( 'body', 'number', '', true ) ] ),
      true
    ),
/*
初期要件からはずれました。
    // 記事へのコメント編集
    'comment:send:edit': new Types(
      new Type( `${API_PATH}/comments/article`, 'PUT' ),
      new Permalink( [ '' ], true ),
      new Queries(),
      true
    ),
    // コメント返信コメント編集
    'comment:reply:edit': new Types(
      new Type( `${API_PATH}/comments/article`, 'PUT' ),
      new Permalink( [ '' ], true ),
      new Queries(),
      true
    ),
*/
    // 記事へのコメント 削除
    // /api/v1/comments/article/{:article_id}/{:commend_id}
    'comment:send:delete': new Types(
      new Type( `${API_PATH}/comments/article/${Path.ARTICLE_ID}/${Path.COMMENT_ID}`, 'DELETE' ),
      new Permalink( [ '*' ], true ),
      new Queries(),
      true
    ),
    // コメント返信コメント 削除
    // /api/v1/comments/article/{:article_id}/{:commend_id}/{:reply_id}
    'comment:reply:delete': new Types(
      new Type( `${API_PATH}/comments/article/${Path.ARTICLE_ID}/${Path.COMMENT_ID}/${Path.REPLY_ID}`, 'DELETE' ),
      new Permalink( [ '*' ], true ),
      new Queries(),
      true
    ),
    // --------------------------------------------
    // コメント good / bad
    // --------------------------------------------
    // コメントGood 追加
    // /api/v1/comments/like/{:comment_id}
    'comment:good:add': new Types(
      new Type( `${API_PATH}/comments/like/${Path.COMMENT_ID}`, 'PUT' ),
      new Permalink( [ '*' ], true ),
      new Queries(),
      true
    ),
    // コメントGood 削除
    // /api/v1/comments/like/{:comment_id}
    'comment:good:delete': new Types(
      new Type( `${API_PATH}/comments/like/${Path.COMMENT_ID}`, 'DELETE' ),
      new Permalink( [ '*' ], true ),
      new Queries(),
      true
    ),
    // コメントBad 追加
    'comment:bad:add': new Types(
      new Type( `${API_PATH}/comments/bad/${Path.COMMENT_ID}`, 'PUT' ),
      new Permalink( [ '*' ], true ),
      new Queries(),
      true
    ),
    // コメントBad 削除
    'comment:bad:delete': new Types(
      new Type( `${API_PATH}/comments/bad/${Path.COMMENT_ID}`, 'DELETE' ),
      new Permalink( [ '*' ], true ),
      new Queries(),
      true
    ),
    // --------------------------------------------
    // マイページ系
    // --------------------------------------------
    // 自分のユーザー情報を取得する
    // /api/v1/users/self
    'users:self': new Types(
      new Type( `${API_PATH}/users/self` ),
      new Permalink(),
      new Queries(),
      true
    ),
    // user_idに該当するユーザー情報を取得する
    // /api/v1/users/{:user_id}
    'users:id': new Types(
      new Type( `${API_PATH}/users/${Path.USER_ID}` ),
      new Permalink(),
      new Queries(),
      true
    ),
    // -----------------
    // bookmark
    // -----------------
    // 自分のブックマークを取得する
    // /api/v1/users/self/bookmark
    'users:self:bookmark': new Types(
      new Type( `${API_PATH}/users/self/bookmark` ),
      new Permalink(),
      new Queries( [ new Query( 'offset', 'number', 0 ), new Query( 'length', 'Number', 10 ) ] )
    ),
    // user_idに該当するユーザーのブックマークを取得する
    // /api/v1/users/{:user_id}/bookmark
    /*
    2016-02-04 drop した模様
    'users:id:bookmark': new Types(
      new Type( `${API_PATH}/users/${Path.USER_ID}/bookmark` ),
      new Permalink(),
      new Queries( [ new Query( 'offset', 'Number', 0 ), new Query( 'length', 'Number', 10 ) ] )
    ),
    */
    // -----------------
    // activities
    // -----------------
    // アクティビティを取得する
    // /api/v1/users/self/activities
    'users:self:activities': new Types(
      new Type( `${API_PATH}/users/self/activities` ),
      new Permalink(),
      new Queries( [ new Query( 'offset', 'number', 0 ), new Query( 'length', 'Number', 10 ) ] )
    ),
    // -----------------
    // notifications
    // -----------------
    // お知らせを取得する, 自分のアクション(成果物)への他人からのアクション通知
    // /api/v1/users/self/notifications
    'users:self:notifications': new Types(
      new Type( `${API_PATH}/users/self/notifications` ),
      new Permalink(),
      new Queries( [ new Query( 'offset', 'number', 0 ), new Query( 'length', 'Number', 10 ) ] ),
      true
    ),
    // お知らせ 既読, お知らせウインドウを表示すると呼び出す
    // /api/v1/users/self/notifications/read
    'users:self:notifications:read': new Types(
      new Type( `${API_PATH}/users/self/notifications/read`, 'PUT' ),
      new Permalink(),
      new Queries(),
      true
    ),
    // 知らない間に追加されてた on 2016-03-03
    // 他人からの通知数を取得する
    // /api/v1/users/self/notifications/count
    'users:self:notifications:count': new Types(
      new Type( `${API_PATH}/users/self/notifications/count` ),
      new Permalink(),
      new Queries(),
      true
    ),
    // -----------------
    // settings/account
    // -----------------
    // アカウント情報の取得と更新
    // アカウント情報を取得
    // /api/v1/users/self/settings/account
    'users:settings:account': new Types(
      new Type( `${API_PATH}/users/self/settings/account` ),
      new Permalink(),
      new Queries(),
      true
    ),
    // アカウント情報を更新
    // /api/v1/users/self/settings/account
    'users:settings:account:edit': new Types(
      new Type( `${API_PATH}/users/self/settings/account`, 'POST' ),
      new Permalink(),
      new Queries(),
      true
    ),
    // -----------------
    // settings/interest
    // -----------------
    // 興味のある競技を取得
    // /api/v1/users/self/settings/interest
    'users:settings:interest': new Types(
      new Type( `${API_PATH}/users/self/settings/interest` ),
      new Permalink(),
      new Queries(),
      true
    ),
    // 興味のある競技を取得
    // /api/v1/users/self/settings/interest
    'users:settings:interest:edit': new Types(
      new Type( `${API_PATH}/users/self/settings/interest`, 'POST' ),
      new Permalink(),
      new Queries(),
      true
    ),
    // -----------------
    // 退会
    // -----------------
    // アカウントを削除する
    // /api/v1/users/self
    'users:delete': new Types(
      new Type( `${API_PATH}/users/self`, 'DELETE' ),
      new Permalink(),
      new Queries(),
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
