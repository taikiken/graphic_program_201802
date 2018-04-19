/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/13 - 22:57
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// parent
import ViewHeaderSearch from '../../../view/header/ViewHeaderSearch';

// // app
// import {Message} from '../../../app/const/Message';
//
// // event
// import {SearchStatus} from '../../../event/SearchStatus';

// // node
// import {HeaderSearchNode} from '../../../node/header/HeaderSearchNode';

// util
// import {Scroll} from '../../../util/Scroll';
import SPComponentHeaderSearchOpener from '../../component/header/SPComponentHeaderSearchOpener';
import ComponentHeaderSearchForm from '../../../component/header/ComponentHeaderSearchForm';

// // Sagen
// let Sagen = self.Sagen;

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

/**
 * SP 検索フォーム
 */
export default class SPViewHeaderSearch extends ViewHeaderSearch {
  /**
   * 検索フォーム + ロケーション遷移
   * @param {Element} element insert parent element
   * @param {Element} buttonElement opener button
   * @param {Object} [option={}] optional event handler
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
   * @since 2-18-04-19 vk header - flag 追加
   */
  constructor(element, buttonElement, option = {}, vk = false) {
    super(element, option, vk);
    /**
     * opener button
     * @type {Element}
     * @private
     */
    this.button = buttonElement;
  }
  /**
   * header 検索フォームを生成します
   * - {@link ComponentHeaderSearchForm}
   * - {@link SPComponentHeaderSearchOpener}
   */
  render() {
    // search form
    ReactDOM.render(
      <ComponentHeaderSearchForm
        listen={true}
        show={false}
        vk={this.vk}
      />,
      this.element,
    );
    // search form opener button
    ReactDOM.render(
      <SPComponentHeaderSearchOpener
        vk={this.vk}
      />,
      this.button
    );
  }
}
