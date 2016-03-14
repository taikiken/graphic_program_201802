/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/25 - 20:57
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {MessageStatus} from '../src/event/MessageStatus';

// React
let React = self.React;

// tween


export let MessageFlushNode = React.createClass( {
  propTypes: {
    type: React.PropTypes.string.isRequired,
    callback: React.PropTypes.func
  },
  getDefaultProps: function() {
    return {
      callback: function() {}
    };
  },
  getInitialState: function() {
    this.status = MessageStatus.factory();

    return {
      show: true
    };
  },
  render: function() {
    if ( !this.state.show ) {
      return null;
    } else {
      return (
        <div className="modal-container"></div>
      );
    }
  },
  componentDidMount: function() {
  },
  componentWillUnMount: function() {
  }
} );
