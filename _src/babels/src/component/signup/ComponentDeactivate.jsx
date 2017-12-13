/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/13 - 19:17
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import { Model } from '../../model/Model';
import { ModelSignOut } from '../../model/signup/ModelSignOut';
import { MessageStatus } from '../../event/MessageStatus';
import { User } from '../../app/User';
import { Message } from '../../app/const/Message';
import { Loc } from '../../util/Loc';
import ComponentDeactivateModal from './modal/ComponentDeactivateModal';

/**
 * [library] - React
 */
const React = self.React;
/**
 * [library] - ReactDOM
 */
const ReactDOM = self.ReactDOM;

/**
 * 退会案内 / 「モーダル」を表示し[OK]の時に「退会処理」を行います
 * - {@link ComponentDeactivateModal}
 */
export default class ComponentDeactivate extends React.Component {
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * React.propTypes
   * - modalElement - {@link ComponentDeactivateModal} を mount する Element
   * @returns {{modalElement: Element}} React.propTypes
   */
  static get propTypes() {
    return {
      modalElement: React.PropTypes.instanceOf(Element).isRequired,
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * 退会案内出力準備を行います
   * @param {*} props React.props
   */
  constructor(props) {
    super(props);
    // ---
    /**
     * React.state
     * - loading 表示 CSS class name
     * @type {{loading: string}}
     */
    this.state = {
      loading: '',
    };
    const onDone = this.onDone.bind(this);
    const onFail = this.onFail.bind(this);
    const callback = {};
    callback[Model.COMPLETE] = onDone;
    callback[Model.UNDEFINED_ERROR] = onFail;
    callback[Model.RESPONSE_ERROR] = onFail;
    /**
     * {@link ModelSignOut} callback method
     * @type {*}
     */
    this.callback = callback;
    /**
     * bind onDone
     * @yupe {function}
     */
    this.onDone = onDone;
    /**
     * bind onFail
     * @yupe {function}
     */
    this.onFail = onFail;
    /**
     * bind onClick
     * @yupe {function}
     */
    this.onClick = this.onClick.bind(this);
    /**
     * bind onOk
     * @yupe {function}
     */
    this.onOk = this.onOk.bind(this);
    /**
     * bind onCancel
     * @yupe {function}
     */
    this.onCancel = this.onCancel.bind(this);
    /**
     * 退会処理 API を request します
     * @type {ModelSignOut}
     */
    this.model = new ModelSignOut(callback);
    /**
     * MessageStatus instance
     * @private
     * @type {MessageStatus}
     */
    this.messageStatus = MessageStatus.factory();
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * {@link ModelSignOut} success callback
   * - {@link MessageStatus}.flush 表示します
   * - 500ms 後に index(top) へ遷移します - {@link Loc}.index
   * @param {{code: number}} event {@link ModelSignOut} success event object
   */
  onDone(event) {
    if (event && event.code && event.code === 200) {
      // sign out
      User.logout();
      // return to index(top)
      this.messageStatus.flush(MessageStatus.message(Message.DEACTIVATE_COMPLETE), MessageStatus.SUCCESS);
      setTimeout(Loc.index, 500);
    }
  }
  /**
   * {@link ModelSignOut} error callback
   * - loading 表示を止めます
   */
  onFail() {
    this.setState({ loading: '' });
  }
  /**
   * {@link ComponentDeactivateModal} OK callback
   * - {@link ModelSignOut} request 開始します
   */
  onOk() {
    this.model.start();
  }

  /**
   * {@link ComponentDeactivateModal} CANCEL callback
   * - loading 表示を止めます
   */
  onCancel() {
    this.setState({ loading: '' });
  }
  /**
   * a.onclick event handler
   * - {@link ComponentDeactivateModal} 出力します
   * @param {Event} event click event
   */
  onClick(event) {
    event.preventDefault();
    this.modalRender();
  }
  /**
   * {@link ComponentDeactivateModal} 出力します
   */
  modalRender() {
    ReactDOM.render(
      <ComponentDeactivateModal
        ok={this.onOk}
        cancel={this.onCancel}
        show={true}
      />,
      this.props.modalElement,
    );
    this.setState({ loading: 'loading' });
  }
  /**
   * 退会案内表示します
   * @returns {XML} `div.mod-btnB01`
   */
  render() {
    return (
      <div className="mod-btnB01 mt30">
        <div className={`loading-root ${this.state.loading}`}>
          <a href="#" onClick={this.onClick}>{Message.BUTTON_DEACTIVATE_TEXT}</a>
          <div className="loading-spinner" />
        </div>
      </div>
    );
  }
}
