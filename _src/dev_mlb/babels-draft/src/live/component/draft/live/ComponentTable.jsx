/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/13 - 22:10
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

// moku/util
import Type from '../../../../moku/util/Type';

// component/flash
import ComponentTableLine from './ComponentTableLine';

// dae
// import Info from '../../../dae/lives/Info';
import TeamNames from '../../../dae/lives/convert/TeamNames';
import FirstData from '../../../dae/lives/convert/FirstData';
import Teams from '../../../dae/lives/Teams';

// // util
// import { default as Type } from '../../util/Type';

// // data/flash/convert
// import { default as FirstData } from '../../data/flash/convert/FirstData';

// // react
// const React = self.React;

/**
 * ComponentTableLine {@link ComponentTableLine} を出力します
 */
export default class ComponentTable extends Component {
  // ---------------------------------------------------
  //  [RECT NATIVE] STATIC GETTER / SETTER
  // ---------------------------------------------------
  // /**
  //  * propTypes
  //  * @return {{teams: Teams, teamNames: TeamNames, roster: boolean}} React props
  //  */
  // static get propTypes() {
  //   return {
  //     // @type {Teams}
  //     teams: React.PropTypes.object.isRequired,
  //     // @type {TeamNames}
  //     teamNames: React.PropTypes.object.isRequired,
  //     // @type {boolean} - true: 支配下選手
  //     roster: React.PropTypes.bool.isRequired,
  //   };
  // }
  /**
   * React.propTypes
   * - teams {Info}
   * - teamNames {TeamNames}
   * - roster {boolean} - true: 支配下選手
   * @type {{teams: Info, teamNames: TeamNames, roster: boolean}}
   */
  static propTypes = {
    teams: PropTypes.instanceOf(Teams).isRequired,
    teamNames: PropTypes.instanceOf(TeamNames).isRequired,
    roster: PropTypes.bool.isRequired,
  };
  // // ---------------------------------------------------
  // //  CONSTRUCTOR
  // // ---------------------------------------------------
  // /**
  //  * default property を保存し必要な関数・変数を準備します
  //  * @param {Object} props React props プロパティー {@link ComponentTable.propTypes}
  //  */
  // constructor(props) {
  //   super(props);
  //   /**
  //    * React state
  //    * @type {{teams: Teams, teamNames: TeamNames, roster: boolean}}
  //    */
  //   this.state = {
  //     teams: props.teams,
  //     teamNames: props.teamNames,
  //     roster: props.roster,
  //   };
  // }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * React props 更新
   * @param {Object} nextProps React props
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      teams: nextProps.teams,
      teamNames: nextProps.teamNames,
      roster: nextProps.roster,
    });
  }
  /**
   * 支配下選手・指名順[1]の出力を行います
   * @param {boolean} roster true: 支配下選手
   * @param {number} orderNo オーダー順
   * @param {Array<Players>} nominates オーダー順の選手（複数）
   * @return {?Array<XML>} ComponentTableLine {@link ComponentTableLine}
   */
  first(roster, orderNo, nominates) {
    const firstData = new FirstData(nominates);
    const lines = firstData.lines;
    // console.log('ComponentTable.first orderNo, nominates, lines', orderNo, nominates, lines);

    const keyName = 'roster';
    // const teamNames = this.state.teamNames;
    const { teamNames } = this.props;
    let count = 0;
    return lines.map((line, index) => {
      count += 1;
      const output = index === 0;
      // console.log('ComponentTable.first.map line', index, line);
      return (
        <ComponentTableLine
          key={`${keyName}-${orderNo}-${count}`}
          orderNo={orderNo}
          teamOrder={teamNames.ids}
          nominates={line}
          roster={roster}
          rankOutput={output}
        />
      );
    });
    // const keyName = 'roster';
    // const teamNames = this.props.teamNames;
    // return null;
  }
  /**
   * 支配下選手・指名順[2]以降と育成枠選手全部の出力を行います
   * @param {boolean} roster true: 支配下選手
   * @param {number} orderNo オーダー順
   * @param {Array<Players>} nominates オーダー順の選手（複数）
   * @return {XML} ComponentTableLine {@link ComponentTableLine}
   */
  second(roster, orderNo, nominates) {
    const keyName = roster ? 'roster' : 'development';
    // const teamNames = this.state.teamNames;
    const { teamNames } = this.props;
    return (
      <ComponentTableLine
        key={`${keyName}-${orderNo}`}
        orderNo={orderNo}
        teamOrder={teamNames.ids}
        nominates={nominates}
        roster={roster}
      />
    );
  }
  /**
   * ComponentTableLine / ComponentTableLineFirst を切替て出力します
   * @param {boolean} roster true: 支配下選手
   * @param {number} orderNo オーダー順
   * @param {Array<Players>} nominates オーダー順の選手（複数）
   * @return {?XML|?Array<XML>} table.tr.td に相当するコンテナを出力します
   */
  lines(roster, orderNo, nominates) {
    if (roster && orderNo === 1) {
      return this.first(roster, 1, nominates);
    }
    return this.second(roster, orderNo, nominates);
  }
  /**
   * div.draft-table
   * @return {?XML} div.draft-table or null
   */
  render() {
    const { teams, roster } = this.props;
    // const teams = this.state.teams;
    // console.log('ComponentTable.render', teams.teams.length, this.state.roster);
    if (teams.teams.length === 0) {
      return null;
    }
    // const roster = this.state.roster;
    // @type {Nominates}
    const nominatesInstance = roster ? teams.rosterNominate : teams.developmentNominate;
    if (!Type.exist(nominatesInstance)) {
      return null;
    }
    // @type {Object} - {teamId: [],...}
    const nominates = nominatesInstance.nominates;
    if (!Type.exist(nominates)) {
      return null;
    }
    //
    const list = Object.keys(nominates);
    if (list.length === 0) {
      return null;
    }
    // console.log('ComponentTable.render', list.length);
    // output
    // const teamNames = this.props.teamNames;
    // const keyName = roster ? 'roster' : 'development';
    const h3 = roster ? null : <h3><span>育成ドラフト</span></h3>;
    return (
      <div className="draft-table">
        {h3}
        {
          // nominates のキー（オーダー順）
          list.map((key) => {
            const orderNo = parseInt(key, 10);
            // console.log('orderNo', orderNo);
            return this.lines(roster, orderNo, nominates[orderNo]);
          })
        }
      </div>
    );
  }
}
