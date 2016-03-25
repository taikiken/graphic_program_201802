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


import {View} from '../View';
import {ViewError} from '../error/ViewError';

import {Bookmarks} from '../../action/mypage/Bookmarks';

/*
// model
import {Model} from '../../model/Model';
import {ModelBookmark} from '../../model/users/ModelBookmark';
*/

// app
import {Empty} from '../../app/const/Empty';
import {Message} from '../../app/const/Message';

// data
import {Result} from '../../data/Result';
import {Safety} from '../../data/Safety';

// dae
import {ArticleDae} from '../../dae/ArticleDae';

// node
import {BookmarkButtonNode} from '../../node/mypage/BookmarkButtonNode';
import {MoreViewNode} from '../../node/mypage/MoreViewNode';

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
      let error = new Error( Message.undef('[BOOKMARKS:UNDEFINED]') );
      this.executeSafely( View.UNDEFINED_ERROR, error );
      // this.showError( error.message );

    } else if ( articles.length === 0 ) {

      // articles empty
      // request, JSON 取得に問題は無かったが data が取得できなかった
      let error = new Error( Message.empty('[BOOKMARKS:EMPTY]') );
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
          React.createElement( MoreViewNode, { show: show, action: action } ),
          moreElement
        );

      } else {

        _this._moreRendered.updateShow( show );

      }

    };
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
                this.state.list.map( function( dae ) {

                  let thumbnail = dae.media.images.thumbnail;
                  if ( !thumbnail ) {
                    thumbnail = Empty.IMG_SMALL;
                  } else if ( !Safety.isImg( thumbnail ) ) {
                    if ( !Safety.isGraph( thumbnail ) ) {
                      thumbnail = Empty.IMG_SMALL;
                    }
                  }

                  let category = ( label ):string => {
                    return !label ? '' : <span className="category-label">{label}</span>;
                  };

                  return (
                    <li key={'bookmarks-' + dae.id} className="board-stacks board-item">
                      <BookmarkButtonNode
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
    // console.log( 'articlesList ', articlesList );

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
