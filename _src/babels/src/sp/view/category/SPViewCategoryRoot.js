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
'use strict';

// parent
import {View} from '../../../view/View';

// view
import {SPViewCategory} from './SPViewCategory';

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
   * @param {Element} element root element archive 親
   * @param {Object} [option={}] optional event handler
   * @param {string} [slug=all] category slug
   */
  constructor( element:Element, option:Object = {}, slug:string = 'all' ) {
    super( element, option );
    this._slug = slug;
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
      render: function() {

        return (
          <div className="archive-container">
            <div className="archive-latest" ref="latest">
              <div className="archive-latest-container" ref="latestElement"></div>
              <div className="archive-latest-container-more" ref="latestMoreElement"></div>
            </div>
            <div className="archive-ranking" ref="ranking"></div>
            <div className="archive-videos" ref="videos"></div>
            <div className="archive-tab" ref="tab"></div>
          </div>
        );

      },
      componentDidMount: function() {
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
        callback[ View.DID_MOUNT ] = this.latestDidMount;
        let category = new SPViewCategory( this.props.slug, element, moreElement, callback );
        category.start();
      },
      // 人気
      ranking: function():void {

      },
      // 動画
      videos: function():void {

      },
      // 切替 tab
      tab: function():void {

      },
      // 新着記事 component did mount event handler
      latestDidMount: function():void {
        // latest did mount
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
