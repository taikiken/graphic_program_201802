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
( function( window ) {

  "use strict";

  var UT = self.UT;

  var React = window.React;
  var ReactDOM = window.ReactDOM;
  //var TestApp = React.createClass( {
  //  render: function() {
  //
  //    var elapsed = Math.round(this.props.elapsed / 100);
  //    var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' );
  //    var message =
  //      'React has been successfully running for ' + seconds + ' seconds.';
  //
  //    return <p>{message}</p>;
  //
  //  }
  //} );
  //
  //var _start = new Date().getTime();
  //
  //setInterval( function() {
  //  ReactDOM.render(
  //    <TestApp elapsed={new Date().getTime() - _start} />,
  //    document.getElementById('c1')
  //  );
  //}, 50);


  //fetch('./api/yuidoc.json')
  //  .then( function(response) {
  //    if (response.status !== 200) {
  //
  //      console.log('Looks like there was a problem. Status Code: ' + response.status); return;
  //
  //    }
  //    //console.log( 'this ', this );
  //
  //    // Examine the text in the response
  //    response.json().then(
  //      function(data) {
  //        console.log(data);
  //      }
  //    );
  //  } )
  //  .catch(function(err) {
  //    console.log('Fetch Error :-S', err);
  //  } );

  var Api = UT.net.Api;
  var Ajax = UT.net.Ajax;

  var ajax = new Ajax();

  function done( result ) {
    console.log( 'success: ', result );
  }
  function fail( error ) {
    console.log( 'fail: ', error );
  }
  console.log( '******************* ajax start' );
  ajax.start( './api/yuidoc.json', 'GET', done );

}( window ) );
