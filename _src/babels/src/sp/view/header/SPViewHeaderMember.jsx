/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/11 - 20:11
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
// view
import View from '../../../view/View';
import ViewHeaderMember from '../../../view/header/ViewHeaderMember';

import SPComponentHeaderMemberSetting from '../../component/header/SPComponentHeaderMemberSetting';
import { Empty } from '../../../app/const/Empty';

// React
/* eslint-disable no-unused-vars */
/**
 * [library] - React
 */
const React = self.React;
/* eslint-enable no-unused-vars */
/**
 * [library] - ReactDOM
 */
const ReactDOM = self.ReactDOM;

// Sagen
// let Gasane = self.Gasane;

/**
 * SP header ログイン・メンバー 関連メニュー
 * @since 2018-04-19 vk header - flag 追加
 */
export default class SPViewHeaderMember extends ViewHeaderMember {
  /**
   * SP header ログイン・メンバー 関連メニュー
   * - アイコン+drop down menu 表示
   *
   * @param {Element} element insert root element
   * @param {Object} [option={}] optional event handler
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
   * @since 2018-04-19 vk header - flag 追加
   */
  constructor(element, option = {}, vk = false) {
    super(element, option, vk);
    /**
     * bind 済み executeSafely
     * @type {function}
     */
    this.boundSafely = this.executeSafely.bind(this);
    /**
     * bound didMount
     * @type {function}
     */
    this.boundMount = this.didMount.bind(this);
  }
  /**
   * Dom を生成します
   * @param {UserDae} response JSON UserDae instance
   */
  render(response) {
    // --------------------------------------------------
    this.executeSafely(View.BEFORE_RENDER, response);
    // --------------------------------------------------
    // when reload
    if (this.reloadFlag) {
      this.reloadFlag = false;
      clearTimeout(this._timer);
      this.timer = setTimeout(this.boundReload, 1000);
    }
    // component
    ReactDOM.render(
      <SPComponentHeaderMemberSetting
        icon={response.profilePicture}
        userName={response.userName}
        safely={this.boundSafely}
        did={this.boundMount}
        vk={this.vk}
      />,
      this.element,
    );
  }
  /**
   * VK 専用・ログインユーザーheader 表示
   * @since 2018-04-19 VK（バーチャル甲子園）flag
   */
  vkRender() {
    ReactDOM.render(
      <SPComponentHeaderMemberSetting
        icon={Empty.USER_EMPTY}
        userName=""
        safely={this.boundSafely}
        did={this.boundMount}
        vk={this.vk}
      />,
      this.element,
    );
  }
}
