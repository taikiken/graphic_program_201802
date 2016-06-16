/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/12 - 23:48
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {ViewCommentForm} from '../../../view/comment/ViewCommentForm';

// app
import {User} from '../../../app/User';
import {CommentsType} from '../../../app/const/CommentsType';
import {Message} from '../../../app/const/Message';

// sp
import {SPCommentFormNode} from '../../node/comment/SPCommentFormNode';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * SP 記事へのコメント
 */
export class SPViewCommentForm extends ViewCommentForm {
  /**
   * SP 記事へのコメントフォーム
   * @param {Element} element root element
   * @param {Number} articleId 記事Id
   * @param {string} [icon=''] ユーザー画像パス
   */
  constructor( element:Element, articleId:Number, icon:string = '' ) {
    console.log( 'SPViewCommentForm' );
    super( element, articleId, icon );
  }
  /**
   * フォーム生成を開始します
   * @param {string} id 記事Id
   */
  render( id:string ):void {
    // from 2016-06-16
    // click で開くコメントフォーム
    let SPCommentFormOpenerDom = React.createClass( {
      propTypes: {
        uniqueId: React.PropTypes.string.isRequired,
        toggle: React.PropTypes.string.isRequired,
        icon: React.PropTypes.string.isRequired,
        articleId: React.PropTypes.string.isRequired,
        sign: React.PropTypes.bool.isRequired,
        independent: React.PropTypes.bool.isRequired,
        parent: React.PropTypes.bool.isRequired,
        commentType: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired
      },
      getInitialState: function() {
        return {
          open: false
        };
      },
      render: function() {

        if ( this.props.sign ) {
          // ログインユーザーだけコメント投稿可能
          if ( this.state.open ) {
            return (
              <SPCommentFormNode
                uniqueId={this.props.uniqueId}
                toggle={this.props.toggle}
                icon={this.props.icon}
                articleId={this.props.articleId}
                sign={this.props.sign}
                independent={this.props.independent}
                parent={this.props.parent}
                commentType={this.props.commentType}
                url={this.props.url}
              />
            );
          } else {

            return (
              <div className="comment-form-opener">
                <a className="comment-form-opener-trigger" href="#" onClick={this.openerClick}>{Message.COMMENT_SUBMIT}</a>
              </div>
            );
          }
        } else {
          // 非ログインユーザーはコメントが投稿できない
          return null;
        }
      },
      openerClick: function( event:Event ) {
        event.preventDefault();

        this.setState( { open: true } );
      }
    } );

    ReactDOM.render(
      <SPCommentFormOpenerDom
        uniqueId={`comment-to-${CommentsType.INDEPENDENT}-${id}`}
        toggle="open"
        icon={this._icon}
        articleId={id}
        sign={User.sign}
        independent={true}
        parent={false}
        commentType={CommentsType.INDEPENDENT}
        url=""
      />,
      this.element
    );
  }
}
