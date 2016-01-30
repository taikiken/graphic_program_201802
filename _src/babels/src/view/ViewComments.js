/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/28 - 20:51
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import {Empty} from '../app/Empty';
import {CommentsType} from '../app/CommentsType';

// view
import {View} from './View';
import {ViewError} from './error/ViewError';
// action
import {Comments} from '../action/comment/Comments';
// data
import {Result} from '../data/Result';
// dae
import {CommentsListDae} from '../dae/CommentsListDae';

import {Safety} from '../data/Safety';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * comments sled を表示する
 */
export class ViewComments extends View {
  /**
   * コメントスレッド表示（記事詳細）
   * @param {Number} id 記事ID :article_id
   * @param {Element} element target HTMLElement
   * @param {Element} moreElement more button root parent
   * @param {string} commentsType all|official|self|normal コメントリスト種類
   * @param {Object} option optional event handler
   */
  constructor( id:Number, element:Element, moreElement:Element, commentsType:string, option:Object = {} ) {

    option = Safety.object( option );

    super( element, option );
    this._action = Comments.type( commentsType, id, this.done.bind( this ), this.fail.bind( this ) );
    this._articleId = id;
    this._moreElement = moreElement;
    this._commentsListType = commentsType;
    /**
     * 取得記事(articles)をArticleDae instance 配列として保存する
     * @type {Array<ArticleDae>}
     * @private
     */
    this._commentsList = [];
    this._commentsBank = {};
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   *
   * @return {Element|*} more button root element を返します
   */
  get moreElement():Element {
    return this._moreElement;
  }
  // ---------------------------------------------------
  //  Method
  // ---------------------------------------------------
  /**
   * Ajax request を開始します
   */
  start():void {

    this.action.next();

  }
  /**
   * Ajax response success
   * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
   */
  done( result:Result ):void {

    let response = result.response;
    // console.log( 'response ', typeof response === 'undefined', response );
    if ( typeof response === 'undefined' ) {

      // articles undefined
      // JSON に問題がある
      let error = new Error( '[COMMENTS:UNDEFINED]サーバーレスポンスに問題が発生しました。' );
      this.executeSafely( View.UNDEFINED_ERROR, error );
      // this.showError( error.message );

    } else {

      this.render( response );

    }

  }
  /**
   * Ajax response error
   * @param {Error} error Error instance
   */
  fail( error:Error ):void {

    this.executeSafely( View.RESPONSE_ERROR, error );
    // ここでエラーを表示させるのは bad idea なのでコールバックへエラーが起きたことを伝えるのみにします
    // this.showError( error.message );

  }
  /**
   * ViewError でエラーコンテナを作成します
   * @param {string} message エラーメッセージ
   */
  showError( message:string = '' ):void {

    message = Safety.string( message, '' );

    // ToDo: Error 時の表示が決まったら変更する
    let error = new ViewError( this.element, this.option, message );
    error.render();

  }
  /**
   * dom を render します
   * @param {Object} response JSON response
   */
  render( response:Object ):void {

    let commentsListDae = new CommentsListDae( response );

    // total check
    if ( commentsListDae.total === 0 ) {
      // デーが無いので処理を止める
      console.log( `(${this._articleId})デーが無いので処理を止める` );
      this.executeSafely( View.EMPTY_ERROR );
      return;
    }

    // previous data と新規データを合成
    this._commentsList = this._commentsList.concat( commentsListDae.comments.list );

    // _commentsBank へ comment.id をキーにデータをセット
    let bank = this._commentsBank;
    commentsListDae.comments.list.forEach( function( commentId ) {

      bank[ commentId ] = commentsListDae.comments.bank[ commentId ];

    } );

    // 処理開始 関数振り分け
    switch ( this._commentsListType ) {

      case CommentsType.SELF :
        this.mine( commentsListDae );
        break;

      case CommentsType.OFFICIAL :
      case CommentsType.NORMAL :
      case CommentsType.ALL :
      default:
        this.all( commentsListDae );
        break;

    }

  }// render

  mine( commentsListDae:CommentsListDae ) {

  }

  /**
   * normal, official, all をレンダリング
   * @param {CommentsListDae} commentsListDae コメント一覧 CommentsListDae instance
   */
  all( commentsListDae:CommentsListDae ) {

    //
    let commentsList = this._commentsList;
    let commentsBank = this._commentsBank;

    // comments type
    let commentsListType = this._commentsListType;

    let articleId = this._articleId;

    // コメント挿入 root element
    let element = this.element;
    // 'View More' button root element
    let moreElement = this.moreElement;
    // offset, length を使用する Action
    let action = this.action;
    let _this = this;

    // --------------------------------------------
    // More button
    // --------------------------------------------
    let MoreView = React.createClass( {
      propTypes: {
        show: React.PropTypes.bool
      },
      getDefaultProps: function() {
        return {
          show: false
        };
      },
      getInitialState: function() {
        return {
          disable: false
        };
      },
      handleClick: function( event ) {
        event.preventDefault();
        // disable
        this.setState( { disable: true } );
        action.next();
      },
      render: function() {

        return (
          <div>
            {
              this.props.show ? <div className={this.state.disable ? 'disable' : ''}>
                <a href={'#more'} onClick={this.handleClick} >More View</a>
              </div> : ''
            }
          </div>
        );

      }
    } );


    // more button 作成関数
    // ArchiveDom から呼び出す
    let moreButton = ( show ) => {

      ReactDOM.render(
        React.createElement( MoreView, { show: show } ),
        moreElement
      );

    };
    // --------------------------------------------
    // COMMENT ONE
    // --------------------------------------------
    let CommentOne = React.createClass( {
      propType: {
        comment: React.PropTypes.object.isRequired,
        parent: React.PropTypes.bool.isRequired
      },
      render: function() {

        let commentDae = this.props.comment;
        let comment = commentDae.comment;
        let isParent = this.props.parent;

        let replyClass = '';
        // console.log( 'comment', comment );
        // console.log( 'comment.user', comment.user );
        let picture = comment.user.profilePicture || Empty.USER_PICTURE_FEATURE;
        let commentReply = commentDae.reply;
        let replyTotal = 0;
        let replyTotalElement = '';
        let replyLink = '';

        if ( isParent ) {

          if ( typeof commentReply !== 'undefined' && commentReply !== null ) {
            replyTotal = commentReply.total;

            if ( replyTotal !== 0 ) {
              replyTotalElement = `(${replyTotal})`;
            }
          }

          replyLink = <div><a href="xxx" data-reply={'reply-to-' + comment.id}>コメントへ返信</a>{replyTotalElement}</div>;

        }

        let bodyTag = () => {
          return {
            __html: comment.body
          };
        };

        console.log( '**** comment ', comment );

        // ToDo: 一般ユーザーは bio がない

        return (
          <div className={'comment-' + commentsListType + ' comment-' + commentsListType + '-' + comment.id + replyClass}>
            <div className={'comment-user-' + comment.user.id}><img src={picture} alt={comment.user.userName}/></div>
            <div>{comment.user.userName}</div>
            <div>{comment.user.bio}</div>
            <div>{comment.formatDate}</div>
            <div  className="comment-body" dangerouslySetInnerHTML={bodyTag()} />
            <div>Good: {comment.good}</div>
            <div>Bad: {comment.bad}</div>
            {replyLink}
          </div>
        );

      }
    } );
    // --------------------------------------------
    // COMMENT reply loop
    // 親コメントへ返信
    // --------------------------------------------
    let CommentReplyChild = React.createClass( {
      propType: {
        reply: React.PropTypes.object.isRequired,
        id: React.PropTypes.string.isRequired
      },
      render: function() {

        let reply = this.props.reply;
        let replyList = reply.comments;
        let commentId = this.props.id;

        return (
          <div className="comment-reply">
            {
              replyList.comments.map( function( replyComment ) {

                /* 親コメントと子コメントのデータ形式が違う
                   合わせるために object でラップする
                */
                return <CommentOne key={'reply-' + articleId + '-' + commentId + '-' + replyComment.id} comment={{comment: replyComment}} parent={false} />;

              } )
            }
          </div>
        );

      }
    } );

    // --------------------------------------------
    // COMMENT Parent
    // --------------------------------------------
    let CommentsParent = React.createClass( {
      propType: {
        commentObject: React.PropTypes.object.isRequired,
        total: React.PropTypes.number.isRequired
      },
      render: function() {

        let commentObject = this.props.commentObject;
        let replyElement = '';

        console.log( 'commentObject ', commentObject );

        if ( commentObject.reply.total > 0 ) {
          // コメント返信
          replyElement = <CommentReplyChild id={String(commentObject.comment.id)} reply={commentObject.reply} />;
        }

        return (

          <div className={'comment-parent'}>
            <CommentOne comment={commentObject} parent={true} />
            {replyElement}
          </div>

        );


      }
    } );

    // --------------------------------------------
    // COMMENT iteration
    // --------------------------------------------
    let CommentsDom = React.createClass( {
      propType: {
        commentsList: React.PropTypes.array.isRequired
      },
      render: function() {

        let list = this.props.commentsList;

        return (
          <div className={'comment-' + commentsListType}>
            {
              list.map( function( commentId, index ) {

                let commentObject = commentsBank[ commentId ];

                return <CommentsParent
                  key={'comment-' + articleId + '-' + commentsListType + '-' + index}
                  commentObject={commentObject}
                  total={commentsListDae.total} />;
              } )
            }
          </div>
        );

      },
      componentDidMount: function() {
        // after mount
        _this.executeSafely( View.DID_MOUNT );
        // hasNext を元に More View button の表示非表示を決める
        console.log( 'more has ', action.hasNext() );
        moreButton( action.hasNext() );
      }
    } );


    // --------------------------------------------
    // COMMENT Dom buid
    // --------------------------------------------
    ReactDOM.render(
      <CommentsDom commentsList={commentsList} />,
      element
    );
  }// all
}
