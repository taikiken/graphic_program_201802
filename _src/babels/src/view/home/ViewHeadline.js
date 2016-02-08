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
import {Empty} from '../../app/const/Empty';
import {User} from '../../app/User';

// view
import {View} from '../View';
import {ViewError} from '../error/ViewError';
// action
import {Headline} from '../../action/home/Headline';
import {HeadlineAuth} from '../../action/home/HeadlineAuth';
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
    let ActionClass = User.sign ? HeadlineAuth : Headline;
    this._action = new ActionClass( this.done.bind( this ), this.fail.bind( this ) );

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

    // headline 1 記事
    let HeadlineDom = React.createClass( {
      propTypes: {
        index: React.PropTypes.number.isRequired,
        id: React.PropTypes.string.isRequired,
        slug: React.PropTypes.string.isRequired,
        category: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired,
        date: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        caption: React.PropTypes.string.isRequired,
        thumbnail: React.PropTypes.string.isRequired
      },
      render: function() {
        let p = this.props;

        return (
          <li className={'board-item board-item-' + p.index}>
            <a className="post" href={p.url}>
              <figure className="post-thumb"><img src={p.thumbnail} alt={p.caption}/></figure>
              <div className="post-data">
                <p className={'post-category post-category-' + p.slug}>{p.category}</p>
                <h3 className='post-heading'>{p.title}</h3>
                <p className="post-date">{p.date}</p>
              </div>
            </a>
          </li>
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

          <div className="headline">
            <div className="headline-heading">
              <h2 className="headline-heading-title"><img src="/assets/images/index/headline-heading.png" alt="HEADLINE NEWS" /></h2>
              <span className="headline-heading-ruby">注目のニュース</span>
            </div>

            <ul className="board-small column2">
              {
                list.map( function( article, i ) {

                  let dae = new ArticleDae( article );
                  let thumbnail, caption;

                  // mediaType データ取り出し変更
                  if ( dae.mediaType === 'image' ) {
                    // type image
                    thumbnail = dae.media.images.thumbnail;
                    caption = dae.media.images.caption;
                  } else {
                    // type video
                    thumbnail = dae.media.video.thumbnail;
                    caption = dae.media.video.caption;
                  }

                  // thumbnail を check しなければ代替画像にする
                  if ( !thumbnail ) {
                    thumbnail = Empty.IMG_SMALL;
                  }

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
                    caption={caption}
                    thumbnail={thumbnail}
                  />;

                } )
              }
            </ul>
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
