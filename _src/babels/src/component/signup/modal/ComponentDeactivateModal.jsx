/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/13 - 19:33
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import { Message } from '../../../app/const/Message';

/**
 * [library] - React
 */
const React = self.React;

// tween
/**
 * [library] - gsap - TweenLite
 */
const TweenLite = self.com.greensock.TweenLite;
/**
 * [library] - gsap - TweenLite - easing
 */
const easing = self.com.greensock.easing;

/**
 * 退会案内モーダルを出力します
 */
export default class ComponentDeactivateModal extends React.Component {
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * React.propTypes
   * @returns {{
   *   ok: function,
   *   cancel: function,
   *   show: boolean
   * }}
   * React.propTypes
   */
  static get propTypes() {
    return {
      // ok click callback
      ok: React.PropTypes.func.isRequired,
      // cancel click callback
      cancel: React.PropTypes.func.isRequired,
      // show / no
      show: React.PropTypes.bool.isRequired,
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * 退会案内モーダルの準備を行います
   * @param {*} props React.props
   */
  constructor(props) {
    super(props);
    // ---
    /**
     * React.state
     * - show {boolean} - 表示 / 非表示
     * - css {{opacity: number}} - fade in / out style
     * @type {{show, css: {opacity: number}}}
     */
    this.state = {
      show: props.show,
      css: { opacity: 0 },
    };
    /**
     * bind onOk
     * @type {function}
     */
    this.onOk = this.onOk.bind(this);
    /**
     * bind onCancel
     * @type {function}
     */
    this.onCancel = this.onCancel.bind(this);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * OK event handler
   * - `props.ok` callback を実行します
   * @param {Event} event click event
   */
  onOk(event) {
    event.preventDefault();
    this.props.ok();
    this.close(0.5);
  }

  /**
   * CANCEL event handler
   * @param {Event} event click event
   */
  onCancel(event) {
    event.preventDefault();
    this.props.cancel();
    this.close();
  }
  /**
   * modal fadein します
   */
  open() {
    const object = { opacity: 0 };
    TweenLite.to(
      object,
      0.5,
      {
        opacity: 1,
        easing: easing.Linear.easeNone,
        onUpdate: () => {
          this.setState({ css: { opacity: object.opacity } });
        },
        onComplete: () => {
          this.setState({ css: { opacity: 1 } });
        }
      }
    );
  }
  /**
   * modal fadeout します
   * @param {number} [delay=0] 遅延時間(sec)
   */
  close(delay = 0) {
    const object = { opacity: 1 };
    TweenLite.to(
      object,
      0.5,
      {
        delay,
        opacity: 0,
        easing: easing.Linear.easeNone,
        onUpdate: () => {
          this.setState({ css: { opacity: object.opacity } });
        },
        onComplete: () => {
          this.setState({ css: { opacity: 0 }, show: false });
        }
      }
    );
  }

  /**
   * delegate - after mount
   * - `state.show`: true の時に `open` 実行します
   */
  componentDidMount() {
    if(this.state.show) {
      this.open();
    }
  }
  /**
   * delegate - before prop update
   * - `props.show` が `stats.show` と違う時に update します
   * - `props.show` が true の時に `open` 実行します
   * @param {{show: boolean}} nextProps next props
   */
  componentWillReceiveProps(nextProps) {
    const { show } = nextProps;
    if (show !== this.state.show) {
      this.setState({ show });
      if (show) {
        this.open();
      }
    }
  }
  /**
   * 退会モーダルを表示します
   * @returns {XML} `div.modal-dialogue.modal-dialogue_delete`
   */
  render() {
    const { show, css } = this.state;
    if (!show) {
      return null;
    }
    return (
      <div
        className="modal-dialogue modal-dialogue_delete"
        style={css}
      >
        <div
          className="modal-bg"
          onClick={this.onCancel}
          role="presentation"
        />
        <div className="modal-dialogue-contents deactivate">
          <a
            href="#"
            className="modal-dialogue-close"
            onClick={this.onCancel}
          >
            {Message.BUTTON_CLOSE}
          </a>
          <p className="lead">{Message.DEACTIVATE}</p>
          <ul className="btn-block">
            <li className="btn-item">
              <a href="#" className="btn-link btn-link_cancel" onClick={this.onCancel}>{Message.BUTTON_CANCEL}</a>
            </li>
            <li className="btn-item">
              <a href="#" className="btn-link btn-link_submit" onClick={this.onOk}>{Message.BUTTON_DEACTIVATE}</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
