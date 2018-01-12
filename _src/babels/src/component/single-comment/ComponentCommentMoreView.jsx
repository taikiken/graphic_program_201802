/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/04 - 19:38
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import { Comments } from '../../action/comment/Comments';
import { CommentSingleReply } from '../../action/comment/CommentSingleReply';
import { CommentSingle } from '../../action/comment/CommentSingle';

// CommentMoreViewNode
/**
 * [library] - React
 */
const React = self.React;

/**
 * コメント`div.comment-andmore` 「N件を表示」リンクを管理します
 * - `click` -> Ajax request + loading
 * - loading, ON / OFF
 * - 表示 / 非表示
 * @since 2017-12-05
 */
export default class ComponentCommentMoreView extends React.Component {
  // ----------------------------------------
  // STATIC METHOD
  // ----------------------------------------
  /**
   * React.propTypes
   * - action {Comments|CommentSingle|CommentSingleReply} - Ajax instance
   * - show {boolean} - `action.hasNext()`
   * - rest {number} - 残り件数, 0 以下で非表示
   * @returns {{action: Comments, show: boolean, rest: number}}
   * React.propTypes を返します
   */
  static get propTypes() {
    return {
      // action: React.PropTypes.instanceOf(Comments).isRequired,
      action: React.PropTypes.oneOfType([
        React.PropTypes.instanceOf(Comments),
        React.PropTypes.instanceOf(CommentSingle),
        React.PropTypes.instanceOf(CommentSingleReply)
      ]).isRequired,
      show: React.PropTypes.bool,
      rest: React.PropTypes.number,
    };
  }
  /**
   * React.props
   * - show - false
   * - rest - 0
   * @returns {{show: boolean, rest: number}}
   * default React.props
   */
  static get defaultProps() {
    return {
      show: false,
      rest: 0,
    };
  }
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * コメント `div.comment-andmore` 「N件を表示」リンクを管理します
   * @param {{ action: Comment, show: boolean, rest: number }} props React.Component props
   */
  constructor(props) {
    super(props);
    // ---
    /**
     * React.state
     * - loading {string} - loading class
     * - show {boolean} - `action.hasNext()`
     * - rest {number} - 残り件数, 0 以下で非表示
     * @type {{loading: string, show: boolean, rest: number}}
     */
    this.state = {
      loading: '',
      show: props.show,
      rest: props.rest,
    };
    /**
     * bind onClick - a.onclick event handler - Ajax 実行します
     * @type {function}
     */
    this.onClick = this.onClick.bind(this);
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * a.onclick event handler - Ajax 実行します
   * @param {Event} event click event
   */
  onClick(event) {
    event.preventDefault();
    // loading 表示
    this.setState({ loading: 'loading' });
    this.props.action.next();
  }
  /**
   * delegate - props 更新時に呼び出されます,
   * state.show, state.rest をチェックし 更新するかを決定します
   * @param {{ show: boolean, rest: number }} nextProps 更新される props
   */
  componentWillReceiveProps(nextProps) {
    const { show, rest } = nextProps;
    // console.log('ComponentCommentMoreView.componentWillReceiveProps', nextProps);
    const state = {
      loading: '',
    };
    if (this.state.show !== show) {
      state.show = show;
    }
    if (this.state.rest !== rest) {
      state.rest = rest;
    }
    this.setState(state);
  }

  /**
   * `div.comment-andmore` 「N件を表示」リンクを作成します
   * @returns {XML} `div.comment-andmore` 「N件を表示」リンク
   */
  render() {
    const { show, rest, loading } = this.state;
    if (!show || rest === 0) {
      // button 表示なし
      return (
        <div className="no-more" />
      );
    }
    // ---
    return (
      <div id="more" className={`comment-andmore loading-root ${loading}`}>
        <a href={'#more'} onClick={this.onClick} >他{rest}件を表示</a>
        <span className="loading-spinner">&nbsp;</span>
      </div>
    );
  }
}
