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

// Ga
import {Ga} from '../../ga/Ga';
import {GaData} from '../../ga/GaData';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * sidebar ranking
 */
export class ViewRanking extends View {
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
    this._action = Widget.ranking( slug, this.done.bind( this ), this.fail.bind( this ), length );
    this._slug = slug;
    // response.request object を保持する
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

    let element = this.element;
    let categorySlug = this.slug;
    let _this = this;

    // tag block
    let RankingDom = React.createClass( {
      propTypes: {
        index: React.PropTypes.number.isRequired,
        id: React.PropTypes.string.isRequired,
        slug: React.PropTypes.string.isRequired,
        category: React.PropTypes.string.isRequired,
        category2: React.PropTypes.string,
        url: React.PropTypes.string.isRequired,
        date: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        thumbnail: React.PropTypes.string.isRequired,
        empty: React.PropTypes.bool.isRequired,
        total: React.PropTypes.number.isRequired,
        home: React.PropTypes.bool.isRequired,
        detail: React.PropTypes.bool.isRequired,
        thisSlug: React.PropTypes.string.isRequired
      },
      getDefaultPropTypes: function() {
        return {
          category2: ''
        };
      },
      render: function() {
        let p = this.props;
        let n = p.index + 1;

        let category = ( label ):string => {
          return !label ? '' : <span className="category-label">{label}</span>;
        };

        let imgStyle = {
          'background': `url(${p.thumbnail}) no-repeat center center`,
          'backgroundSize': 'cover'
        };

        return (
          <li className={'board-item rank' + n + ' ranking-' + (p.slug || categorySlug)}>
            <a href={p.url} className={'post'} onClick={this.gaSend}>
              <figure className={`post-thumb${ this.props.empty ? '' : ' post-thumb-fill' }`} style={imgStyle}>
                <img src={Empty.THUMB_EMPTY} alt=""/>
                {/*
                 https://github.com/undotsushin/undotsushin/issues/468
                  1x1 を厳格に守る
                <img src={p.thumbnail} alt={p.title}/>
                 */}
              </figure>
              <div className="post-data">
                <p className={'post-category post-category-' + p.slug}>{category(p.category)}{category(p.category2)}</p>
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
        Ga.add( new GaData('ViewRanking.render.RankingDom.gaSend', 'home_ranking', 'click', this.props.url, parseFloat(this.props.id)) );
        // ----------------------------------------------
      },
      gaCategory: function() {
        // ----------------------------------------------
        // GA 計測タグ
        Ga.add( new GaData('ViewRanking.render.RankingDom.gaSend', `${this.props.thisSlug}_ranking`, 'click', this.props.url, parseFloat(this.props.id)) );
        // ----------------------------------------------
      },
      gaDetail: function() {
        // ----------------------------------------------
        // GA 計測タグ
        Ga.add( new GaData('ViewRanking.render.RankingDom.gaSend', 'detail_ranking', 'click', this.props.url, parseFloat(this.props.id)) );
        // ----------------------------------------------
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
        let categoryTitle = '';

        let categoryLabel;
        // category api slug が `all` 以外の時に category.label をタイトルに含める
        if ( categorySlug !== 'all' ) {
          categoryLabel = list[ 0 ].category.label;

          if ( categoryLabel !== '' ) {
            // category.label が空でなかったら '/' と一緒に加える
            categoryTitle = ' / ' + categoryLabel;
          }
        }

        return (

          <div className="board-small widget-ranking">
            {/* title */}
            <div className="widget-ranking-heading">
              <h3 className="widget-ranking-heading-title">RANKING</h3>
              <span className="widget-ranking-heading-ruby">{Message.RANKING_TITLE}{categoryTitle}</span>
            </div>
            <ul className="post-list">
            {
              list.map( function( article, i ) {

                let dae = new ArticleDae( article );
                let thumbnail = Safety.image( dae.media.images.thumbnail, Empty.IMG_SMALL );
                let empty = thumbnail === Empty.IMG_SMALL;

                // RankingDom instance を使い render
                return (
                    <RankingDom
                      key={'ranking-' + dae.id}
                      index={i}
                      id={String( dae.id )}
                      slug={dae.category.slug}
                      category={dae.category.label}
                      category2={dae.category2.label}
                      url={dae.url}
                      date={dae.displayDate}
                      title={dae.title}
                      thumbnail={thumbnail}
                      empty={empty}
                      total={dae.commentsCount}
                      home={home}
                      detail={detail}
                      thisSlug={thisSlug}
                    />
                );

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
      React.createElement( ArticleDom, {
        list: articles,
        home: this.home,
        detail: this.detail,
        slug: this.slug } ),
      element
    );


  }// render
}
