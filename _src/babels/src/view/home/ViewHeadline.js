/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/22 - 13:54
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

// app
// import {App} from '../../app/App';
import {Empty} from '../../app/Empty';

// view
import {View} from '../View';
import {ViewError} from '../error/ViewError';
// action
import {Headline} from '../../action/home/Headline';
// data
import {Result} from '../../data/Result';
// dae
import {ArticleDae} from '../../dae/ArticleDae';

import {Safety} from '../../data/Safety';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * home > headline（注目ニュース）を表示します。
 * <ol>
 *   <li>JSON取得(Ajax)</li>
 *   <li>Dom作成 by React</li>
 * </ol>
 */
export class ViewHeadline extends View {
  /**
   * action/Headline を使い Ajax request 後 element へ dom を作成します
   *
   * @example
   * let headline;
   *
   * function didMount() {
   *    console.log( 'dom mount' );
   *  }
   * function errorMount( error ) {
   *    console.log( 'dom errorMount', error );
   *  }
   * function undefinedError( error ) {
   *    console.log( 'undefinedError', error );
   *  }
   * function emptyError( error ) {
   *    console.log( 'emptyError', error );
   *  }
   * function responseError( error ) {
   *    console.log( 'responseError', error );
   *
   *    headline.showError( 'error message ' + error.name + ', ' + error.message );
   * }
   * let option = {
   *    didMount: didMount,
   *    errorMount: errorMount,
   *    undefinedError: undefinedError,
   *    emptyError: emptyError,
   *    responseError: responseError
   *  };
   *
   * headline = new UT.view.home.ViewHeadline( document.getElementById('someId'), option );
   * headline.start();
   *
   * @param {Element} element root element
   * @param {Object} [option={}] optional event handler
   */
  constructor( element:Element, option:Object = {} ) {

    option = Safety.object( option );

    super( element, option );
    this._action = new Headline( this.done.bind( this ), this.fail.bind( this ) );

  }
  /**
   * Ajax request を開始します
   */
  start():void {

    this.action.start();

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
      let error = new Error( '[HEADLINE:UNDEFINED]サーバーレスポンスに問題が発生しました。' );
      this.executeSafely( View.UNDEFINED_ERROR, error );
      // this.showError( error.message );

    } else if ( articles.length === 0 ) {

      // articles empty
      // request, JSON 取得に問題は無かったが data が取得できなかった
      let error = new Error( '[HEADLINE:EMPTY]サーバーレスポンスに問題が発生しました。' );
      this.executeSafely( View.EMPTY_ERROR, error );
      // this.showError( error.message );

    } else {

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

    let element = this.element;
    let _this = this;

    // tag block
    let HeadlineDom = React.createClass( {
      propTypes: {
        index: React.PropTypes.number.isRequired,
        id: React.PropTypes.string.isRequired,
        slug: React.PropTypes.string.isRequired,
        category: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired,
        date: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        thumbnail: React.PropTypes.string.isRequired
      },
      render: function() {
        let p = this.props;

        return (
          <a href={p.url} id={'headline-' + p.id} className={'headline headline-' + p.index}>
            <img src={p.thumbnail} alt={p.title}/>
            <p className={'cat cat-' + p.slug}>{p.category}</p>
            <h3 className='headline-title'>{p.title}</h3>
            <p className="date">{p.date}</p>
          </a>
        );
      }
    } );

    // React Class
    let ArticleDom = React.createClass( {
      propTypes: {
        list: React.PropTypes.array.isRequired
      },
      // isRequired なので getDefaultProps がいらない
      // getDefaultProps: function() {
      //  return {
      //    list: []
      //  };
      // },
      render: function() {

        let list = this.props.list;

        return (

          <div>
            {
              list.map( function( article, i ) {

                let dae = new ArticleDae( article );
                let thumbnail = dae.media.images.thumbnail;
                thumbnail = thumbnail !== '' ? thumbnail : Empty.IMG_SMALL;

                // HeadlineDom instance を使い render
                return <HeadlineDom
                  key={'headline-' + dae.id}
                  index={i}
                  id={String( dae.id )}
                  slug={dae.category.slug}
                  category={dae.category.label}
                  url={dae.url}
                  date={dae.formatDate}
                  title={dae.title}
                  thumbnail={thumbnail}
                />;

              } )
            }
          </div>

        );

      },
      componentDidMount: function() {

        // after mount
        _this.executeSafely( View.DID_MOUNT );

      }
    } );

    // dom 生成
    ReactDOM.render(
      React.createElement( ArticleDom, { list: articles } ),
      element
    );

  }// render
}
