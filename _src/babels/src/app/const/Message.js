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
let _symbol = Symbol();

/**
 * <p>表示文章定義</p>
 * 全て static です
 */
export class Message {
  /**
   * <p>表示文章定義</p>
   * <p>error, 注意などの文章を定義します</p>
   * <p>static class です, instance を作成しません</P>
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target:Symbol ) {

    if ( _symbol !== target ) {

      throw new Error( 'Message is static Class. not use new Message().' );

    }

  }
  // ---------------------------------------------------
  //  CONST 代わり
  // ---------------------------------------------------
  /**
   * RANKING_TITLE 人気の記事
   * @return {string} 人気の記事
   */
  static get RANKING_TITLE():string {
    return '人気の記事';
  }
  /**
   * VIDEOS_TITLE オススメ動画
   * @return {string} オススメ動画
   */
  static get VIDEOS_TITLE():string {
    return 'オススメ動画';
  }
  /**
   * RECOMMEND_TITLE オススメ記事
   * @since 2016-06-29
   * @return {string} オススメ記事
   */
  static get RECOMMEND_TITLE():string {
    return 'オススメ記事';
  }
  /**
   * HEADLINE_TITLE 注目のニュース
   * @return {string} 注目のニュース
   */
  static get HEADLINE_TITLE():string {
    return '注目のニュース';
  }
  /**
   * UNLOAD, 入力内容が取消しされます
   * onbeforeunload message に使用します
   * @return {string} 入力内容が取消しされます
   */
  static get UNLOAD():string {
    return '入力内容が取消しされます！';
  }
  /**
   * DELETE このコメントを削除しますか
   * コメント削除モーダルで使用します
   * @return {string} このコメントを削除しますか
   */
  static get DELETE():string {
    return 'このコメントを削除しますか？';
  }
  /**
   * DELETE_WILL, このコメントを削除する
   * コメント drop down menu 表示に使用します
   * @return {string} このコメントを削除する
   */
  static get DELETE_WILL():string {
    return 'このコメントを削除する';
  }

  /**
   * DEACTIVATE 退会を行うと、登録済みの情報は全て閲覧する事が出来なくなります
   * 退会form, モーダルで使用します
   * @return {string} 退会を行うと、登録済みの情報は全て閲覧する事が出来なくなります
   */
  static get DEACTIVATE():string {
    return '退会を行うと、登録済みの情報は全て閲覧する事が出来なくなります。';
  }
  /**
   * LOGOUT ログアウトしますか
   * ログアウトモーダルで使用します
   * @return {string} ログアウトしますか？
   */
  static get LOGOUT():string {
    return 'ログアウトしますか？';
  }
  /**
   * BOOKMARK_WILL ブックマークする
   * 記事一覧のbookmark button で使用します
   * @return {string} ブックマークする
   */
  static get BOOKMARK_WILL():string {
    return 'ブックマークする';
  }
  /**
   * BOOKMARK_DID ブックマーク解除
   * 記事一覧のbookmark button で使用します
   * @return {string} ブックマーク解除
   */
  static get BOOKMARK_DID():string {
    return 'ブックマーク解除';
  }
  /**
   * COMMENT_SUBMIT コメントを投稿
   * コメント投稿 submit button value 値
   * @return {string} コメントを投稿
   */
  static get COMMENT_SUBMIT():string {
    return 'コメントを投稿';
  }
  // search
  /**
   * PLACEHOLDER_SEARCH 記事を検索
   * 検索 placeholder
   * @return {string} 記事を検索
   */
  static get PLACEHOLDER_SEARCH():string {
    return '記事を検索';
  }
  /**
   * SUBMIT_SEARCH 検索
   * 検索 submit button value 値
   * @return {string} 検索
   */
  static get SUBMIT_SEARCH():string {
    return '検索';
  }
  /**
   * OPENER_SEARCH 記事検索
   * SP, 検索 form を表示する button に使用
   * @return {string} 記事検索
   */
  static get OPENER_SEARCH():string {
    return '記事検索';
  }
  // login
  /**
   * PLACEHOLDER_EMAIL, メールアドレスを入力
   * @return {string} メールアドレスを入力
   */
  static get PLACEHOLDER_EMAIL():string {
    return 'メールアドレスを入力';
  }
  /**
   * PLACEHOLDER_PWD, パスワードを入力
   * @return {string} パスワードを入力
   */
  static get PLACEHOLDER_PWD():string {
    return 'パスワードを入力';
  }
  /**
   * PLACEHOLDER_NAME, ユーザー名を入力
   * @return {string} ユーザー名を入力
   */
  static get PLACEHOLDER_NAME():string {
    return 'ユーザー名を入力';
  }
  /**
   * PLACEHOLDER_BIO, 肩書を入力 (任意)
   * @return {string} 肩書を入力 (任意)
   */
  static get PLACEHOLDER_BIO():string {
    return '肩書を入力 (任意)';
  }
  /**
   * PLACEHOLDER_PICTURE, プロフィール写真選択
   * @return {string} プロフィール写真選択
   */
  static get PLACEHOLDER_PICTURE():string {
    return 'プロフィール写真選択';
  }
  /**
   * PLACEHOLDER_CHANGE_PICTURE, 写真を変更する
   * @return {string} 写真を変更する
   */
  static get PLACEHOLDER_CHANGE_PICTURE():string {
    return '写真を変更する';
  }
  /**
   * PLACEHOLDER_COMMENT, コメントを書く
   * @return {string} コメントを書く
   */
  static get PLACEHOLDER_COMMENT():string {
    return 'コメントを書く';
  }
  /**
   * SUBMIT_LOGIN, ログイン
   * @return {string} ログイン
   */
  static get SUBMIT_LOGIN():string {
    return 'ログイン';
  }
  /**
   * SUBMIT_LOGOUT, ログアウト
   * @return {string} ログアウト
   */
  static get SUBMIT_LOGOUT():string {
    return 'ログアウト';
  }
  // ----
  // single
  /**
   * READ_MORE, 続きを読む
   * @return {string} 続きを読む
   */
  static get READ_MORE():string {
    return '続きを読む';
  }
  // ----
  // button

  // logout
  /**
   * button BUTTON_CLOSE, 閉じる
   * @return {string} 閉じる
   */
  static get BUTTON_CLOSE():string {
    return '閉じる';
  }
  /**
   * button BUTTON_YES, はい
   * @return {string} はい
   */
  static get BUTTON_YES():string {
    return 'はい';
  }
  /**
   * button BUTTON_NO, いいえ
   * @return {string} いいえ
   */
  static get BUTTON_NO():string {
    return 'いいえ';
  }

  // remove account
  /**
   * button BUTTON_CANCEL, キャンセル
   * @return {string} キャンセル
   */
  static get BUTTON_CANCEL():string {
    return 'キャンセル';
  }
  /**
   * button BUTTON_DELETE, 削除
   * @return {string} 削除
   */
  static get BUTTON_DELETE():string {
    return '削除';
  }

  // 退会
  /**
   * button BUTTON_DEACTIVATE, 退会
   * @return {string} 退会
   */
  static get BUTTON_DEACTIVATE():string {
    return '退会';
  }
  /**
   * button BUTTON_DEACTIVATE_TEXT, スポーツブルから退会する
   * @return {string} スポーツブルから退会する
   */
  static get BUTTON_DEACTIVATE_TEXT():string {
    return 'スポーツブルから退会する';
  }

  // profile picture
  /**
   * button BUTTON_SAVE, 保存する
   * @return {string} 保存する
   */
  static get BUTTON_SAVE():string {
    return '保存する';
  }
  /**
   * button BUTTON_NEXT, 次へ
   * @return {string} 次へ
   */
  static get BUTTON_NEXT():string {
    return '次へ';
  }
  /**
   * button BUTTON_RESISTER, 登録する
   * @return {string} 登録する
   */
  static get BUTTON_RESISTER():string {
    return '登録する';
  }
  /**
   * button BUTTON_VIEW_MORE, VIEW MORE
   * @return {string} VIEW MORE
   */
  static get BUTTON_VIEW_MORE():string {
    return 'VIEW MORE';
  }

  // ----
  /**
   * PLEASE_MAKE_ACCOUNT, アカウント作成 (無料)
   * @return {string} アカウント作成 (無料)
   */
  static get PLEASE_MAKE_ACCOUNT():string {
    return 'アカウント作成 (無料)';
  }

  // -----------------------------------
  // ユーザー登録 step information
  /**
   * SIGNUP_STEP_1, 基本情報設定
   * @return {string} 基本情報設定
   */
  static get SIGNUP_STEP_1():string {
    return '基本情報設定';
  }
  /**
   * SIGNUP_STEP_2, 興味のある競技
   * @return {string} 興味のある競技
   */
  static get SIGNUP_STEP_2():string {
    return '興味のある競技';
  }
  /**
   * SIGNUP_STEP_3, 完了
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
    return 'ログインはこちら >';
  }

  // ユーザー登録 section title
  /**
   * TITLE_ENTRY_MEMBER, 新規会員登録
   * @return {string} 新規会員登録
   */
  static get TITLE_ENTRY_MEMBER():string {
    return '新規会員登録';
  }
  /**
   * TITLE_INTEREST_SPORTS, 興味のある競技を選択
   * @return {string} 興味のある競技を選択
   */
  static get TITLE_INTEREST_SPORTS():string {
    return '興味のある競技を選択';
  }

  /**
   * LABEL_RECOMMEND, おすすめ記事
   * @return {string} おすすめ記事
   */
  static get LABEL_RECOMMEND():string {
    return 'おすすめ記事';
  }

  // -----------------------------------
  // mypage
  /**
   * FAVORITE_SPORTS, 好きな競技
   * @return {string} 好きな競技
   */
  static get FAVORITE_SPORTS():string {
    return '好きな競技';
  }
  // -----------------------------------
  // ajax
  /**
   * NET_UNDEFINED, サーバーレスポンスに問題が発生しました
   * @return {string} サーバーレスポンスに問題が発生しました
   */
  static get NET_UNDEFINED():string {
    return 'サーバーレスポンスに問題が発生しました。';
  }
  /**
   * NET_EMPTY, レスポンスが空でした
   * @return {string} レスポンスが空でした
   */
  static get NET_EMPTY():string {
    return 'レスポンスが空でした。';
  }
  /**
   * undefined error message を作成します
   * @param {string} prefix メッセージへ加えたい文言
   * @return {string} prefix+message を返します
   */
  static undef( prefix:string = '' ):string {
    return `${prefix}${Message.NET_UNDEFINED}`;
  }
  /**
   * empty error message を作成します
   * @param {string} prefix メッセージへ加えたい文言
   * @return {string} prefix+message を返します
   */
  static empty( prefix:string = '' ):string {
    return `${prefix}${Message.NET_EMPTY}`;
  }
  // -----------------------------------
  // 完了系
  /**
   * LOGIN_COMPLETE
   * ログイン 完了 flush message 使用想定
   * @return {string} ログインしました
   */
  static get LOGIN_COMPLETE():string {
    return 'ログインしました。';
  }
  /**
   * DEACTIVATE_COMPLETE
   * 退会 完了 flush message 使用想定
   * @return {string} 退会しました
   */
  static get DEACTIVATE_COMPLETE():string {
    return '退会しました。';
  }

  // ----------------------------------
  // 一覧種類
  /**
   * NEWS
   * 一覧種類 最新記事
   * @return {string} news
   */
  static get NEWS():string {
    return 'news';
  }
  /**
   * RANKING
   * 一覧種類 ランキング
   * @return {string} ranking
   */
  static get RANKING():string {
    return 'ranking';
  }
  /**
   * VIDEO
   * 一覧種類 オススメ動画
   * @return {string} video
   */
  static get VIDEO():string {
    return 'video';
  }
}
