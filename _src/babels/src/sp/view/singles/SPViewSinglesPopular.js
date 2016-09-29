/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/29 - 15:38
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// view
import { SPViewArchive } from '../SPViewArchive';

// app
import { User } from '../../../app/User';

// dae
import { ArticleDae } from '../../../dae/ArticleDae';

// action
import { Category } from '../../../action/archive/Category';
import { CategoryAuth } from '../../../action/archive/CategoryAuth';

// sp/component
import { SPComponentSinglesWidgetPopularList } from '../../component/singles/SPComponentSinglesWidgetPopularList';

// React
const ReactDOM = self.ReactDOM;

export class SPViewSinglesPopular extends SPViewArchive {
  constructor(element, sign = User.sign, offset = 0, length = 6) {
    // element, moreElement: null, actionClass: undefined, option: {}
    super(element, null);

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

    this.action = sign ?
      new CategoryAuth(slug, type, resolve, reject, offset, length) :
      new Category(slug, type, resolve, reject, offset, length);
  }
  render(articles) {
    const list = articles.map((article) => new ArticleDae(article));
    this.articles = list;

    if (this.articleRendered === null) {
      this.articleRendered = ReactDOM.render(
        <SPComponentSinglesWidgetPopularList
          list={list}
          callback={this.executeSafely.bind(this)}
        />,
        this.element
      );
    } else {
      this.articleRendered.updateList(list, this.request.offset, this.request.length);
    }
  }
  reload() {
    const component = this.articleRendered;
    if (component === null) {
      return false;
    }

    component.reload();
    return true;
  }
}
