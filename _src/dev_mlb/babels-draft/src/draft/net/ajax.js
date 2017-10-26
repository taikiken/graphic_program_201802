/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/04 - 15:47
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * redux friendly fetch ajax request
 * @param {string} path request URL
 * @returns {Promise} fetch Promise を返します
 */
const ajax = (path) => {
  const option = {
    method: 'GET',
    cache: 'no-cache',
    mode: 'cors',
    // https://developers.google.com/web/updates/2015/03/introduction-to-fetch
    credentials: 'same-origin',
  };
  const request = new Request(path, option);
  return fetch(request)
    .then((response) => {
      // // JSON 不正もあり得るので try...catch します
      try {
        return response.json();
      } catch (error) {
        throw new Error(`ajax JSON parse error: (${error})`);
      }
    });
};

export default ajax;
