/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/08/29 - 22:23
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import { Offset } from '../Offset';
import { Length } from '../../app/const/Length';
import { Api } from '../../net/Api';

export class Area extends Offset {
  constructor(area = '', resolve = null, reject = null, offset = 0, length = Length.archive) {
    super(Api.area(), resolve, reject, offset, length);
    this.area = area;
  }
  get url() {
    return `${this._url}/${this.area}?offset=${this.offset}&length=${this.length}`;
  }
}
