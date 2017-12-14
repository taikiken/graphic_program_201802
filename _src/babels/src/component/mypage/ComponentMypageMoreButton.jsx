/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/14 - 18:46
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import { Activities } from '../../action/mypage/Activities';
import { Message } from '../../app/const/Message';

/**
 * [library] - React
 */
const React = self.React;

/**
 * 「+ VIEW MORE」button を出力します
 * @since 2017-12-14
 */
export default class ComponentMypageMoreButton extends React.Component {
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  static get propTypes() {
    return {
      show: React.PropTypes.bool.isRequired,
      loading: React.PropTypes.string.isRequired,
      action: React.PropTypes.oneOfType([
        React.PropTypes.instanceOf(Activities).isRequired,
      ]).isRequired,
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * 「+ VIEW MORE」button を準備します
   * @param {*} props React.props
   */
  constructor(props) {
    super(props);
    // ---
    /**
     * React.state
     * - show {boolean} - true: 表示
     * - loading {string} - spinner 表示 class `loading`
     * @type {{show: boolean, loading: string}}
     */
    this.state = {
      show: props.show,
      loading: props.loading,
    };
    /**
     * bind onClick
     * @type {function}
     */
    this.onClick = this.onClick.bind(this);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * a.onclick event handler
   * - state.loading `loading` set します
   * - `props.action`.next を実行します
   * @param {Event} event click event
   */
  onClick(event) {
    event.preventDefault();
    this.setState({ loading: ' loading' });
    this.props.action.next();
  }
  /**
   * delegate - before update props
   * - state `loading`, `show` 更新します
   * @param {{loading: string, show: boolean}} nextProps next React.props
   */
  componentWillReceiveProps(nextProps) {
    const { show, loading } = nextProps;
    // console.log('ComponentMypageMoreButton nextProps', nextProps, this.state);
    if (show !== this.state.show || loading !== this.state.loading) {
      this.setState({ show, loading });
    }
  }
  /**
   * 「+ VIEW MORE」button を出力します
   * @returns {XML} `div.no-more` or `div.board-btn-viewmore` を返します
   */
  render() {
    const { show, loading } = this.state;
    if (!show) {
      return <div className="no-more" />;
    }
    return (
      <div id="more" className={`board-btn-viewmore loading-root ${loading}`}>
        <a
          className="board-btn-viewmore-link"
          href={'#more'}
          onClick={this.onClick}
        >
          <span>{Message.BUTTON_VIEW_MORE}</span>
        </a>
        <div className="loading-spinner" />
      </div>
    );
  }
}
