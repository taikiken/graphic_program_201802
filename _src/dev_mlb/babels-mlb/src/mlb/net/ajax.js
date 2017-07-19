/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/19 - 22:54
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

const ajax = (path) => {
  const request = new Request(
    path,
    {
      cache: 'no-cache',
      credentials: 'same-origin',
      method: 'GET',
    },
  );
  return fetch(request)
    .then((response) => {
      console.log('fetch', path, Date.now());
      if (response.status !== 200) {
        throw new Error(`ajax status error: (${response.status})`);
      }
      try {
        return response.json();
      } catch (error) {
        throw new Error(`ajax JSON parse error: (${error})`);
      }
    });
};

export default ajax;
