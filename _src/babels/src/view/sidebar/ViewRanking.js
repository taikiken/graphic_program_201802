/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/26 - 19:12
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// view
import View from '../View';

// app
// import {Empty} from '../../app/const/Empty';
import {Message} from '../../app/const/Message';
// import {Dom} from '../../app/Dom';

// action
import {Widget} from '../../action/sidebar/Widget';

// data
import {Result} from '../../data/Result';
import {Safety} from '../../data/Safety';

// dae
// import {ArticleDae} from '../../dae/ArticleDae';

// node
// import {RankingNode} from '../../node/sidebar/RankingNode';
import ComponentSidebarRanking from '../../component/sidebar/ComponentSidebarRanking';

// Ga
// import {Ga} from '../../ga/Ga';
// import {GaData} from '../../ga/GaData';

// React
// eslint-disable-next-line no-unused-vars
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * sidebar ranking
 */
export class ViewRanking extends View {
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * category slug
   * @return {string|*} 捜査 slug を返します
   */
  get slug():string {
    return this._slug;
  }

  /**
   * home(index) か否かを表す真偽値
   * @return {boolean} home(index) か否かを表す真偽値を返します
   */
  get home():Boolean {
    return this._home;
  }
  /**
   * @param {Boolean} bool home(index) か否かを表す真偽値
   */
  set home( bool:Boolean ):void {
    this._home = bool;
  }
  /**
   * 記事詳細か否かを表す真偽値
   * @return {boolean} 記事詳細か否かを表す真偽値を返します
   */
  get detail():Boolean {
    return this._detail;
  }
  /**
   * @param {Boolean} bool 記事詳細か否かを表す真偽値
   */
  set detail( bool:Boolean ):void {
    this._detail = bool;
  }
  // @since 2016-09-16
  /**
   * response.request object
   * @since 2016-09-16
   * @return {?Object} response.request objectを返します
   */
  get request():Object {
    return this._request;
  }
  /**
   * response.request object を設定します
   * @since 2016-09-16
   * @param {Boolean} request response.request object
   */
  set request(request:Object):void {
    this._request = request;
  }
  // ---------------------------------------------------
  // CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * sidebar ranking 5件 を表示します
   * @param {Element} element root element
   * @param {Object} [option={}] optional event handler
   * @param {string} [slug=all] category slug です
   * @param {Number|null} [length=null] 読み込む数
   */
  constructor( element:Element, option:Object = {}, slug:string = 'all', length:Number = null ) {

    option = Safety.object( option );
    slug = Safety.string( slug, 'all' );

    super( element, option );
    /**
     * Action instance を設定します
     * @override
     * @type {Ranking}
     */
    this.action = Widget.ranking( slug, this.done.bind( this ), this.fail.bind( this ), length );
    /**
     * category slug
     * @type {string}
     * @private
     * @default all
     */
    this._slug = slug;
    /**
     * response.request object を保持する
     * @type {null|Object}
     * @private
     */
    this._request = null;
    /**
     * home(index) か否かを表す真偽値, default false
     * @type {boolean}
     * @private
     */
    this._home = false;
    /**
     * 記事詳細 か否かを表す真偽値, default false
     * @type {boolean}
     * @private
     */
    this._detail = false;
    /**
     * componentDidMount callback
     * @type {function}
     */
    this.didMount = this.didMount.bind(this);
  }
  // ---------------------------------------------------
  //  METHOD
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
      let error = new Error( Message.undef('[RANKING:UNDEFINED]') );
      this.executeSafely( View.UNDEFINED_ERROR, error );
      // this.showError( error.message );

    } else if ( articles.length === 0 ) {

      // articles empty
      // request, JSON 取得に問題は無かったが data が取得できなかった
      let error = new Error( Message.empty('[RANKING:EMPTY]') );
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
  // /**
  //  * ViewError でエラーコンテナを作成します
  //  * @param {string} message エラーメッセージ
  //  */
  // showError( message:string = '' ):void {
  //
  //   // message = Safety.string( message, '' );
  //   //
  //   // // ToDo: Error 時の表示が決まったら変更する
  //   // let error = new ViewError( this.element, this.option, message );
  //   // error.render();
  //
  // }
  /**
   * dom を render します
   * @param {Array} articles JSON responce.articles
   */
  render( articles:Array ):void {

    this.executeSafely( View.BEFORE_RENDER, articles, this.slug );

    // let element = this.element;
    // let categorySlug = this.slug;
    // let _this = this;
    //
    // // React Class
    // let ArticleDom = React.createClass( {
    //   propTypes: {
    //     list: React.PropTypes.array.isRequired,
    //     home: React.PropTypes.bool.isRequired,
    //     detail: React.PropTypes.bool.isRequired,
    //     slug: React.PropTypes.string.isRequired
    //   },
    //   render: function() {
    //
    //     let list = this.props.list;
    //     let home = this.props.home;
    //     let detail = this.props.detail;
    //     let thisSlug = this.props.slug;
    //     let categoryTitle = '';
    //     let categoryLabel;
    //     // category api slug が `all` 以外の時に category.label をタイトルに含める
    //     if ( categorySlug !== 'all' ) {
    //       // // categoryLabel = list[ 0 ].category.label;
    //       // categoryLabel = list[0].categories[0].label;
    //       //
    //       // if ( categoryLabel !== '' ) {
    //       //   // category.label が空でなかったら '/' と一緒に加える
    //       //   categoryTitle = ' / ' + categoryLabel;
    //       // }
    //       // @since 2016-08-09 category label は script#js-exe data-label の値を使用する
    //       // https://github.com/undotsushin/undotsushin/issues/914
    //       categoryLabel = Dom.categoryLabel();
    //       // @since 2017-07-06 `categoryLabel &&` 追加 motorsports で undefined になるので
    //       if (categoryLabel && categoryLabel !== '') {
    //         // category.label が空でなかったら '/' と一緒に加える
    //         // categoryTitle = ' / ' + categoryLabel;
    //         categoryTitle = <span className="widget-ranking-heading-ruby-label"> / {categoryLabel}</span>;
    //       }
    //     }
    //
    //     return (
    //
    //       <div className="board-small widget-ranking">
    //         {/* title */}
    //         <div className="widget-ranking-heading">
    //           <h3 className="widget-ranking-heading-title">RANKING</h3>
    //           <span className="widget-ranking-heading-ruby">{Message.RANKING_TITLE}{categoryTitle}</span>
    //         </div>
    //         <ul className="post-list">
    //         {
    //           list.map( function( article, i ) {
    //
    //             let dae = new ArticleDae( article );
    //             let thumbnail = Safety.image( dae.media.images.thumbnail, Empty.IMG_SMALL );
    //             let empty = thumbnail === Empty.IMG_SMALL;
    //
    //             // RankingNode instance を使い render
    //             return (
    //                 <RankingNode
    //                   key={'ranking-' + dae.id}
    //                   index={i}
    //                   id={String( dae.id )}
    //                   categories={dae.categories.all}
    //                   url={dae.url}
    //                   date={dae.displayDate}
    //                   title={dae.title}
    //                   thumbnail={thumbnail}
    //                   empty={empty}
    //                   total={dae.commentsCount}
    //                   home={home}
    //                   detail={detail}
    //                   thisSlug={thisSlug}
    //                   categorySlug={categorySlug}
    //                   anotherCategories={dae.anotherCategories}
    //                 />
    //             );
    //
    //           } )
    //         }
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
    //   React.createElement( ArticleDom, {
    //     list: articles,
    //     home: this.home,
    //     detail: this.detail,
    //     slug: this.slug } ),
    //   element
    // );
    // dom 生成
    // @since 2017-09-14 - component へ移行
    ReactDOM.render(
      <ComponentSidebarRanking
        list={articles}
        home={this.home}
        detail={this.detail}
        slug={this.slug}
        categorySlug={this.slug}
        did={this.didMount}
      />,
      this.element,
    );
  }// render
  /**
   * ComponentSidebarRanking.componentDidMount callback
   */
  didMount() {
    this.executeSafely(View.DID_MOUNT);
  }
}
