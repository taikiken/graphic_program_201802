/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/19 - 21:11
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
import ComponentWarmerFielders from './ComponentWarmerFielders';
import ComponentWarmerPitchers from './ComponentWarmerPitchers';

// dae
import Bench from '../../../../dae/nippon/team/Bench';
import Team from '../../../../dae/nippon/Team';

/**
 * 控え選手
 */
export default class ComponentWarmer extends Component {
  // ---------------------------------------------------
  //  [RECT NATIVE] STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * React.propTypes
   * @type {{
   *    homeWarmer: Bench,
   *    visitorWarmer: Bench,
   *    home: Team,
   *    visitor: Team
   * }}
   */
  static propTypes = {
    // @type {Bench}
    homeWarmer: PropTypes.instanceOf(Bench).isRequired,
    // @type {Bench}
    visitorWarmer: PropTypes.instanceOf(Bench).isRequired,
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
   * @param {Object} props React props プロパティー {@link ComponentWarmer.propTypes}
   */
  constructor(props) {
    super(props);
    /**
     * 投手 output option
     * @type {{name: boolean, armType: boolean, era: boolean}}
     */
    this.pitcher = {
      name: false,
      armType: false,
      era: false,
    };
    /**
     * 野手 output option
     * @type {{name: boolean, armType: boolean, avg: boolean}}
     */
    this.batter = {
      name: false,
      armType: false,
      avg: false,
    };
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * 出力項目を null check
   * @param {Fielder} batter バッター情報
   * @since 2016-10-25
   */
  initBatter(batter) {
    // console.log('batter', batter);
    this.batter = {
      name: !Type.nil(batter.name) && !Type.undef(batter.name),
      armType: !Type.nil(batter.pitchingArm) && !Type.nil(batter.battingType) &&
        !Type.undef(batter.pitchingArm) && !Type.undef(batter.battingType),
      avg: !Type.nil(batter.avg) && !Type.undef(batter.avg),
    };
  }
  /**
   * 出力項目を null check
   * @param {Pitcher} pitcher ピッチャー情報
   * @since 2016-10-25
   */
  initPitcher(pitcher) {
    this.pitcher = {
      name: !Type.nil(pitcher.name) && !Type.undef(pitcher.name),
      armType: !Type.nil(pitcher.pitchingArm) && !Type.nil(pitcher.battingType) &&
        !Type.undef(pitcher.pitchingArm) && !Type.undef(pitcher.battingType),
      era: !Type.nil(pitcher.era) && !Type.undef(pitcher.era),
    };
  }
  /**
   * div.bench
   * @return {?XML} div.bench or null
   * */
  render() {
    // const homeWarmer = this.state.homeWarmer;
    // const visitorWarmer = this.state.visitorWarmer;
    const { homeWarmer, visitorWarmer, home, visitor } = this.props;
    // // ピッチャーと野手
    const homePitchers = homeWarmer.pitchers;
    const visitorPitchers = visitorWarmer.pitchers;
    // どちらかが存在すれば出力を行います
    if (!homeWarmer.has && !visitorWarmer.has &&
      !homePitchers.has && !visitorPitchers.has
    ) {
      return null;
    }
    // output option
    let fielder = homeWarmer.catcher;
    if (!fielder.has) {
      fielder = homeWarmer.infielder;
    }
    if (!fielder.has) {
      fielder = homeWarmer.outfielder;
    }
    if (!fielder.has) {
      fielder = visitorWarmer.catcher;
    }
    if (!fielder.has) {
      fielder = visitorWarmer.infielder;
    }
    if (!fielder.has) {
      fielder = visitorWarmer.outfielder;
    }
    // console.log('homeWarmer.catcher', homeWarmer.catcher);
    // this.initBatter(homeWarmer.catcher.fielders[0]);
    if (fielder.has) {
      this.initBatter(fielder.fielders[0]);
    }
    let pitcher = homePitchers;
    if (!pitcher.has) {
      pitcher = visitorPitchers;
    }
    // this.initPitcher(homePitchers.pitchers[0]);
    if (pitcher.has) {
      this.initPitcher(pitcher.pitchers[0]);
    }
    // output
    // const home = this.state.home;
    // const visitor = this.state.visitor;
    return (
      <div className="bench">
        <header className="flashreport-sec-header">
          <h2>ベンチ入り選手</h2>
        </header>
        <div className="bench-body">
          {/* visitor */}
          <div className={`visitor team-${visitor.info.id}`}>
            {/* pitcher */}
            <ComponentWarmerPitchers
              pitchers={visitorPitchers}
              home={false}
              option={this.pitcher}
            />
            {/* catcher */}
            <ComponentWarmerFielders
              fielders={visitorWarmer.catcher}
              home={false}
              position="捕手"
              slug="catcher"
              option={this.batter}
            />
            {/* infielder */}
            <ComponentWarmerFielders
              fielders={visitorWarmer.infielder}
              home={false}
              position="内野手"
              slug="infielder"
              option={this.batter}
            />
            {/* outfielder */}
            <ComponentWarmerFielders
              fielders={visitorWarmer.outfielder}
              home={false}
              position="外野手"
              slug="outfielder"
              option={this.batter}
            />
          </div>
          {/* home */}
          <div className={`home team-${home.info.id}`}>
            {/* pitcher */}
            <ComponentWarmerPitchers
              pitchers={homePitchers}
              home
              option={this.pitcher}
            />
            {/* catcher */}
            <ComponentWarmerFielders
              fielders={homeWarmer.catcher}
              home
              position="捕手"
              slug="catcher"
              option={this.batter}
            />
            {/* infielder */}
            <ComponentWarmerFielders
              fielders={homeWarmer.infielder}
              home
              position="内野手"
              slug="infielder"
              option={this.batter}
            />
            {/* outfielder */}
            <ComponentWarmerFielders
              fielders={homeWarmer.outfielder}
              home
              position="外野手"
              slug="outfielder"
              option={this.batter}
            />
          </div>
        </div>
      </div>
    );
  }
}
