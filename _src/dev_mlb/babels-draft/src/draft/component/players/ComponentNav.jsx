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
 * 3
 */

// react
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// app/draft
import Text from '../../app/draft/Text';
import Classes from '../../app/draft/Classes';

// react
// const React = self.React;
/**
 * draft 2016, div.category-nav
 * ```
 * <nav class="category-nav">
 *  <ul>
 *    <li><a class="category-1 is-checked" href="#">高校生</a></li>
 *    <li><a class="category-2" href="#">大学生</a></li>
 *    <li><a class="category-3" href="#">社会人</a></li>
 *    <li><a class="category-4" href="#">独立リーグ</a></li>
 *  </ul>
 * </nav>
 * ```
 */
export default class ComponentNav extends Component {
  // ---------------------------------------------------
  //  [RECT NATIVE] STATIC GETTER / SETTER
  // ---------------------------------------------------
  // /**
  //  * propTypes
  //  * @returns {{behavior: function, checked: string}}
  //  * React props
  //  */
  // static get propTypes() {
  //   return {
  //     behavior: React.PropTypes.func.isRequired,
  //     checked: React.PropTypes.string.isRequired,
  //   };
  // }
  /**
   * React.propTypes
   * @type {{behavior: function, checked: string}}
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
   * @param {Object} props React props プロパティー {@link ComponentNav.propTypes}
   */
  constructor(props) {
    super(props);
    /**
     * React state
     * @type {{
     *  highschool: string,
     *  university: string,
     *  works: string,
     *  independent: string
     * }}
     */
    this.state = {
      highschool: '',
      university: '',
      works: '',
      independent: '',
    };
    // props.checked -> add checked class
    this.state[props.checked] = Classes.CHECKED;

    /**
     * bound onClick
     * @type {Function}
     */
    this.onClick = this.onClick.bind(this);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * a.onclick event handler
   *
   * - checked class add
   * - call which checked
   * @param {Event} event a.onclick event
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
      highschool: '',
      university: '',
      works: '',
      independent: '',
    };
    // checked flag
    classes[current] = Classes.CHECKED;
    this.setState(classes);
    this.props.behavior(current);
  }
  // ---------------------------------------------------
  //  [RECT NATIVE] METHOD
  // ---------------------------------------------------
  /**
   * nav.category-nav
   * @returns {XML} nav.category-nav
   */
  render() {
    // show
    return (
      <nav className="category-nav">
        <ul>
          <li>
            <a
              id={Classes.HIGH_SCHOOL}
              href={`#${Classes.HIGH_SCHOOL}`}
              className={`category-1 ${this.state.highschool}`}
              onClick={this.onClick}
            >
              {Text.HIGH_SCHOOL}
            </a>
          </li>
          <li>
            <a
              id={Classes.UNIVERSITY}
              href={`#${Classes.UNIVERSITY}`}
              className={`category-2 ${this.state.university}`}
              onClick={this.onClick}
            >
              {Text.UNIVERSITY}
            </a>
          </li>
          <li>
            <a
              id={Classes.WORKS}
              href={`#${Classes.WORKS}`}
              className={`category-3 ${this.state.works}`}
              onClick={this.onClick}
            >
              {Text.WORKS}
            </a>
          </li>
          <li>
            <a
              id={Classes.INDEPENDENT}
              href={`#${Classes.INDEPENDENT}`}
              className={`category-4 ${this.state.independent}`}
              onClick={this.onClick}
            >
              {Text.INDEPENDENT}
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}
