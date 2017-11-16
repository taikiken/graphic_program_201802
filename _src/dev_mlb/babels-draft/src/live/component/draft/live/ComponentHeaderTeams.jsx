/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/13 - 21:50
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

// moku/event
import Scrolling from '../../../../moku/event/Scrolling';

// moku/util
import Type from '../../../../moku/util/Type';

// moku/dom
import Elements from '../../../../moku/dom/Elements';

// dae
import Info from '../../../dae/lives/Info';

// moku
import ScrollingSingle from '../../../../moku/event/ScrollingSingle';
import Rate from '../../../../moku/tick/Rate';

// // event
// import { default as Scrolling } from '../../event/Scrolling';
//
// // util
// import { default as Type } from '../../util/Type';
//
// // dom
// import { default as Elements } from '../../dom/Elements';

// react
// const React = self.React;

/**
 * `div.draft-team` を出力します, scroll で fixed / absolute を切り替えます<br>
 * fixed 解放トリガーは `div.draft-results-header` になります
 * ```
 * <header class="draft-header" />
 * <div class="main-sec">
 *   <div class="draft-results">
 *     <header class="draft-results-header">
 *     <div class="draft-results-body">
 *       <div class="draft-team">
 * ```
 */
export default class ComponentHeaderTeams extends Component {
  // ---------------------------------------------------
  //  [RECT NATIVE] STATIC GETTER / SETTER
  // ---------------------------------------------------
  // /**
  //  * propTypes, TeamNames.informations（チーム名が指名順に並んでいます）
  //  * @return {{teams: Array<Info>}}
  //  * React props
  //  * */
  // static get propTypes() {
  //   return {
  //     // @type {Array<Info>}
  //     teams: React.PropTypes.array.isRequired,
  //   };
  // }

  /**
   * React.propTypes
   * - TeamNames.informations（チーム名が指名順に並んでいます）
   * @type {{teams: Array.<Info>}}
   */
  static propTypes = {
    teams: PropTypes.arrayOf(Info).isRequired,
  };
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link ComponentHeaderTeams.propTypes}
   */
  constructor(props) {
    super(props);
    const scrolling = ScrollingSingle.factory();
    scrolling.rate = new Rate(Rate.RATE_30);
    /**
     * Scrolling instance, scroll 監視を行います
     * @type {Scrolling}
     * */
    this.scrolling = scrolling;
    /**
     * div.draft-team Element
     * @type {?Element}
     * */
    this.element = null;
    /**
     * div.draft-team Element Elements instance
     * @type {?Elements}
     * */
    this.elements = null;
    /**
     * div.draft-results-header<br>
     * div.draft-team を fixed から解放するトリガーコンテナ
     * @type {?Elements}
     */
    this.resultHeader = null;
    /**
     * React state
     *
     * - @type {string} sticky - CSS class `sticky` を与え fixed にします, @default ''
     * @type {{
     *  sticky: string,
     * }}
     */
    this.state = {
      sticky: '',
      // teams: props.teams,
    };
    // console.log('ComponentHeaderTeams', props.teams);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * delegate, マウント後に呼び出されます
   * element, elements 両プロパティを設定し scroll 監視を始めます
   * */
  componentDidMount() {
    const element = this.element;
    if (Type.nil(element)) {
      return;
    }
    this.elements = new Elements(element);
    // @type {Elements} - div.draft-results-header
    this.resultHeader = new Elements(element.parentNode.parentNode.parentNode.firstElementChild);
    // scroll 監視を始めます
    const scrolling = this.scrolling;
    // scrolling.on(Scrolling.SCROLL, this.onScrolling.bind(this));
    scrolling.on(Scrolling.UPDATE, this.onScrolling.bind(this));
    // scrolling.watch();
    // // 強制発火
    // scrolling.fire();
    scrolling
      .start()
      .fire();
  }
  // /**
  //  * React props 更新
  //  * @param {Object} nextProps React props
  //  */
  // componentWillReceiveProps(nextProps) {
  //   this.setState({ teams: nextProps.teams });
  // }
  /**
   * Scrolling.SCROLL event handler
   * @param {ScrollEvents} events Scrolling.SCROLL event, Events instance
   * */
  onScrolling(events) {
    // console.log('ComponentHeaderTeams.onScrolling', events);
    // 前回と差異がない時は処理しない
    if (!events.changed) {
      return;
    }
    // scroll up / down で処理条件が違うので分岐します
    if (events.moving >= 0) {
      this.scrollDown();
    } else {
      this.scrollUp();
    }
  }
  /**
   * scroll down
   * */
  scrollDown() {
    const offset = this.elements.offset();
    const sticky = 'sticky';
    // div.draft-team の offset.top が 0 以下になる <= 画面上線にあった
    // sticky(fixed)にします
    // 無駄な描画更新がかからないように state.sticky をチェックします
    if (offset.top <= 0 && this.state.sticky !== sticky) {
      this.setState({ sticky });
    }
  }
  /**
   * scroll up
   * */
  scrollUp() {
    const headerOffset = this.resultHeader.offset();
    const sticky = 'sticky';
    // 隣接関係, div.draft-results-header（表示上・上のコンテナ）
    // の下端が画面外に消えたら div.draft-team から sticky を外します
    // 無駄な描画更新がかからないように state.sticky をチェックします
    if (headerOffset.bottom >= 0 && this.state.sticky === sticky) {
      this.setState({ sticky: '' });
    }
  }
  /**
   * div.draft-team 「チーム名一覧」（指名順）を出力します
   * @return {?XML} div.draft-team or null
   * */
  render() {
    // const teams = this.state.teams;
    const { teams } = this.props;
    if (teams.length === 0) {
      return null;
    }
    // console.log('ComponentHeaderTeams.render', teams.length);
    return (
      <div
        className={`draft-team ${this.state.sticky}`}
        ref={(component) => { this.element = component; }}
      >
        <ul>
          {
            // 12球団分。配列0-11。1巡目の指名順に並んでいます。
            teams.map((info) => {
              // @type {{teamId: number, teamName: number}}
              const teamId = info.teamId;
              return (
                <li key={`team-${teamId}`} className={`team-${teamId}`}>
                  {info.teamName}
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}
