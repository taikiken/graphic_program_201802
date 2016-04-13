/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/12 - 16:30
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {CommentActionNode} from './CommentActionNode';

// event
import {CommentStatus} from '../../event/CommentStatus';

// React
let React = self.React;

// 通報 drop menu
/**
 * コメント欄の drop menu button
 *
 * ViewComments
 * |- CommentNode
 *    |- CommentMenuNode
 *       |- CommentActionNode
 *
 * @type {ReactClass}
 */
export let CommentMenuNode = React.createClass( {
  propTypes: {
    // unique id（識別のために必要）
    uniqueId: React.PropTypes.string.isRequired,
    // user id
    userId: React.PropTypes.string.isRequired,
    commentUserId: React.PropTypes.string.isRequired,
    articleId: React.PropTypes.string.isRequired,
    commentId: React.PropTypes.string.isRequired,
    // 返信 id
    replyId: React.PropTypes.string.isRequired,
    // 親コメント? default false
    parent: React.PropTypes.bool.isRequired,

    sign: React.PropTypes.bool.isRequired
  },
  getInitialState: function() {
    this.timer = 0;
    this.status = null;

    return {
      open: 'close',
      loading: '',
      show: true
    };
  },
  render: function() {
    if ( this.props.sign ) {
      // ログインユーザーのみ
      let others = this.props.userId === '' || this.props.userId === '0' || this.props.userId !== this.props.commentUserId;
      // console.log( 'others ', others, this.props.userId, this.props.commentUserId );
      // 通報実装なしになったので
      // 「削除」以外の表示がいらなくなった
      // && !others を追加
      if ( this.state.show && !others ) {
        return (
          <div className={`comment-menu ${this.state.open} ${this.state.loading}`}>
            <a href="#" className="comment-menu-btn" onClick={this.clickHandler}>MENU</a>
            <ul className="dropMenu">
              <CommentActionNode
                uniqueId={this.props.uniqueId}
                toggle={this.state.open}
                others={others}
                userId={this.props.userId}
                commentUserId={this.props.commentUserId}
                commentId={this.props.commentId}
                replyId={this.props.replyId}
                articleId={this.props.articleId}
                parent={this.props.parent}
                remove={this.didDelete}
                report={this.didReport}
              />
            </ul>
          </div>
        );
      } else {
        // 非表示
        return null;
      }

    } else {
      // 非ログイン 出力しない
      return null;
    }

  },
  componentDidMount: function() {
    this.status = CommentStatus.factory();
  },
  componentWillUnmount: function() {
    // event handler unbind
    // timer clear
    this.destroy();
  },
  // -------------------------------------------------------
  // 以降 custom method
  didDelete: function( type:string ) {
    // console.log( 'didDelete', type );

    switch ( type ) {
      case 'click':
        this.destroy();
        break;

      case 'done':
        this.setState( {show: false} );
        break;

      case 'fail':
        this.activateBodyClick();
        break;

      default:
        this.activateBodyClick();
        break;
    }

  },
  didReport: function( type:string ) {
    // console.log( 'didReport', type );

    switch ( type ) {
      case 'click':
        this.destroy();
        break;

      case 'done':
        // this.setState( {show: false} );
        this.toggleState();
        break;

      case 'fail':
      default:
        this.activateBodyClick();
        break;
    }
  },
  // -----------------------------
  // open / close control
  // icon click で drop menu open / close
  clickHandler: function( event ) {
    event.preventDefault();
    this.toggleState();
  },
  // document.body.onClick event handler
  // drop menu open 後に 領域外 click で閉じるため
  bodyClick: function() {
    if ( this.state.open === 'open' ) {

      // document.body が a より先に反応する
      // native event bind と React 経由の違いかも
      // body click 後の処理を遅延させる, 多分気づかない程度
      this.timer = setTimeout( this.toggleState, 100 );

    }
  },
  activateBodyClick: function() {
    document.body.addEventListener( 'click', this.bodyClick, false );
  },
  // open / close toggle
  toggleState: function() {

    this.destroy();

    if ( this.state.open === 'close' ) {
      // close -> open
      // 他の開いている奴らにモーダルが開くことを通知する
      // ex. header の drop down とか
      this.status.modal( this.props.commentId );
      // document.body へ click event handler bind
      this.setState( { open: 'open' } );
      // console.log( 'open click ', this.props.articleId, this.props.commentId, this.props.replyId );
      this.activateBodyClick();
    } else {
      // open -> close
      this.setState( { open: 'close' } );
    }

  },
  // timer cancel
  // body.click unbind
  // 後処理
  destroy: function() {

    // body click からの遅延処理を clear する
    // timer を 0 にし error にならないようにする
    clearTimeout( this.timer );
    this.timer = 0;
    // document.body からclick event handler unbind
    document.body.removeEventListener( 'click', this.bodyClick );

  }
} );
