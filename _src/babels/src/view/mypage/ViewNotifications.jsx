/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/29 - 13:38
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// view
import View from '../View';
// action
import {Notice} from '../../action/users/Notice';
// app
// import {Empty} from '../../app/const/Empty';
// import {NoticeAction} from '../../app/const/NoticeAction';
import {Message} from '../../app/const/Message';
// dae
import {NotificationsDae} from '../../dae/user/NotificationsDae';
// import {NoticeDae} from '../../dae/user/NoticeDae';
// // data
// import {Safety} from '../../data/Safety';
// import {Result} from '../../data/Result';
// event
import {NoticeStatus} from '../../event/NoticeStatus';
// model
import {ModelNoticeRead} from '../../model/notice/ModelNoticeRead';
import ComponentMypageMoreButton from '../../component/mypage/ComponentMypageMoreButton';
import ComponentNotifications from '../../component/mypage/ComponentNotifications';

// React
/* eslint-disable no-unused-vars */
/**
 * [library] - React
 */
const React = self.React;
/* eslint-enable no-unused-vars */
/**
 * [library] - ReactDOM
 */
const ReactDOM = self.ReactDOM;

/**
 * my page お知らせ 一覧
 */
export default class ViewNotifications extends View {
  /**
   * my page お知らせ 一覧を表示 + infinite scroll
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {Object} [option={}] optional event handler
   */
  constructor(element, moreElement, option = {}) {
    super(element, option);
    // ---
    /**
     * Action instance を設定します
     * @override
     * @type {Notice}
     */
    this.action = new Notice(this.done.bind(this), this.fail.bind(this));
    /**
     * more button root element, 'View More'
     * @type {Element}
     * @protected
     */
    this._moreElement = moreElement;
    /**
     * 取得記事(articles)をArticleDae instance 配列として保存する
     * @type {Array<ArticleDae>}
     * @private
     */
    this._articles = [];
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
    /**
     * NoticeStatus instance
     * @type {NoticeStatus}
     * @private
     */
    this.status = NoticeStatus.factory();
    /**
     * bind 済み this.onNoticeUpdate event handler
     * @type {Function}
     */
    this.onNoticeUpdate = this.onNoticeUpdate.bind(this);
    /**
     * <p>既読にする</p>
     * ModelNoticeRead instance
     * @type {ModelNoticeRead}
     */
    this.modelNotice = new ModelNoticeRead();
    /**
     * bind afterUpdate
     * @type {function}
     * @since 2017-12-14
     */
    this.afterUpdate = this.afterUpdate.bind(this);
    /**
     * bind onMount
     * @type {function}
     * @since 2017-12-14
     */
    this.onMount = this.onMount.bind(this);
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * @return {Element} more button root element を返します
   */
  get moreElement() {
    return this._moreElement;
  }
  // ---------------------------------------------------
  //  Method
  // ---------------------------------------------------
  /**
   * Ajax request を開始します
   */
  start() {
    this.action.next();
  }
  /**
   * Ajax response success
   * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
   */
  done(result) {
    const response = result.response;
    // console.log('ViewNotifications.done', result);
    if (typeof response === 'undefined') {
      // articles undefined
      // JSON に問題がある
      const error = new Error(Message.undef('[NOTIFICATIONS:UNDEFINED]'));
      this.executeSafely(View.UNDEFINED_ERROR, error);
      // this.showError( error.message );
    } else {
      const notificationsDae = new NotificationsDae(response);
      if (notificationsDae.notifications.length === 0) {
        // 配列が空
        const error = new Error(Message.empty('[NOTIFICATIONS:EMPTY]'));
        this.executeSafely(View.EMPTY_ERROR, error);
      } else {
        this._request = result.request;
        this.render(notificationsDae.notifications);
      }
    }
  }
  /**
   * Ajax response error
   * @param {Error} error Error instance
   */
  fail(error) {
    // console.log('ViewNotifications.fail', error);
    this.executeSafely(View.RESPONSE_ERROR, error);
    // ここでエラーを表示させるのは bad idea なのでコールバックへエラーが起きたことを伝えるのみにします
    // this.showError( error.message );
  }
  /**
   * お知らせ一覧
   * @param {Array.<NoticeDae>} articles notificationsDae.notifications
   */
  render(articles) {
    // // 既存データ用のglobal配列
    // let articlesList = this._articles;
    //
    // // 前回までの配列length
    // // sequence な index のために必要
    // let prevLast = this._articles.length;
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
    //     /*
    //     // Rise instance を保持する
    //     this.rise = null;
    //     */
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
    //           <div className="loading-spinner" />
    //         </div>
    //       );
    //
    //     } else {
    //
    //       // button 表示なし
    //       return (
    //         <div className="no-more" />
    //       );
    //
    //     }
    //
    //   },
    //   // -----------------------------------------
    //   // button 関連 custom method
    //   // 緊急用, button click を残す
    //   handleClick: function( event:Event ) {
    //     event.preventDefault();
    //
    //     this.setState( { loading: ' loading' } );
    //     this.props.action.next();
    //   },
    //   // button 表示・非表示
    //   updateShow: function( show:Boolean ) {
    //
    //     this.setState( { show: show, loading: '' } );
    //
    //   }
    // } );
    //
    // // more button 作成関数
    // // ArchiveDom から呼び出す
    // let moreButton = ( show:Boolean, action ) => {
    //
    //   // console.log( 'moreButton ', show, moreElement );
    //   show = !!show;
    //   // _moreRendered が null の時のみ, instance があれば state を update する
    //   // if ( Safety.isElement( moreElement ) && _this._moreRendered === null ) {
    //   if ( _this._moreRendered === null ) {
    //     // if ( moreElement !== null && typeof moreElement !== 'undefined' && 'appendChild' in moreElement ) {
    //
    //     // チェックをパスし実行する
    //     _this._moreRendered = ReactDOM.render(
    //       React.createElement( MoreViewDom, { show: show, action: action } ),
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
    // // お知らせ line
    // // --------------------------------------------
    // let MessageDom = React.createClass( {
    //   propType: {
    //     dae: React.PropTypes.object.isRequired
    //   },
    //   render: function() {
    //
    //     let notice = this.props.dae;
    //     /*
    //     let loggedIn = 'user-logged-in';
    //
    //     let icon = notice.user.profilePicture;
    //     if ( !icon ) {
    //       icon = Empty.USER_EMPTY;
    //       loggedIn = '';
    //     } else if ( !Safety.isImg( icon ) ) {
    //       // 画像ファイル名に拡張子がないのがあったので
    //       // 拡張子チェックを追加
    //       if ( !Safety.isGraph( icon ) ) {
    //         icon = Empty.USER_EMPTY;
    //       }
    //       loggedIn = '';
    //     }
    //     */
    //     let icon = Safety.image( notice.user.profilePicture, Empty.USER_EMPTY );
    //     let loggedIn = Safety.same( icon, Empty.USER_EMPTY );
    //
    //     switch ( notice.action ) {
    //
    //       // 本来は reply だった
    //       // API が comment と間違えているのでしょうがなく追加した
    //       case 'comment':
    //       case 'reply':
    //         return (
    //           <a href={notice.article.reply.url} className="info-link">
    //             <figure className={'info-user-thumb ' + loggedIn}>
    //               <img src={Empty.refresh(icon)} alt=""/>
    //             </figure>
    //             <div className="info-content">
    //               {notice.user.userName}さんがあなたの「{notice.article.title}」へのコメントに<strong>{NoticeAction.message( notice.action )}</strong>しました。
    //             </div>
    //             <p className="act-date">{notice.displayDate}</p>
    //           </a>
    //         );
    //
    //       case 'bad':
    //       case 'good':
    //         return (
    //           <a href={notice.article.comments.url} className="info-link">
    //             <figure className={'info-user-thumb ' + loggedIn}>
    //               <img src={icon} alt=""/>
    //             </figure>
    //             <div className="info-content">
    //               {notice.user.userName}さんがあなたの「{notice.article.title}」へのコメントに<strong>{NoticeAction.message( notice.action )}</strong>しました。
    //             </div>
    //             <p className="act-date">{notice.displayDate}</p>
    //           </a>
    //         );
    //
    //       case 'notice':
    //         return (
    //           <a href={notice.url} className="info-link">
    //             <div className="activity-content">
    //               {notice.body}
    //             </div>
    //             <p className="act-date">{notice.displayDate}</p>
    //           </a>
    //         );
    //
    //       default:
    //         // console.warn(`illegal action.${notice.action}`);
    //         return null;
    //
    //     }
    //
    //   }
    // } );
    //
    // // --------------------------------------------
    // // お知らせ親
    // // --------------------------------------------
    // // ReactClass
    // let NotificationsDom = React.createClass( {
    //   propType: {
    //     // 表示リスト
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
    //
    //     return {
    //       list: this.props.list,
    //       offset: this.props.offset,
    //       length: this.props.length
    //     };
    //   },
    //   render: function() {
    //
    //     return (
    //
    //       <div className="info">
    //         <ul className="info-list">
    //           {
    //             // loop start
    //             this.state.list.map( function( dae ) {
    //
    //               return (
    //                 <li key={'info-' + dae.id} className={'info-item info-item-' + dae.id}>
    //                   <MessageDom dae={dae} />
    //                 </li>
    //               );
    //             } )// map
    //           }
    //         </ul>
    //       </div>
    //     );
    //
    //   },
    //   // did mount
    //   // hasNext を元に More View button の表示非表示を決める
    //   componentDidMount: function() {
    //     // console.log( 'hasNext ', this.props.action.hasNext() );
    //     _this.onMount();
    //     moreButton( this.props.action.hasNext(), this.props.action );
    //   },
    //   /*
    //   componentWillUnMount: function() {
    //
    //   },
    //   */
    //   // 外部呼び出し口
    //   // instance を使い update します
    //   updateList: function( list, offset, length ) {
    //     this.setState( { list: list, offset: offset, length: length } );
    //     // hasNext を元に More View button の表示非表示を決める
    //     moreButton( this.props.action.hasNext(), this.props.action );
    //   }
    //
    // } );
    //
    // // ------------------------------------------------
    // // 既存配列に新規JSON取得データから作成した ArticleDae instance を追加する
    // articles.forEach( function( article, i ) {
    //
    //   // dae.index = prevLast + i;
    //   article.index = prevLast + i;
    //   // articlesList.push( dae );
    //   articlesList.push( article );
    //
    // } );
    //
    // // 通知
    // this.executeSafely( View.BEFORE_RENDER, articlesList );
    //
    // // this._articleRendered が null の時だけ ReactDOM.render する
    // if ( this._articleRendered === null ) {
    //
    //   // dom 生成後 instance property '_articleRendered' へ ArticleDom instance を保存する
    //   this._articleRendered = ReactDOM.render(
    //     React.createElement( NotificationsDom, { list: articlesList, offset: this._request.offset, length: this._request.length, action: this.action } ),
    //     element
    //   );
    //
    // } else {
    //
    //   // instance が存在するので
    //   // state update でコンテナを追加する
    //   this._articleRendered.updateList( articlesList, this._request.offset, this._request.length );
    //
    // }

    // 既存データ用のglobal配列
    const articlesList = this._articles;
    // 前回までの配列length
    // sequence な index のために必要
    const prevLast = this._articles.length;
    articles.map((article, i) => {
      article.index = prevLast + i;
      articlesList.push( article );
      return article;
    });
    // console.log('ViewNotifications.render articlesList', articlesList);
    ReactDOM.render(
      <ComponentNotifications
        list={articlesList}
        afterUpdate={this.afterUpdate}
        afterMount={this.onMount}
      />,
      this.element,
    );

    // 読み込みが終わったら 既読 にする
    this.clear();
  }
  /**
   * NoticeStatus.UPDATE_COUNT event handler
   * @param {Object} event NoticeStatus.UPDATE_COUNT event object, event.count が 0 以外の時に reload します
   */
  onNoticeUpdate(event) {
    // お知らせ件数が0の時はreloadしない
    if (event.count !== 0) {
      this.reload();
    }
  }
  /**
   * 再読み込み
   */
  reload() {
    // 既存リストを空にする
    this._articles = [];
    // ajax start
    this.action.reload();
  }
  /**
   * 既読にする
   */
  clear() {
    this.modelNotice.start();
  }
  /**
   * NoticeStatus.UPDATE_COUNT unbind
   */
  dispose() {
    this.status.off(NoticeStatus.UPDATE_COUNT, this.onNoticeUpdate);
  }
  /**
   * main dom が mount されたら呼び出されます
   * componentDidMount callback
   */
  onMount() {
    // console.log('ViewNotifications.onMount');
    // const status = NoticeStatus.factory();
    // this.status = status;
    this.dispose();
    // お知らせカウントがアップデートされたら再読み込みを行うので bind する
    this.status.on(NoticeStatus.UPDATE_COUNT, this.onNoticeUpdate);
  }
  /**
   * {@link ComponentActivities} 更新後に実行される callback - more button 表示・非表示します
   * @since 2017-12-14
   */
  afterUpdate() {
    // console.log('ViewActivities.afterUpdate', this.action.hasNext());
    this.moreButton(this.action.hasNext());
  }
  /**
   * {@link ComponentMypageMoreButton} 出力します
   * @param {boolean} show true: 表示します
   * @since 2017-12-
   */
  moreButton(show = false) {
    // console.log('ViewActivities.moreButton', show);
    ReactDOM.render(
      <ComponentMypageMoreButton
        show={show}
        loading=""
        action={this.action}
      />,
      this.moreElement,
    );
  }
}