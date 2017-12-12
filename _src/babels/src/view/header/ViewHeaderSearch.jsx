/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/18 - 15:01
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import View from '../View';

// node
// import {HeaderSearchNode} from '../../node/header/HeaderSearchNode';
import ComponentHeaderSearchForm from '../../component/header/ComponentHeaderSearchForm';
import { Env } from '../../app/Env';

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
 * 検索フォーム
 */
export default class ViewHeaderSearch extends View {
  // /**
  //  * 検索フォーム + ロケーション遷移
  //  * @param {Element} element insert parent element
  //  * @param {Object} [option={}] optional event handler
  //  */
  // constructor(element, option = {}) {
  //   super(element, option);
  // }
  // ---------------------------------------------------
  //  Method
  // ---------------------------------------------------
  /**
   * render 実行
   * @param {string} [path=''] option argument
   */
  start(path = '') {
    if (Env.NODE_ENV === 'develop') {
      console.warn('[ViewHeaderSearch].start', path);
    }
    this.render();
  }
  /**
   * HTMLElement を生成します
   */
  render() {
    // ReactDOM.render(
    //   <HeaderSearchNode />,
    //   this.element
    // );
    ReactDOM.render(
      <ComponentHeaderSearchForm />,
      this.element,
    );
  }
}
