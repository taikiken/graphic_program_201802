/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/15 - 14:35
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

// React
let React = self.React;

// --------------------------------------------
// bookmark button
// --------------------------------------------
/**
 * <p>mypage bookmark button<br>
 * PC, SP 共用化するため 汎用化します</p>
 * @type {ReactClass}
 */
export let BookmarkButtonNode = React.createClass( {
  propType: {
    articleId: React.PropTypes.string.isRequired,
    bookmarked: React.PropTypes.bool.isRequired
  },
  getInitialState: function() {
    this.model = null;

    return {
      articleId: this.props.articleId,
      bookmarked: this.props.bookmarked,
      loading: ''
    };
  },
  render: function() {
    let bookmarkClass = ( bookmarked:Boolean ):string => {
      return bookmarked ? 'bookmarked enable' : '';
    };
    let bookmarkMessage = ( bookmarked:Boolean ):string => {
      return bookmarked ? Message.BOOKMARK_DID : Message.BOOKMARK_WILL;
    };

    return (
      <div className={'btn-bookmark ' + this.state.loading}>
        <a href="#" className={bookmarkClass(this.state.bookmarked)} onClick={this.clickHandler}>
          <span>{bookmarkMessage(this.state.bookmarked)}</span>
        </a>
        <div className="loading-spinner" />
      </div>
    );
  },
  componentDidMount: function() {
    if ( this.model === null ) {
      let model = new ModelBookmark( this.state.articleId );
      this.model = model;
      model.on( Model.COMPLETE, this.done );
      model.on( Model.UNDEFINED_ERROR, this.fail );
      model.on( Model.RESPONSE_ERROR, this.fail );
    }
  },
  componentWillUnMount: function() {
    this.dispose();
  },
  clickHandler: function( event:Event ) {
    event.preventDefault();
    this.setState( { loading: 'loading' } );
    this.model.start( !this.state.bookmarked );
  },
  // --------------------------------------------
  // custom method
  dispose: function() {

    let model = this.model;
    if ( model !== null ) {
      model.off( Model.COMPLETE, this.done );
      model.off( Model.UNDEFINED_ERROR, this.fail );
      model.off( Model.RESPONSE_ERROR, this.fail );
      this.model = null;
    }

  },
  done: function() {

    // loading 解除, 表示更新
    this.setState( { loading: '', bookmarked: !this.state.bookmarked } );

  },
  fail: function() {

    // loading 解除
    this.setState( { loading: '' } );

  }
} );
