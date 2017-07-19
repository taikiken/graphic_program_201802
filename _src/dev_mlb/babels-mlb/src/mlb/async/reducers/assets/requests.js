/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/19 - 18:41
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import ReducerTypes from '../ReducerTypes';

const initialState = {
  type: ReducerTypes.INITIAL,
  json: {},
};

const requests = (requestState = initialState, action) => {
  const state = Object.assign({}, requestState);
  // switch-case
  switch (action.type) {
    case ReducerTypes.CALENDAR_COMPLETE: {

    }
  }
};
