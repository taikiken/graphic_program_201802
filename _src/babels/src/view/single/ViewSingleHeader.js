/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/10 - 19:55
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// view
import {View} from '../View';

// dae
import {SingleDae} from '../../dae/SingleDae';

// app
import {User} from '../../app/User';

// node
import {BookmarkNode} from '../../node/bookmark/BookmarkNode';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * <h3>記事詳細(detail) 上部<h3>
 * <ul>
 *   <li>bookmark</li>
 *   <li>title</li>
 *   <li>投稿者</li>
 *   <li>日付</li>
 * </ul>
 */
export class ViewSingleHeader extends View {
  /**
   * 記事詳細 detail 上部
   * @param {Element} element single header root element
   * @param {SingleDae} single 変換済み JSON data
   */
  constructor( element:Element, single:SingleDae ) {
    super( element );
    /**
     * 変換済み JSON data
     * @type {SingleDae}
     * @private
     */
    this._single = single;
    /**
     * HeaderDom instance
     * @type {null|Object}
     * @private
     */
    this._rendered = null;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * HeaderDom instance を取得します
   * @return {?ReactClass} HeaderDom instance を返します
   */
  get rendered():Object {
    return this._rendered;
  }
  /**
   * HeaderDom instance を設定します
   * @param {Object} rendered HeaderDom instance
   */
  set rendered( rendered:Object ):void {
    this._rendered = rendered;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * render 処理を開始します
   */
  start():void {
    this.render( this._single );
  }
  /**
   * render します
   * @param {SingleDae} singleDae JSON 変換済みデータ
   */
  render( singleDae:SingleDae ):void {

    let element = this.element;
    let _this = this;

    let HeaderDom = React.createClass( {
      propTypes: {
        single: React.PropTypes.object.isRequired,
        sign: React.PropTypes.bool.isRequired
      },
      getInitialState: function() {
        // this.action = null;

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

        return (
          <div>
            <div className={'post-heading post-heading-' + single.id}>
              <h1>{single.title}</h1>
            </div>
            <div className="post-data">
              <div className="f-left">
                <p className="post-author">{single.user.userName}</p>
                <p className="post-date">{single.displayDate}</p>
              </div>
              {/* div.f-right (bookmark: on / off) */}
              <BookmarkNode
                sign={this.state.sign}
                isBookmarked={this.state.status}
                articleId={String(single.id)}
              />
            </div>
            {/* 記事上 画像 or 動画 */}
            {/*
            React component へ変更
            Facebook Video のレンダリングが間に合わず sdk 描画が空振りすることがあるため
            <div ref="singleImage"></div>

             2016-03-15 design が変更になったのでここから分離します
            <MediaNode
              mediaType={this.state.single.mediaType}
              media={this.state.single.media}
            />
             */}
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
      // --------------------------------------------
      // update
      updateSingle: function( single, sign ) {
        this.setState( { single: single, sign: sign } );
      }
    } );

    if ( this._rendered === null ) {

      this._rendered = ReactDOM.render(
        React.createElement( HeaderDom, { single: singleDae, sign: User.sign } ),
        element
      );

    } else {

      this._rendered.updateSingle( singleDae, User.sign );

    }

  }// render
}
