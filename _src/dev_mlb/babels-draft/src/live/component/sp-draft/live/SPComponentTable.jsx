/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/16 - 19:08
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
//
// // component/flash
// import { default as SPComponentPlayer } from './SPComponentPlayer';
//
// // event/flash
// import { default as SPFlash } from '../../event/flash/SPFlash';
//
// // react
// const React = self.React;

// react
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// event
import FlashEvent from '../../../event/FlashEvent';

import Team from '../../../dae/lives/Team';

import SPComponentPlayer from './SPComponentPlayer';

/**
 * チーム毎・指名順・選手一覧を出力します
 */
export default class SPComponentTable extends Component {
  // ---------------------------------------------------
  //  [RECT NATIVE] STATIC GETTER / SETTER
  // ---------------------------------------------------
  // /**
  //  * propTypes
  //  * @return {{teams: Teams, teamNames: TeamNames, roster: boolean}} React props
  //  */
  // static get propTypes() {
  //   return {
  //     // チームID
  //     teamId: React.PropTypes.number.isRequired,
  //     // @type {Team}
  //     team: React.PropTypes.object.isRequired,
  //     // @type {number} - 初期選択済み チームID
  //     selected: React.PropTypes.number.isRequired,
  //     // // @type {boolean} - true: 支配下選手
  //     // roster: React.PropTypes.bool.isRequired,
  //   };
  // }
  /**
   * React.propTypes
   * @type {{teamId: number, team: Team, selected: number}}
   */
  static propTypes = {
    // チームID
    teamId: PropTypes.number.isRequired,
    // @type {Team}
    team: PropTypes.instanceOf(Team).isRequired,
    // @type {number} - 初期選択済み チームID
    selected: PropTypes.number.isRequired,
  };
  // ----------------------------------------
  // STATIC METHOD
  // ----------------------------------------
  /**
   * 表示・非表示 style
   * @param {boolean} show true: 表示
   * @return {{display: string}}} css object を返します
   */
  static show(show) {
    if (show) {
      return { display: 'block' };
    }
    return { display: 'none' };
  }
  /**
   * 表示・非表示 CSS class
   * @param {boolean} show true: 表示
   * @return {string} team-show' / 'team-hide'
   */
  static showClass(show) {
    return show ? 'team-show' : 'team-hide';
  }
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link SPComponentTable.propTypes}
   */
  constructor(props) {
    super(props);
    /**
     * React state
     * @type {{
     *  show: boolean,
     *  teams: Teams,
     *  teamNames: TeamNames,
     *  roster: boolean
     * }}
     */
    this.state = {
      show: props.teamId === props.selected,
      // teamId: props.teamId,
      // team: props.team,
      // selected: props.selected,
    };
    /**
     * チームID
     * @type {number}
     */
    this.id = props.teamId;
    // SPFlash instance を作成し CHANGE event を監視します
    /**
     * FlashEvent instance
     * @type {FlashEvent}
     */
    this.flash = FlashEvent.factory();
    /**
     * bound onChange
     * @type {function}
     */
    this.onChange = this.onChange.bind(this);
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * マウント後 SPFlash.CHANGE を監視します
   */
  componentDidMount() {
    this.flash.on(FlashEvent.CHANGE, this.onChange);
  }
  // /**
  //  * React props 更新
  //  * @param {Object} nextProps React props
  //  */
  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     teamId: nextProps.teamId,
  //     team: nextProps.team,
  //     selected: nextProps.selected,
  //   });
  // }
  /**
   * SPFlash.CHANGE event handler,
   * event property `teamId` と `this.id` を比較し表示・非表示を
   * 判定します
   * @param {*} events SPFlash.CHANGE event object
   */
  onChange(events) {
    const teamId = events.teamId;
    // teamId と this.id が同じ時で
    // this.state.show が非表示の時に表示処理を走らせます
    if (teamId === this.id) {
      if (!this.state.show) {
        this.setState({ show: true });
      }
    } else if (this.state.show) {
      // 違う時で現在表示されていたら非表示処理を走らせます
      this.setState({ show: false });
    }
  }

  /**
   * roster 1位指名の時の処理です
   * @param {boolean} roster 支配化選手フラッグ
   * @param {Players} players Players instance
   * @param {number} index 処理 index 0 ~
   * @return {XML} SPComponentPlayer {@link SPComponentPlayer}
   */
  first(roster, players, index) {
    // console.log('second', this.props.teamId, roster, players);
    const player = players.player;
    return (
      <SPComponentPlayer
        key={`roster-${this.props.teamId}-${index}`}
        player={player}
        position={player.positionSlug}
        identity={player.identity}
        rank={1}
        development={false}
        rankOutput
      />
    );
  }

  /**
   * roster 2位以下と育成枠選手の処理です
   * @param {boolean} roster 支配化選手フラッグ
   * @param {Players} players Players instance
   * @param {number} index 処理 index 0 ~
   * @return {XML} SPComponentPlayer {@link SPComponentPlayer}
   */
  second(roster, players, index) {
    // console.log('second', this.props.teamId, roster, players);
    const player = players.player;
    const keyName = roster ? 'roster' : 'development';
    // 育成 文字が出力するかないか?
    const development = !roster;
    // 指名順
    const rank = parseInt(player.nominate.orderNo, 10);

    // 指名順出力するか？
    let rankOutput = true;
    // 支配化選手で指名順が 1位 以外は必ず出力します
    if (roster && rank === 1) {
      rankOutput = false;
    }
    return (
      <SPComponentPlayer
        key={`${keyName}-${this.props.teamId}-${index}`}
        player={player}
        position={player.positionSlug}
        identity={player.identity}
        rank={rank}
        development={development}
        rankOutput={rankOutput}
      />
    );
  }
  /**
   * div.draft-table を出力します
   * @return {XML} div.draft-table
   */
  render() {
    // const team = this.props.team;
    const { team, teamId } = this.props;
    const roster = team.roster.list;
    const development = team.development.list;
    const show = this.state.show;
    if (roster.length === 0 && development.length === 0) {
      return null;
    }
    // console.log('SPComponentTable.render');
    return (
      <div
        className={`draft-table draft-${teamId} ${SPComponentTable.showClass(show)}`}
        style={SPComponentTable.show(show)}
      >
        {
          // roster
          roster.map((players, index) => {
            if (index === 0) {
              return this.first(true, players, index);
            }
            return this.second(true, players, index);
          })
        }
        {
          // development
          development.map((players, index) => this.second(false, players, index))
        }
      </div>
    );
  }
}
