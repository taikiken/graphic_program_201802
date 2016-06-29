/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/26 - 20:37
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// view
import {View} from '../View';

// app
import {Empty} from '../../app/const/Empty';
import {Message} from '../../app/const/Message';

// action
import {Widget} from '../../action/sidebar/Widget';

// data
import {Result} from '../../data/Result';
import {Safety} from '../../data/Safety';

// dae
import {ArticleDae} from '../../dae/ArticleDae';

// node
import {CategoryLabelNode} from '../../node/category/CategoryLabelNode';
import {RecommendTitleNode} from '../../node/sidebar/RecommendTitleNode';

// Ga
import {Ga} from '../../ga/Ga';
import {GaData} from '../../ga/GaData';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * sidebar video
 */
export class ViewVideos extends View {
  /**
   * sidebar video 5件 を表示します
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
     * @type {Videos}
     */
    this.action = Widget.video( slug, this.done.bind( this ), this.fail.bind( this ), length );
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
  }
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
      let error = new Error( Message.undef('[VIDEOS:UNDEFINED]') );
      this.executeSafely( View.UNDEFINED_ERROR, error );
      // this.showError( error.message );

    } else if ( articles.length === 0 ) {

      // articles empty
      // request, JSON 取得に問題は無かったが data が取得できなかった
      let error = new Error( Message.empty('[VIDEOS:EMPTY]') );
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

    let element = this.element;
    let categorySlug = this.slug;
    let _this = this;

    // tag block
    let VideosDom = React.createClass( {
      propTypes: {
        index: React.PropTypes.number.isRequired,
        id: React.PropTypes.string.isRequired,
        slug: React.PropTypes.string.isRequired,
        // category: React.PropTypes.string.isRequired,
        // category2: React.PropTypes.string,
        categories: React.PropTypes.array.isRequired,
        url: React.PropTypes.string.isRequired,
        date: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        thumbnail: React.PropTypes.string.isRequired,
        home: React.PropTypes.bool.isRequired,
        detail: React.PropTypes.bool.isRequired,
        thisSlug: React.PropTypes.string.isRequired
      },
      // getDefaultPropTypes: function() {
      //   return {
      //     category2: ''
      //   };
      // },
      render: function() {
        let p = this.props;

        // let category = ( label ):string => {
        //   return !label ? '' : <span className="category-label">{label}</span>;
        // };

        return (
          <li className={'board-item videos-' + p.index + ' videos-' + (p.slug || categorySlug)}>
            <a href={p.url} className="post" onClick={this.gaSend}>
              <figure className="post-thumb post-thumb-video">
                <img className="video-thumbnail" src={p.thumbnail} alt={p.title}/>
                <img className="post-thumb-overlay-movie type-movie" src={Empty.VIDEO_PLAY_SMALL} alt="" />
              </figure>
              <div className="post-data">
                <p className={'post-category post-category-' + p.slug}>
                  <CategoryLabelNode
                    categories={p.categories}
                    id={`videos-label-${p.id}`}
                    index={p.index}
                  />
                </p>
                <h4 className="post-heading">{p.title}</h4>
                <p className="post-date">{p.date}</p>
              </div>
            </a>
          </li>
        );
      },
      // gaSend: function(e) {
      //   e.preventDefault();
      gaSend: function() {
        if (this.props.home) {
          this.gaHome();
        } else if (this.props.detail) {
          this.gaDetail();
        } else {
          this.gaCategory();
        }
      },
      gaHome: function() {
        // ----------------------------------------------
        // GA 計測タグ
        Ga.add( new GaData('ViewVideos.render.VideosDom.gaSend', 'home_movie', 'click', this.props.url, parseFloat(this.props.id)) );
        // ----------------------------------------------
      },
      gaCategory: function() {
        // ----------------------------------------------
        // GA 計測タグ
        Ga.add( new GaData('ViewVideos.render.VideosDom.gaSend', `${this.props.thisSlug}_movie`, 'click', this.props.url, parseFloat(this.props.id)) );
        // ----------------------------------------------
      },
      gaDetail: function() {
        // ----------------------------------------------
        // GA 計測タグ
        Ga.add( new GaData('ViewVideos.render.VideosDom.gaSend', 'detail_movie', 'click', this.props.url, parseFloat(this.props.id)) );
        //
      }
    } );

    // React Class
    let ArticleDom = React.createClass( {
      propTypes: {
        list: React.PropTypes.array.isRequired,
        home: React.PropTypes.bool.isRequired,
        detail: React.PropTypes.bool.isRequired,
        slug: React.PropTypes.string.isRequired
      },
      render: function() {

        let list = this.props.list;
        let home = this.props.home;
        let detail = this.props.detail;
        let thisSlug = this.props.slug;

        return (

          <div className="board-small widget-recommend">
            {/* title */}
            <RecommendTitleNode
              slug={categorySlug}
              label={list[0].categories[0].label}
              title={Message.VIDEOS_TITLE}
            />
            <ul className="board-list">
            {
              list.map( function( article, i ) {

                let dae = new ArticleDae( article );
                let thumbnail = Safety.image( dae.media.images.medium, Empty.VIDEO_THUMBNAIL );

                // RankingNode instance を使い render
                return (
                    <VideosDom
                      key={'ranking-' + dae.id}
                      index={i}
                      id={String( dae.id )}
                      slug={dae.categories.all[0].slug}
                      categories={dae.categories.all}
                      url={dae.url}
                      date={dae.displayDate}
                      title={dae.title}
                      thumbnail={thumbnail}
                      home={home}
                      detail={detail}
                      thisSlug={thisSlug}
                    />
                );

              } )// map
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
      React.createElement( ArticleDom, {
        list: articles,
        home: this.home,
        detail: this.detail,
        slug: this.slug } ),
      element
    );


  }// render
}

