/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/15 - 14:45
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
// BookmarkButtonNode
import { Model } from '../../../model/Model';
import { ModelBookmark } from '../../../model/users/ModelBookmark';
import { Message } from '../../../app/const/Message';

/**
 * [library] - React
 */
const React = self.React;

/**
 * bookmark button - SP / PC 共用します
 */
export default class ComponentBookmarkButton extends React.Component {
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * React.propTypes
   * - id {string} - 記事 ID
   * - bookmark {boolean} bookmark 済み flag
   * @returns {{id: string, bookmarked: boolean}} React.propTypes
   */
  static get propTypes() {
    return {
      id: React.PropTypes.string.isRequired,
      bookmarked: React.PropTypes.bool.isRequired,
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * bookmark button 準備します
   * @param {*} props React.props
   */
  constructor(props) {
    super(props);
    // ---
    /**
     * React.state
     * @type {{bookmarked: boolean, loading: string}}
     */
    this.state = {
      bookmarked: props.bookmarked,
      loading: '',
    };
    const onDone = this.onDone.bind(this);
    const onFail = this.onFail.bind(this);
    const callback = {};
    callback[Model.COMPLETE] = onDone;
    callback[Model.UNDEFINED_ERROR] = onFail;
    callback[Model.RESPONSE_ERROR] = onFail;
    /**
     * bind onDone
     * @type {function}
     */
    this.onDone = onDone;
    /**
     * bind onFail
     * @type {function}
     */
    this.onFail = onFail;
    /**
     * bind onClick
     * @type {function}
     */
    this.onClick = this.onClick.bind(this);
    /**
     * bookmark API request instance
     * @type {ModelBookmark}
     */
    this.model = new ModelBookmark(props.id, callback);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * a.onclick event handler
   * - state: loading 'loading' 変更します
   * - bookmark API request 実行します, state.bookmarked 値を反転させ引数にセットします
   * @param {Event} event click event
   */
  onClick(event) {
    event.preventDefault();
    this.setState({ loading: 'loading' });
    this.model.start(!this.state.bookmarked);
  }
  /**
   * bookmark API success callback
   * - bookmarked state を反転します
   * - loading 表示解除します state.loading: ''
   */
  onDone() {
    // loading 解除, 表示更新
    console.log('ComponentBookmarkButton.onDone');
    this.setState({ loading: '', bookmarked: !this.state.bookmarked });
  }
  /**
   * bookmark API error callback
   * - loading 表示解除します state.loading: ''
   */
  onFail() {
    // loading 解除
    console.log('ComponentBookmarkButton.onFail');
    this.setState({ loading: '' });
  }
  /**
   * delegate - before props update
   * - bookmarked value を比較し違う時に更新します
   * @param {{bookmarked: boolean}} nextProps next props
   */
  componentWillReceiveProps(nextProps) {
    const { bookmarked } = nextProps;
    if (bookmarked !== this.state.bookmarked) {
      this.setState({ bookmarked });
    }
  }
  /**
   * bookmark button を出力します
   * @returns {XML} `div.btn-bookmark`
   */
  render() {
    const { loading, bookmarked } = this.state;
    const { id } = this.props;
    const bookmarkClass = bookmarked ? 'bookmarked enable' : '';
    const message = bookmarked ? Message.BOOKMARK_DID : Message.BOOKMARK_WILL;
    // ---
    return (
      <div className={`loading-root btn-bookmark btn-bookmark-${id} ${loading}`}>
        <a href="#" className={bookmarkClass} onClick={this.onClick}>
          <span>{message}</span>
        </a>
        <div className="loading-spinner" />
      </div>
    );
  }
}
