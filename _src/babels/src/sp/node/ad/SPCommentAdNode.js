/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/31 - 15:19
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {CommentsType} from '../../../app/const/CommentsType';
import {Ad} from '../../../app/const/Ad';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

export let SPCommentAdNode = React.createClass( {
  propTypes: {
    uniqueId: React.PropTypes.string.isRequired,
    commentsListType: React.PropTypes.string.isRequired
  },
  getInitialState: function() {
    return {
      need: this.props.commentsListType === CommentsType.OFFICIAL || this.props.commentsListType === CommentsType.NORMAL
    };
  },
  render: function() {

    if ( this.state.need ) {
      return (
        <div id={this.props.uniqueId} className={`comment-ad comment-${this.props.commentsListType}-ad`} ref="comment_official_ad"></div>
      );
    } else {
      return null;
    }

  },
  componentDidMount: function() {
    if ( !this.state.need ) {
      return;
    }

    let script;

    // script insert
    switch ( this.props.commentsListType ) {
      case CommentsType.OFFICIAL:
        script = Ad.make( Ad.SP_OFFICIAL, this.props.uniqueId );
        break;

      case CommentsType.NORMAL:
      default:
        script = Ad.make( Ad.SP_NORMAL, this.props.uniqueId );
        break;
    }
    // console.log( 'insert script ', script );
    ReactDOM.findDOMNode( this.refs.comment_official_ad ).appendChild( script );
  }
} );