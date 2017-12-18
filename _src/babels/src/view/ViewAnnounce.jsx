/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/18 - 22:59
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import View from './View';
import { Categories } from '../action/categories/Categories';
import { Message } from '../app/const/Message';
import { CategoriesSlugDae } from '../dae/categories/CategoriesSlugDae';
import ComponentAnnounce from '../component/announce/ComponentAnnounce';

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
 * ユーザーへの「お知らせ」を表示します
 */
export default class ViewAnnounce extends View {
  constructor(element, slug = 'all', option = {}) {
    super(element, option);
    this.action = new Categories(this.done.bind(this), this.fail.bind(this));
  }
  done(result) {
    const response = result.response;
    if (!response) {
      const error = new Error( Message.undef('[ARCHIVE:UNDEFINED]') );
      this.executeSafely(View.UNDEFINED_ERROR, error);
    } else {
      this.render(response);
    }
  }
  fail(error) {
    this.executeSafely(View.RESPONSE_ERROR, error);
    console.warn('ViewCategories.fail', error);
  }
  render(response) {
    const dae = new CategoriesSlugDae(response);
    const pc = dae.information.pc;
    // output
    ReactDOM.render(
      <ComponentAnnounce
        information={pc}
      />,
      this.element,
    );
  }
}
