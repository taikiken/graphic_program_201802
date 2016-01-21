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

  UT.app.Env.test();
  UT.net.Api.rebuild();

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

  action.success = function( result ) {

    console.log( 'Pickup.success ', result );
    console.log( 'Pickup.success.response ', result.response );
    console.log( 'Pickup.success.status ', result.status );

  };

  action.start();

  // -------------------------------------------------------------
  var StateTest = React.createClass( {
    propTypes: {
      list: React.PropTypes.array.isRequired
    },
    getDefaultProps: function() {
      return {
        list: []
      };
    },
    //getInitialState: function() {
    //  return {
    //    list: []
    //  };
    //},
    render: function() {

      //var list = this.state.list;
      var list = this.props.list;

      return (

        <div>{ list.map( function( num, i ) {

          // iteration する時は 属性(key)に unique な値をセットする
          return <p key={i} data-key={num}>{num}</p>;

        } ) }</div>
      );

      //return tag;

      // 属性 quotation 使わない
      //return <p data-key={list[ 0 ]}>{list[ 0 ]}</p>;

    }
  } );

  UT.Test = {
    f1: function( element ) {

      var input = '<input type="text" value="XXX">';

      var Form1 = React.createClass( {
        render: function() {

          return <form>{input}</form>;

        }
      } );

      ReactDOM.render( <Form1/>, element );

    },
    f2: function( form, input ) {

      var Form2 = React.createClass( {
        render: function() {

          return <div>{input}</div>;

        }
      } );

      ReactDOM.render( <Form2/>, form );

      return form;

    },
    list: function( listOption, element ) {

      ReactDOM.render(
        React.createElement( StateTest, { list: listOption } ),
        element
      );

    }
  };

}( window ) );
