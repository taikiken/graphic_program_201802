/*!
 * Copyright (c) 2011-@@year inazumatv.com, @@copyright.
 * @author (at)taikiken / http://inazumatv.com
 * @date @@buildTime
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';
( function( window ) {

  'use strict';

  var document = window.document;
  var UT = window.UT;
  var React = window.React;
  var ReactDOM = window.ReactDOM;

  var TestApp = React.createClass( {
    render: function() {

      var elapsed = Math.round(this.props.elapsed / 100);
      var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' );
      var message = `React has been successfully running for ${seconds} seconds.`;

      return <p>{message}</p>;

    }
  } );

  ReactDOM.render(
    <TestApp elapsed={new Date().getTime()} />,
    document.getElementById('XXX')
  );

}( window ) );
