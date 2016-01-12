'use strict';

/*!
 * Copyright (c) 2011-2016 inazumatv.com, Parachute.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016-01-12 14:47:46
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
(function (window) {

  "use strict";

  var UT = window.UT;

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

  fetch('./api/yuidoc.json').then(function (response) {
    if (response.status !== 200) {

      console.log('Looks like there was a problem. Status Code: ' + response.status);return;
    }
    //console.log( 'this ', this );

    // Examine the text in the response
    response.json().then(function (data) {
      console.log(data);
    });
  }).catch(function (err) {
    console.log('Fetch Error :-S', err);
  });

  //class Ajax {
  //
  //  constructor(url) {
  //    this._url = url;
  //  }
  //
  //  start() {
  //    fetch(this._url)
  //      .then( function(response) {
  //        if (response.status !== 200) {
  //
  //          console.log('Looks like there was a problem. Status Code: ' + response.status); return;
  //
  //        }
  //
  //        // Examine the text in the response
  //        response.json().then(
  //          function(data) {
  //            console.log(data);
  //          }
  //        );
  //      } )
  //      .catch(function(err) {
  //        console.log('Fetch Error :-S', err);
  //      } );
  //  }
  //
  //}
  //
  //new Ajax('./api/yuidoc.json').start();

  //var UT = window.UT;
  //var Api = UT.Api;
  //var api = Api.factory();
  //
  //console.log( 'api', api.home() );
})(window);