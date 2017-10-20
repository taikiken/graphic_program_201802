/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/16 - 19:31
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

// event
import FlashEvent from '../../../event/FlashEvent';
import Teams from '../../../dae/lives/Teams';

// // event/flash
// import { default as SPFlash } from '../../event/flash/SPFlash';
//
// // react
// const React = self.React;

/**
 * div.draft-team > select を出力し球団選択で選手一覧
 * 表示を切り替えるためのイベントを発火します
 */
export default class SPComponentSelect extends Component {
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
  //     // change: React.PropTypes.func.isRequired,
  //     selected: React.PropTypes.number.isRequired,
  //   };
  // }
  /**
   * TeamNames.informations（チーム名が指名順に並んでいます）
   * @type {{teams: Teams, selected: number}}
   */
  static propTypes = {
    // @type {Array<Info>}
    teams: PropTypes.arrayOf(Teams).isRequired,
    selected: PropTypes.number.isRequired,
  };
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link SPComponentSelect.propTypes}
   */
  constructor(props) {
    super(props);
    /**
     * React state
     *
     * - selected - チームID
     * @type {{selected: number}}
     */
    this.state = {
      // teams: props.teams,
      selected: props.selected,
    };
    /**
     * FlashEvent instance, onChange 時に発火します
     * @type {FlashEvent}
     */
    this.flash = FlashEvent.factory();
    /**
     * bound onChange, select.onChange 関数
     * @type {function}
     */
    this.onChange = this.onChange.bind(this);
  }
  // // ---------------------------------------------------
  // //  METHOD
  // // ---------------------------------------------------
  // /**
  //  * React props 更新
  //  * @param {Object} nextProps React props
  //  */
  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     teams: nextProps.teams,
  //     selected: nextProps.selected,
  //   });
  // }
  /**
   * select.onChange event handler, SPFlash.change を実行します
   * @param {Event} event select.onChange event
   */
  onChange(event) {
    const target = event.target;
    const selected = parseInt(target.value, 10);
    // state 変更
    this.setState({ selected });
    // 発火
    this.flash.change(selected);
  }
  /**
   * div.draft-team
   * @return {?XML} div.draft-team or null
   */
  render() {
    // const teams = this.state.teams;
    const { teams } = this.props;
    if (teams.length === 0) {
      return null;
    }
    // console.log('SPComponentSelect.render');
    return (
      <div className="draft-team">
        <p>球団選択：</p>
        <div className={`draft-team-select team-${this.state.selected}`}>
          <select name="draft-teams" id="draft-teams" onChange={this.onChange}>
            {
              // 12球団分。配列0-11。1巡目の指名順の指名順に並んでいます。
              teams.map((info) => {
                // @type {{teamId: number, teamName: number}}
                const teamId = info.teamId;
                return (
                  <option key={`team-${teamId}`} className={`team-${teamId}`} value={teamId}>
                    {info.teamName}
                  </option>
                );
              })
            }
          </select>
        </div>
      </div>
    );
  }
}
