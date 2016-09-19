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

// view
import {View} from '../View';
import { ViewHeadlines } from '../headlines/ViewHeadlines';

// app
import {Empty} from '../../app/const/Empty';
import {MediaType} from '../../app/const/MediaType';
import {Message} from '../../app/const/Message';
import {User} from '../../app/User';

// action
import {Headline} from '../../action/home/Headline';
import {HeadlineAuth} from '../../action/home/HeadlineAuth';

// data
import {Result} from '../../data/Result';
import {Safety} from '../../data/Safety';

// dae
import {ArticleDae} from '../../dae/ArticleDae';

// node
import {CategoryLabelNode} from '../../node/category/CategoryLabelNode';

// Ga
import {Ga} from '../../ga/Ga';
import {GaData} from '../../ga/GaData';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * <p>home > headline（注目ニュース）を表示します。</p>
 *
 * 1. JSON取得(Ajax)
 * 1. Dom作成 by React
 *
 * ```
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
 * ```
 */
export class ViewHeadline extends View {
  /**
   * action/Headline を使い Ajax request 後 element へ dom を作成します
   *
   * @param {Element} element root element
   * @param {Object} [option={}] optional event handler
   */
  constructor( element:Element, option:Object = {} ) {

    option = Safety.object( option );

    super( element, option );
    let ActionClass = User.sign ? HeadlineAuth : Headline;
    /**
     * Action instance を設定します
     * @override
     * @type {HeadlineAuth|Headline}
     */
    this.action = new ActionClass( this.done.bind( this ), this.fail.bind( this ) );

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
      let error = new Error( Message.undef('[HEADLINE:UNDEFINED]') );
      this.executeSafely( View.UNDEFINED_ERROR, error );
      // this.showError( error.message );

    } else if ( articles.length === 0 ) {

      // articles empty
      // request, JSON 取得に問題は無かったが data が取得できなかった
      let error = new Error( Message.empty('[HEADLINE:EMPTY]') );
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
  // /**
  //  * ViewError でエラーコンテナを作成します
  //  * @param {string} message エラーメッセージ
  //  */
  // showError( message:string = '' ):void {
  //
  //   message = Safety.string( message, '' );
  //
  //   /*
  //   // ToDo: Error 時の表示が決まったら変更する
  //   let error = new ViewError( this.element, this.option, message );
  //   error.render();
  //   */
  //
  // }
  /**
   * dom を render します
   * @param {Array} articles JSON responce.articles
   */
  render( articles:Array ):void {
    //
    // let element = this.element;
    // let _this = this;
    //
    // // headline 1 記事
    // let HeadlineDom = React.createClass( {
    //   propTypes: {
    //     index: React.PropTypes.number.isRequired,
    //     id: React.PropTypes.string.isRequired,
    //     slug: React.PropTypes.string.isRequired,
    //     // @since 2016-06-27 categories へ切替
    //     // category: React.PropTypes.string.isRequired,
    //     // category2: React.PropTypes.string,
    //     categories: React.PropTypes.array.isRequired,
    //     url: React.PropTypes.string.isRequired,
    //     date: React.PropTypes.string.isRequired,
    //     title: React.PropTypes.string.isRequired,
    //     thumbnail: React.PropTypes.string.isRequired,
    //     mediaType: React.PropTypes.string.isRequired
    //   },
    //   // getDefaultPropTypes: function() {
    //   //   return {
    //   //     category2: ''
    //   //   };
    //   // },
    //   render: function() {
    //     let p = this.props;
    //
    //     // let category = ( label ):string => {
    //     //   return !label ? '' : <span className="category-label">{label}</span>;
    //     // };
    //
    //     let playMark = (mediaType) => {
    //       if (mediaType === MediaType.VIDEO) {
    //         return <img src={Empty.VIDEO_PLAY_SMALL_1X1} alt="" className="post-thumb-overlay-movie type-movie"/>;
    //       } else {
    //         // return <img src={Empty.VIDEO_PLAY_SMALL_1X1} alt="" className="post-thumb-overlay-movie type-movie"/>;
    //         return null;
    //       }
    //     };
    //
    //     return (
    //       <li className={'board-item board-item-' + p.index}>
    //         <a className="post" href={p.url} onClick={this.gaSend}>
    //           <figure className="post-thumb post-thumb-headline"><img src={p.thumbnail} alt={p.title}/>{playMark(this.props.mediaType)}</figure>
    //           <div className="post-data">
    //             <p className={'post-category post-category-' + p.slug}>
    //               <CategoryLabelNode
    //                 categories={this.props.categories}
    //                 id={`headline-label-${this.props.id}`}
    //                 index={this.props.index}
    //               />
    //             </p>
    //             <h3 className="post-heading">{p.title}</h3>
    //             <p className="post-date">{p.date}</p>
    //           </div>
    //         </a>
    //       </li>
    //     );
    //   },
    //   // gaSend: function(e) {
    //   //   e.preventDefault();
    //   gaSend: function() {
    //     // ----------------------------------------------
    //     // GA 計測タグ
    //     Ga.add( new GaData('ViewHeadline.render.HeadlineDom.gaSend', 'home_headline', 'click', this.props.url, parseFloat(this.props.id)) );
    //     // ----------------------------------------------
    //   }
    // } );
    //
    // // React Class
    // let ArticleDom = React.createClass( {
    //   propTypes: {
    //     list: React.PropTypes.array.isRequired
    //   },
    //   render: function() {
    //
    //     let list = this.props.list;
    //
    //     return (
    //
    //       <div className="headline">
    //         <div className="headline-heading">
    //           <h2 className="headline-heading-title"><img src="/assets/images/index/headline-heading.png" alt="HEADLINE NEWS" /></h2>
    //           <span className="headline-heading-ruby">{Message.HEADLINE_TITLE}</span>
    //         </div>
    //
    //         <ul className="board-small column2">
    //           {
    //             list.map( function( article, i ) {
    //
    //               let dae = new ArticleDae( article );
    //               let thumbnail = Safety.image( dae.media.images.thumbnail, Empty.IMG_SMALL );
    //
    //               // HeadlineDom instance を使い render
    //               return (
    //                 <HeadlineDom
    //                   key={'headline-' + dae.id}
    //                   index={i}
    //                   id={String( dae.id )}
    //                   slug={dae.categories.all[ 0 ].slug}
    //                   categories={dae.categories.all}
    //                   url={dae.url}
    //                   date={dae.displayDate}
    //                   title={dae.title}
    //                   thumbnail={thumbnail}
    //                   mediaType={dae.mediaType}
    //                 />
    //               );
    //
    //             } )
    //           }
    //         </ul>
    //       </div>
    //
    //     );
    //
    //   },
    //   componentDidMount: function() {
    //
    //     // after mount
    //     _this.executeSafely( View.DID_MOUNT );
    //
    //   }
    // } );
    //
    // // dom 生成
    // ReactDOM.render(
    //   React.createElement( ArticleDom, { list: articles } ),
    //   element
    // );

    // -------------------------------------------
    // @since 2016-09-17
    const list = articles.map((article) => new ArticleDae(article));
    ReactDOM.render(
      <ViewHeadlines
        list={list}
        callback={this.executeSafely.bind(this)}
        home={true}
      />,
      this.element
    );
  }// render
}
