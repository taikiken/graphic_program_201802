/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/25 - 22:43
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {View} from '../View';

import {MessageStatus} from '../../event/MessageStatus';
import {CommentDeleteNode} from '../../node/modal/CommentDeleteNode';

// React
let ReactDOM = self.ReactDOM;

export class ViewDeleteModal extends View {
  constructor( element:Element, option:Object = {} ) {
    super( element, option );
    this._render = null;
  }
  start() {
    let status = MessageStatus.factory();
    status.on( MessageStatus.DELETE, this.onModal.bind( this ) );
  }
  onModal( event:Object ):void {

    if ( this._render === null ) {
      this._render = ReactDOM.render(
        <CommentDeleteNode
          id={event.id}
          type={event.kind}
          ok={event.ok}
          cancel={event.cancel}
        />,
        this.element
      );
    } else {

      this._render.updateShow( true, event.id, event.ok, event.cancel, event.type );

    }

  }
}
