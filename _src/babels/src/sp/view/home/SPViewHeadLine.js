/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/09 - 22:03
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// parent
import {ViewHeadline} from '../../../view/home/ViewHeadline';

// view
import { SPComponentHeadlines } from '../../component/headline/SPComponentHeadlines';

// dae
import {ArticleDae} from '../../../dae/ArticleDae';

// React
let ReactDOM = self.ReactDOM;

/**
 * SP home headline
 */
export class SPViewHeadLine extends ViewHeadline {
  /**
   * SP home headline
   * @param {Element} element コンテンツ基点Element
   * @param {Object} [option={}] callback 関数をセット
   */
  constructor( element:Element, option:Object = {} ) {
    super( element, option );
  }

  /**
   * dom を render します
   * @param {Array} articles JSON responce.articles
   */
  render( articles:Array ):void {
    // @since 2016-09-16
    // headline output changed
    const list = articles.map((article) => new ArticleDae(article));

    ReactDOM.render(
      <SPComponentHeadlines
        list={list}
        callback={this.executeSafely.bind(this)}
      />,
      this.element
    );
  }// render
}
