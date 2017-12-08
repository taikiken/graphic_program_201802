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


import ViewCommentForm from '../../../view/comment/ViewCommentForm';
import SPComponentFormOpener from '../../component/single-comment/opener/SPComponentFormOpener';

// // app
import { User } from '../../../app/User';
import { CommentsType } from '../../../app/const/CommentsType';
// import {Message} from '../../../app/const/Message';
// import {Url} from '../../../app/const/Url';
//
// // sp
// import {SPCommentFormNode} from '../../node/comment/SPCommentFormNode';

// React
/* eslint-disable no-unused-vars */
/**
 * [library] - React
 */
const React = self.React;
/* eslint-enable no-unused-vars */
/**
 * [library] - ReactDOM
 */
const ReactDOM = self.ReactDOM;

/**
 * SP 記事へのコメントフォーム・オープナー
 */
export class SPViewCommentForm extends ViewCommentForm {
  // /**
  //  * SP 記事へのコメントフォーム
  //  * @param {Element} element root element
  //  * @param {Number} articleId 記事Id
  //  * @param {string} [icon=''] ユーザー画像パス
  //  */
  // constructor( element:Element, articleId:Number, icon:string = '' ) {
  //   super( element, articleId, icon );
  // }
  /**
   * フォーム生成を開始します
   * @param {string} id 記事Id
   */
  render(id) {
    // // from 2016-06-16
    // // click で開くコメントフォーム
    // let SPCommentFormOpenerDom = React.createClass( {
    //   propTypes: {
    //     uniqueId: React.PropTypes.string.isRequired,
    //     toggle: React.PropTypes.string.isRequired,
    //     icon: React.PropTypes.string.isRequired,
    //     articleId: React.PropTypes.string.isRequired,
    //     sign: React.PropTypes.bool.isRequired,
    //     independent: React.PropTypes.bool.isRequired,
    //     parent: React.PropTypes.bool.isRequired,
    //     commentType: React.PropTypes.string.isRequired,
    //     url: React.PropTypes.string.isRequired
    //   },
    //   getInitialState: function() {
    //     return {
    //       open: false
    //     };
    //   },
    //   render: function() {
    //
    //     if ( this.props.sign ) {
    //       // ログインユーザーだけコメント投稿可能
    //       if ( this.state.open ) {
    //         return (
    //           <SPCommentFormNode
    //             uniqueId={this.props.uniqueId}
    //             toggle={this.props.toggle}
    //             icon={this.props.icon}
    //             articleId={this.props.articleId}
    //             sign={this.props.sign}
    //             independent={this.props.independent}
    //             parent={this.props.parent}
    //             commentType={this.props.commentType}
    //             url={this.props.url}
    //           />
    //         );
    //       } else {
    //
    //         return (
    //           <div className="comment-form-opener">
    //             <a className="comment-form-opener-trigger" href="#" onClick={this.openerClick}>{Message.COMMENT_SUBMIT}</a>
    //           </div>
    //         );
    //       }
    //     } else {
    //       // // 非ログインユーザーはコメントが投稿できない
    //       // return null;
    //       // 非ログインユーザーはログイン画面へ
    //       return (
    //         <div className="comment-form-opener">
    //           <a className="comment-form-opener-trigger" href={Url.login()}>{Message.COMMENT_SUBMIT}</a>
    //         </div>
    //       );
    //     }
    //   },
    //   openerClick: function( event:Event ) {
    //     event.preventDefault();
    //
    //     this.setState( { open: true } );
    //   }
    // } );
    //
    // ReactDOM.render(
    //   <SPCommentFormOpenerDom
    //     uniqueId={`comment-to-${CommentsType.INDEPENDENT}-${id}`}
    //     toggle="open"
    //     icon={this._icon}
    //     articleId={id}
    //     sign={User.sign}
    //     independent={true}
    //     parent={false}
    //     commentType={CommentsType.INDEPENDENT}
    //     url=""
    //   />,
    //   this.element
    // );
    // since 2017-12-06
    ReactDOM.render(
      <SPComponentFormOpener
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
      this.element,
    );
  }
}
