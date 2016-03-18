/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/22 - 0:35
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

let React = self.React;

/**
 * form エラー表示用 node
 * @type {ReactClass}
 */
export let ErrorNode = React.createClass( {
  propTypes: {
    message: React.PropTypes.string.isRequired
  },
  render: function() {

    if ( this.props.message === '' ) {
      return null;
    } else {
      return (
        <span className="error-message-container">
          <span className="error-message-txt">{this.props.message}</span>
        </span>
      );
    }

  }
} );
