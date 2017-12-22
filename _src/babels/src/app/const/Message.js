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
// let _symbol = Symbol();

/**
 * 表示文章定義
 * - 全て static です
 */
export class Message {
  // /**
  //  * <p>表示文章定義</p>
  //  * <p>error, 注意などの文章を定義します</p>
  //  * <p>static class です, instance を作成しません</P>
  //  * @param {Symbol} target Singleton を実現するための private symbol
  //  */
  // constructor( target:Symbol ) {
  //
  //   if ( _symbol !== target ) {
  //
  //     throw new Error( 'Message is static Class. not use new Message().' );
  //
  //   }
  //
  // }
  // ---------------------------------------------------
  //  CONST 代わり
  // ---------------------------------------------------
  /**
   * RANKING_TITLE 人気の記事
   * @returns {string} 人気の記事
   */
  static get RANKING_TITLE() {
    return '人気の記事';
  }
  /**
   * VIDEOS_TITLE オススメ動画
   * @returns {string} オススメ動画
   */
  static get VIDEOS_TITLE() {
    return 'オススメ動画';
  }
  /**
   * RECOMMEND_TITLE オススメ記事
   * @since 2016-06-29
   * @returns {string} オススメ記事
   */
  static get RECOMMEND_TITLE() {
    return 'オススメ記事';
  }
  // /**
  //  * HEADLINE_TITLE 注目のニュース
  //  * @returns {string} 注目のニュース
  //  */
  // static get HEADLINE_TITLE() {
  //   return '注目のニュース';
  // }
  /**
   * HEADLINE_TITLE ヘッドラインニュース
   * @since 2016-09-21 `注目のニュース` -> `ヘッドラインニュース`
   * @returns {string} ヘッドラインニュース
   */
  static get HEADLINE_TITLE() {
    return 'ヘッドラインニュース';
  }
  /**
   * LATEST_TITLE 新着記事
   * @since 2016-09-21
   * @returns {string} 新着記事
   */
  static get LATEST_TITLE() {
    return '新着記事';
  }
  /**
   * RELATED_TITLE 関連記事
   * @since 2016-09-27
   * @returns {string} 関連記事
   */
  static get RELATED_TITLE() {
    return '関連記事';
  }
  /**
   * TAGS_TITLE TAGS
   * @since 2016-09-27
   * @returns {string} TAGS
   */
  static get TAGS_TITLE() {
    return 'TAGS';
  }
  /**
   * UNLOAD, 入力内容が取消しされます
   * onbeforeunload message に使用します
   * @returns {string} 入力内容が取消しされます
   */
  static get UNLOAD() {
    return '入力内容が取消しされます！';
  }
  /**
   * DELETE このコメントを削除しますか
   * コメント削除モーダルで使用します
   * @returns {string} このコメントを削除しますか
   */
  static get DELETE() {
    return 'このコメントを削除しますか？';
  }
  /**
   * DELETE_WILL, このコメントを削除する
   * コメント drop down menu 表示に使用します
   * @returns {string} このコメントを削除する
   */
  static get DELETE_WILL() {
    return 'このコメントを削除する';
  }

  /**
   * DEACTIVATE 退会を行うと、登録済みの情報は全て閲覧する事が出来なくなります
   * 退会form, モーダルで使用します
   * @returns {string} 退会を行うと、登録済みの情報は全て閲覧する事が出来なくなります
   */
  static get DEACTIVATE() {
    return '退会を行うと、登録済みの情報は全て閲覧する事が出来なくなります。';
  }
  /**
   * LOGOUT ログアウトしますか
   * ログアウトモーダルで使用します
   * @returns {string} ログアウトしますか？
   */
  static get LOGOUT() {
    return 'ログアウトしますか？';
  }
  /**
   * BOOKMARK_WILL ブックマークする
   * 記事一覧のbookmark button で使用します
   * @returns {string} ブックマークする
   */
  static get BOOKMARK_WILL() {
    return 'ブックマークする';
  }
  /**
   * BOOKMARK_DID ブックマーク解除
   * 記事一覧のbookmark button で使用します
   * @returns {string} ブックマーク解除
   */
  static get BOOKMARK_DID() {
    return 'ブックマーク解除';
  }
  /**
   * COMMENT_SUBMIT コメントを投稿
   * コメント投稿 submit button value 値
   * @returns {string} コメントを投稿
   */
  static get COMMENT_SUBMIT() {
    return 'コメントを投稿';
  }
  // search
  /**
   * PLACEHOLDER_SEARCH 記事を検索
   * 検索 placeholder
   * @returns {string} 記事を検索
   */
  static get PLACEHOLDER_SEARCH() {
    return '記事を検索';
  }
  /**
   * SUBMIT_SEARCH 検索
   * 検索 submit button value 値
   * @returns {string} 検索
   */
  static get SUBMIT_SEARCH() {
    return '検索';
  }
  /**
   * OPENER_SEARCH 記事検索
   * SP, 検索 form を表示する button に使用
   * @returns {string} 記事検索
   */
  static get OPENER_SEARCH() {
    return '記事検索';
  }
  // login
  /**
   * PLACEHOLDER_EMAIL, メールアドレスを入力
   * @returns {string} メールアドレスを入力
   */
  static get PLACEHOLDER_EMAIL() {
    return 'メールアドレスを入力';
  }
  /**
   * PLACEHOLDER_PWD, パスワードを入力
   * @returns {string} パスワードを入力
   */
  static get PLACEHOLDER_PWD() {
    return 'パスワードを入力';
  }
  /**
   * PLACEHOLDER_NAME, ユーザー名を入力
   * @returns {string} ユーザー名を入力
   */
  static get PLACEHOLDER_NAME() {
    return 'ユーザー名を入力';
  }
  /**
   * PLACEHOLDER_BIO, 肩書を入力 (任意)
   * @returns {string} 肩書を入力 (任意)
   */
  static get PLACEHOLDER_BIO() {
    return '肩書を入力 (任意)';
  }
  /**
   * PLACEHOLDER_PICTURE, プロフィール写真選択
   * @returns {string} プロフィール写真選択
   */
  static get PLACEHOLDER_PICTURE() {
    return 'プロフィール写真選択';
  }
  /**
   * PLACEHOLDER_CHANGE_PICTURE, 写真を変更する
   * @returns {string} 写真を変更する
   */
  static get PLACEHOLDER_CHANGE_PICTURE() {
    return '写真を変更する';
  }
  /**
   * PLACEHOLDER_COMMENT, コメントを書く
   * @returns {string} コメントを書く
   */
  static get PLACEHOLDER_COMMENT() {
    return 'コメントを書く';
  }
  /**
   * SUBMIT_LOGIN, ログイン
   * @returns {string} ログイン
   */
  static get SUBMIT_LOGIN() {
    return 'ログイン';
  }
  /**
   * SUBMIT_LOGOUT, ログアウト
   * @returns {string} ログアウト
   */
  static get SUBMIT_LOGOUT() {
    return 'ログアウト';
  }
  // ----
  // single
  /**
   * READ_MORE, 続きを読む
   * @returns {string} 続きを読む
   */
  static get READ_MORE() {
    return '続きを読む';
  }
  /**
   * READ_MORE_EXTERNAL 続きを読む(外部サイトへ)
   * @returns {string} 続きを読む(外部サイトへ) を返します
   */
  static get READ_MORE_EXTERNAL() {
    return '続きを読む(外部サイトへ)';
  }
  /**
   * WEBSITE ウェブサイト
   * @since 2-16-09-27
   * @returns {string} ウェブサイト を返します
   */
  static get WEBSITE() {
    return 'ウェブサイト';
  }
  // ----
  // button

  // logout
  /**
   * button BUTTON_CLOSE, 閉じる
   * @returns {string} 閉じる
   */
  static get BUTTON_CLOSE() {
    return '閉じる';
  }
  /**
   * button BUTTON_YES, はい
   * @returns {string} はい
   */
  static get BUTTON_YES() {
    return 'はい';
  }
  /**
   * button BUTTON_NO, いいえ
   * @returns {string} いいえ
   */
  static get BUTTON_NO() {
    return 'いいえ';
  }

  // remove account
  /**
   * button BUTTON_CANCEL, キャンセル
   * @returns {string} キャンセル
   */
  static get BUTTON_CANCEL() {
    return 'キャンセル';
  }
  /**
   * button BUTTON_DELETE, 削除
   * @returns {string} 削除
   */
  static get BUTTON_DELETE() {
    return '削除';
  }

  // 退会
  /**
   * button BUTTON_DEACTIVATE, 退会
   * @returns {string} 退会
   */
  static get BUTTON_DEACTIVATE() {
    return '退会';
  }
  /**
   * button BUTTON_DEACTIVATE_TEXT, スポーツブルから退会する
   * @returns {string} スポーツブルから退会する
   */
  static get BUTTON_DEACTIVATE_TEXT() {
    return 'スポーツブルから退会する';
  }

  // profile picture
  /**
   * button BUTTON_SAVE, 保存する
   * @returns {string} 保存する
   */
  static get BUTTON_SAVE() {
    return '保存する';
  }
  /**
   * button BUTTON_NEXT, 次へ
   * @returns {string} 次へ
   */
  static get BUTTON_NEXT() {
    return '次へ';
  }
  /**
   * button BUTTON_RESISTER, 登録する
   * @returns {string} 登録する
   */
  static get BUTTON_RESISTER() {
    return '登録する';
  }
  /**
   * button BUTTON_VIEW_MORE, VIEW MORE
   * @returns {string} VIEW MORE
   * @since 2017-12-18 `もっと見る` update
   */
  static get BUTTON_VIEW_MORE() {
    // return 'VIEW MORE';
    return 'もっと見る';
  }

  // ----
  /**
   * PLEASE_MAKE_ACCOUNT, アカウント作成 (無料)
   * @returns {string} アカウント作成 (無料)
   */
  static get PLEASE_MAKE_ACCOUNT() {
    return 'アカウント作成 (無料)';
  }

  // -----------------------------------
  // ユーザー登録 step information
  /**
   * SIGNUP_STEP_1, 基本情報設定
   * @returns {string} 基本情報設定
   */
  static get SIGNUP_STEP_1() {
    return '基本情報設定';
  }
  /**
   * SIGNUP_STEP_2, 興味のある競技
   * @returns {string} 興味のある競技
   */
  static get SIGNUP_STEP_2() {
    return '興味のある競技';
  }
  /**
   * SIGNUP_STEP_3, 完了
   * @returns {string} 完了
   */
  static get SIGNUP_STEP_3() {
    return '完了';
  }

  // ログインはこちら
  /**
   * HERE_TO_LOGIN
   * @returns {string} ログインはこちら &gt;
   */
  static get HERE_TO_LOGIN() {
    return 'ログインはこちら';
  }

  // ユーザー登録 section title
  /**
   * TITLE_ENTRY_MEMBER, 新規会員登録
   * @returns {string} 新規会員登録
   */
  static get TITLE_ENTRY_MEMBER() {
    return '新規会員登録';
  }
  /**
   * TITLE_INTEREST_SPORTS, 興味のある競技を選択
   * @returns {string} 興味のある競技を選択
   */
  static get TITLE_INTEREST_SPORTS() {
    return '興味のある競技を選択';
  }

  // -----------------------------------
  // カテゴリ表示の横に付くアイコンぽいやつ
  /**
   * LABEL_RECOMMEND, おすすめ記事
   * @returns {string} おすすめ記事
   */
  static get LABEL_RECOMMEND() {
    return 'おすすめ記事';
  }
  /**
   * LABEL_MOVIE, 動画
   * @returns {string} 動画
   * @since 2016-12-26
   */
  static get LABEL_MOVIE() {
    return '動画';
  }
  /**
   * LABEL_LATEST - NEW
   * @returns {string} NEW
   * @since 2017-12-22
   */
  static get LABEL_LATEST() {
    return 'NEW';
  }
  // -----------------------------------
  // mypage
  /**
   * FAVORITE_SPORTS, 好きな競技
   * @returns {string} 好きな競技
   */
  static get FAVORITE_SPORTS() {
    return '好きな競技';
  }
  // -----------------------------------
  // ajax
  /**
   * NET_UNDEFINED, サーバーレスポンスに問題が発生しました
   * @returns {string} サーバーレスポンスに問題が発生しました
   */
  static get NET_UNDEFINED() {
    return 'サーバーレスポンスに問題が発生しました。';
  }
  /**
   * NET_EMPTY, レスポンスが空でした
   * @returns {string} レスポンスが空でした
   */
  static get NET_EMPTY() {
    return 'レスポンスが空でした。';
  }
  /**
   * undefined error message を作成します
   * @param {string} prefix メッセージへ加えたい文言
   * @returns {string} prefix+message を返します
   */
  static undef(prefix = '') {
    return `${prefix}${Message.NET_UNDEFINED}`;
  }
  /**
   * empty error message を作成します
   * @param {string} prefix メッセージへ加えたい文言
   * @returns {string} prefix+message を返します
   */
  static empty(prefix = '') {
    return `${prefix}${Message.NET_EMPTY}`;
  }
  // -----------------------------------
  // 完了系
  /**
   * LOGIN_COMPLETE
   * ログイン 完了 flush message 使用想定
   * @returns {string} ログインしました
   */
  static get LOGIN_COMPLETE() {
    return 'ログインしました。';
  }
  /**
   * DEACTIVATE_COMPLETE
   * 退会 完了 flush message 使用想定
   * @returns {string} 退会しました
   */
  static get DEACTIVATE_COMPLETE() {
    return '退会しました。';
  }
  // ----------------------------------
  // 一覧種類
  /**
   * NEWS
   * 一覧種類 最新記事
   * @returns {string} news
   */
  static get NEWS() {
    return 'news';
  }
  /**
   * RANKING
   * 一覧種類 ランキング
   * @returns {string} ranking
   */
  static get RANKING() {
    return 'ranking';
  }
  /**
   * VIDEO
   * 一覧種類 オススメ動画
   * @returns {string} video
   */
  static get VIDEO() {
    return 'video';
  }
}
