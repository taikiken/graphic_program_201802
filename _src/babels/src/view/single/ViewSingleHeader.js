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
'use strict';

// view
import {View} from '../View';
/*
import {ViewSingleImage} from '../single/ViewSingleImage';
import {ViewSingleVideo} from '../single/ViewSingleVideo';
*/

// dae
import {SingleDae} from '../../dae/SingleDae';

// app
import {User} from '../../app/User';
import {Message} from '../../app/const/Message';
/*
import {MediaType} from '../../app/const/MediaType';
*/

// model
import {Model} from '../../model/Model';
import {ModelBookmark} from '../../model/users/ModelBookmark';

// node
import {MediaNode} from '../../node/single/MediaNode';
import {BookmarkNode} from '../../node/bookmark/BookmarkNode';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * <h3>React component<h3>
 * 記事詳細(detail) 上部
 * - bookmark
 * - title
 * - 投稿者
 * - 日付
 */
export class ViewSingleHeader extends View {
  /**
   * detail 上部
   * @param {Element} element single header root element
   * @param {SingleDae} single 変換済み JSON data
   */
  constructor( element:Element, single:SingleDae ) {
    super( element );
    this._single = single;
    this._rendered = null;
  }
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

        // bookmark on / off 機能を BookmarkNode へ移動
        // let message = this.state.status ? Message.BOOKMARK_DID : Message.BOOKMARK_WILL;
        // let right = '';

        /*
        if ( this.state.sign ) {
          // login member のみ bookmark action が使える
          right = <div className="f-right">
            <div className={this.state.loading + ' loading-root btn-bookmark'}>
              <a href="#" className={this.state.bookmarked} onClick={this.clickBookmark} ref='bookmarked'>
                <span>{message}</span>
              </a>
              <div className='loading-spinner'></div>
            </div>
          </div>;
        }
        */

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
             */}
            <MediaNode
              mediaType={this.state.single.mediaType}
              media={this.state.single.media}
            />
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

        /*
        // ---------------------
        // bookmark 処理
        if ( this.state.sign ) {
          let action = new ModelBookmark( this.state.single.id );
          this.action = action;
          action.on( Model.COMPLETE, this.done );
          action.on( Model.UNDEFINED_ERROR, this.fail );
          action.on( Model.RESPONSE_ERROR, this.fail );
        }
        */
      },
      componentWillUnMount: function() {
        // this.dispose();
      },
      // --------------------------------------------
      // custom method
      dispose: function() {
        /*
        let action = this.action;
        if ( action !== null ) {
          action.off( Model.COMPLETE, this.done );
          action.off( Model.UNDEFINED_ERROR, this.fail );
          action.off( Model.RESPONSE_ERROR, this.fail );
          this.action = null;
        }
        */
      },
      /*
      // --------------------------------------------
      // click -> ajax -> done | fail
      clickBookmark: function( event ) {
        event.preventDefault();

        this.setState( { loading: 'loading' } );
        this.action.start( !this.state.status );

      },
      done: function() {

        let bookmarked = '';
        if ( !this.state.status ) {
          // 現在がbookmark 済み
          bookmarked = 'bookmarked enable';
        }

        // loading 解除, 表示更新
        this.setState( { loading: '', status: !this.state.status, bookmarked: bookmarked } );

      },
      fail: function() {

        // loading 解除
        this.setState( { loading: '' } );

      },
      */
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
