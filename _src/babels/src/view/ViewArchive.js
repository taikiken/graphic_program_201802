/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/25 - 10:04
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';
/*
View More がある Page
Home, Category, Search...
 */

// app
import {Empty} from '../app/Empty';

// view
import {View} from './View';
import {ViewError} from './error/ViewError';
// action
import {Headline} from '../action/home/Headline';
// data
import {Result} from '../data/Result';
// dae
import {ArticleDae} from '../dae/ArticleDae';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;
/**
 * <h2>View More がある 表示親クラス</h2>
 */
export class ViewArchive extends View {
  /**
   *
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {*} ActionClass Request 対象の Action Class
   * @param {Object} [option={}] optional event handler
   */
  constructor( element:Element, moreElement:Element, ActionClass, option:Object = {} ) {

    super( element, option );
    this._action = new ActionClass( this.done.bind( this ), this.fail.bind( this ) );
    this._moreElement = moreElement;

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
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
      this.executeSafely( 'undefinedError' );
      this.showError( '[HEADLINE:UNDEFINED]サーバーレスポンスに問題が発生しました。' );

    } else if ( articles.length === 0 ) {

      // articles empty
      // request, JSON 取得に問題は無かったが data が取得できなかった
      this.executeSafely( 'emptyError' );
      this.showError( '[HEADLINE:EMPTY]サーバーレスポンスに問題が発生しました。' );

    } else {

      this.render( articles );

    }

  }
  /**
   * Ajax response error
   * @param {Error} error Error instance
   */
  fail( error:Error ):void {

    this.executeSafely( 'responseError', error );
    // ここでエラーを表示させるのは bad idea なのでコールバックへエラーが起きたことを伝えるのみにします
    // this.showError( error.message );

  }
  /**
   * ViewError でエラーコンテナを作成します
   * @param {string} message エラーメッセージ
   */
  showError( message:string = '' ):void {

    // ToDo: Error 時の表示が決まったら変更する
    let error = new ViewError( this.element, this.option, message );
    error.render();

  }
  /**
   * dom を render します
   * @param {Array} articles JSON responce.articles
   */
  render( articles:Array ):void {

    let element = this.element;
    let moreElement = this.moreElement;
    let _this = this;

    // React Class
    let ArticleDom = React.createClass( {
      propTypes: {
        list: React.PropTypes.array.isRequired
      },
      render: function() {

        let list = this.props.list;
        let even = [];
        let odd = [];

        let ArchiveDom = React.createClass( {
          propTypes: {
            index: React.PropTypes.number.isRequired,
            id: React.PropTypes.string.isRequired,
            slug: React.PropTypes.string.isRequired,
            category: React.PropTypes.string.isRequired,
            url: React.PropTypes.string.isRequired,
            date: React.PropTypes.string.isRequired,
            title: React.PropTypes.string.isRequired,
            description: React.PropTypes.string.isRequired,
            thumbnail: React.PropTypes.string.isRequired,
            mediaType: React.PropTypes.string.isRequired
          },
          render: function() {
            let p = this.props;
            console.log( 'ArchiveDom ', p );
            return (
              <div>
                <a href={p.url} id={'archive-' + p.id} className={'archive archive-' + p.index}>
                  <img src={p.thumbnail} alt={p.title}/>
                  <p className={'cat cat-' + p.slug}>{p.category}</p>
                  <h3 className='archive-title'>{p.title}</h3>
                  <p className="date">{p.date}</p>
                  <p>{p.mediaType}</p>
                  <p>{p.description}</p>
                </a>
              </div>
            );
          }
        } );

        let makeDom = ( dae ) => {

          let thumbnail = dae.mediaType === 'image' ? dae.media.images.medium : dae.media.video.thumbnail;
          thumbnail = thumbnail !== '' ? thumbnail : Empty.IMG_MIDDLE;

          return <ArchiveDom
            key={'archive-' + dae.id}
            index={dae.index}
            id={String( dae.id )}
            slug={dae.category.slug}
            category={dae.category.label}
            url={dae.url}
            date={dae.formatDate}
            title={dae.title}
            thumbnail={thumbnail}
            mediaType={dae.mediaType}
            description={dae.description}
          />;

        };

        // even / odd setup
        list.forEach( function( article, i ) {

          let dae = new ArticleDae( article );
          dae.index = i;

          if ( i % 2 === 0 ) {
            // even
            even.push( dae );
          } else {
            // odd
            odd.push( dae );
          }

        } );

        // dom
        return (
          <div>
            <div className="left">
              {
                even.map( function( dae ) {
                  return makeDom( dae );
                } )
              }
            </div>
            <div className="right">
              {
                odd.map( function( dae ) {
                  return makeDom( dae );
                } )
              }
            </div>
          </div>
        );

      },
      componentDidMount: function() {

        // after mount
        _this.executeSafely( 'didMount' );

      }
    } );

    // dom 生成
    ReactDOM.render(
      React.createElement( ArticleDom, { list: articles } ),
      element
    );

  }// render
}// class
