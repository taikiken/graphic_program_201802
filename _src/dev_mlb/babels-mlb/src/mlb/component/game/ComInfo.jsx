/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/28 - 22:04
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

// dae
import DaeGameInfo from '../../dae/games/DaeGameInfo';
import DaeMemberInfo from '../../dae/games/DaeMemberInfo';
import DaeTeamInfo from '../../dae/games/DaeTeamInfo';
import DaeInnings from '../../dae/games/DaeInnings';

// component
import ComInfoTab from './ComInfoTab';

// component/games
import ComGame from './games/ComGame';
import ComMember from './games/ComMember';
import ComInning from './games/ComInning';

// ----------------------------------------
// 親
// ----------------------------------------
/**
 * `/stats/mlb/game/YYYY/GAME_ID` の tab と切替で表示するコンテナの親
 * - {@link ComInfoTab}
 * - {@link ComGame}
 * - {@link ComMember}
 * - {@link ComInning}
 */
export default class ComInfo extends Component {
  // ----------------------------------------
  // STATIC PROPERTY
  // ----------------------------------------
  /**
   * propTypes
   * @type {{info: DaeGameInfo, member: DaeMemberInfo, team: DaeTeamInfo}}
   */
  static propTypes = {
    info: PropTypes.instanceOf(DaeGameInfo),
    member: PropTypes.instanceOf(DaeMemberInfo),
    team: PropTypes.instanceOf(DaeTeamInfo),
    innings: PropTypes.instanceOf(DaeInnings),
  };
  /**
   * defaultProps
   * @type {{info: ?DaeGameInfo, member: ?DaeMemberInfo, team: ?DaeTeamInfo}}
   */
  static defaultProps = {
    info: null,
    member: null,
    team: null,
    innings: null,
  };
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * ゲーム情報を表示します
   * @param {*} props React.props
   */
  constructor(props) {
    super(props);
    // ---
    /**
     * - game
     * - member
     * - inning
     * @type {{tab: string}}
     */
    this.state = {
      tab: 'game',
    };
    /**
     * bind onChange event handler - tab 切替
     * @type {function}
     */
    this.onChange = this.onChange.bind(this);
    /**
     * bind onMember - 出場成績タブ event handler
     * @type {function}
     */
    this.onMember = this.onMember.bind(this);
    /**
     * 出場成績タブ current id
     * @type {string}
     */
    this.member = 'batter';
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * tab 切替 event handler
   * - 試合情報
   * - 出場成績
   * - イニング速報
   * @param {string} tab tab 名称
   */
  onChange(tab) {
    // console.log('ComInfo.onChange', tab);
    this.setState({ tab });
  }
  /**
   * 出場成績タブをキープするために切替コールバックから「タブ」id を取得し `this.member` へ保存します
   * - 打者成績
   * - 投手成績
   * @param {string} tab batter|pitcher
   */
  onMember(tab) {
    // console.log('ComInfo.onMember', tab);
    this.member = tab;
  }
  /**
   * onChange tab 切替で出力するコンテナを切替ます
   * @param {string} tab tab ID - game / member / inning
   * @returns {?XML} {@link ComGame} / {@link ComMember}} / {@link ComInning}
   */
  choose(tab) {
    const { info, member, team, innings } = this.props;
    console.log('ComInfo.choose tab', tab, info, member, team);

    switch (tab) {
      case 'game': {
        return <ComGame info={info} team={team} />;
      }
      case 'member': {
        return <ComMember info={info} member={member} tab={this.member} cb={this.onMember} />;
      }
      case 'inning': {
        return <ComInning info={info} innings={innings} />;
      }
      default:
        return null;
    }
  }
  /**
   * tab 切替親コンテナ
   * @returns {?XML} div#js-info-container
   */
  render() {
    const { info, member, team, innings } = this.props;
    console.log('ComInfo.render info, member, team', info, member, team);
    if (!info || !member || !team || !innings) {
      return null;
    }
    // render
    return (
      <div className="js-info-container">
        <ComInfoTab
          change={this.onChange}
        />
        {
          this.choose(this.state.tab)
        }
      </div>
    );
  }
}