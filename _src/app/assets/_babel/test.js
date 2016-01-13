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
  var TestApp = React.createClass( {
    render: function() {

      var elapsed = Math.round(this.props.elapsed / 100);
      var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' );
      var message =
        'React has been successfully running for ' + seconds + ' seconds.';

      return <p>{message}</p>;

    }
  } );

  var _start = new Date().getTime();

  setInterval( function() {
    ReactDOM.render(
      <TestApp elapsed={new Date().getTime() - _start} />,
      document.getElementById('c1')
    );
  }, 50);

  var Api = UT.net.Api;
  var Ajax = UT.net.Ajax;

  var ajax = new Ajax();

  function done( result ) {
    console.log( `success: ${result}`, result.data );
  }
  function fail( error ) {
    console.log( `fail: ${error}` );
  }
  console.log( '******************* ajax start' );
  ajax.start( '/api/yuidoc.json', 'GET', done, fail );


  var Action = UT.action.Action;
  var Offset = UT.action.Offset;
  var Types = UT.net.Types;
  var Type = UT.net.types.Type;
  var Permalink = UT.net.types.Permalink;
  var Queries = UT.net.types.Queries;
  var Pickup = UT.action.home.Pickup;
  var count = 0;
  var action;

  let req = new Types(
    new Type( '/api/esdoc.json' ),
    new Permalink(),
    new Queries()
  );


  function success( result ) {
    console.log( `success: ${result}`, result.data );

    //action.total = 33;
    //if ( action.hasNext() ) {
    //  action.start();
    //}
  }

  action = new Pickup();
  action.start();

}( window ) );
