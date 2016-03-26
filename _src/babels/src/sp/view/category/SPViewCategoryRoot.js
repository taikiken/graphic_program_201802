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
import {View} from '../../../view/View';

// view
import {SPViewCategory} from './SPViewCategory';
import {SPViewRanking} from '../sidebar/SPViewRanking';
import {SPViewVideos} from '../sidebar/SPViewVideos';

// node
import {SPTabNode} from '../../node/SPTabNode';

// data
import {Safety} from '../../../data/Safety';

// util
import {Scroll} from '../../../util/Scroll';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * archive 親コンテナ
 */
export class SPViewCategoryRoot extends View {
  /**
   * archive 親コンテナ,
   * 新着, 人気, 動画 3リクエストを行う
   * @param {string} slug category slug
   * @param {Element} element root element archive 親
   * @param {Object} [option={}] optional event handler
   */
  constructor( slug:string, element:Element, option:Object = {} ) {
    super( element, option );
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

        this.scroll = {
          latest: 0,
          ranking: 0,
          videos: 0
        };

        return {
          current: 'latest'
        };
      },
      render: function() {

        return (
          <div>
            <div className="archive-tab" ref="tab"></div>
            <div className={`archive-container ${this.state.current}`}>
              <div className="archive-latest board-large" ref="latest">
                <div className="archive-latest-container" ref="latestElement"></div>
                <div className="archive-latest-container-more" ref="latestMoreElement"></div>
              </div>
              <div className="archive-ranking board-large" ref="ranking">
                <div className="archive-latest-container" ref="rankingElement"></div>
                <div className="archive-latest-container-more" ref="rankingMoreElement"></div>
              </div>
              <div className="archive-videos board-large" ref="videos">
                <div className="archive-latest-container" ref="videosElement"></div>
                <div className="archive-latest-container-more" ref="videosMoreElement"></div>
              </div>
            </div>
          </div>
        );

      },
      componentDidMount: function() {
        // this.tabNode = null;

        // after mount, request API
        this.latest();
        this.ranking();
        this.videos();
        this.tab();
      },
      // --------------------------------------
      // custom

      // 新着記事
      latest: function():void {
        let element = ReactDOM.findDOMNode(this.refs.latestElement);
        let moreElement = ReactDOM.findDOMNode(this.refs.latestMoreElement);
        let callback = {};
        // callback[ View.DID_MOUNT ] = this.latestDidMount;
        let category = new SPViewCategory( this.props.slug, element, moreElement, callback );
        category.start();
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
        ReactDOM.render(
          <SPTabNode
            callback={this.tabClick}
          />,
          element
        );
      },
      /*
      // 新着記事 component did mount event handler
      latestDidMount: function():void {
        // latest did mount
      },
      */
      tabClick( id:string ):void {
        let scroll = this.scroll;
        scroll[ this.state.current ] = Scroll.y;
        this.setState( { current: id } );

        setTimeout( function() {
          Scroll.y = scroll[ id ];
        }, 25 );
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
