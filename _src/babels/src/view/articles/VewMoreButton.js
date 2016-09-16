/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/17 - 0:44
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// React
const React = self.React;

export class VewMoreButton extends React.Component {
  constructor(props) {
    super(props);
  }
}

VewMoreButton.propTypes = {
  show: React.PropTypes.bool.isRequired,
  action: React.PropTypes.object.isRequired,
  loading: React.PropTypes.string,
  // ga のため追加
  home: React.PropTypes.bool.isRequired,
  slug: React.PropTypes.string.isRequired
};
