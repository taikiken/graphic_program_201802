/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/29 - 13:37
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {View} from '../View';
import {ViewError} from '../error/ViewError';

import {Bookmarks} from '../../action/mypage/Bookmarks';

// model
import {Model} from '../../model/Model';
import {ModelBookmark} from '../../model/users/ModelBookmark';

// app
import {Empty} from '../../app/const/Empty';

// data
import {Result} from '../../data/Result';
import {Safety} from '../../data/Safety';

// dae
import {ArticleDae} from '../../dae/ArticleDae';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;
/**
 * my page bookmark 一覧
 */
export class ViewBookmarks extends View {
  /**
   * my page bookmark 一覧を表示 + infinite scroll
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {Object} [option={}] optional event handler
   */
  constructor( element:Element, moreElement:Element, option:Object = {} ) {
    super( element, option );
    this._action = new Bookmarks( this.done.bind( this ), this.fail.bind( this ) );
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

    let articles = result.articles;
    if ( typeof articles === 'undefined' ) {

      // articles undefined
      // JSON に問題がある
      let error = new Error( '[BOOKMARKS:UNDEFINED]サーバーレスポンスに問題が発生しました。' );
      this.executeSafely( View.UNDEFINED_ERROR, error );
      // this.showError( error.message );

    } else if ( articles.length === 0 ) {

      // articles empty
      // request, JSON 取得に問題は無かったが data が取得できなかった
      let error = new Error( '[BOOKMARKS:EMPTY]サーバーレスポンスに問題が発生しました。' );
      this.executeSafely( View.EMPTY_ERROR, error );
      // this.showError( error.message );

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
              <a className='board-btn-viewmore-link' href={'#more'} onClick={this.handleClick} ><span>VIEW MORE</span></a>
              <div className="loading-spinner"></div>
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

        this.setState( { loading: ' loading' } );
        this.props.action.next();
      },
      // button 表示・非表示
      updateShow: function( show:boolean ) {

        this.setState( { show: show, loading: '' } );

      }
    } );

    // more button 作成関数
    // ArchiveDom から呼び出す
    let moreButton = ( show:boolean, action ) => {

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
    // bookmark button
    // --------------------------------------------
    let BookmarkButtonDom = React.createClass( {
      propType: {
        articleId: React.PropTypes.string.isRequired,
        bookmarked: React.PropTypes.bool.isRequired
      },
      getInitialState: function() {
        this.model = null;

        return {
          articleId: this.props.articleId,
          bookmarked: this.props.bookmarked,
          loading: ''
        };
      },
      render: function() {
        let bookmarkClass = ( bookmarked:boolean ):string => {
          return bookmarked ? 'bookmarked enable' : '';
        };
        let bookmarkMessage = ( bookmarked:boolean ):string => {
          return bookmarked ? 'ブックマーク済' : 'ブックマークする';
        };

        return (
          <div className={'btn-bookmark ' + this.state.loading}>
            <a href="#" className={bookmarkClass(this.state.bookmarked)} onClick={this.clickHandler}>
              <span>{bookmarkMessage(this.state.bookmarked)}</span>
            </a>
            <div className='loading-spinner'></div>
          </div>
        );
      },
      componentDidMount: function() {
        if ( this.model === null ) {
          let model = new ModelBookmark( this.state.articleId );
          this.model = model;
          model.on( Model.COMPLETE, this.done );
          model.on( Model.UNDEFINED_ERROR, this.fail );
          model.on( Model.RESPONSE_ERROR, this.fail );
        }
      },
      componentWillUnMount: function() {
        this.dispose();
      },
      clickHandler: function( event:Event ) {
        event.preventDefault();
        this.setState( { loading: 'loading' } );
        this.model.start( !this.state.bookmarked );
      },
      // --------------------------------------------
      // custom method
      dispose: function() {

        let model = this.model;
        if ( model !== null ) {
          model.off( Model.COMPLETE, this.done );
          model.off( Model.UNDEFINED_ERROR, this.fail );
          model.off( Model.RESPONSE_ERROR, this.fail );
          this.model = null;
        }

      },
      done: function() {

        // loading 解除, 表示更新
        this.setState( { loading: '', bookmarked: !this.state.bookmarked } );

      },
      fail: function() {

        // loading 解除
        this.setState( { loading: '' } );

      }
    } );

    // --------------------------------------------
    // bookmarks 親
    // --------------------------------------------
    let BookmarksDom = React.createClass( {
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
          <div className="bookmarks">
            <ul className="board-small">
              {
                // loop start
                this.state.list.map( function( dae, i ) {

                  let thumbnail = dae.media.images.thumbnail;
                  if ( !thumbnail ) {
                    thumbnail = Empty.IMG_SMALL;
                  } else if ( !Safety.isImg( thumbnail ) ) {
                    thumbnail = Empty.IMG_SMALL;
                  }

                  let category = ( label ):string => {
                    return !label ? '' : <span className="category-label">{label}</span>;
                  };

                  return (
                    <li key={'bookmarks-' + dae.id} className="board-stacks board-item">
                      <BookmarkButtonDom
                        articleId={dae.id}
                        bookmarked={dae.isBookmarked}
                      />
                      <a href={dae.url} className="post">
                        <figure className="post-thumb">
                          <img src={thumbnail} alt={dae.title}/>
                        </figure>
                        <div className="post-data">
                          <p className="post-category">{category(dae.category.label)}{category(dae.category2.label)}</p>
                          <h2 className="post-heading">{dae.title}</h2>
                          <p className="post-date">{dae.displayDate}</p>
                        </div>
                      </a>
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
        console.log( 'hasNext ', this.props.action.hasNext() );
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

      let dae = new ArticleDae( article );

      dae.index = prevLast + i;
      articlesList.push( dae );

    } );

    // 通知
    this.executeSafely( View.BEFORE_RENDER, articlesList );
    console.log( 'articlesList ', articlesList );

    // this._articleRendered が null の時だけ ReactDOM.render する
    if ( this._articleRendered === null ) {

      // dom 生成後 instance property '_articleRendered' へ ArticleDom instance を保存する
      this._articleRendered = ReactDOM.render(
        React.createElement( BookmarksDom, { list: articlesList, offset: this._request.offset, length: this._request.length, action: this.action } ),
        element
      );

    } else {

      // instance が存在するので
      // state update でコンテナを追加する
      this._articleRendered.updateList( articlesList, this._request.offset, this._request.length );

    }

  }
}
