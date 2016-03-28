/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/28 - 19:01
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {ViewFirstVisit} from '../../view/ViewFirstVisit';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

// tween
let greensock = self.com.greensock;
let TweenLite = greensock.TweenLite;
let easing = greensock.easing;

/**
 * [SP] 初回起動時のサービス紹介
 * cookie Cookie.EVER_BEEN を調べ存在しなかったら表示します
 */
export class SPViewFirstVisit extends ViewFirstVisit {
  /**
   * [SP] 初回起動時のサービス紹介
   * @param {Element} element root element
   * @param {Object} [option={}] optional event handler
   */
  constructor( element:Element, option:Object = {} ) {
    super( element, option );
  }
  /**
   * 初回起動時のサービス紹介 を表示する
   */
  render():void {
    // 表示させる
    let FirstDom = React.createClass( {
      getInitialState: function() {
        return {
          show: true,
          css: {opacity: 0}
        };
      },
      render: function() {

        if ( this.state.show ) {
          return (
            <div style={this.state.css}>
              <div className="modal-bg" onClick={this.closeHandle}></div>
              <div>
                abc
              </div>
            </div>
          );
        } else {
          return null;
        }

      },
      componentDidMount: function() {
        this.openModal();
      },
      closeHandle: function( event ) {
        event.preventDefault();
      },
      openModal: function() {
        let object = { opacity: 0 };
        let _this = this;

        TweenLite.to(
          object,
          0.5,
          {
            opacity: 1,
            easing: easing.Linear.easeNone,
            onUpdate: function() {
              _this.setState( { css: {opacity: object.opacity} } );
            },
            onComplete: function() {
              _this.setState( { css: {opacity: 1} } );
            }
          }
        );
      },
      closeModal: function( delay:Number = 0 ) {
        let object = { opacity: 1 };
        let _this = this;

        TweenLite.to(
          object,
          0.5,
          {
            delay: delay,
            opacity: 0,
            easing: easing.Linear.easeNone,
            onUpdate: function() {
              _this.setState( { css: {opacity: object.opacity} } );
            },
            onComplete: function() {
              _this.setState( { css: {opacity: 0}, show: false } );
            }
          }
        );
      }
    } );

    ReactDOM.render(
      <FirstDom/>,
      this.element
    );
  }
}
