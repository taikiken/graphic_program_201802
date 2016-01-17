'use strict';

/*!
 * Copyright (c) 2011-2016 inazumatv.com, Parachute.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016-01-17 19:26:24
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
(function (window) {

  "use strict";

  var UT = self.UT;

  var React = window.React;
  var ReactDOM = window.ReactDOM;
  var TestApp = React.createClass({
    displayName: 'TestApp',

    render: function render() {

      var elapsed = Math.round(this.props.elapsed / 100);
      var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0');
      var message = 'React has been successfully running for ' + seconds + ' seconds.';

      return React.createElement(
        'p',
        null,
        message
      );
    }
  });

  var _start = new Date().getTime();

  setInterval(function () {
    ReactDOM.render(React.createElement(TestApp, { elapsed: new Date().getTime() - _start }), document.getElementById('c1'));
  }, 50);

  var Api = UT.net.Api;
  var Ajax = UT.net.Ajax;

  var ajax = new Ajax();

  function done(result) {
    console.log('success: ' + result, result.data);
  }
  function fail(error) {
    console.log('fail: ' + error);
  }
  console.log('******************* ajax start');
  ajax.start('/api/yuidoc.json', 'GET', done, fail);

  var Action = UT.action.Action;
  var Offset = UT.action.Offset;
  var Types = UT.net.Types;
  var Type = UT.net.types.Type;
  var Permalink = UT.net.types.Permalink;
  var Queries = UT.net.types.Queries;
  var Pickup = UT.action.home.Pickup;
  var count = 0;
  var action;

  var req = new Types(new Type('/api/esdoc.json'), new Permalink(), new Queries());

  function success(result) {
    console.log('success: ' + result, result.data);

    //action.total = 33;
    //if ( action.hasNext() ) {
    //  action.start();
    //}
  }

  action = new Pickup();
  action.start();

  // -------------------------------------------------------------

  UT.Test = {
    f1: function f1(element) {

      var input = '<input type="text" value="XXX">';

      var Form1 = React.createClass({
        displayName: 'Form1',

        render: function render() {

          return React.createElement(
            'form',
            null,
            input
          );
        }
      });

      ReactDOM.render(React.createElement(Form1, null), element);
    },
    f2: function f2(form, input) {

      var Form2 = React.createClass({
        displayName: 'Form2',

        render: function render() {

          return React.createElement(
            'div',
            null,
            input
          );
        }
      });

      ReactDOM.render(React.createElement(Form2, null), form);

      return form;
    }
  };
})(window);