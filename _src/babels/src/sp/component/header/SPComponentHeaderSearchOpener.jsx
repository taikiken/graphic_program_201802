/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/12 - 15:09
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import { SearchStatus } from '../../../event/SearchStatus';
import { Scroll } from '../../../util/Scroll';
import { Message } from '../../../app/const/Message';

/**
 * [library] - Sagen
 */
const Sagen = self.Sagen;

// React
/**
 * [library] - React
 */
const React = self.React;

/**
 * SP: header - 検索フォーム open / close button
 */
export default class SPComponentHeaderSearchOpener extends React.Component {
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * 検索フォームを閉じる時に scroll 値を復元します
   * @param {number} y target scroll top px value
   */
  static restore(y) {
    // scrollY が 0 でない時は 復元 しない
    // ユーザーが scroll している可能性がある
    if (Scroll.y !== 0) {
      return;
    }
    Scroll.motion(y, 0.1, 0.025);
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * SP: header - 検索フォーム open / close button 準備します
   * @param {*} props React.props
   */
  constructor(props) {
    super(props);
    // -----
    /**
     * document.body - Sagen.Dom instance
     * @type {*}
     */
    this.body = new Sagen.Dom(document.body);
    /**
     * 開いているか真偽値
     * @private
     * @type {Boolean}
     */
    this.open = false;
    /**
     * SearchStatus instance
     * @private
     * @type {SearchStatus}
     */
    this.status = SearchStatus.factory();
    /**
     * scroll top
     * @default 0
     * @private
     * @type {number}
     */
    this.y = 0;
    /**
     * bind onClick
     * @type {function}
     */
    this.onClick = this.onClick.bind(this);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * a.onclick event handler - search container open / close します
   * @param {Event} event click event
   */
  onClick(event) {
    event.preventDefault();
    // iOS
    // fixed 内の input に focus すると
    // fixed -> absolute に変わる
    // どうも仕様な様子
    // そのため blur 後の scroll 位置が 0 になるのを元に戻すために
    // open 時の scroll 位置を保存し復元する
    // console.log('SPComponentHeaderSearchOpener.onClick', this.open);
    if (this.open) {
      // open -> close
      this.open = false;
      this.body.removeClass( 'search-form-open' );
      this.status.close();
      // scroll 位置を復元する
      // Scroll.motion( this.y, 0.1, 0.025 );
      SPComponentHeaderSearchOpener.restore(this.y);
    } else {
      // close -> open
      this.open = true;
      // scroll 位置を保存する
      this.y = Scroll.y;
      this.body.addClass('search-form-open');
      this.status.open();
    }
  }

  /**
   * `a.head-search-opener` 検索フォーム open = close button
   * @returns {XML} `a.head-search-opener`
   */
  render() {
    return (
      <a className="head-search-opener" href="#" onClick={this.onClick}>
        {Message.OPENER_SEARCH}
      </a>
    );
  }
}
