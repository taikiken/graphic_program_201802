/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/11/10 - 19:13
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import { MessageSNS } from '../../../app/const/MessageSNS';


// React
const React = self.React;

export class SPComponentSinglesSNSBelow extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{
   *  single: SingleDae,
   *  index: number
   * }} React props
   */
  static get propTypes() {
    return {
      single: React.PropTypes.object.isRequired,
      index: React.PropTypes.number.isRequired
    };
  }
  constructor(props) {
    super(props);
  }
}
