/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/13 - 16:24
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import { NotificationsDae } from '../../dae/user/NotificationsDae';
import View from '../../view/View';
import { Safety } from '../../data/Safety';
import ComponentHeaderNoticeMenu from './notice/ComponentHeaderNoticeMenu';
import ComponentHeaderNoticeTotal from './notice/ComponentHeaderNoticeTotal';

/**
 * [library] - React
 */
const React = self.React;

/**
 * お知らせ「バッジ」「一覧」を出力します
 * {@link ComponentHeaderMemberSetting} > {@link ViewHeaderMemberNotice}
 * - {@link ComponentHeaderNoticeTotal}
 * - {@link ComponentHeaderNoticeMenu}
 */
export default class ComponentHeaderNotice extends React.Component {
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * React.propTypes
   * @returns {{
   *   response: NotificationsDae,
   *   safely: function,
   *   mount: function,
   *   dispose: function,
   *   vk: boolean
   * }} React.propTypes
   */
  static get propTypes() {
    return {
      response: React.PropTypes.instanceOf(NotificationsDae).isRequired,
      safely: React.PropTypes.func.isRequired,
      mount: React.PropTypes.func.isRequired,
      dispose: React.PropTypes.func.isRequired,
      vk: React.PropTypes.bool.isRequired,
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * お知らせ「バッジ」「一覧」出力準備をします
   * @param {*} props React.props
   */
  constructor(props) {
    super(props);
    // ---
    /**
     * React.props
     * - open {string} - drop down menu state - default: `close`
     * - response {@link NotificationsDae} Ajax JSON
     * @type {{open: string, response: NotificationsDae}}
     */
    this.state = {
      open: 'close',
      response: props.response,
    };
    /**
     * timeout id, drop menu open 後に body へ click event handler を遅延して設定するのに使用
     * @private
     * @type {number}
     */
    this.timer = 0;
    /**
     * bind onClick - a.onclick event handler
     * @type {function}
     */
    this.onClick = this.onClick.bind(this);
    /**
     * bind onClick - document.body.onclick event handler
     * @type {any}
     */
    this.onBodyClick = this.onBodyClick.bind(this);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * a.onclick event handler
   * - drop down menu open / close します `toggle`
   * @param {Event} event click event
   */
  onClick(event) {
    event.preventDefault();
    this.toggle();
  }
  /**
   * document.body.onclick event handler
   * - drop down menu close します 100ms delay し `toggle` 実行します
   */
  onBodyClick() {
    clearTimeout(this.timer);
    if (this.state.open === 'open') {
      // document.body が a より先に反応する
      // native event bind と React 経由の違いかも
      // body click 後の処理を遅延させる, 多分気づかない程度
      this.timer = setTimeout(() => {
        this.toggle();
      }, 100);
    }
  }
  /**
   * `state.open` check し
   * drop down menu open / close します
   */
  toggle() {
    this.destroy();
    if (this.state.open === 'close') {
      // close -> open
      // document.body へ click event handler bind
      this.setState({ open: 'open' });
      this.activate();
    } else {
      // open -> close
      this.setState({ open: 'close' });
    }
  }
  /**
   * document.body.onclick event bind します
   */
  activate() {
    document.body.addEventListener('click', this.onBodyClick, false);
  }
  /**
   * document.body.onclick event unbind します
   */
  destroy() {
    clearTimeout(this.timer);
    document.body.removeEventListener('click', this.onBodyClick);
  }

  /**
   * delegate after mount
   * - props callback 実行します `safely`, `mount`
   */
  componentDidMount() {
    const { safely, mount } = this.props;
    safely(View.DID_MOUNT);
    mount();
  }
  /**
   * delegate before unmount
   * - props callback `dispose` 実行します
   * - `destroy` 実行します
   */
  componentWillUnmount() {
    this.destroy();
    this.props.dispose();
  }

  /**
   * delegate - before props update
   * - `response` が update されたら更新します
   * @param {{response: NotificationsDae}} nextProps React.props
   */
  componentWillReceiveProps(nextProps) {
    const { response } = nextProps;
    if (response !== this.state.response) {
      this.setState({ response });
    }
  }
  /**
   * お知らせコンテナを出力します
   * @returns {XML} `div.notice`
   */
  render() {
    const { response, open } = this.state;
    const notifications = Safety.array(response.notifications);
    // console.log('ComponentHeaderNotice.render open', open);
    return (
      <div className={`notice ${open}`}>
        <a
          href="#"
          className="notice-opener"
          onClick={this.onClick}
        >
          <i className="notice-icon">&nbsp;</i>
          <ComponentHeaderNoticeTotal
            vk={this.props.vk}
          />
        </a>
        <ComponentHeaderNoticeMenu
          notifications={notifications}
        />
      </div>
    );
  }
}
