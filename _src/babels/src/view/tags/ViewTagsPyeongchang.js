/**
 * Copyright (c) 2011-2018 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2018/01/09 - 22:22
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import View from '../View';
import Tags from '../../action/tag/Tags';
import { Message } from '../../app/const/Message';

export class TagsDae {
  constructor(article) {
    const origin = article || {};
    this.origin = origin;
    this.title = origin.title || '';
    this.img = origin.img || '';
    this.url = origin.url || '';
  }
}

export default class ViewTagsPyeongchang extends View {
  constructor(element, tag, date) {
    super(element);
    this.tag = tag;
    this.date = date;
    this.action = new Tags(tag, date, this.done.bind(this), this.fail.bind(this));
  }
  // ---------------------------------------------------
  //  Method
  // ---------------------------------------------------
  /**
   * Ajax request を開始します
   */
  start() {
    this.action.next();
  }
  done(result) {
    console.log('ViewTagsPyeongchang.done', result);
    const articles = result.articles;
    if (!Array.isArray(articles)) {
      const error = new Error( Message.undef('[ViewTagsPyeongchang:UNDEFINED]') );
      this.executeSafely(View.UNDEFINED_ERROR, error);
      this.fail(error);
    } else if (!articles.length) {
      const error = new Error(Message.empty('[ViewTagsPyeongchang:EMPTY]'));
      this.executeSafely(View.EMPTY_ERROR, error);
      this.fail(error);
    } else {
      this.render(articles);
    }
  }
  fail(error) {
    console.warn('ViewTagsPyeongchang.fail', error, this);
  }
  render(articles) {
    const list = articles.map((article) => (new TagsDae(article)));
  }
}
