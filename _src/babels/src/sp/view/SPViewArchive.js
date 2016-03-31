/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/09 - 22:46
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */



// app
import {Message} from '../../app/const/Message';
/*
import {Empty} from '../../app/const/Empty';
import {User} from '../../app/User';
import {MediaType} from '../../app/const/MediaType';
*/

// view
import {View} from '../../view/View';
// import {ViewError} from '../../view/error/ViewError';

// data
import {Result} from '../../data/Result';
import {Safety} from '../../data/Safety';

// dae
import {ArticleDae} from '../../dae/ArticleDae';

// node(ReactClass)
// import {ReactionNode} from '../../node/comment/ReactionNode';

import {SPArchiveNode} from '../node/SPArchiveNode';
// import {SPMoreViewNode} from '../node/SPMoreViewNode';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * archive 一覧標示
 */
export class SPViewArchive extends View {
  /**
   * <p>archive 一覧標示</p>
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {Function} [ActionClass=null] Request 対象の Action Class
   * @param {Object} [option={}] optional event handler
   */
  constructor( element:Element, moreElement:Element, ActionClass:Function = null, option:Object = {} ) {

    option = Safety.object( option );

    super( element, option );

    if ( typeof ActionClass === 'function' ) {
      this._action = new ActionClass( this.done.bind( this ), this.fail.bind( this ) );
    }
    this._moreElement = moreElement;
    /**
     * 取得記事(articles)をArticleDae instance 配列として保存する
     * @type {Array<ArticleDae>}
     * @private
     */
    this._articles = [];
    // ArticleDom instance を保持します
    // first render を区別するためにも使用します
    this._articleRendered = null;
    // more button instance を保持します
    this._moreRendered = null;
    // response.request object を保持する
    this._request = null;

    this._home = false;
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
  /**
   * home flag
   * @return {boolean|*} home flag boolean を返します
   */
  get home():Boolean {
    return this._home;
  }
  /**
   * home flag
   * @param {Boolean} home flag
   */
  set home( home:Boolean ):void {
    this._home = home;
  }
  // ---------------------------------------------------
  //  Method
  // ---------------------------------------------------
  /**
   * Ajax request を開始します
   */
  start():void {
    // console.log( '-------------------------- SPViewArchive start------' );
    this.action.next();

  }
  /**
   * Ajax response success
   * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
   */
  done( result:Result ):void {

    let articles = result.articles;
    // console.log( '**************** SPViewArchive done ', result );
    if ( typeof articles === 'undefined' ) {

      // articles undefined
      // JSON に問題がある
      let error = new Error( Message.undef('[SP:ARCHIVE:UNDEFINED]') );
      this.executeSafely( View.UNDEFINED_ERROR, error );
      // this.showError( error.message );

    } else if ( articles.length === 0 ) {

      // articles empty
      // request, JSON 取得に問題は無かったが data が取得できなかった
      let error = new Error( Message.empty('[SP:ARCHIVE:EMPTY:EMPTY]') );
      this.executeSafely( View.EMPTY_ERROR, error );
      this.showError( error.message );

    } else {

      this._request = result.request;
      this.render( articles );

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

    // message = Safety.string( message, '' );
    // console.log( '**************** SPViewArchive showError ', message );
    // ToDo: Error 時の表示が決まったら変更する
    /*
    let error = new ViewError( this.element, this.option, message );
    error.render();
    */

  }
  /**
   * dom を render します
   * @param {Array} articles JSON responce.articles
   */
  render( articles:Array ):void {
    // console.log( '**************** SPViewArchive render ', articles );
    // 既存データ用のglobal配列
    let articlesList = this._articles;

    // 前回までの配列length
    // sequence な index のために必要
    let prevLast = this._articles.length;

    let _this = this;

    // ------------------------------------------------
    let SPMoreViewDom = React.createClass( {
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
              <a className='board-btn-viewmore-link' href={'#more'} onClick={this.handleClick} ><span>{Message.BUTTON_VIEW_MORE}</span></a>
              <span className="loading-spinner">&nbsp;</span>
            </div>
          );

        } else {

          // button 表示なし
          return (
            <div className="no-more"></div>
          );

        }

      },
      componentDidMount: function() {
      },
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
        // disable
        // this.setState( { loading: ' loading' } );
        // action.next();
        this.onRise();
      },
      // button 表示・非表示
      updateShow: function( show:Boolean ) {
        // console.log( '========================== updateShow ', show );
        /*
         if ( !show ) {
         // button を非表示にするので rise 監視を止める
         this.destroy();
         } else {
         // button 表示, loading 表示を止める
         this.updateLoading( false );
         }
         */

        this.setState( { show: show, loading: '' } );

      },
      // loading 表示 on / off
      // on: true, off: false
      updateLoading: function( loading:Boolean = false ) {

        let loadingClass = '';
        if ( loading ) {

          // loading 中は監視を止める
          loadingClass = ' loading';
          this.props.action.next();

        }

        // loading 表示のための css class を追加・削除
        this.setState( {loading: loadingClass} );

      },
      // Rise.RISE event handler
      // 次 offset JSON を取得する
      onRise: function() {
        // console.log( '========================== onRise ', event );
        this.updateLoading( true );
      }
    } );

    // ------------------------------------------------
    let moreButton = ( show:Boolean ):void => {
      show = !!show;
      // console.log( '----------------- moreButton ', show, _this._moreRendered );
      // _moreRendered が null の時のみ, instance があれば state を update する
      // if ( Safety.isElement( moreElement ) && _this._moreRendered === null ) {
      if ( _this._moreRendered === null ) {
        // if ( moreElement !== null && typeof moreElement !== 'undefined' && 'appendChild' in moreElement ) {

        // チェックをパスし実行する
        _this._moreRendered = ReactDOM.render(
          <SPMoreViewDom
            show={show}
            action={_this.action}
          />,
          _this.moreElement
        );

      } else {

        _this._moreRendered.updateShow( show );

      }
    };

    // ------------------------------------------------
    // 既存配列に新規JSON取得データから作成した ArticleDae instance を追加する
    articles.forEach( function( article, i ) {

      let dae = new ArticleDae( article );
      // console.log( 'dae ', dae );
      dae.index = prevLast + i;
      articlesList.push( dae );

    } );

    // 通知
    this.executeSafely( View.BEFORE_RENDER, articlesList );

    // this._articleRendered が null の時だけ ReactDOM.render する
    if ( this._articleRendered === null ) {

      // dom 生成後 instance property '_articleRendered' へ ArticleDom instance を保存する
      this._articleRendered = ReactDOM.render(
        <SPArchiveNode
          list={articlesList}
          offset={this._request.offset}
          length={this._request.length}
          action={this.action}
          scope={this}
          moreButton={moreButton}
          home={this._home}
          type={Message.NEWS}
        />,
        this.element
      );

    } else {

      // instance が存在するので
      // state update でコンテナを追加する
      this._articleRendered.updateList( articlesList, this._request.offset, this._request.length );

    }

  }// render
  // /**
  //  * more button 表示・非表示
  //  * @param {Boolean} show more button 表示・非表示 を決定する真偽値
  //  */
  /*
  moreButton( show:Boolean ):void {
    show = !!show;
    console.log( '----------------- moreButton ', show, this._moreRendered );
    // _moreRendered が null の時のみ, instance があれば state を update する
    // if ( Safety.isElement( moreElement ) && _this._moreRendered === null ) {
    if ( this._moreRendered === null ) {
      // if ( moreElement !== null && typeof moreElement !== 'undefined' && 'appendChild' in moreElement ) {

      // チェックをパスし実行する
      this._moreRendered = ReactDOM.render(
        <SPMoreViewNode
          show={show}
          action={this.action}
        />,
        this.moreElement
      );

    } else {

      this._moreRendered.updateShow( show );

    }
  }
  */
}

