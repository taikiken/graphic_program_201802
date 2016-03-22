/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/13 - 16:15
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// app
import {Message} from '../../app/const/Message';

// model
import {Model} from '../../model/Model';
import {ModelBookmark} from '../../model/users/ModelBookmark';

let React = self.React;

/**
 * Bookmark on / off button
 * @type {ReactClass}
 */
export let BookmarkNode = React.createClass( {
  propTypes: {
    sign: React.PropTypes.bool.isRequired,
    isBookmarked: React.PropTypes.bool,
    articleId: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      isBookmarked: false,
      articleId: '',
      marked: 'bookmarked enable'
    };
  },
  getInitialState: function() {
    this.action = null;

    return {
      sign: this.props.sign,
      status: this.props.isBookmarked,
      bookmarked: this.props.isBookmarked ? this.props.marked : '',
      loading: ''
    };
  },
  render: function() {
    console.log( 'Bookmark render sign, status', this.state.sign, this.state.status );
    if ( this.state.sign ) {
      // login member のみ bookmark action が使える
      // let message = this.state.status ? Message.BOOKMARK_DID : Message.BOOKMARK_WILL;

      return (
        <div className="f-right">
          <div className={this.state.loading + ' loading-root btn-bookmark'}>
            <a href="#" className={this.state.bookmarked} onClick={this.clickBookmark} ref='bookmarked'>
              <span>{this.state.status ? Message.BOOKMARK_DID : Message.BOOKMARK_WILL}</span>
            </a>
            <div className='loading-spinner'></div>
          </div>
        </div>
      );
    } else {
      // 非ログイン user は何も表示しない
      return null;
    }

  },
  componentDidMount: function() {
    // ---------------------
    // bookmark 処理
    if ( this.state.sign ) {
      let action = new ModelBookmark( this.props.articleId );
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

  // Model event handler を unbind
  dispose: function() {

    let action = this.action;
    if ( action !== null ) {
      action.off( Model.COMPLETE, this.done );
      action.off( Model.UNDEFINED_ERROR, this.fail );
      action.off( Model.RESPONSE_ERROR, this.fail );
      this.action = null;
    }

  },
  // --------------------------------------------
  // click -> ajax -> done | fail

  // button click event handler
  // state.status と逆の action を行う
  clickBookmark: function( event ) {
    event.preventDefault();

    this.setState( { loading: 'loading' } );
    this.action.start( !this.state.status );

  },
  // Ajax 成功
  done: function() {

    let bookmarked = '';
    if ( !this.state.status ) {
      // 現在がbookmark 済み
      bookmarked = this.props.marked;
    }

    // loading 解除, 表示更新
    this.setState( { loading: '', status: !this.state.status, bookmarked: bookmarked } );

  },
  // Ajax 失敗
  fail: function() {

    // loading 解除
    this.setState( { loading: '' } );

  }

} );
