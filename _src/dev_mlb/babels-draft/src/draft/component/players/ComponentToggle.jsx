/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/10 - 17:52
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// react
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// app
import Text from '../../app/draft/Text';
import Classes from '../../app/draft/Classes';

// // react
// const React = self.React;

/**
 * position: toggle button
 */
export default class ComponentToggle extends Component {
  // ---------------------------------------------------
  //  [RECT NATIVE] STATIC GETTER / SETTER
  // ---------------------------------------------------
  // /**
  //  * propTypes
  //  *
  //  * - {number} index - ナンバリング, CSS で使用します
  //  * - {string} checked - チェック済み position string
  //  * - {string} position - ボタンが担当する position string
  //  * - {string} name - button group に使用する attribute name, not use present time.
  //  * - {function} behavior - state 状態を送信する親コンポーネント関数, 戻り値で state 変更可能かを判断します
  //  * @return {{index: number, checked: string, position: string, behavior: function}} React props
  //  */
  // static get propTypes() {
  //   return {
  //     // ナンバリング, CSS で使用します
  //     index: React.PropTypes.number.isRequired,
  //     // チェック済み position string
  //     checked: React.PropTypes.string.isRequired,
  //     // ボタンが担当する position string
  //     position: React.PropTypes.string.isRequired,
  //     // button group に使用する attribute name, not use present time.
  //     name: React.PropTypes.string.isRequired,
  //     // state 状態を送信する親コンポーネント function
  //     behavior: React.PropTypes.func.isRequired,
  //   };
  // }
  /**
   * React.propTypes
   * - {number} index - ナンバリング, CSS で使用します
   * - {string} checked - チェック済み position string
   * - {string} position - ボタンが担当する position string
   * - {string} name - button group に使用する attribute name, not use present time.
   * - {function} behavior - state 状態を送信する親コンポーネント関数, 戻り値で state 変更可能かを判断します
   * @type {{index: *, checked: *, position: *, name: *, behavior: *}}
   */
  static propTypes = {
    // ナンバリング, CSS で使用します
    index: PropTypes.number.isRequired,
    // チェック済み position string
    checked: PropTypes.string.isRequired,
    // ボタンが担当する position string
    position: PropTypes.string.isRequired,
    // button group に使用する attribute name, not use present time.
    name: PropTypes.string.isRequired,
    // state 状態を送信する親コンポーネント function
    behavior: PropTypes.func.isRequired,
  };
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link ComponentToggle.propTypes}
   */
  constructor(props) {
    super(props);
    /**
     * React state
     * - selected, 選択されているかを表す真偽値フラッグ
     * @type {{selected: boolean}}
     */
    this.state = {
      selected: this.props.position === this.props.checked,
    };
    /**
     * bound onClick
     * @type {function}
     */
    this.onClick = this.onClick.bind(this);
    /**
     * bound onClickRadio, radio button 形式に変更になる
     * <pre>
     * ドラフトのポジションフィルタ、一つしか選択できない、のほうがいいのかもと思ってきました.。
     * （デフォルトは投手だけ表示は今のまま、捕手おしたら捕手だけ表示、で 複数のポジション同時表示しない）
     * 投手がかなり多いので、他ポジション押した時に、画面内では一見変化がみられずフィルタということが伝わりづらいかな..と思いまして。どうでしょうか。
     * </pre>
     * @since 2016-10-15
     * @type {function}
     * @see https://cloudpack.slack.com/archives/xpj-hhd-baseball/p1476451625000430
     */
    this.onClickRadio = this.onClickRadio.bind(this);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * button.onclick event handler
   *
   * - checked class add
   * - call which checked
   * @param {Event} event button.onclick event
   */
  onClick(event) {
    event.preventDefault();
    // 現在の state を反転
    const selected = !this.state.selected;
    // props.behavior 戻り値で state 変更可能かを判断します、
    // 必ず1つは選択されている必要があるため
    const can = this.props.behavior(this.props.position, selected);
    // 変更可能な時のみ state を update します
    if (can) {
      this.setState({ selected });
    }
  }
  /**
   * button.onclick event handler
   * @param {Event} event button.onclick event handler
   */
  onClickRadio(event) {
    event.preventDefault();
    const id = this.props.position;
    console.warn('ComponentToggle.onClickRadio id', id);
  }
  /**
   * button output
   * @return {XML} button.button, toggle button
   */
  render() {
    const checked = this.state.selected ? Classes.CHECKED : '';
    return (
      <button
        name={this.props.name}
        className={`button position-${this.props.index} ${checked}`}
        onClick={this.onClickRadio}
      >
        {Text.long(this.props.position)}
      </button>
    );
  }
}
