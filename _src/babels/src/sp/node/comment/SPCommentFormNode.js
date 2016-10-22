/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/12 - 23:54
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {CommentFormOpenerNode} from '../../../node/comment/form/CommentFormOpenerNode';
import {SPCommentFormElementNode} from './form/SPCommentFormElementNode';

// React
let React = self.React;

// wrapper dom + form
/**
 * comment form を表示するための基点 class
 * @type {ReactClass}
 */
export let SPCommentFormNode = React.createClass( {
  propTypes: {
    uniqueId: React.PropTypes.string.isRequired,
    // 記事 id
    articleId: React.PropTypes.string.isRequired,
    // ログインの有無
    sign: React.PropTypes.bool.isRequired,
    // コメント種類
    commentType: React.PropTypes.string.isRequired,
    // コメント詳細URL for ga
    url: React.PropTypes.string.isRequired,
    
    // open / close, default close
    toggle: React.PropTypes.string,
    // コメント送信者（自分の）profile picture
    icon: React.PropTypes.string,
    // コメント id（オプション）
    commentId: React.PropTypes.string,
    // コメント数 default 0
    commentCount: React.PropTypes.number,
    // 親コメント? default false
    parent: React.PropTypes.bool,
    // 記事へのコメント送信 default false
    independent: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      toggle: 'close',
      icon: '',
      commentId: '',
      commentCount: 0,
      parent: false,
      independent: false
    };
  },
  getInitialState: function() {
    this.replyStatus = null;
    // this.canOpen = true;

    return {
      // form 表示初期値, 記事コメント以外は閉じる
      // toggle: this.props.independent ? 'open' : 'close',
      loading: '',
      body: ''
    };
  },
  render: function() {

    let sign = this.props.sign;
    // ----------------------------
    // dom

    if ( !sign || (!this.props.parent && !this.props.independent ) ) {
      // console.log( '!sign || (!this.props.parent && !this.props.independent )', this.props.parent, this.props.uniqueId );
      // not parent, not independent
      // 表示しない, 下に空きを作るための空タグのみ
      // return <div className="comment-respond"></div>;
      if ( !this.props.parent ) {
        return null;
      } else {
        // parent：下に空きをつける
        return <div className="comment-respond" />;
      }
    }

    // -------------------------
    // prent or independent 何かを表示する
    let toggle = this.props.toggle;
    if ( this.props.independent ) {
      toggle = 'open';
    }

    let message = 'コメント';
    // コメント数のみ表示
    let staticMessage = '';
    // 返信アクション付きコメント数
    let actionMessage = `${message}へ返信`;
    if ( this.props.commentCount > 0 ) {
      // コメント数のみ表示
      staticMessage = `${message} (${this.props.commentCount})`;
      // 「返信」とコメント数
      actionMessage = `${actionMessage} (${this.props.commentCount})`;
    }

    if ( !sign ) {
      // 非ログイン
      // + 親でも 記事へのコメントでもない（子供）

      if ( staticMessage !== '' ) {
        return (
          <div className="comment-respond">
            <p className="comment-respond-opener"><span>{staticMessage}</span></p>
          </div>
        );
      } else {
        return null;
      }

    } else {
      // ログイン
      // ログインユーザーのみフォームを表示する

      let commentClass = this.props.independent ? 'comment-form' : 'comment-respond';

      return (
        <div className={commentClass + ' comment-root'}>
          <CommentFormOpenerNode
            uniqueId={this.props.uniqueId}
            independent={this.props.independent}
            staticMessage={staticMessage}
            actionMessage={actionMessage}
            callback={this.openerClick}
          />
          <SPCommentFormElementNode
            uniqueId={this.props.uniqueId}
            toggle={toggle}
            open={toggle === 'open'}
            independent={this.props.independent}
            icon={this.props.icon}
            articleId={this.props.articleId}
            commentId={this.props.commentId}
            commentType={this.props.commentType}
            url={this.props.url}
          />
        </div>
      );

    }// if / else

  },
  /*
   componentDidMount: function() {

   },
   componentWillUnmount: function() {

   },
   */
  // ----------------------------------------
  bodyChange: function( event ) {
    // textarea value
    this.setState( { body: event.target.value } );
  },
  openerClick: function( /* status:string */ ) {
  }
} );
