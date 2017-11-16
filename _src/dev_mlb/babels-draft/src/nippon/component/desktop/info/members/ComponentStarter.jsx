/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/19 - 21:09
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

// moku/util
import Type from '../../../../../moku/util/Type';

// component
import ComponentStarterPitcher from './ComponentStarterPitcher';
// import { default as ComponentStarterBatter } from './ComponentStarterBatter';
import ComponentStarterBatters from './ComponentStarterBatters';

// dae
import Starter from '../../../../dae/nippon/team/Starter';
import Team from '../../../../dae/nippon/Team';

/**
 * スターティングメンバー
 */
export default class ComponentStarter extends Component {
  // ---------------------------------------------------
  //  [RECT NATIVE] STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * React.propTypes
   * @type {{
   *    homeStarter: Starter,
   *    visitorStarter: Starter,
   *    home: Team,
   *    visitor: Team
   * }}
   */
  static propTypes = {
    // @type {Starter}
    homeStarter: PropTypes.instanceOf(Starter).isRequired,
    // @type {Starter}
    visitorStarter: PropTypes.instanceOf(Starter).isRequired,
    // @type {Team} - response.home
    home: PropTypes.instanceOf(Team).isRequired,
    // @type {Team} - response.visitor
    visitor: PropTypes.instanceOf(Team).isRequired,
  };
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link ComponentStarter.propTypes}
   */
  constructor(props) {
    super(props);
    /**
     * バッター出力項目
     * @type {{
     *  batNo: boolean,
     *  position: boolean,
     *  name: boolean,
     *  battingType: boolean,
     *  avg: boolean
     * }}
     */
    this.batter = {
      batNo: false,
      position: false,
      name: false,
      battingType: false,
      avg: false,
    };
    /**
     * ピッチャー出力項目
     * @type {{
     *  name: boolean,
     *  pitchingArm: boolean,
     *  era: boolean
     * }}
     */
    this.pitcher = {
      name: false,
      pitchingArm: false,
      era: false,
    };
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * 出力項目を null check
   * @param {Fielder|*} batter バッター情報
   * @since 2016-10-25
   */
  initBatter(batter) {
    if (!Type.exist(batter)) {
      return;
    }
    this.batter = {
      batNo: !Type.nil(batter.batNo) && !Type.undef(batter.batNo),
      position: !Type.nil(batter.position) && !Type.undef(batter.position),
      name: !Type.nil(batter.name) && !Type.undef(batter.name),
      battingType: !Type.nil(batter.battingType) && !Type.undef(batter.battingType),
      avg: !Type.nil(batter.avg) && !Type.undef(batter.avg),
    };
  }
  /**
   * 出力項目を null check
   * @param {Pitcher} pitcher ピッチャー情報
   * @since 2016-10-25
   */
  initPitcher(pitcher) {
    // console.log('pitcher', pitcher);
    if (!Type.exist(pitcher)) {
      return;
    }
    this.pitcher = {
      name: !Type.nil(pitcher.name) && !Type.undef(pitcher.name),
      pitchingArm: !Type.nil(pitcher.pitchingArm) && !Type.undef(pitcher.pitchingArm),
      era: !Type.nil(pitcher.era) && !Type.undef(pitcher.era),
    };
  }
  /**
   * div.starting
   * @return {?XML} div.starting or null
   * */
  render() {
    // const homeStarter = this.state.homeStarter;
    // const visitorStarter = this.state.visitorStarter;
    const { homeStarter, visitorStarter, home, visitor } = this.props;
    // ピッチャーと野手
    const homePitcher = homeStarter.pitcher;
    const homeBatters = homeStarter.batters;
    const visitorPitcher = visitorStarter.pitcher;
    const visitorBatters = visitorStarter.batters;
    // どちらかが存在すれば出力を行います
    if (!homePitcher.has && !homeBatters.has &&
      !visitorPitcher.has && !visitorBatters.has
    ) {
      return null;
    }
    // output
    // const home = this.state.home;
    // const visitor = this.state.visitor;
    let batter = homeBatters.batters[0];
    if (!Type.exist(batter)) {
      batter = visitorBatters.batters[0];
    }
    // 出力オプション
    if (Type.exist(batter)) {
      this.initBatter(batter);
    }
    let pitcher = homePitcher;
    if (!Type.exist(pitcher)) {
      pitcher = visitorPitcher;
    }
    if (Type.exist(pitcher)) {
      this.initPitcher(homePitcher);
    }
    // output
    return (
      <div className="starting">
        <header className="flashreport-sec-header">
          <h2>スターティングメンバー</h2>
        </header>
        <div className="starting-body">
          {/* visitor */}
          <div className={`visitor team-${visitor.info.id}`}>
            <ComponentStarterPitcher
              pitcher={visitorPitcher}
              option={this.pitcher}
            />
            {/* batters */}
            <ComponentStarterBatters
              starter={visitorBatters}
              option={this.batter}
              home={false}
            />
          </div>
          {/* home */}
          <div className={`home team-${home.info.id}`}>
            <ComponentStarterPitcher
              pitcher={homePitcher}
              option={this.pitcher}
            />
            {/* batters */}
            <ComponentStarterBatters
              starter={homeBatters}
              option={this.batter}
              home
            />
          </div>
        </div>
      </div>
    );
  }
}
