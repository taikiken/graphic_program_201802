/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/29 - 14:30
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// model
import { Model } from '../Model';

// app
import { User } from '../../app/User';
import { Message } from '../../app/const/Message';

// action
import { Category } from '../../action/archive/Category';
import { CategoryAuth } from '../../action/archive/CategoryAuth';

// dae
import { ArticleDae } from '../../dae/ArticleDae';

export class ModelPopular extends Model {
  constructor(sign = User.sign, offset = 0, length = 6, option = {}) {
    super(option);

    const slug = 'all';
    const type = '';
    const resolve = this.done.bind(this);
    const reject = this.fail.bind(this);

    this.slug = slug;
    this.type = type;
    this.resolve = resolve;
    this.reject = reject;
    this.offset = offset;
    this.length = length;
    this.request = null;
    this.action = sign ? new CategoryAuth(slug, type, resolve, reject, offset, length) : new Category(slug, type, resolve, reject, offset, length);
  }
  /**
   * Ajax request を開始します
   */
  start():void {
    this.action.next();
  }
  done(result) {
    const articles = result.articles;
    if (typeof articles === 'undefined') {
      // articles undefined
      // JSON に問題がある
      let error = new Error(Message.undef('[ARCHIVE:UNDEFINED]'));
      this.executeSafely( Model.UNDEFINED_ERROR, error );
    } else if (articles.length === 0) {
      // articles empty
      // request, JSON 取得に問題は無かったが data が取得できなかった
      let error = new Error(Message.empty('[ARCHIVE:EMPTY]'));
      this.executeSafely(Model.EMPTY_ERROR, error);
    } else {
      this.request = result.request;
      const list = articles.map((article) => new ArticleDae(article));
      // 成功 callback
      this.executeSafely(Model.COMPLETE, list);
    }
  }
  fail(error) {
    this.executeSafely(Model.RESPONSE_ERROR, error);
  }
}
