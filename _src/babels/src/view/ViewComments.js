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
'use strict';

// app
import {CommentsType} from '../app/const/CommentsType';
import {User} from '../app/User';

// view
import {View} from './View';
import {ViewError} from './error/ViewError';

// action
import {Comments} from '../action/comment/Comments';

// data
import {Result} from '../data/Result';
import {Safety} from '../data/Safety';

// dae
import {CommentsListDae} from '../dae/CommentsListDae';
import {UserDae} from '../dae/UserDae';

// node
import {CommentNode} from '../node/comment/CommentNode';

// event
import {ReplyStatus} from '../event/ReplyStatus';
import {CommentStatus} from '../event/CommentStatus';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * comments スレッド を表示する
 */
export class ViewComments extends View {
  /**
   * コメントスレッド表示（記事詳細）
   * @param {Number} id 記事ID :article_id
   * @param {Element} element target HTMLElement
   * @param {string} commentsType all|official|self|normal コメントリスト種類
   * @param {Object} [option={}] optional event handler
   */
  constructor( id:Number, element:Element, commentsType:string, option:Object = {} ) {

    option = Safety.object( option );
    // console.log( 'commentsType', commentsType );

    super( element, option );
    this._action = Comments.type( commentsType, id, this.done.bind( this ), this.fail.bind( this ) );
    this._articleId = id;
    this._commentsListType = commentsType;
    /**
     * 取得記事(articles)をArticleDae instance 配列として保存する
     * @type {Array<ArticleDae>}
     * @private
     */
    this._commentsList = [];
    this._commentsBank = {};

    // more button instance 用
    this._moreRendered = null;

    // user 情報
    this._user = null;

    // コメント投稿後の再読み込み設定
    let status = ReplyStatus.factory();
    let boundComplete = this.onComplete.bind( this );
    status.on( ReplyStatus.COMPLETE, boundComplete );
    // this._status = status;

    // コメント削除後の再読み込み設定
    let comment = CommentStatus.factory();
    comment.on( CommentStatus.COMMENT_DELETE, boundComplete );
    // this._commentStatus = comment;

    this._reload = false;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * ログイン user 情報
   * @return {UserDae} ログイン user 情報を返します
   */
  get user():UserDae {
    return this._user;
  }
  /**
   * ログイン user 情報を設定します<br>
   * start の前に設定します
   * @param {UserDae} user ログイン user 情報
   */
  set user( user:UserDae ):void {
    this._user = user;
  }
  // ---------------------------------------------------
  //  Method
  // ---------------------------------------------------
  /**
   * Ajax request を開始します
   */
  start():void {

    if ( User.sign && this.user === null ) {
      throw new Error( `user info have to set before start.${this._articleId}, ${this._commentsListType}` );
    }
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

      if ( this._reload ) {
        // デーが無いので処理を止める + reload 除く
        // console.log( `(${this._articleId}, ${this._commentsListType}) stop rendering.` );
        this.executeSafely( View.EMPTY_ERROR );
        return;
      }

    }

    // previous data と新規データを合成
    this._commentsList = this._commentsList.concat( commentsListDae.comments.list );

    // _commentsBank へ comment.id をキーにデータをセット
    let bank = this._commentsBank;
    commentsListDae.comments.list.forEach( function( commentId ) {

      bank[ commentId ] = commentsListDae.comments.bank[ commentId ];

    } );

    // 処理開始 関数振り分け いらないんじゃないか疑惑
    this.all( commentsListDae );

  }// render

  /*
  mine( commentsListDae:CommentsListDae ) {

  }
  */
  /**
   * normal, official, all をレンダリング
   * @param {CommentsListDae} commentsListDae コメント一覧 CommentsListDae instance
   */
  all( commentsListDae:CommentsListDae ) {

    this._reload = false;

    let commentsList = this._commentsList;
    let commentsBank = this._commentsBank;

    // コメント挿入 root element
    let element = this.element;
    // offset, length を使用する Action
    let action = this.action;
    let _this = this;

    // --------------------------------------------
    // More button
    // --------------------------------------------
    let MoreView = React.createClass( {
      propTypes: {
        show: React.PropTypes.bool.isRequired,
        rest: React.PropTypes.number
      },
      getDefaultProps: function() {
        return {
          show: false,
          rest: 0
        };
      },
      getInitialState: function() {
        return {
          loading: '',
          show: this.props.show,
          rest: this.props.rest
        };
      },
      render: function() {

        // hasNext: true, button を表示する？
        if ( this.state.show && this.state.rest > 0 ) {

          return (
            <div id="more" className={'comment-andmore loading-root ' + this.state.loading}>
              <a href={'#more'} onClick={this.handleClick} >他{this.state.rest}件を表示</a>
              <span className="loading-spinner">&nbsp;</span>
            </div>
          );

        } else {

          // button 表示なし
          return (
            <div className="no-more"></div>
          );

        }

      },
      // -----------------------------------------
      // button 関連 custom method
      handleClick: function( event ) {
        event.preventDefault();
        // loading 表示
        this.setState( { loading: 'loading' } );
        action.next();
      },
      // button 表示・非表示
      updateShow: function( show:boolean, rest:Number ) {

        this.setState( { show: show, rest: rest } );

      }
    } );

    // more button 作成関数
    // CommentsDom から呼び出す
    let moreButton = ( show, rest, moreElement ) => {

      // console.log( '========================= more button ', _this._commentsListType, action.hasNext(), action );
      show = !!show;

      // とにかく render する
      ReactDOM.render(
        React.createElement( MoreView, { show: show, rest: rest } ),
        moreElement
      );

    };

    // --------------------------------------------
    // COMMENT reply loop
    // 親コメントへ返信
    // --------------------------------------------
    let CommentReplyChildDom = React.createClass( {
      propType: {
        total: React.PropTypes.number.isRequired,
        sign: React.PropTypes.bool.isRequired,
        uniqueId: React.PropTypes.string.isRequired,
        userId: React.PropTypes.string.isRequired,
        icon: React.PropTypes.string.isRequired,
        articleId: React.PropTypes.string.isRequired,
        commentId: React.PropTypes.string.isRequired,
        commentsListType: React.PropTypes.object.isRequired,
        reply: React.PropTypes.object.isRequired
      },
      getInitialState: function() {
        return {
          reply: this.props.reply
        };
      },
      render: function() {

        if ( this.props.total === 0 ) {
          // 描画しない
          return null;
        }

        let reply = this.state.reply;
        let replyList = reply.comments;
        let commentsListType = this.props.commentsListType;
        let userId = this.props.userId;
        let sign = this.props.sign;
        let articleId = this.props.articleId;
        let uniqueId = this.props.uniqueId;
        let icon = this.props.icon;
        let commentId = this.props.commentId;

        return (
          <ul className="comment-list">
            {
              replyList.comments.map( function( replyComment ) {

                /* 親コメントと子コメントのデータ形式が違う
                   合わせるために object でラップする {comment: replyComment}
                */
                /* independent, open, commentCount 省略 */
                return (
                  <li key={`${uniqueId}-${replyComment.id}`} className="comment-item">
                    <CommentNode
                      uniqueId={`${uniqueId}-${replyComment.id}`}
                      commentDae={{comment: replyComment}}
                      userId={userId}
                      icon={icon}
                      articleId={articleId}
                      commentId={commentId}
                      replyId={String(replyComment.id)}
                      commentUserId={String(replyComment.user.id)}
                      sign={sign}
                      parent={false}
                      commentsListType={commentsListType}
                    />
                  </li>
                );
              } )
            }
          </ul>
        );

      }
    } );

    // --------------------------------------------
    // COMMENT Parent
    // --------------------------------------------
    let CommentsParentDom = React.createClass( {
      propType: {
        commentObject: React.PropTypes.object.isRequired,
        uniqueId: React.PropTypes.string.isRequired,
        articleId: React.PropTypes.string.isRequired,
        commentsListType: React.PropTypes.string.isRequired,
        total: React.PropTypes.number.isRequired,
        index: React.PropTypes.number.isRequired,
        user: React.PropTypes.object
      },
      getDefaultProps: function() {
        return {
          user: {}
        };
      },
      render: function() {

        let commentObject = this.props.commentObject;
        // console.log( 'CommentsParent commentObject ', commentObject );

        let total = Safety.integer( commentObject.reply.total, 0 );
        let sign = User.sign;
        let icon;
        let userId = '';
        let commentId = String(commentObject.comment.id);
        let articleId = this.props.articleId;
        let commentsListType = this.props.commentsListType;

        if ( sign ) {
          let user = this.props.user;
          icon = user.profilePicture;

          /*
          if ( !icon ) {
            icon = Empty.USER_EMPTY;
          } else if ( !Safety.isImg( icon ) ) {
            // 画像ファイル名に拡張子がないのがあったので
            // 拡張子チェックを追加
            icon = Empty.USER_EMPTY;
          }
          */

          // id
          userId = String( user.id );
          if (!userId) {
            userId = '';
          }
        }

        // console.log( '================================== parent =========================', icon, this.props.user, userId, ', comment:', commentObject.comment.user.id );
        return (

          <ul className={'comment-list'}>
            <li className="comment-item">
              {/* independent, open 省略 */}
              <CommentNode
                uniqueId={`comment-${this.props.uniqueId}`}
                commentDae={commentObject}
                icon={icon}
                userId={userId}
                articleId={articleId}
                commentId={commentId}
                commentUserId={String(commentObject.comment.user.id)}
                commentCount={commentObject.reply.total}
                sign={sign}
                parent={true}
                commentsListType={commentsListType}
              />
              {/* comment reply */}
              <CommentReplyChildDom
                uniqueId={`reply-${this.props.uniqueId}`}
                total={total}
                sign={sign}
                userId={userId}
                icon={icon}
                articleId={articleId}
                commentId={commentId}
                commentsListType={commentsListType}
                reply={commentObject.reply} />
            </li>
          </ul>

        );

      }
    } );

    // --------------------------------------------
    // COMMENT iteration
    // --------------------------------------------
    let CommentsDom = React.createClass( {
      propType: {
        commentsList: React.PropTypes.array.isRequired,
        commentsListType: React.PropTypes.string.isRequired,
        articleId: React.PropTypes.string.isRequired,
        user: React.PropTypes.object
      },
      getDefaultProps: function() {
        return {
          user: null
        };
      },
      getInitialState: function() {
        return {
          commentsList: this.props.commentsList
        };
      },
      render: function() {

        let list = this.state.commentsList;
        let articleId = this.props.articleId;
        let commentsListType = this.props.commentsListType;
        let userId = '0';
        let user = Object.create({});
        if ( this.props.user !== null ) {
          userId = Safety.integer( this.props.user.id, 0 );
          userId = String(userId);
          user = this.props.user;
        }

        if ( !Safety.array( list ) || list.length === 0 ) {
          // 描画しない
          console.warn( 'list error ', commentsListType, list );
          return null;
        }
        // console.log( '******************************* start render *******************************', list );
        return (
          <div className={'comment-' + commentsListType}>
            <div className="comment-heading">
              <h2>{CommentsType.title( commentsListType )}</h2>
            </div>
            {
              list.map( function( commentId, index ) {
                let commentObject = commentsBank[ commentId ];
                let key = `${index}-${commentsListType}-${articleId}-${commentId}-${userId}`;
                // console.log( 'commentId ' + commentId + ', ' + key );

                return <CommentsParentDom
                  key={key}
                  uniqueId={key}
                  index={index}
                  articleId={articleId}
                  commentObject={commentObject}
                  commentsListType={commentsListType}
                  total={commentsListDae.total}
                  user={user}
                />;
              } )
            }
            <div className="comment-more" ref="commentMore"></div>
          </div>
        );

      },
      // --------------------------------------------
      // delegate
      componentDidMount: function() {
        // after mount
        _this.executeSafely( View.DID_MOUNT );
        // hasNext を元に More View button の表示非表示を決める
        // console.log( 'more has ', action.hasNext() );
        moreButton( action.hasNext(), action.rest(), ReactDOM.findDOMNode(this.refs.commentMore) );
      },
      componentDidUpdate: function() {
        moreButton( action.hasNext(), action.rest(), ReactDOM.findDOMNode(this.refs.commentMore) );
      },
      // --------------------------------------------
      updateList: function( list ) {
        // state を変更し appendChild を行う
        this.setState( { commentsList: list } );
      }
    } );

    // --------------------------------------------
    // COMMENT Dom build
    // --------------------------------------------
    let user = this.user;
    if ( user === null ) {
      user = Object.create( {} );
    }

    // とにかくそのまま
    ReactDOM.render(
      <CommentsDom
        commentsList={commentsList}
        articleId={String(this._articleId)}
        commentsListType={this._commentsListType}
        user={user}
      />,
      element
    );

  }// all
  /**
   * ReplyStatus.COMPLETE event handler
   * <p>再読み込みを行うかを決める</p>
   */
  onComplete():void {
    // とにかくreloadが良さそう
    this.reload();
  }
  /**
   * 再読み込み
   */
  reload():void {
    // 既存リストを空にする
    this._commentsList = [];
    // reload flag on
    this._reload = true;
    // ajax start
    this._action.reload();
  }
}
