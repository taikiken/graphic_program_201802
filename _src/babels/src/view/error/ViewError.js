/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/22 - 14:33
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import View from '../View';
import {Safety} from '../../data/Safety';

let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * エラーメッセージを表示します
 */
export class ViewError extends View {
  /**
   * エラーメッセージを表示し, componentDidMount callback handler を実行します
   *
   * @example
   * let element = document.getElementById( 'error-dom-parent' );
   * let afterMount = () => {
   *  // componentDidMount
   * }
   * let option = {
   *  didMount: afterMount
   * };
   * let message = 'error happen.';
   * let viewError = new ViewError( element, option, message );
   *
   * @example
   * let option = {
   *  didMount: function() { // didMount },
   *  undefinedError: function() { // JSONにあるべきキーがない },
   *  emptyError: function() { // 結果セット配列が空 },
   *  responseError: function() { // Ajax Error }
   * };
   * @param {Element} element render root element
   * @param {Object} [option={}] callback handler
   * @param {string} [message=''] 表示エラーメッセージ
   */
  constructor( element, option:Object = {}, message:string = '' ) {

    option = Safety.object( option );
    message = Safety.string( message, '' );

    super( element, option );
    /**
     * エラーメッセージ
     * @type {string}
     * @private
     */
    this._message = message;

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   *
   * @return {string|*} error message を返します
   */
  get message():string {
    return this._message;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * error dom を生成します<br>
   * <pre>
   *   <div class="error error-message"></div>
   * </pre>
   */
  render():void {

    let element = this.element;
    let message = this.message;
    let _this = this;

    let ErrorDom = React.createClass( {
      render: function() {
        return (
          <div className="error error-container">
            <div className="error error-message">{message}</div>
          </div>
        );
      },
      componentDidMount: function() {

        // after mount
        _this.executeSafely( View.ERROR_MOUNT, message );

      }
    } );

    ReactDOM.render(
      <ErrorDom />,
      element
    );
  }
}
