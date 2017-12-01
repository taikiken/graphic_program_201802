/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/10 - 14:20
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// parent
import View from '../../../view/View';

// view
import {SPViewCategoryWithSlug} from './SPViewCategoryWithSlug';
import {SPViewRanking} from '../sidebar/SPViewRanking';
import {SPViewVideos} from '../sidebar/SPViewVideos';

// node
import {SPTabNode} from '../../node/SPTabNode';

// dae
import {CategoriesSlugDae} from '../../../dae/caegories/CategoriesSlugDae';

// data
import {Safety} from '../../../data/Safety';

// util
import {Scroll} from '../../../util/Scroll';

// Ga
import {Ga} from '../../../ga/Ga';
import {GaData} from '../../../ga/GaData';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * archive 親コンテナ
 */
export class SPViewCategoryRoot extends View {
  /**
   * <p>archive 親コンテナ,<br>
   * 新着, 人気, 動画 3リクエストを行う</p>
   * <p>@since 2016-09-20<br>
   * 新着記事のみ表時に変更</p>
   * @see https://github.com/undotsushin/undotsushin/issues/970#issuecomment-238405645
   * @see https://github.com/undotsushin/undotsushin/issues/1010
   * @see https://github.com/undotsushin/undotsushin/issues/1095
   * @param {string} slug category slug
   * @param {Element} element root element archive 親
   * @param {Object} [option={}] optional event handler
   */
  constructor( slug:string, element:Element, option:Object = {} ) {
    super( element, option );
    /**
     * category slug
     * @type {string}
     * @private
     */
    this._slug = Safety.string( slug, 'all' );
  }
  /**
   * rendering 開始
   */
  start():void {
    this.render();
  }
  /**
   * rendering
   */
  render():void {

    let CategoryRootDom = React.createClass( {
      propTypes: {
        slug: React.PropTypes.string.isRequired
      },
      getInitialState: function() {
        // /**
        //  * SPViewCategoryWithSlug instance を保持します
        //  * @type {null|SPViewCategoryWithSlug}
        //  * @private
        //  */
        // this.latestInfo = null;
        /**
         * SPTabNode instance を保持します
         * @type {?ReactClass}
         * @private
         */
        this.tabNode = null;
        /**
         * 各 tab の scroll 位置を保存します
         * @private
         * @type {{latest: number, ranking: number, videos: number}}
         */
        this.scroll = {
          latest: 0,
          ranking: 0,
          videos: 0
        };
        /**
         * https://github.com/undotsushin/undotsushin/issues/600
         * 同時にリクエストしないように表示した時に行うための flag
         * @private
         * @type {{latest: boolean, ranking: boolean, videos: boolean}}
         */
        this.requests = {
          latest: true,
          ranking: false,
          videos: false
        };

        return {
          current: 'latest'
        };
      },
      render: function() {

        return (
          <div>
            <div className="archive-tab" ref="tab" />
            <div className={`archive-container ${this.state.current}`}>
              <div className="archive-latest board-large" ref="latest">
                <div className="archive-latest-container" ref="latestElement" />
                <div className="archive-latest-container-more" ref="latestMoreElement" />
              </div>
              <div className="archive-ranking board-large" ref="ranking">
                <div className="archive-latest-container" ref="rankingElement" />
                <div className="archive-latest-container-more" ref="rankingMoreElement" />
              </div>
              <div className="archive-videos board-large" ref="videos">
                <div className="archive-latest-container" ref="videosElement" />
                <div className="archive-latest-container-more" ref="videosMoreElement" />
              </div>
            </div>
          </div>
        );

      },
      componentDidMount: function() {
        this.tab();
        // after mount, request API
        this.latest();
        // this.ranking();
        // this.videos();
      },
      slugDone: function( result:CategoriesSlugDae ) {
        // console.log( 'slugDone', result );
        this.tabNode.activateTab( result.isShowFilter );
      },
      // --------------------------------------
      // custom

      // 新着記事
      latest: function():SPViewCategoryWithSlug {
        let element = ReactDOM.findDOMNode(this.refs.latestElement);
        let moreElement = ReactDOM.findDOMNode(this.refs.latestMoreElement);
        let callback = {};
        callback[ SPViewCategoryWithSlug.CATEGORY_INFO ] = this.slugDone;
        // let category = new SPViewCategory( this.props.slug, element, moreElement, callback );
        let category = new SPViewCategoryWithSlug( this.props.slug, element, moreElement, callback );
        category.start();
        return category;
      },
      // 人気
      ranking: function():void {
        let element = ReactDOM.findDOMNode(this.refs.rankingElement);
        let moreElement = ReactDOM.findDOMNode(this.refs.rankingMoreElement);
        let ranking = new SPViewRanking( element, moreElement, null, this.props.slug );
        ranking.start();
      },
      // 動画
      videos: function():void {
        let element = ReactDOM.findDOMNode(this.refs.videosElement);
        let moreElement = ReactDOM.findDOMNode(this.refs.videosMoreElement);
        let video = new SPViewVideos( element, moreElement, null, this.props.slug );
        video.start();
      },
      // 切替 tab
      tab: function():void {
        let element = ReactDOM.findDOMNode(this.refs.tab);
        this.tabNode = ReactDOM.render(
          <SPTabNode
            callback={this.tabClick}
          />,
          element
        );
      },

      // tab click callback from <SPTabNode>
      tabClick( id:string ):void {
        this.scrollPosition( id );
        this.didRequest( id );
        this.setState( { current: id } );
      },
      // tab が開いた時に scroll 位置を前回の状態に復元する
      scrollPosition( id:string ): void {
        let scroll = this.scroll;
        scroll[ this.state.current ] = Scroll.y;

        setTimeout( function() {
          Scroll.y = scroll[ id ];
        }, 25 );
      },
      // 最初の Ajax request を行ったかを確認し、リクエストを行うか否かを決める
      didRequest( id:string ):void {
        if ( !this.requests[ id ] ) {
          // not request -> first request
          this.requests[ id ] = true;
          this[ id ]();

          let tag = id === 'videos' ? 'movie' : id;
          // ----------------------------------------------
          // GA 計測タグ
          // PC/スマホカテゴリー一覧の新着記事
          Ga.add( new GaData('SPViewCategoryRoot.render.CategoryRootDom.didRequest', `${this.props.slug}_articles`, `view - ${tag}`, String(1), 0, true) );
          // ----------------------------------------------
        }
      }
    } );

    ReactDOM.render(
      <CategoryRootDom
        slug={this._slug}
      />,
      this.element
    );

  }
}
