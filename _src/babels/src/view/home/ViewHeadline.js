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
import {App} from '../../app/App';
import {Empty} from '../../app/Empty';

// view
import {View} from '../View';
import {ViewError} from '../error/ViewError';
// action
import {Headline} from '../../action/home/Headline';
import {Result} from '../../data/Result';
// dae
import {ArticleDae} from '../../dae/ArticleDae';

// React
let React = window.React;
let ReactDOM = window.ReactDOM;

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
   * @param {Element} element root element
   * @param {Object} [option={}] optional event handler
   */
  constructor( element, option:Object = {} ) {

    super( element, option );

  }

  /**
   * Ajax request を開始します
   */
  start():void {

    let action = new Headline( this.done.bind( this ), this.fail.bind( this ) );
    action.start();

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
    let dummy = Empty.IMG_SMALL;

    // React Class
    let ArticleDom = React.createClass( {
      propTypes: {
        list: React.PropTypes.array.isRequired
      },
      getDefaultProps: function() {
        return {
          list: []
        };
      },
      render: function() {

        var list = this.props.list;

        return (

          <div>
            {
              list.map( function( article, i ) {

                let dae = new ArticleDae( article );
                let divClass = `headline headline-${i}`;
                let catClass = `category category-${dae.category.slug}`;
                let titleClass = `headline-title headline-title-${i}`;
                let dateClass = `date date-${i}`;
                // thumbnail が 空のことがある様子
                let thumbnail = dae.media.images.thumbnail;

                return <div key={i} className={divClass}>
                  <figure><img src={thumbnail !== '' ? thumbnail : dummy} alt={dae.title}/></figure>
                  <div className="content">
                    <span className={catClass}>{dae.category.label}</span>
                    <h3 className={titleClass}>{dae.title}</h3>
                    <p className={dateClass}>{dae.formatDate}</p>
                    <p className={dateClass}>{dae.displayDate}</p>
                  </div>
                </div>;

              } )
            }
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
}
