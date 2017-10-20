/**
 * @license inazumatv.com
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/08
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 * 2
 */


// react
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// app/draft
import Classes from '../../app/draft/Classes';
import Text from '../../app/draft/Text';

// component
// import ComponentToggle from './ComponentToggle';

// // react
// const React = self.React;

/**
 * draft 2016, div.position-filter
 * ```
 * <div class="position-filter">
 *  <button class="position-1 button is-checked" data-filter="">投手</button>
 *  <button class="position-2 button" data-filter="">捕手</button>
 *  <button class="position-3 button" data-filter="">内野手</button>
 *  <button class="position-4 button" data-filter="">外野手</button>
 *  <button class="position-5 button" data-filter="">その他</button>
 * </div>
 * ```
 */
export default class ComponentFilter extends Component {
  // ---------------------------------------------------
  //  [RECT NATIVE] STATIC GETTER / SETTER
  // ---------------------------------------------------
  // /**
  //  * propTypes
  //  *
  //  * - {function} behavior - 通知する親コンポーネント関数
  //  * - {string} checked - 選択されている ポジション
  //  * @returns {{behavior: function, checked: string}} React props
  //  */
  // static get propTypes() {
  //   return {
  //     behavior: PropTypes.func.isRequired,
  //     checked: PropTypes.string.isRequired,
  //   };
  // }
  /**
   * propTypes
   *
   * - {function} behavior - 通知する親コンポーネント関数
   * - {string} checked - 選択されている ポジション
   * @type {{behavior: *, checked: *}}
   */
  static propTypes = {
    behavior: PropTypes.func.isRequired,
    checked: PropTypes.string.isRequired,
  };
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link ComponentFilter.propTypes}
   * @since 2016-10-15
   */
  constructor(props) {
    super(props);
    /**
     * bound onClick
     * @type {Function}
     */
    this.onClick = this.onClick.bind(this);
    /**
     * React state, click 選択状態にする
     * @type {{
     *  pitcher: string,
     *  catcher: string,
     *  infielder: string,
     *  outfielder:
     *  string,
     *  etc: string
     * }}
     */
    this.state = {
      pitcher: '',
      catcher: '',
      infielder: '',
      outfielder: '',
      etc: '',
    };
    // props.checked -> add checked class
    this.state[props.checked] = Classes.CHECKED;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * button.onclick event handler
   *
   * - checked class add
   * - call which checked
   * <pre>
   * ドラフトのポジションフィルタ、一つしか選択できない、のほうがいいのかもと思ってきました.。（デフォルトは投手だけ表示は今のまま、捕手おしたら捕手だけ表示、で 複数のポジション同時表示しない）
   * 投手がかなり多いので、他ポジション押した時に、画面内では一見変化がみられずフィルタということが伝わりづらいかな..と思いまして。どうでしょうか。
   * </pre>
   * @param {Event} event a.onclick event
   * @since 2016-10-15
   * @see https://cloudpack.slack.com/archives/xpj-hhd-baseball/p1476451625000430
   */
  onClick(event) {
    event.preventDefault();
    const id = event.target.id;
    this.selected(id);
  }
  /**
   * which checked call to parent component
   * @param {string} current which selected
   */
  selected(current) {
    const classes = {
      pitcher: '',
      catcher: '',
      infielder: '',
      outfielder: '',
      etc: '',
    };
    // checked flag
    classes[current] = Classes.CHECKED;
    // CSS class change
    this.setState(classes);
    // 親コンポーネントへ通知
    this.props.behavior(current);
  }
  // ---------------------------------------------------
  //  [RECT NATIVE] METHOD
  // ---------------------------------------------------
  // /**
  //  * div.position-filter
  //  * @returns {XML} div.position-filter
  //  */
  // render() {
  //   const name = 'position-filter';
  //   // show
  //   return (
  //     <div className="position-filter">
  //       <ComponentToggle
  //         index={1}
  //         checked={this.props.checked}
  //         position={Classes.PITCHER}
  //         behavior={this.props.behavior}
  //         name={name}
  //       />
  //       <ComponentToggle
  //         index={2}
  //         checked={this.props.checked}
  //         position={Classes.CATCHER}
  //         behavior={this.props.behavior}
  //         name={name}
  //       />
  //       <ComponentToggle
  //         index={3}
  //         checked={this.props.checked}
  //         position={Classes.INFIELDER}
  //         behavior={this.props.behavior}
  //         name={name}
  //       />
  //       <ComponentToggle
  //         index={4}
  //         checked={this.props.checked}
  //         position={Classes.OUTFIELDER}
  //         behavior={this.props.behavior}
  //         name={name}
  //       />
  //       <ComponentToggle
  //         index={5}
  //         checked={this.props.checked}
  //         position={Classes.ETC}
  //         behavior={this.props.behavior}
  //         name={name}
  //       />
  //     </div>
  //   );
  // }
  /**
   * div.position-filter, 選手をポジションで選択
   * @return {XML} div.position-filter
   */
  render() {
    return (
      <div className="position-filter">
        <button
          id={Classes.PITCHER}
          name="group-position"
          className={`button position-1 ${this.state.pitcher}`}
          onClick={this.onClick}
        >
          {Text.long(Classes.PITCHER)}
        </button>
        <button
          id={Classes.CATCHER}
          name="group-position"
          className={`button position-2 ${this.state.catcher}`}
          onClick={this.onClick}
        >
          {Text.long(Classes.CATCHER)}
        </button>
        <button
          id={Classes.INFIELDER}
          name="group-position"
          className={`button position-3 ${this.state.infielder}`}
          onClick={this.onClick}
        >
          {Text.long(Classes.INFIELDER)}
        </button>
        <button
          id={Classes.OUTFIELDER}
          name="group-position"
          className={`button position-4 ${this.state.outfielder}`}
          onClick={this.onClick}
        >
          {Text.long(Classes.OUTFIELDER)}
        </button>
        <button
          id={Classes.ETC}
          name="group-position"
          className={`button position-5 ${this.state.etc}`}
          onClick={this.onClick}
        >
          {Text.long(Classes.ETC)}
        </button>
      </div>
    );
  }
}
