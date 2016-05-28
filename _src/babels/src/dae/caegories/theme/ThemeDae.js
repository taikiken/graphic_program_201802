/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/05/28 - 16:19
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {Safety} from '../../../data/Safety';
import {ImagesDae} from './ImagesDae';

export class ThemeDae {
  constructor( theme:Object = {} ) {
    theme = Safety.object( theme );

    this._theme = theme;
    this._images = new ImagesDae( theme.images );
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * JSON.response.theme
   * @return {Object|*} JSON response.theme を返します
   */
  get theme():Object {
    return this._theme;
  }

  get base():string {
    return this.theme.base;
  }
  get backgroundColor():string {
    return this.theme['background-color'];
  }
  get images():ImagesDae {
    return this._images;
  }
}
