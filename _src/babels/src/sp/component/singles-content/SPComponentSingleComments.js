/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/11/05 - 12:31
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// view/comment
import { SPViewCommentForm } from '../../view/comment/SPViewCommentForm';

// view
import { SPViewComments } from '../../view/SPViewComments';

// app
import { User } from '../../../app/User';
import { CommentsType } from '../../../app/const/CommentsType';

// React
const React = self.React;

/**
 * 次の記事一覧・コメント表示
 * @since 2016-11-05
 */
export class ComponentSingleComments extends React.Component {
  // -------------------------- -------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{
   *  single: SingleDae,
   *  sign: boolean,
   *  index: number
   * }} React props
   */
  static get propTypes() {
    return {
      single: React.PropTypes.object.isRequired,
      sign: React.PropTypes.bool.isRequired,
      index: React.PropTypes.number.isRequired,
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link ComponentSingleComments.propTypes}
   */
  constructor(props) {
    super(props);
    /**
     * React state
     * @type {{
     *  single: SingleDae,
     *  sign: boolean,
     *  index: number
     * }}
     */
    this.state = {
      single: props.single,
      sign: props.sign,
      index: props.index
    };
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * コンテナマウント後にコメントデータを取得し表示します
   */
  componentDidMount() {
    if (this.state.sign) {
      // ログインしている時のみデータ取得を開始します
      this.start();
    }
  }
  /**
   * `User` class `info` method からユーザー情報を取得しコメント取得を開始します
   * {@link User}
   */
  start() {
    // ログインユーザー情報を取得します
    const info = User.info();
    if (info === null) {
      setTimeout(() => this.start(), 25);
      return;
    }
    // コメント種類それぞれを取得します
    this.mine(info);
    this.official(info);
    this.normal(info);
    this.form(info);
  }
  /**
   * 自分のコメント
   * @param {UserDae} info ユーザー情報, アバターを表示するのに使用します
   */
  mine(info) {
    const comment = new SPViewComments(this.state.single.id, this.refs.commentSelf, CommentsType.SELF);
    comment.user = info;
    comment.start();
  }
  /**
   * 公式ユーザーのコメント
   * @param {UserDae} info ユーザー情報, アバターを表示するのに使用します
   */
  official(info) {
    const comment = new SPViewComments(this.state.single.id, this.refs.commentOfficial, CommentsType.OFFICIAL);
    comment.user = info;
    comment.start();
  }
  /**
   * みんなのコメント
   * @param {UserDae} info ユーザー情報, アバターを表示するのに使用します
   */
  normal(info) {
    const comment = new SPViewComments(this.state.single.id, this.refs.commentNormal, CommentsType.NORMAL);
    comment.user = info;
    comment.start();
  }
  /**
   * 記事への投稿コメントフォーム
   * @param {UserDae} info ユーザー情報, アバターを表示するのに使用します
   */
  form(info) {
    const comment = new SPViewCommentForm(this.refs.commentForm, this.state.single.id, info.profilePicture);
    comment.start();
  }
  /**
   * ログインユーザーのみ div.comment
   * @return {?XML} div.comment or null
   */
  render() {
    if (!this.state.sign) {
      return null;
    }
    // ログインユーザーのみ表示します
    return (
      <div className={`comment comment-${this.state.single.id}`}>
        <div className="comment-self-container" ref="commentSelf" />
        <div className="comment-official-container" ref="commentOfficial" />
        <div className="comment-normal-container" ref="commentNormal" />
        <div className="comment-form-container" ref="commentForm" />
      </div>
    );
  }
}
