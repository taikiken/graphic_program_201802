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
import {ViewSingleImage} from '../single/ViewSingleImage';
import {ViewSingleVideo} from '../single/ViewSingleVideo';

// dae
import {SingleDae} from '../../dae/SingleDae';

// app
import {User} from '../../app/User';
import {MediaType} from '../../app/const/MediaType';

// model
import {Model} from '../../model/Model';
import {ModelBookmark} from '../../model/users/ModelBookmark';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * detail 上部
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
        console.log( '----------------------- HeaderDom ', this.state.single );
        let single = this.state.single;
        let message = this.state.status ? 'ブックマーク済' : 'ブックマークする';
        let right = '';

        if ( this.state.sign ) {
          // login member のみ bookmark action が使える
          right = <div className="f-right">
            <div className={this.state.loading + ' loading-root btn-bookmark'}>
              <a href="#" className={this.state.bookmarked} onClick={this.clickBookmark} ref='bookmarked'>
                <span>{message}</span>
              </a>
              <div className='loading-spinner'>&nbsp;</div>
            </div>
          </div>;
        }

        return (
          <div>
            <div className="post-heading">
              <h1>{single.title}</h1>
            </div>
            <div className="post-data">
              <div className="f-left">
                <p className="post-author">{single.user.userName}</p>
                <p className="post-date">{single.displayDate}</p>
              </div>
              {right}
            </div>
            {/* 記事上 画像 or 動画 */}
            <div ref="singleImage"></div>
          </div>
        );

      },
      componentWillMount: function() {

        // will mount
        _this.executeSafely( View.WILL_MOUNT );

      },
      componentDidMount: function() {

        // after mount
        _this.executeSafely( View.DID_MOUNT );

        // 上部画像
        // media type check
        let single = this.state.single;
        let imageNode = ReactDOM.findDOMNode(this.refs.singleImage);
        let img;

        // media type で image / video  処理分岐
        if ( single.mediaType === MediaType.IMAGE ) {

          // image
          img = new ViewSingleImage( imageNode, single.media.images );

        } else if ( single.mediaType === MediaType.VIDEO ) {

          let mediaDae = single.media;
          if ( !mediaDae.video || (!mediaDae.video.url && !mediaDae.video.youtube) ) {
            // not movie data
            img = new ViewSingleImage( imageNode, single.media.images );

          } else {
            // found video data
            img = new ViewSingleVideo( imageNode, mediaDae );
          }

        }

        if ( typeof img !== 'undefined' ) {
          img.start();
        }

        // ---------------------
        // bookmark 処理
        console.log( 'bookmark 処理', this.state.sign  );
        if ( this.state.sign ) {
          let action = new ModelBookmark( this.state.single.id );
          this.action = action;
          action.on( Model.COMPLETE, this.done );
          action.on( Model.UNDEFINED_ERROR, this.fail );
          action.on( Model.RESPONSE_ERROR, this.fail );
        }

      },
      componentWillUnMount: function() {
        this.dispose();
      },
      // --------------------------------------------
      // custom method
      updateSingle: function( single, sign ) {
        this.setState( { single: single, sign: sign } );
      },
      clickBookmark: function( event ) {
        event.preventDefault();

        this.setState( { loading: 'loading' } );
        console.log( 'clickBookmark ', this.action );
        this.action.start( !this.state.status );

      },
      done: function( result ) {

        let bookmarked = '';
        if ( !this.state.status ) {
          // 現在がbookmark 済み
          bookmarked = 'bookmarked enable';
        }

        this.setState( { loading: '', status: !this.state.status, bookmarked: bookmarked } );

      },
      fail: function( error ) {

        this.setState( { loading: '' } );

      },
      dispose: function() {

        let action = this.action;
        if ( action !== null ) {
          action.off( Model.COMPLETE, this.done );
          action.off( Model.UNDEFINED_ERROR, this.fail );
          action.off( Model.RESPONSE_ERROR, this.fail );
        }

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
