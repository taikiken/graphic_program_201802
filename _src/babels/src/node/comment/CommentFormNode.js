/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/11 - 16:51
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/*
// app
import {Empty} from '../../app/const/Empty';
import {ErrorTxt} from '../../app/const/ErrorTxt';

// event
import {ReplyStatus} from '../../event/ReplyStatus';
import {CommentStatus} from '../../event/CommentStatus';

// data
import {Form} from '../../data/Form';
import {Safety} from '../../data/Safety';
// import {Result} from '../../data/Result';
import {ErrorMessage} from '../../data/ErrorMessage';

// model
import {ModelComment} from '../../model/comment/ModelComment';
import {ModelCommentReply} from '../../model/comment/ModelCommentReply';
import {Model} from '../../model/Model';
*/
// node
// import {ErrorNode} from '../error/ErrorNode';
import {CommentFormOpenerNode} from './form/CommentFormOpenerNode';
import {CommentFormElementNode} from './form/CommentFormElementNode';

// React
let React = self.React;

// wrapper dom + form
/**
 * <h3>React component<h3>
 * comment form を表示するための基点 clas
 * @type {ReactClass}
 */
export let CommentFormNode = React.createClass( {
  propTypes: {
    uniqueId: React.PropTypes.string.isRequired,
    // open / close, default close
    toggle: React.PropTypes.string,
    // コメント送信者（自分の）profile picture
    icon: React.PropTypes.string,
    // 記事 id
    articleId: React.PropTypes.string.isRequired,
    // コメント id（オプション）
    commentId: React.PropTypes.string,
    // コメント数 default 0
    commentCount: React.PropTypes.number,
    // ログインの有無
    sign: React.PropTypes.bool.isRequired,
    // 親コメント? default false
    parent: React.PropTypes.bool,
    // 記事へのコメント送信 default false
    independent: React.PropTypes.bool,
    // コメント種類
    commentType: React.PropTypes.string.isRequired
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
        return <div className="comment-respond"></div>;
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
          <CommentFormElementNode
            uniqueId={this.props.uniqueId}
            toggle={toggle}
            open={toggle === 'open'}
            independent={this.props.independent}
            icon={this.props.icon}
            articleId={this.props.articleId}
            commentId={this.props.commentId}
            commentType={this.props.commentType}
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
