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


import {View} from '../View';
import {ViewError} from '../error/ViewError';

import {Activities} from '../../action/mypage/Activities';

// app
import {Message} from '../../app/const/Message';

// data
import {Result} from '../../data/Result';
import {Safety} from '../../data/Safety';

// dae
// import {ArticleDae} from '../../dae/ArticleDae';
import {ActivitiesDae} from '../../dae/user/ActivitiesDae';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;
/**
 * my page bookmark 一覧
 */
export class ViewActivities extends View {
  /**
   * my page bookmark 一覧を表示 + infinite scroll
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {Object} [option={}] optional event handler
   */
  constructor( element:Element, moreElement:Element, option:Object = {} ) {
    super( element, option );
    /**
     * Action instance を設定します
     * @override
     * @type {Activities}
     */
    this.action = new Activities( this.done.bind( this ), this.fail.bind( this ) );
    /**
     * more button root element, 'View More'
     * @type {Element}
     * @private
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
     * @private
     */
    this._articleRendered = null;
    /**
     * more button instance を保持します
     * @type {null|Object}
     * @private
     */
    this._moreRendered = null;
    /**
     * response.request object を保持する
     * @type {null|Object}
     * @private
     */
    this._request = null;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * @return {Element|*} more button root element を返します
   */
  get moreElement():Element {
    return this._moreElement;
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

    let activities = result.response.activities;

    if ( typeof activities === 'undefined' ) {

      // articles undefined
      // JSON に問題がある
      let error = new Error( Message.undef('[ACTIVITIES:UNDEFINED]') );
      this.executeSafely( View.UNDEFINED_ERROR, error );
      // this.showError( error.message );

    } else if ( activities.length === 0 ) {

      // articles empty
      // request, JSON 取得に問題は無かったが data が取得できなかった
      let error = new Error( Message.empty('[ACTIVITIES:EMPTY]') );
      this.executeSafely( View.EMPTY_ERROR, error );
      // this.showError( error.message );

    } else {

      this._request = result.request;
      let dae = new ActivitiesDae( result.response );
      this.render( dae.activities );

    }

  }
  /**
   * Ajax response error
   * @param {Error} error Error instance
   */
  fail( error:Error ):void {

    this.executeSafely( View.RESPONSE_ERROR, error );
    // ここでエラーを表示させるのは bad idea なのでコールバックへエラーが起きたことを伝えるのみにします
    // this.showError( error.message );

  }
  /**
   * ViewError でエラーコンテナを作成します
   * @param {string} message エラーメッセージ
   */
  showError( message:string = '' ):void {

    message = Safety.string( message, '' );

    // ToDo: Error 時の表示が決まったら変更する
    let error = new ViewError( this.element, this.option, message );
    error.render();

  }
  /**
   * dom を render します
   * @param {Array} articles JSON responce.articles
   */
  render( articles:Array ):void {
    // 既存データ用のglobal配列
    let articlesList = this._articles;

    // 前回までの配列length
    // sequence な index のために必要
    let prevLast = this._articles.length;

    // 記事挿入 root element
    let element = this.element;
    // 'View More' button root element
    let moreElement = this.moreElement;
    // offset, length を使用する Action
    // let action = this.action;
    // 参照を保持
    let _this = this;

    // --------------------------------------------
    // More button
    // --------------------------------------------
    /**
     * more button
     * @private
     * @type {*|Function|ReactClass}
     */
    let MoreViewDom = React.createClass( {
      propTypes: {
        show: React.PropTypes.bool.isRequired,
        action: React.PropTypes.object.isRequired,
        loading: React.PropTypes.string
      },
      getDefaultProps: function() {
        return {
          loading: ''
        };
      },
      getInitialState: function() {
        // Rise instance を保持する
        /**
         * Rise instance
         * @private
         * @type {null|Rise}
         */
        this.rise = null;

        return {
          disable: false,
          show: this.props.show,
          loading: this.props.loading
        };
      },
      render: function() {

        // hasNext: true, button を表示する？
        if ( this.state.show ) {

          return (
            <div id="more" className={'board-btn-viewmore loading-root ' + this.state.loading}>
              <a className="board-btn-viewmore-link" href={'#more'} onClick={this.handleClick} ><span>{Message.BUTTON_VIEW_MORE}</span></a>
              <div className="loading-spinner" />
            </div>
          );

        } else {

          // button 表示なし
          return (
            <div className="no-more" />
          );

        }

      },
      /*
      componentDidMount: function() {

      },
      */
      componentWillUnmount: function() {
        // unmount 時に rise 破棄を行う
        this.destroy();
      },
      // -----------------------------------------
      // button 関連 custom method
      // rise 関連 event を破棄する
      destroy: function() {

      },
      // 緊急用, button click を残す
      handleClick: function( event:Event ) {
        event.preventDefault();

        this.setState( { loading: ' loading' } );
        this.props.action.next();
      },
      // button 表示・非表示
      updateShow: function( show:Boolean ) {

        this.setState( { show: show, loading: '' } );

      }
    } );

    // more button 作成関数
    // ArchiveDom から呼び出す
    let moreButton = ( show:Boolean, action ) => {

      show = !!show;
      // _moreRendered が null の時のみ, instance があれば state を update する
      // if ( Safety.isElement( moreElement ) && _this._moreRendered === null ) {
      if ( _this._moreRendered === null ) {
        // if ( moreElement !== null && typeof moreElement !== 'undefined' && 'appendChild' in moreElement ) {

        // チェックをパスし実行する
        _this._moreRendered = ReactDOM.render(
          React.createElement( MoreViewDom, { show: show, action: action } ),
          moreElement
        );

      } else {

        _this._moreRendered.updateShow( show );

      }

    };

    // --------------------------------------------
    // activities 親
    // --------------------------------------------
    let MessageDom = React.createClass( {
      propType: {
        dae: React.PropTypes.object.isRequired
      },
      render: function() {

        let dae = this.props.dae;
        // let data = dae.article;
        let article = dae.article;
        let action = dae.action;

        // console.log( 'article comment', action, article );

        let who = ( commentUser, me ) => {
          if ( me.id === commentUser.id ) {
            return <strong>自分</strong>;
          } else {
            // console.log( 'commentUser ', commentUser.userName );
            return <span><strong>{commentUser.userName}</strong>さん</span>;
          }
        };

        switch ( action ) {

          case 'comment':
            return (
              <a href={article.comments.url} className="activity-link">
                <div className="activity-content">
                「{article.title}」へ<strong>コメント</strong>しました。
                </div>
                <p className="act-date">{dae.displayDate}</p>
              </a>
            );

          case 'reply':
            return (
              <a href={article.reply.url} className="activity-link">
                <div className="activity-content">
                  「{article.title}」の{who(article.comments.user, dae.user)}のコメントに<strong>返信</strong>しました。
                </div>
                <p className="act-date">{dae.displayDate}</p>
              </a>
            );

          case 'good':
            return (
              <a href={article.comments.url} className="activity-link">
                <div className="activity-content">
                  「{article.title}」の{who(article.comments.user, dae.user)}のコメントに<strong>GOOD</strong>しました。
                </div>
                <p className="act-date">{dae.displayDate}</p>
              </a>
            );

          case 'bad':
            return (
              <a href={article.comments.url} className="activity-link">
                <div className="activity-content">
                「{article.title}」の{who(article.comments.user, dae.user)}のコメントに<strong>BAD</strong>しました。
                </div>
                <p className="act-date">{dae.displayDate}</p>
              </a>
            );

          case 'bookmark':
            return (
              <a href={article.url} className="activity-link">
                <div className="activity-content">
                  「{article.title}」を<strong>ブックマーク</strong>しました。
                </div>
                <p className="act-date">{dae.displayDate}</p>
              </a>
            );

          default:
            // console.warn(`illegal action.${action}`);
            return null;

        }

      }
    } );

    let ActivitiesDom = React.createClass( {
      propType: {
        list: React.PropTypes.array.isRequired,
        // request offset
        offset: React.PropTypes.number.isRequired,
        // request length
        length: React.PropTypes.number.isRequired,

        // action instance
        action: React.PropTypes.object.isRequired
      },
      getInitialState: function() {

        return {
          list: this.props.list,
          offset: this.props.offset,
          length: this.props.length
        };
      },
      render: function() {

        return (
          <div className="activity">
            <ul className="activity-list">
              {
                // loop start
                this.state.list.map( function( dae ) {

                  return (
                    <li key={'activity-' + dae.id} className={'board-stacks activity-item activity-item-' + dae.id}>
                      <MessageDom dae={dae} />
                    </li>
                  );
                } )// map
              }
            </ul>
          </div>
        );

      },
      componentDidMount: function() {
        // hasNext を元に More View button の表示非表示を決める
        moreButton( this.props.action.hasNext(), this.props.action );
        // console.log( 'hasNext ', this.props.action.hasNext() );
      },
      componentWillUnMount: function() {

      },
      updateList: function( list, offset, length ) {
        this.setState( { list: list, offset: offset, length: length } );
        // hasNext を元に More View button の表示非表示を決める
        moreButton( this.props.action.hasNext(), this.props.action );
      }

    } );

    // ------------------------------------------------
    // 既存配列に新規JSON取得データから作成した ArticleDae instance を追加する
    articles.forEach( function( article, i ) {

      // dae.index = prevLast + i;
      article.index = prevLast + i;
      // articlesList.push( dae );
      articlesList.push( article );

    } );

    // 通知
    this.executeSafely( View.BEFORE_RENDER, articlesList );
    // console.log( 'articlesList ', articlesList );

    // this._articleRendered が null の時だけ ReactDOM.render する
    if ( this._articleRendered === null ) {

      // dom 生成後 instance property '_articleRendered' へ ArticleDom instance を保存する
      this._articleRendered = ReactDOM.render(
        React.createElement( ActivitiesDom, { list: articlesList, offset: this._request.offset, length: this._request.length, action: this.action } ),
        element
      );

    } else {

      // instance が存在するので
      // state update でコンテナを追加する
      this._articleRendered.updateList( articlesList, this._request.offset, this._request.length );

    }

  }
}
