/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/21 - 18:49
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

let React = self.React;

// template pattern のような class
/**
 * React.createClass を行います
 */
export class Model {
  /**
   * 継承しReact.createClassを行います
   */
  constructor() {
    this._react = null;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   *
   * @returns {ReactClass|null} React.createClass instance を
   */
  get react():ReactClass {
    return this._react;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * React.componentWillMount handler
   */
  willMount():void {}
  /**
   * React.componentDidMount handler
   */
  didMount():void {}
  /**
   * React.componentWillUpdate handler
   */
  willUpdate():void {}
  /**
   * React.componentDidUpdate handler
   */
  didUpdate():void {}
  /**
   * React.componentWillUnmount handler
   */
  willUnmount():void {}
}
