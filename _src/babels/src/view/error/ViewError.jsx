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

// React
/* eslint-disable no-unused-vars */
/**
 * [library] - React
 */
const React = self.React;
/* eslint-enable no-unused-vars */
/**
 * [library] - ReactDOM
 */
const ReactDOM = self.ReactDOM;

/**
 * {@link ViewError} - error container を出力します
 * @param {string} message error message
 * @returns {XML} `div.error-container`
 * @constructor
 * @since 2017-12-08
 */
const ErrorContainerComponent = ({ message }) => (
  <div className="error error-container">
    <div className="error error-message">{message}</div>
  </div>
);

/**
 * React.propTypes
 * @type {{message: string}}
 */
ErrorContainerComponent.propTypes = {
  message: React.PropTypes.string.isRequired,
};


/**
 * エラーメッセージを表示します
 */
export default class ViewError extends View {
  /**
   * エラーメッセージを表示し, componentDidMount callback handler を実行します
   *
   * @example
   * const element = document.getElementById( 'error-dom-parent' );
   * const afterMount = () => {
   *  // componentDidMount
   * }
   * const option = {
   *  didMount: afterMount
   * };
   * const message = 'error happen.';
   * const viewError = new ViewError( element, option, message );
   *
   * @example
   * const option = {
   *  didMount: function() { // didMount },
   *  undefinedError: function() { // JSONにあるべきキーがない },
   *  emptyError: function() { // 結果セット配列が空 },
   *  responseError: function() { // Ajax Error }
   * };
   * @param {Element} element render root element
   * @param {Object} [option={}] callback handler
   * @param {string} [message=''] 表示エラーメッセージ
   */
  constructor(element, option = {}, message = '') {
    option = Safety.object(option);
    message = Safety.string(message, '');
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
  get message() {
    return this._message;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * error dom を生成します
   * ```
   *   <div class="error error-message"></div>
   * ```
   */
  render() {
    //
    // const element = this.element;
    // const message = this.message;
    // const _this = this;
    //
    // const ErrorDom = React.createClass( {
    //   render: function() {
    //     return (
    //       <div className="error error-container">
    //         <div className="error error-message">{message}</div>
    //       </div>
    //     );
    //   },
    //   componentDidMount: function() {
    //
    //     // after mount
    //     _this.executeSafely( View.ERROR_MOUNT, message );
    //
    //   }
    // } );
    //
    // ReactDOM.render(
    //   <ErrorDom />,
    //   element
    // );

    ReactDOM.render(
      <ErrorContainerComponent
        message={this.message}
      />,
      this.element,
    );
    this.executeSafely(View.ERROR_MOUNT, this.message);
  }
}
