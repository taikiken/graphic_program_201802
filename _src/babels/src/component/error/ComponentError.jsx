/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/06 - 17:05
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
// ErrorNode

const React = self.React;

/**
 * form エラー表示 component
 * @param {string} message error message
 * @returns {?XML} `span.error-message-container`
 * @since 2017-12-06
 */
const ComponentError = ({ message }) => {
  if (!message) {
    return null;
  }
  return (
    <span className="error-message-container">
      <span className="error-message-txt">{message}</span>
    </span>
  );
};

/**
 * React.propTypes
 * @type {{message: string}}
 */
ComponentError.propTypes = {
  message: React.PropTypes.string.isRequired,
};

export default ComponentError;
