/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/13 - 22:57
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// parent
import ViewHeaderSearch from '../../../view/header/ViewHeaderSearch';

// // app
// import {Message} from '../../../app/const/Message';
//
// // event
// import {SearchStatus} from '../../../event/SearchStatus';

// // node
// import {HeaderSearchNode} from '../../../node/header/HeaderSearchNode';

// util
// import {Scroll} from '../../../util/Scroll';
import SPComponentHeaderSearchOpener from '../../component/header/SPComponentHeaderSearchOpener';
import ComponentHeaderSearchForm from '../../../component/header/ComponentHeaderSearchForm';

// // Sagen
// let Sagen = self.Sagen;

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
 * SP 検索フォーム
 */
export default class SPViewHeaderSearch extends ViewHeaderSearch {
  /**
   * 検索フォーム + ロケーション遷移
   * @param {Element} element insert parent element
   * @param {Element} buttonElement opener button
   * @param {Object} [option={}] optional event handler
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
   * @since 2-18-04-19 vk header - flag 追加
   */
  constructor(element, buttonElement, option = {}, vk = false) {
    super(element, option, vk);
    /**
     * opener button
     * @type {Element}
     * @private
     */
    this._button = buttonElement;
  }
  /**
   * header 検索フォームを生成します
   * - {@link ComponentHeaderSearchForm}
   * - {@link SPComponentHeaderSearchOpener}
   */
  render() {
    // // search form
    // ReactDOM.render(
    //   <HeaderSearchNode
    //     listen={true}
    //     show={false}
    //   />,
    //   this.element
    // );

    // search form
    ReactDOM.render(
      <ComponentHeaderSearchForm
        listen={true}
        show={false}
      />,
      this.element,
    );

    // // search form opener
    // /**
    //  * 検索コンテナ(form)を open / close
    //  * @private
    //  * @type {*|Function|ReactClass}
    //  */
    // let ButtonDom = React.createClass( {
    //   propTypes: {
    //     body: React.PropTypes.object.isRequired
    //   },
    //   render: function() {
    //     return (
    //       <a className="head-search-opener" href="#" onClick={this.clickHandler}>{Message.OPENER_SEARCH}</a>
    //     );
    //   },
    //   componentDidMount: function() {
    //     /**
    //      * 開いているか真偽値
    //      * @private
    //      * @type {Boolean}
    //      */
    //     this.open = false;
    //     /**
    //      * SearchStatus instance
    //      * @private
    //      * @type {SearchStatus}
    //      */
    //     this.status = SearchStatus.factory();
    //     /**
    //      * scroll top
    //      * @default 0
    //      * @private
    //      * @type {number}
    //      */
    //     this.y = 0;
    //   },
    //   clickHandler: function( event:Event ):void {
    //     event.preventDefault();
    //     /*
    //     iOS
    //     fixed 内の input に focus すると
    //     fixed -> absolute に変わる
    //     どうも仕様な様子
    //     そのため blur 後の scroll 位置が 0 になるのを元に戻すために
    //     open 時の scroll 位置を保存し復元する
    //     */
    //     if ( this.open ) {
    //       // open -> close
    //       this.open = false;
    //       this.props.body.removeClass( 'search-form-open' );
    //       this.status.close();
    //       // scroll 位置を復元する
    //       // Scroll.motion( this.y, 0.1, 0.025 );
    //       this.restoreY( this.y );
    //     } else {
    //       // close -> open
    //       this.open = true;
    //       // scroll 位置を保存する
    //       this.y = Scroll.y;
    //       this.props.body.addClass( 'search-form-open' );
    //       this.status.open();
    //     }
    //   },
    //   restoreY: function( y:Number ):void {
    //     // scrollY が 0 でない時は 復元 しない
    //     // ユーザーが scroll している可能性がある
    //     if ( Scroll.y !== 0 ) {
    //       return;
    //     }
    //
    //     Scroll.motion( y, 0.1, 0.025 );
    //   }
    // } );
    //
    // ReactDOM.render(
    //   <ButtonDom
    //     body={new Sagen.Dom( document.body )}
    //   />,
    //   this._button
    // );
    // search form opener button
    ReactDOM.render(
      <SPComponentHeaderSearchOpener />,
      this._button
    );
  }
}
