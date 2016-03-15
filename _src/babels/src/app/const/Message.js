/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/21 - 12:37
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

let _symbol = Symbol();

/**
 * <h3>表示文章定義</h3>
 * 全て static です
 */
export class Message {
  /**
   * <h4>表示文章定義</h4>
   * <p>error, 注意などの文章を定義します</p>
   * <p>static class です, instance を作成しません</P>
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target:Symbol ) {

    if ( _symbol !== target ) {

      throw new Error( `Message is static Class. not use new Message().` );

    }

  }
  // ---------------------------------------------------
  //  CONST 代わり
  // ---------------------------------------------------
  /**
   * UNLOAD
   * @return {string} 入力内容が取消しされます
   */
  static get UNLOAD():string {
    return '入力内容が取消しされます！';
  }
  /**
   * DELETE
   * @return {string} このコメントを削除しますか
   */
  static get DELETE():string {
    return 'このコメントを削除しますか？';
  }
  /**
   * DELETE_WILL
   * @return {string} このコメントを削除する
   */
  static get DELETE_WILL():string {
    return 'このコメントを削除する';
  }

  /**
   * DEACTIVATE
   * @return {string} 退会を行うと、登録済みの情報は全て閲覧する事が出来なくなります
   */
  static get DEACTIVATE():string {
    return '退会を行うと、登録済みの情報は全て閲覧する事が出来なくなります。';
  }
  /**
   * LOGOUT
   * @return {string} ログアウトしますか？
   */
  static get LOGOUT():string {
    return 'ログアウトしますか？';
  }
  /**
   * BOOKMARK_WILL
   * @return {string} ブックマークする
   */
  static get BOOKMARK_WILL():string {
    return 'ブックマークする';
  }
  /**
   * BOOKMARK_DID
   * @return {string} ブックマーク解除
   */
  static get BOOKMARK_DID():string {
    return 'ブックマーク解除';
  }
  /**
   * COMMENT_SUBMIT
   * @return {string} コメントを投稿
   */
  static get COMMENT_SUBMIT():string {
    return 'コメントを投稿';
  }
  // search
  /**
   * PLACEHOLDER_SEARCH
   * @return {string} 記事を検索
   */
  static get PLACEHOLDER_SEARCH():string {
    return '記事を検索';
  }
  /**
   * SUBMIT_SEARCH
   * @return {string} 検索
   */
  static get SUBMIT_SEARCH():string {
    return '検索';
  }
  /**
   * OPENER_SEARCH
   * @return {string} 記事検索
   */
  static get OPENER_SEARCH():string {
    return '記事検索';
  }
  // login
  /**
   * PLACEHOLDER_EMAIL
   * @return {string} メールアドレスを入力
   */
  static get PLACEHOLDER_EMAIL():string {
    return 'メールアドレスを入力';
  }
  /**
   * PLACEHOLDER_PWD
   * @return {string} パスワードを入力
   */
  static get PLACEHOLDER_PWD():string {
    return 'パスワードを入力';
  }
  /**
   * PLACEHOLDER_NAME
   * @return {string} ユーザー名を入力
   */
  static get PLACEHOLDER_NAME():string {
    return 'ユーザー名を入力';
  }
  /**
   * PLACEHOLDER_BIO
   * @return {string} 肩書を入力 (任意)
   */
  static get PLACEHOLDER_BIO():string {
    return '肩書を入力 (任意)';
  }
  /**
   * PLACEHOLDER_PICTURE
   * @return {string} プロフィール写真選択
   */
  static get PLACEHOLDER_PICTURE():string {
    return 'プロフィール写真選択';
  }
  /**
   * PLACEHOLDER_CHANGE_PICTURE
   * @return {string} 写真を変更する
   */
  static get PLACEHOLDER_CHANGE_PICTURE():string {
    return '写真を変更する';
  }
  /**
   * PLACEHOLDER_COMMENT
   * @return {string} コメントを書く
   */
  static get PLACEHOLDER_COMMENT():string {
    return 'コメントを書く';
  }

  /**
   * SUBMIT_LOGIN
   * @return {string} ログイン
   */
  static get SUBMIT_LOGIN():string {
    return 'ログイン';
  }
  // ----
  // single
  /**
   * READ_MORE
   * @return {string} 続きを読む
   */
  static get READ_MORE():string {
    return '続きを読む';
  }
  // ----
  // button

  // logout
  /**
   * button BUTTON_CLOSE
   * @return {string} 閉じる
   */
  static get BUTTON_CLOSE():string {
    return '閉じる';
  }
  /**
   * button BUTTON_YES
   * @return {string} はい
   */
  static get BUTTON_YES():string {
    return 'はい';
  }
  /**
   * button BUTTON_NO
   * @return {string} いいえ
   */
  static get BUTTON_NO():string {
    return 'いいえ';
  }

  // remove account
  /**
   * button BUTTON_CANCEL
   * @return {string} キャンセル
   */
  static get BUTTON_CANCEL():string {
    return 'キャンセル';
  }
  /**
   * button BUTTON_DELETE
   * @return {string} 削除
   */
  static get BUTTON_DELETE():string {
    return '削除';
  }

  // 退会
  /**
   * button BUTTON_DEACTIVATE
   * @return {string} 退会
   */
  static get BUTTON_DEACTIVATE():string {
    return '退会';
  }
  /**
   * button BUTTON_DEACTIVATE_TEXT
   * @return {string} 運動通信から退会する
   */
  static get BUTTON_DEACTIVATE_TEXT():string {
    return '運動通信から退会する';
  }

  // profile picture
  /**
   * button BUTTON_SAVE
   * @return {string} 保存する
   */
  static get BUTTON_SAVE():string {
    return '保存する';
  }
  /**
   * button BUTTON_NEXT
   * @return {string} 次へ
   */
  static get BUTTON_NEXT():string {
    return '次へ';
  }
  /**
   * button BUTTON_RESISTER
   * @return {string} 登録する
   */
  static get BUTTON_RESISTER():string {
    return '登録する';
  }
  /**
   * button BUTTON_VIEW_MORE
   * @return {string} VIEW MORE
   */
  static get BUTTON_VIEW_MORE():string {
    return 'VIEW MORE';
  }

  // ----
  /**
   * PLEASE_MAKE_ACCOUNT
   * @return {string} アカウント作成 (無料)
   */
  static get PLEASE_MAKE_ACCOUNT():string {
    return 'アカウント作成 (無料)';
  }

  // -----------------------------------
  // ユーザー登録 step information
  /**
   * SIGNUP_STEP_1
   * @return {string} 基本情報設定
   */
  static get SIGNUP_STEP_1():string {
    return '基本情報設定';
  }
  /**
   * SIGNUP_STEP_2
   * @return {string} 興味のある競技
   */
  static get SIGNUP_STEP_2():string {
    return '興味のある競技';
  }
  /**
   * SIGNUP_STEP_3
   * @return {string} 完了
   */
  static get SIGNUP_STEP_3():string {
    return '完了';
  }

  // ログインはこちら
  /**
   * HERE_TO_LOGIN
   * @return {string} ログインはこちら &gt;
   */
  static get HERE_TO_LOGIN():string {
    return 'ログインはこちら ';
  }

  // ユーザー登録 section title
  /**
   * TITLE_ENTRY_MEMBER
   * @return {string} 新規会員登録
   */
  static get TITLE_ENTRY_MEMBER():string {
    return '新規会員登録';
  }
  /**
   * TITLE_INTEREST_SPORTS
   * @return {string} 興味のある競技を選択
   */
  static get TITLE_INTEREST_SPORTS():string {
    return '興味のある競技を選択';
  }

  /**
   * LABEL_RECOMMEND
   * @return {string} おすすめ記事
   */
  static LABEL_RECOMMEND():string {
    return 'おすすめ記事';
  }

  // -----------------------------------
  // mypage
  /**
   * FAVORITE_SPORTS
   * @return {string} 好きな競技
   */
  static get FAVORITE_SPORTS():string {
    return '好きな競技';
  }
}
