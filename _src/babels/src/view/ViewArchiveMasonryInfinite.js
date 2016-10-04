/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/01 - 22:33
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
/* eslint no-unused-vars: [0, {"args": "after-used"}] */

// app
// import {Empty} from '../app/const/Empty';
// import {User} from '../app/User';
// import {MediaType} from '../app/const/MediaType';
import {Message} from '../app/const/Message';

// view
import {View} from './View';
// import {ViewError} from './error/ViewError';

// data
import {Result} from '../data/Result';
import {Safety} from '../data/Safety';

// dae
import {ArticleDae} from '../dae/ArticleDae';

// // ui
// import {Rise} from '../ui/Rise';
//
// // node(ReactClass)
// import {ReactionNode} from '../node/comment/ReactionNode';
// import {CommentUserPlusCountNode} from '../node/comment/CommentUserPlusCountNode';
// import {CategoryLabelNode} from '../node/category/CategoryLabelNode';

// view/articles
import { ComponentArticlesMasonryInfinite } from '../component/articles/ComponentArticlesMasonryInfinite';
import { ComponentMoreButton } from '../component/articles/ComponentMoreButton';

// util
import { Scroll } from '../util/Scroll';

// Ga
import { Ga } from '../ga/Ga';
import { GaData } from '../ga/GaData';

// React
// let React = self.React;
let ReactDOM = self.ReactDOM;

// // imagesLoaded, isotope
// let imagesLoaded = self.imagesLoaded;
// let Isotope = self.Isotope;

/**
 * archive 一覧を isotope で
 */
export class ViewArchiveMasonryInfinite extends View {
  /**
   * <p>archive 一覧標示後 isotope で位置調整します<br>
   * + infinite scroll を実装します
   * </p>
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {Function} [ActionClass=null] Request 対象の Action Class
   * @param {Object} [option={}] optional event handler
   * @param {Boolean} [useMasonry=true] isotope を行うかの真偽値
   */
  constructor( element:Element, moreElement:Element, ActionClass:Function = null, option:Object = {}, useMasonry:Boolean = true ) {

    option = Safety.object( option );

    super( element, option );

    if ( typeof ActionClass === 'function' ) {
      /**
       * Action instance を設定します
       * @override
       * @type {*}
       */
      this.action = new ActionClass( this.done.bind( this ), this.fail.bind( this ) );

    }
    /**
     * more button root element, 'View More'
     * @type {Element}
     * @protected
     */
    this._moreElement = moreElement;
    /**
     * 取得記事(articles)をArticleDae instance 配列として保存する
     * @type {Array<ArticleDae>}
     * @protected
     */
    this._articles = [];
    /**
     * isotope を行う真偽値
     * @type {boolean}
     * @protected
     */
    this._useMasonry = !!useMasonry;
    /**
     * <p>ArticleDom instance を保持します</p>
     * <p>first render を区別するためにも使用します</p>
     * @type {null|Object}
     * @protected
     */
    this._articleRendered = null;
    /**
     * more button instance を設定します
     * @param {null|Object} more button instance
     */
    this._moreRendered = null;
    /**
     * response.request object を保持する
     * @type {null|Object}
     * @protected
     */
    this._request = null;
    // View へ移動
    // @since 2016-09-16
    // /**
    //  * 表示されているページが home(index) かを識別する flag
    //  * @type {boolean}
    //  * @protected
    //  * @default false
    //  */
    // this._home = false;
    /**
     * category slug
     * @type {string}
     * @protected
     * @default all
     */
    this._slug = 'all';
    /**
     * Ga トラッキングタグを送信済みかを表す真偽値
     * @type {boolean}
     * @protected
     * @default false
     */
    this._gaSend = false;

    /**
     * bind 済み moreButton
     * @type {function}
     * @since 2016-09-28
     */
    this.boundMore = this.moreButton.bind(this);
    /**
     * 初回無限スクロールにしないパターン, クリック後に開始します
     * <pre>
     * 対応は PC版ホームに限り
     * 初回ロード時はVIEW MORE表示
     * VIEW MOREクリックで今の無限スクロールの形（VIEW MORE押す必要なくなる）
     * </pre>
     *
     * @see https://github.com/undotsushin/undotsushin/issues/1141
     * @type {boolean}
     * @since 2016-10-04
     */
    this.afterClick = false;
    /**
     * Scroll instance を保持し<br>
     * [VIEW MORE] button が表示されたら Scroll.SCROLL event を強制発火させます<br>
     * [page top] button の位置を制御するために
     *
     * 読み込み完了時にコンテナ高さが変わりボタンが消えることがあります<br>
     * 高さは変わっても Scroll event が発生しないためです
     * @type {Scroll}
     */
    this.scroll = Scroll.factory();
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * more button root element
   * @return {Element|*} more button root element を返します
   */
  get moreElement():Element {
    return this._moreElement;
  }
  // View へ移動

  // /**
  //  * home flag
  //  * @return {boolean|*} home flag boolean を返します
  //  */
  // get home():Boolean {
  //   return this._home;
  // }
  // /**
  //  * home flag
  //  * @param {Boolean} home flag
  //  */
  // set home( home:Boolean ):void {
  //   this._home = home;
  // }
  /**
   * category slug
   * @default all
   * @return {string} category slug を返します
   */
  get slug():string {
    return this._slug;
  }
  /**
   * category slug を設定します
   * @param {string} categorySlug 設定する category slug
   */
  set slug( categorySlug:string ):void {
    this._slug = categorySlug;
  }
  /**
   * API 取得 JSON.response を ArticleDae instance にし保持する配列
   * @return {Array.<ArticleDae>} API 取得 JSON.response を ArticleDae instance にし保持する配列を返します
   */
  get articlesList():Array<ArticleDae> {
    return this._articles;
  }
  /**
   * Ga トラッキングタグを送信済みかを表す真偽値
   * @return {boolean} Ga トラッキングタグを送信済みかを表す真偽値を返します
   */
  get gaSend():Boolean {
    return this._gaSend;
  }
  /**
   * Ga トラッキングタグを送信済みかを表す真偽値を設定します
   * @param {Boolean} flag Ga トラッキングタグを送信済みかを表す真偽値
   */
  set gaSend( flag:Boolean ):void {
    this._gaSend = flag;
  }
  // -- @since 2016-06-27
  /**
   * isotope を行う真偽値を取得します
   * @return {boolean} isotope を行う真偽値を返します
   */
  get useMasonry():Boolean {
    return this._useMasonry;
  }
  /**
   * ArticleDom instance を取得します
   * @return {Object|null} ArticleDom instance を返します
   */
  get articleRendered():Object {
    return this._articleRendered;
  }
  /**
   * ArticleDom instance を設定します
   * @param {Object|null} rendered ArticleDom instance
   */
  set articleRendered( rendered:Object ):void {
    this._articleRendered = rendered;
  }
  /**
   * more button instance
   * @return {null|Object} more button instance を返します
   */
  get moreRendered():Object {
    return this._moreRendered;
  }
  /**
   * more button instance を設定します
   * @param {null|Object} more button instance
   */
  set moreRendered( more:Object ):void {
    this._moreRendered = more;
  }
  /**
   * response.request object を取得します
   * @return {null|Object|Object|*} response.request object を返します
   */
  get request():Object {
    return this._request;
  }
  /**
   * response.request object を設定します
   * @param {Object|null} requestObject response.request object
   */
  set request( requestObject:Object ):void {
    this._request = requestObject;
  }
  /**
   * 取得記事(articles)をArticleDae instance 配列として 取得します
   * @return {Array.<ArticleDae>} 取得記事(articles)をArticleDae instance 配列として返します
   */
  get articles():Array<ArticleDae> {
    return this._articles;
  }
  /**
   * 取得記事(articles)をArticleDae instance 配列を設定します
   * @param {Array} articles 取得記事(articles)をArticleDae instance 配列
   */
  set articles( articles:Array<ArticleDae> ):void {
    this._articles = articles;
  }
  // ---------------------------------------------------
  //  Method
  // ---------------------------------------------------
  /**
   * Ajax request を開始します
   */
  start():void {

    this.action.next();

  }
  /**
   * Ajax response success
   * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
   */
  done( result:Result ):void {

    let articles = result.articles;
    // console.log( 'ViewArchiveMasonry done ', result );
    if ( typeof articles === 'undefined' ) {

      // articles undefined
      // JSON に問題がある
      let error = new Error( Message.undef('[ARCHIVE:UNDEFINED]') );
      this.executeSafely( View.UNDEFINED_ERROR, error );
      // this.showError( error.message );
      // @since 2016-09-28, error で button を非表示へ
      this.moreButton(false);

    } else if ( articles.length === 0 ) {

      // articles empty
      // request, JSON 取得に問題は無かったが data が取得できなかった
      let error = new Error( Message.empty('[ARCHIVE:EMPTY]') );
      this.executeSafely( View.EMPTY_ERROR, error );
      // this.showError( error.message );
      // @since 2016-09-28, error で button を非表示へ
      this.moreButton(false);

    } else {

      this.request = result.request;
      this.render( articles );

    }

  }
  /**
   * Ajax response error
   * @param {Error} error Error instance
   */
  fail( error:Error ):void {

    this.executeSafely( View.RESPONSE_ERROR, error );
    // @since 2016-09-28, error で button を非表示へ
    this.moreButton(false);
    // ここでエラーを表示させるのは bad idea なのでコールバックへエラーが起きたことを伝えるのみにします
    // this.showError( error.message );

  }
  /**
   * ViewError でエラーコンテナを作成します
   * @param {string} message エラーメッセージ
   */
  showError( message:string = '' ):void {

    // message = Safety.string( message, '' );
    //
    // // ToDo: Error 時の表示が決まったら変更する
    // let error = new ViewError( this.element, this.option, message );
    // error.render();

  }
  /**
   * dom を render します
   * @param {Array} articles JSON responce.articles
   */
  render( articles:Array ):void {
    //
    // // Masonry flag
    // // let useMasonry = this._useMasonry;
    //
    // // 既存データ用のglobal配列
    // let articlesList = this.articles;
    //
    // // 前回までの配列length
    // // sequence な index のために必要
    // let prevLast = this.articles.length;
    //
    // // 記事挿入 root element
    // let element = this.element;
    // // 'View More' button root element
    // let moreElement = this.moreElement;
    // // offset, length を使用する Action
    // // let action = this.action;
    // // 参照を保持
    // let _this = this;
    //
    // // --------------------------------------------
    // // More button
    // // --------------------------------------------
    // /**
    //  * MORE VIEW button
    //  * @protected
    //  * @type {ReactClass}
    //  */
    // let MoreViewDom = React.createClass( {
    //   propTypes: {
    //     show: React.PropTypes.bool.isRequired,
    //     action: React.PropTypes.object.isRequired,
    //     loading: React.PropTypes.string
    //   },
    //   getDefaultProps: function() {
    //     return {
    //       loading: ''
    //     };
    //   },
    //   getInitialState: function() {
    //     /**
    //      * Rise instance を保持する
    //      * @protected
    //      * @type {null|Rise}
    //      * */
    //     this.rise = null;
    //
    //     return {
    //       disable: false,
    //       show: this.props.show,
    //       loading: this.props.loading
    //     };
    //   },
    //   render: function() {
    //
    //     // hasNext: true, button を表示する？
    //     if ( this.state.show ) {
    //
    //       return (
    //         <div id="more" className={'board-btn-viewmore loading-root ' + this.state.loading}>
    //           <a className="board-btn-viewmore-link" href={'#more'} onClick={this.handleClick} ><span>{Message.BUTTON_VIEW_MORE}</span></a>
    //           <span className="loading-spinner">&nbsp;</span>
    //         </div>
    //       );
    //
    //     } else {
    //
    //       // button 表示なし
    //       return (
    //         <div className="no-more"></div>
    //       );
    //
    //     }
    //
    //   },
    //   componentDidMount: function() {
    //
    //     if ( this.state.show && this.rise === null ) {
    //       // mount 後
    //       // button が表示されているなら rise 監視を始める
    //       this.rise = new Rise( element );
    //       this.rise.on( Rise.RISE, this.onRise );
    //       this.rise.start();
    //     }
    //
    //   },
    //   componentWillUnmount: function() {
    //     // unmount 時に rise 破棄を行う
    //     this.destroy();
    //   },
    //   // -----------------------------------------
    //   // button 関連 custom method
    //   // rise 関連 event を破棄する
    //   destroy: function() {
    //     // rise 監視を破棄する
    //     if ( this.rise !== null ) {
    //       this.rise.stop();
    //       this.rise.off( Rise.RISE, this.onRise );
    //       this.rise = null;
    //     }
    //   },
    //   // 緊急用, button click を残す
    //   handleClick: function( event:Event ) {
    //     event.preventDefault();
    //     // disable
    //     // this.setState( { loading: ' loading' } );
    //     // action.next();
    //     this.onRise();
    //   },
    //   // button 表示・非表示
    //   updateShow: function( show:Boolean ) {
    //
    //     if ( !show ) {
    //       // button を非表示にするので rise 監視を止める
    //       this.destroy();
    //     } else {
    //       // button 表示, loading 表示を止める
    //       this.updateLoading( false );
    //     }
    //
    //     this.setState( { show: show } );
    //
    //   },
    //   // loading 表示 on / off
    //   // on: true, off: false
    //   updateLoading: function( loading:Boolean = false ) {
    //
    //     let loadingClass = '';
    //     if ( loading && this.rise !== null ) {
    //
    //       // loading 中は監視を止める
    //       loadingClass = ' loading';
    //       this.rise.stop();
    //       this.props.action.next();
    //
    //     } else {
    //
    //       // loading が終わると監視開始
    //       this.rise.start();
    //
    //     }
    //
    //     // loading 表示のための css class を追加・削除
    //     this.setState( {loading: loadingClass} );
    //
    //   },
    //   // Rise.RISE event handler
    //   // 次 offset JSON を取得する
    //   onRise: function():void {
    //     // console.log( '========================== onRise ', event );
    //     this.updateLoading( true );
    //   }
    // } );
    //
    // // more button 作成関数
    // // ArchiveDom から呼び出す
    // let moreButton = ( show:Boolean ) => {
    //
    //   show = !!show;
    //   // moreElement 存在チェックを行う
    //   // Element 型を保証する
    //   // _moreRendered が null の時のみ, instance があれば state を update する
    //   // if ( Safety.isElement( moreElement ) && _this._moreRendered === null ) {
    //   if ( _this._moreRendered === null ) {
    //   // if ( moreElement !== null && typeof moreElement !== 'undefined' && 'appendChild' in moreElement ) {
    //
    //     // チェックをパスし実行する
    //     _this._moreRendered = ReactDOM.render(
    //       React.createElement( MoreViewDom, { show: show, action: _this.action } ),
    //       moreElement
    //     );
    //
    //   } else {
    //
    //     _this._moreRendered.updateShow( show );
    //
    //   }
    //
    // };
    //
    // // --------------------------------------------
    // // COMMENTS Popular second
    // // --------------------------------------------
    // /**
    //  * コメント欄の二段目
    //  * @protected
    //  * @type {ReactClass}
    //  * */
    // let CommentsSecondDom = React.createClass( {
    //   propType: {
    //     seconds: React.PropTypes.array.isRequired,
    //     articleId: React.PropTypes.string.isRequired,
    //     total: React.PropTypes.number.isRequired,
    //     hasSecond: React.PropTypes.bool.isRequired
    //   },
    //   getInitialState: function() {
    //     return {
    //       seconds: this.props.seconds
    //     };
    //   },
    //   render: function() {
    //
    //     if ( !this.props.hasSecond ) {
    //       // 描画要素がない
    //       return <div className="commented-user"></div>;
    //     }
    //
    //     let seconds = this.state.seconds;
    //     let articleId = this.props.articleId;
    //
    //     return (
    //       <div className="commented-user">
    //         <ul className="comments-second">
    //           {
    //             seconds.map( function( commentDae, i ) {
    //
    //               let userDae = commentDae.user;
    //               let picture = Safety.image( userDae.profilePicture, Empty.USER_EMPTY );
    //               let loggedIn = Safety.same( picture, Empty.USER_EMPTY );
    //
    //               // CommentsSecond unique key は  記事Id + user Id を使用する
    //               // 同一ユーザーが複数投稿することがあるため
    //               // render 内で unique なことを保証する必要がある
    //               return (
    //                 <li key={'user-' + articleId + '-' + commentDae.id + '-' + userDae.id + '-' + i} className={'commented-user-item commented-user-item-' + i}>
    //                   <span className={'commented-user-thumb ' + loggedIn}>
    //                     <img src={Empty.refresh(picture)} alt={userDae.userName}/>
    //                   </span>
    //                 </li>
    //               );
    //             } )
    //           }
    //         </ul>
    //         <CommentUserPlusCountNode total={this.props.total} />
    //       </div>
    //     );
    //
    //   }
    // } );
    //
    // // --------------------------------------------
    // // COMMENTS Popular
    // // --------------------------------------------
    //
    // // --------------------------------------------
    // /**
    //  * first + second comment container
    //  * @protected
    //  * @type {ReactClass}
    //  * */
    // let PopularDom = React.createClass( {
    //   propType: {
    //     commentsPopular: React.PropTypes.object.isRequired,
    //     total: React.PropTypes.number.isRequired,
    //     articleId: React.PropTypes.string.isRequired,
    //     uniqueId: React.PropTypes.string.isRequired
    //   },
    //   render: function() {
    //
    //     let commentsPopular = this.props.commentsPopular;
    //     let total = this.props.total;
    //     let articleId = this.props.articleId;
    //
    //     let hasFirst = commentsPopular.hasFirst;
    //     let hasSecond = commentsPopular.hasSecond;
    //     let firstDae = commentsPopular.first;
    //     let secondsDae = commentsPopular.seconds;
    //
    //     if ( hasSecond ) {
    //       // 2件目以降も存在する
    //       // 合計数からアイコン描画数を引く
    //       total -= secondsDae.length;
    //     }
    //
    //     // 1 件 comment があるかをチェクする
    //     if ( hasFirst ) {
    //
    //       // 少なくとも1件は存在する
    //       // 総件数から 1（アイコン描画数） マイナス
    //       total -= 1;
    //       // console.log( '少なくとも1件は存在する ', articleId );
    //
    //       // 1件目コメントデータを取り出し
    //       let first = firstDae;
    //       // 1件目コメント・ユーザー
    //       let firstUser = first.user;
    //       // ユーザーサムネイル
    //       let picture = Safety.image( firstUser.profilePicture, Empty.USER_EMPTY );
    //       let loggedIn = Safety.same( picture, Empty.USER_EMPTY );
    //
    //       // login 済かを調べる
    //       let sign = User.sign;
    //
    //       return (
    //         <div className="comments-popular">
    //           <div className="feature-user comment-item">
    //             <figure className="comment-user">
    //               <span className="comment-user-link">
    //                 <span className={'comment-user-thumb ' + loggedIn}><img src={Empty.refresh(picture)} alt={firstUser.userName}/></span>
    //                 <div className="comment-user-data">
    //                   <p className="comment-user-name">{firstUser.userName}</p>
    //                   <p className="comment-user-job">{firstUser.bio}</p>
    //                 </div>
    //               </span>
    //             </figure>
    //             {/* insert html tag into .comment-content innerHTML */}
    //             <div className="comment-content" dangerouslySetInnerHTML={{__html: first.body}} />
    //             <ReactionNode
    //               uniqueId={this.props.uniqueId}
    //               articleId={String(articleId)}
    //               commentId={String(first.id)}
    //               sign={sign}
    //               good={first.good}
    //               bad={first.bad}
    //               isGood={first.isGood}
    //               isBad={first.isBad}
    //               activate={false}
    //             />
    //           </div>
    //           <CommentsSecondDom
    //             seconds={secondsDae}
    //             articleId={articleId}
    //             total={total}
    //             hasSecond={hasSecond}
    //           />
    //         </div>
    //       );
    //
    //     } else {
    //
    //       // 描画するべきものがない
    //       return null;
    //
    //     }
    //
    //   }/* , // render
    //   componentDidMount: function() {
    //     // mount
    //   }*/
    // } );
    //
    // // ------------------------------------------------
    // // 基点 React class
    // // ------------------------------------------------
    // /**
    //  * 記事一覧のサムネイル
    //  * @protected
    //  * @type {ReactClass}
    //  */
    // let ThumbnailDom = React.createClass( {
    //   propType: {
    //     mediaType: React.PropTypes.string.isRequired,
    //     thumbnail: React.PropTypes.string.isRequired,
    //     title: React.PropTypes.string.isRequired,
    //     masonry: React.PropTypes.bool.isRequired,
    //     action: React.PropTypes.object.isRequired,
    //     recommend: React.PropTypes.bool.isRequired
    //   },
    //   getInitialState: function() {
    //     return {
    //       mediaType: this.props.mediaType,
    //       thumbnail: this.props.thumbnail,
    //       title: this.props.title
    //     };
    //   },
    //   render: function() {
    //     let mediaType = this.props.mediaType;
    //
    //     let recommend = '';
    //     if ( this.props.recommend ) {
    //       recommend = <i className="post-label_recommend">おすすめ記事</i>;
    //     }
    //
    //     // media type で thumbnail 切替
    //     if ( mediaType === MediaType.IMAGE ) {
    //       // type: image
    //       return (
    //         <figure className={'post-thumb post-thumb-' + mediaType}>
    //           <img src={this.props.thumbnail} alt={this.props.title}/>
    //           {recommend}
    //         </figure>
    //       );
    //     } else if ( mediaType === MediaType.VIDEO ) {
    //       // type: video
    //       return (
    //         <figure className={'post-thumb post-thumb-' + mediaType}>
    //           <img className="video-thumbnail" src={this.props.thumbnail} alt={this.props.title}/>
    //           <img className="post-thumb-overlay-movie type-movie" src={Empty.VIDEO_PLAY} alt="" />
    //           {recommend}
    //         </figure>
    //       );
    //     } else {
    //       // 該当なし
    //       return null;
    //     }
    //   }
    // } );
    //
    // /**
    //  * 個別の 記事Dom
    //  * @protected
    //  * @type {ReactClass}
    //  */
    // let ArticleDom = React.createClass( {
    //   propTypes: {
    //     list: React.PropTypes.array.isRequired,
    //     // request offset
    //     offset: React.PropTypes.number.isRequired,
    //     // request length
    //     length: React.PropTypes.number.isRequired,
    //
    //     // action instance
    //     action: React.PropTypes.object.isRequired
    //   },
    //   getInitialState: function() {
    //     /**
    //      * Isotope instance
    //      * @protected
    //      * @type {null|Isotope}
    //      */
    //     this.isotope = null;
    //     /**
    //      * imagesLoaded instance
    //      * @protected
    //      * @type {null|imagesLoaded}
    //      */
    //     this.img = null;
    //     /**
    //      * 読み込んだelementを保持する配列
    //      * @protected
    //      * @type {Array}
    //      */
    //     this.elements = [];
    //
    //     return {
    //       arranged: 'prepare',
    //       list: this.props.list,
    //       offset: this.props.offset,
    //       length: this.props.length
    //     };
    //   },
    //   render: function() {
    //
    //     // console.log( '****************************************** render' );
    //     // dom出力する
    //     return (
    //       <div ref="boardRout" className="board-large-column">
    //         {
    //           // loop start
    //           this.state.list.map( function( dae, i ) {
    //
    //             let commentsPopular = dae.commentsPopular;
    //             let commentsTotal = dae.commentsCount;
    //             let thumbnail = Safety.image( dae.media.images.medium, Empty.IMG_MIDDLE );
    //
    //             // let category = ( label ):string => {
    //             //   return !label ? '' : <span className="category-label">{label}</span>;
    //             // };
    //
    //             // unique key(React)にarticle id(number)記事Idを使用します
    //             return (
    //               <div key={'archive-' + dae.id} className={`board-item board-item-${i} board-item-${dae.mediaType}`}>
    //                 <a className="post" href={dae.url}>
    //                   <ThumbnailDom
    //                     mediaType={dae.mediaType}
    //                     thumbnail={thumbnail}
    //                     title={dae.title}
    //                     recommend={!!dae.isRecommend && _this.home}
    //                   />
    //                   <div className="post-data">
    //                     <p className={'post-category post-category-' + dae.categories.all[ 0 ].slug}>
    //                       <CategoryLabelNode
    //                         categories={dae.categories.all}
    //                         id={`post-archive-${dae.id}`}
    //                         index={i}
    //                       />
    //                     </p>
    //                     <h3 className="post-heading">{dae.title}</h3>
    //                     <p className="post-date">{dae.displayDate}</p>
    //                     <div className="post-excerpt-text">{dae.description}</div>
    //                   </div>
    //                 </a>
    //                 <PopularDom
    //                   key={'comment-' + dae.id}
    //                   uniqueId={'comment-' + dae.id}
    //                   commentsPopular={commentsPopular}
    //                   total={commentsTotal}
    //                   articleId={String(dae.id)}
    //                 />
    //               </div>
    //             );
    //             // loop end
    //           } )
    //         }
    //       </div>
    //     );
    //
    //   },
    //   // state 変更し dom が更新された後に呼び出される delegate
    //   componentDidUpdate: function() {
    //     // console.log( '+++++++++ componentDidUpdate' );
    //
    //     // isotope 対象 children
    //     let boardRout = ReactDOM.findDOMNode(this.refs.boardRout);
    //     let childNodes = boardRout.childNodes;
    //     let elements = [];
    //     // 追加された Element を取得するための start / end point
    //     // start は request offset
    //     let i = this.state.offset;
    //     // end は request offset へ request length を加算したものと
    //     // children length の小さい方
    //     let limit = Math.min( i + this.state.length, childNodes.length );
    //     // console.log( 'start - end ', i + '-' + limit );
    //
    //     // start / end から 対象 children を選別
    //     for ( ; i < limit; i++ ) {
    //       elements.push( childNodes[ i ] );
    //     }
    //
    //     this.elements = elements;
    //
    //     let img = imagesLoaded( elements );
    //     // 画像読み込む完了 event へ bind します
    //     img.on( 'always', this.appendImages );
    //     this.img = img;
    //
    //   },
    //   // dom が表示された後に1度だけ呼び出される delegate
    //   componentDidMount: function() {
    //
    //     // after mount
    //     _this.executeSafely( View.DID_MOUNT );
    //     // hasNext を元に More View button の表示非表示を決める
    //     moreButton( this.props.action.hasNext() );
    //
    //     // masonry flag が true の時に shouldMasonry を実行します
    //     if ( this.props.masonry ) {
    //
    //       this.shouldMasonry();
    //
    //     }
    //
    //   },
    //   // dom が削除される前に呼び出される delegate
    //   componentWillUnmount: function() {
    //     // unmount 時に isotope を破棄します
    //     this.isotope.destroy();
    //   },
    //   // -----------------------------------------------------
    //   // 以降 custom
    //   // isotope 前準備
    //   shouldMasonry: function() {
    //
    //     // isotope 前準備を実行します
    //     let boardRout = ReactDOM.findDOMNode(this.refs.boardRout);
    //     let childNodes = boardRout.childNodes;
    //
    //     // imagesLoaded を使用し画像ロード完了後に isotope を実行します
    //     let img = imagesLoaded( childNodes );
    //     // img {imagesLoaded} always event handler unbind するためにインスタンスを保存します
    //     this.img = img;
    //     // 画像読み込む完了 event へ bind します
    //     img.on( 'always', this.onImages );
    //
    //   },
    //   // 画像読み込む完了 event handler, isotope を実行
    //   onImages: function() {
    //
    //     // event から event handler を unbind します
    //     this.img.off( 'always', this.onImages );
    //
    //     // isotope を行います
    //     let boardRout = ReactDOM.findDOMNode(this.refs.boardRout);
    //     this.isotope = new Isotope( boardRout, {
    //       itemSelector: '.board-item',
    //       masonry: {
    //         // gutter: 30
    //         // 2016-04-29
    //         gutter: 28
    //       }
    //     } );
    //
    //   },
    //   updateList: function( list, offset, length ) {
    //     // state を変更し appendChild + isotope を行う
    //     this.setState( { list: list, offset: offset, length: length } );
    //   },
    //   // didUpdate から呼び出される
    //   appendImages: function() {
    //
    //     // event から event handler を unbind します
    //     this.img.off( 'always', this.appendImages );
    //
    //     // 追加とレイアウト
    //     this.isotope.appended( this.elements );
    //     // reload
    //     // http://isotope.metafizzy.co/methods.html#reloaditems
    //     this.isotope.reloadItems();
    //     // isotope 再度レイアウト
    //     this.isotope.layout();
    //
    //     // hasNext を元に More View button の表示非表示を決める
    //     moreButton( this.props.action.hasNext() );
    //
    //   }
    // } );// ArticleDom
    //
    // // ------------------------------------------------
    // // 既存配列に新規JSON取得データから作成した ArticleDae instance を追加する
    // articles.forEach( function( article, i ) {
    //
    //   let dae = new ArticleDae( article );
    //   // console.log( 'dae ', dae );
    //   dae.index = prevLast + i;
    //   articlesList.push( dae );
    //
    // } );
    //
    // // 通知
    // this.executeSafely( View.BEFORE_RENDER, articlesList );

    // // this._articleRendered が null の時だけ ReactDOM.render する
    // if ( this.articleRendered === null ) {
    //
    //   // dom 生成後 instance property '_articleRendered' へ ArticleDom instance を保存する
    //   this.articleRendered = ReactDOM.render(
    //     React.createElement( ArticleDom, { list: articlesList, offset: this.request.offset, length: this.request.length, masonry: this.useMasonry, action: this.action } ),
    //     element
    //   );
    //
    // } else {
    //
    //   // instance が存在するので
    //   // state update でコンテナを追加する
    //   this.articleRendered.updateList( articlesList, this.request.offset, this.request.length );
    //
    // }
    // console.log('---------------------- infinite');
    // ------------------------------------------------
    // @since 2016-09-15
    // 既存データ用のglobal配列
    const articlesList = this.articles;

    // 前回までの配列length
    // sequence な index のために必要
    const prevLast = this.articles.length;

    // 記事挿入 root element
    const element = this.element;
    // ------------------------------------------------

    // 通知
    this.executeSafely( View.BEFORE_RENDER, articlesList );

    // ------------------------------------------------
    // 既存配列に新規JSON取得データから作成した ArticleDae instance を追加する
    articles.forEach((article, i) => {
      const dae = new ArticleDae(article);
      // console.log( 'dae ', dae );
      dae.index = prevLast + i;
      articlesList.push( dae );
    } );

    // this._articleRendered が null の時だけ ReactDOM.render する
    if (this.articleRendered === null ) {
      // dom 生成後 instance property '_articleRendered' へ ArticleDom instance を保存する
      this.articleRendered = ReactDOM.render(
        <ComponentArticlesMasonryInfinite
          list={articlesList}
          home={this.home}
          offset={this.request.offset}
          length={this.request.length}
          action={this.action}
          callback={this.executeSafely.bind(this)}
          boundMore={this.moreButton.bind(this)}
          masonry={this.useMasonry}
        />,
        element
      );

      if ( this.home ) {
        // ----------------------------------------------
        // GA 計測タグ
        // 記事一覧表示 / view more 部分 ※ 初期読み込み成功後に eventLabel:1として送信
        Ga.add( new GaData('ViewArchiveMasonryInfinite.render', 'home_articles', 'view - new', String(1), 0, true) );
        // ----------------------------------------------
      } else {
        // ----------------------------------------------
        // GA 計測タグ
        // PC/スマホカテゴリー一覧の新着記事
        Ga.add( new GaData('ViewArchiveMasonryInfinite.render', `${this.slug}_articles`, 'view - new', String(1), 0, true) );
        // ----------------------------------------------
      }
    } else {
      // instance が存在するので
      // state update でコンテナを追加する
      this.articleRendered.updateList(articlesList, this.request.offset, this.request.length);
    }
  }// render
  /**
   * more button の表示・非表示を行います
   * @since 2016-09-16
   * @param {boolean} show true の時にボタンを表示させ機能させます
   */
  moreButton(show) {
    // console.log('====== moreButton ======', show);
    // 'View More' button root element
    const moreElement = this.moreElement;
    // moreElement 存在チェックを行う
    // Element 型を保証する
    // moreRendered が null の時のみ instance を作成し
    // instance があれば state を update する
    if (this.moreRendered === null) {
      this.moreRendered = ReactDOM.render(
        <ComponentMoreButton
          show={show}
          action={this.action}
          element={moreElement}
          home={this.home}
          slug={this.slug}
          afterClick={this.afterClick}
        />,
        moreElement
      );
    } else {
      this.moreRendered.updateShow(show);
    }

    this.scroll.fire();
  }
}// class
