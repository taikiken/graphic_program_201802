/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/04/06 - 16:58
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// React
let React = self.React;

// --------------------------------------------
// COMMENTS Popular second
// --------------------------------------------
export let CommentUserPlusCountNode = React.createClass( {
  propType: {
    total: React.PropTypes.number.isRequired
  },
  getInitialState: function() {
    return {
      total: this.props.total
    };
  },
  render: function() {

    // if ( this.state.total === 0 ) {
    // API 戻り値がおかしいことがあり
    // count 1
    // array length 2
    // total が - になるので 0 以上に変更
    if ( this.state.total > 0 ) {
      return null;
    } else {

      return <span className="commented-user-andmore">+{this.state.total}</span>;
    }

  }

} );