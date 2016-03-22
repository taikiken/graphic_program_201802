/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/17 - 18:14
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// UT
let UT = self.UT;
let Dom = UT.app.Dom;

let TweenLite = self.TweenLite;
let easing = self.com.greensock.easing;

/**
 * page top に戻る
 */
export class PageTop {
  /**
   * page top に戻る motion
   */
  constructor() {
    this._boundComplete = this.onComplete.bind( this );
    this._can = true;
  }
  /**
   * click event を bind します
   */
  init():void {
    let element = Dom.pageTop();
    if ( element !== null ) {
      element.addEventListener( 'click', this.onClick.bind( this ), false );
    }
  }
  /**
   * element click event handler
   * @param {Event} event native event, click event
   */
  onClick( event:Event ):void {
    event.preventDefault();

    // click 不可のときは処理しない
    if ( !this._can ) {
      return;
    }

    let complete = this._boundComplete;
    this._can = false;

    // scrolling
    TweenLite.to(
      window,
      0.5,
      {
        scrollTo: {
          y: 0,
          autoKill: false
        },
        // easing
        ease: easing.Power4.easeInOut,
        onComplete: complete
      }
    );
  }
  /**
   * page top motion complete
   */
  onComplete():void {
    this._can = true;
  }
  /**
   * PageTop instance を作成し開始する
   */
  static start():void {
    let pageTop = new PageTop();
    pageTop.init();
  }
}
