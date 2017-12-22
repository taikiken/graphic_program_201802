/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/11 - 16:21
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import { Loc } from '../../util/Loc';
import { User } from '../../app/User';
import { Message } from '../../app/const/Message';

/**
 * [library] - React
 */
const React = self.React;

/**
 * {@link ViewLogout} - ログアウト画面を表示します
 *
 * click 後
 * - ログアウト処理を行います - {@link User}.logout
 * - `/` (top) に遷移します - {@link Loc}.index
 */
export default class ComponentLogout extends React.Component {
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * ログアウト画面表示の準備を行います
   * @param {*} props React.props
   */
  constructor(props) {
    super(props);
    // ----
    /**
     * React.state
     * - loading {string} - loading 表示 class name
     * @type {{loading: string}}
     */
    this.state = {
      loading: '',
    };
    /**
     * bind onClick - a.onclick event handler
     * @type {function}
     */
    this.onClick = this.onClick.bind(this);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * a.onclick event handler
   * - ログアウト処理を行います - {@link User}.logout
   * - `/` (top) に遷移します - {@link Loc}.index
   * @param {Event} event click event
   */
  onClick(event) {
    event.preventDefault();
    this.setState({ loading: 'loading' });
    User.logout();
    Loc.index();
  }
  /**
   * ログアウト・コンテナを出力します
   * @returns {XML} `div.mod-btnB01 > a`
   */
  render() {
    return (
      <div className="mod-btnB01 mt30 btn-withdraw">
        <div className={`loading-root ${this.state.loading}`}>
          <a href="#" onClick={this.clickHandler}>{Message.SUBMIT_LOGOUT}</a>
          <div className="loading-spinner" />
        </div>
      </div>
    );
  }
}
