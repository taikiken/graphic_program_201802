/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/13 - 17:29
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

// view
import {View} from '../../../view/View';
import {ViewSingleHeader} from '../../../view/single/ViewSingleHeader';

// app
import {Url} from '../../../app/const/Url';
import {User} from '../../../app/User';

// dae
import {SingleDae} from '../../../dae/SingleDae';

// node
import {BookmarkNode} from '../../../node/bookmark/BookmarkNode';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * <h3>SP 記事詳細(detail) 上部<h3>
 * - bookmark
 * - title
 * - 投稿者
 * - カテゴリー
 * - 日付
 */
export class SPViewSingleHeader extends ViewSingleHeader {
  /**
   * SP 記事詳細(detail) 上部
   * @param {Element} element single header root element
   * @param {SingleDae} single 変換済み JSON data
   */
  constructor( element:Element, single:SingleDae ) {
    super( element, single );
  }
  /**
   * render します
   * @param {SingleDae} singleDae JSON 変換済みデータ
   */
  render( singleDae:SingleDae ):void {
    let _this = this;

    let SPHeaderDom = React.createClass( {
      propTypes: {
        single: React.PropTypes.object.isRequired,
        sign: React.PropTypes.bool.isRequired
      },
      getInitialState: function() {
        this.action = null;

        return {
          sign: this.props.sign,
          single: this.props.single,
          status: this.props.single.isBookmarked,
          bookmarked: this.props.single.isBookmarked ? 'bookmarked enable' : '',
          loading: ''
        };
      },
      render: function() {
        let single = this.state.single;

        let category = ( label, slug ):string => {
          return !label ? '' : <span className="category-label"><a href={Url.category(slug)}>{label}</a></span>;
        };

        return (
          <div className="sp-single-header">
            <div className={'post-heading post-heading-' + single.id}>
              <h1>{single.title}</h1>
            </div>
            <div className="post-data">
              <div className="f-left">
                <p className="post-author">{single.user.userName}</p>
                <p className="post-category">{category(single.category.label, single.category.slug)}{category(single.category2.label, single.category2.slug)}</p>
                <p className="post-date">{single.displayDate}</p>
              </div>
              {/* div.f-right (bookmark: on / off) */}
              <BookmarkNode
                sign={this.state.sign}
                isBookmarked={this.state.status}
                articleId={String(single.id)}
              />
            </div>
          </div>
        );
      },
      // --------------------------------------------
      // delegate
      componentWillMount: function() {

        // will mount
        _this.executeSafely( View.WILL_MOUNT );

      },
      componentDidMount: function() {

        // after mount
        _this.executeSafely( View.DID_MOUNT );

      },
      componentWillUnMount: function() {
        // this.dispose();
      },
      // --------------------------------------------
      // update
      updateSingle: function( single, sign ) {
        this.setState( { single: single, sign: sign } );
      }
    } );

    if ( this._rendered === null ) {

      this._rendered = ReactDOM.render(
        React.createElement( SPHeaderDom, { single: singleDae, sign: User.sign } ),
        this.element
      );

    } else {

      this._rendered.updateSingle( singleDae, User.sign );

    }
  }
}
