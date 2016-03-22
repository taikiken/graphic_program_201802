/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/13 - 18:57
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// view
// import {View} from '../../../view/View';
import {ViewSingleHeader} from '../../../view/single/ViewSingleHeader';

// app
// import {Url} from '../../../app/const/Url';
// import {User} from '../../../app/User';

// dae
import {SingleDae} from '../../../dae/SingleDae';

// node
import {SPMediaNode} from '../../node/single/SPMediaNode';

// React
let ReactDOM = self.ReactDOM;

/**
 * sp single 記事上メインビジュアル
 */
export class SPViewSingleVisual extends ViewSingleHeader {
  /**
   * sp single 記事上メインビジュアル
   * @param {Element} element 基点 Element
   * @param {SingleDae} single 記事 SingleDae instance
   */
  constructor( element:Element, single:SingleDae ) {
    super( element, single );
  }
  /**
   * render します
   * @param {SingleDae} singleDae JSON 変換済みデータ
   */
  render( singleDae:SingleDae ):void {

    ReactDOM.render(
      <SPMediaNode
        mediaType={singleDae.mediaType}
        media={singleDae.media}
      />,
      this.element
    );
  }
}
