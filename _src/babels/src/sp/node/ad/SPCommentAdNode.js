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

/**
 * [SP] 記事詳細下 コメント一覧と「続き」の間に広告表示
 * @type {ReactClass}
 */
export const SPCommentAdNode = React.createClass( {
  propTypes: {
    // element id に使用する
    uniqueId: React.PropTypes.string.isRequired,
    // CommentsType.OFFICIAL || CommentsType.NORMAL の時に表示させる
    commentsListType: React.PropTypes.string.isRequired
  },
  getInitialState: function() {
    this.commentOfficialAd = null;
    return {
      need: this.props.commentsListType === CommentsType.OFFICIAL || this.props.commentsListType === CommentsType.NORMAL
    };
  },
  componentDidMount: function() {
    if (!this.state.need) {
      return;
    }
    let script;
    // script insert
    switch (this.props.commentsListType) {
      case CommentsType.OFFICIAL:
        script = Ad.make( Ad.SP_OFFICIAL, this.props.uniqueId );
        break;
      case CommentsType.NORMAL:
      default:
        script = Ad.make( Ad.SP_NORMAL, this.props.uniqueId );
        break;
    }
    // console.log( 'insert script ', script );
    // ReactDOM.findDOMNode( this.refs.comment_official_ad ).appendChild( script );
    ReactDOM.findDOMNode(this.commentOfficialAd).appendChild(script);
  },
  render: function() {
    if (!this.state.need) {
      return null;
    }
    // output
    return (
      <div
        id={this.props.uniqueId}
        className={`comment-ad comment-${this.props.commentsListType}-ad`}
        ref="commentOfficialAd"
      />
    );
    // if ( this.state.need ) {
    //   return (
    //     <div
    //       id={this.props.uniqueId}
    //       className={`comment-ad comment-${this.props.commentsListType}-ad`}
    //       ref="comment_official_ad"
    //     />
    //   );
    // } else {
    //   return null;
    // }
  },
});
