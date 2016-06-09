/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/13 - 18:13
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// parent
import {ViewSingle} from '../../view/ViewSingle';

// data
import {Safety} from '../../data/Safety';

// view
import {View} from '../../view/View';

// dae
import {SingleDae} from '../../dae/SingleDae';

// node
import {BannerNode} from '../../node/single/BannerNode';

// sp
import {SPViewSingleHeader} from './single/SPViewSingleHeader';
import {SPViewSingleVisual} from './single/SPViewSingleVisual';

// React
let ReactDOM = self.ReactDOM;

/**
 * SP 記事詳細
 */
export class SPViewSingle extends ViewSingle {
  /**
   * SP 記事詳細
   * @param {Number} id 記事 id
   * @param {Element} element 日付とかインサートする element
   * @param {Element} visualElement メインビジュアルよう element
   * @param {Element} bannerElement メインビジュアルよう element
   * @param {Object} [option={}] callback をセットした Object
   */
  constructor( id:Number, element:Element, visualElement:Element, bannerElement:Element, option:Object = {} ) {
    super( id, element, { related: null, footer: null }, option );
    this._visualElement = visualElement;
    this._visual = null;
    this._bannerElement = bannerElement;
  }
  /**
   * dom を render します
   * @param {Object} response JSON response
   */
  render( response:Object ):void {
    let single = new SingleDae( response );

    // beforeRender call
    this.executeSafely( View.BEFORE_RENDER, single );

    this.header( single );
    this.visual( single );
    this.banner( single );

    // from 2016-06-10
    ViewSingle.moreExternal();
  }
  /**
   * header 部レンダリング
   * @param {SingleDae} single 記事 SingleDae instance
   */
  header( single:SingleDae ):void {
    // header
    if ( this._header === null ) {

      let viewHeader = new SPViewSingleHeader( this.element, single );
      viewHeader.on( View.DID_MOUNT, this._boundMount );
      this._header = viewHeader;
      viewHeader.start();

    } else {

      this._header.render( single );

    }
  }
  /**
   * visual 部レンダリング
   * @param {SingleDae} single 記事 SingleDae instance
   */
  visual( single:SingleDae ):void {
    // visual
    if ( this._visual === null ) {
      let visualNode = new SPViewSingleVisual( this._visualElement, single );
      this._visual = visualNode;
      visualNode.start();
    } else {
      this._visual.render( single );
    }
  }
  /**
   * banner レンダリング
   * @param {SingleDae} single 記事 SingleDae instance
   */
  banner( single:SingleDae ):void {
    // bannerElement をチェックします
    if (!Safety.isElement(this._bannerElement)) {
      return;
    }

    let userBanner = single.user.banner.sp;
    let banner = single.banner.sp;
    if ( !banner.image && !!userBanner.image ) {
      banner = userBanner;
    }
    
    ReactDOM.render(
      <BannerNode
        banner={banner}
        pc={false}
      />,
      this._bannerElement
    );
  }
}
