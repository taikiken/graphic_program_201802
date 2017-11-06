/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/16 - 19:27
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// react
import React from 'react';
import PropTypes from 'prop-types';

// component/flash
import SPComponentSelect from './live/SPComponentSelect';
import SPComponentTable from './live/SPComponentTable';

// dae
import Teams from '../../dae/lives/Teams';

// react
// const React = self.React;

// /**
//  * mobile, ドラフト速報出力
//  */
// export default class SPComponentFlash extends React.Component {
//   // ---------------------------------------------------
//   //  [RECT NATIVE] STATIC GETTER / SETTER
//   // ---------------------------------------------------
//   /**
//    * propTypes
//    * @return {{teams: Teams}} React props
//    * */
//   static get propTypes() {
//     return {
//       // @type {Teams}
//       teams: React.PropTypes.object.isRequired,
//     };
//   }
//   // ---------------------------------------------------
//   //  CONSTRUCTOR
//   // ---------------------------------------------------
//   /**
//    * default property を保存し必要な関数・変数を準備します
//    * @param {Object} props React props プロパティー {@link SPComponentFlash.propTypes}
//    */
//   constructor(props) {
//     super(props);
//     /**
//      * React state
//      * @type {{teams: Teams, teamNames: TeamNames, selected: number}}
//      */
//     this.state = {
//       teams: props.teams,
//       teamNames: props.teams.teamNames,
//       // list 1番目を選択ずみにします, チームID
//       selected: props.teams.teams[0].info.teamId,
//     };
//   }
//   // ---------------------------------------------------
//   //  METHOD
//   // ---------------------------------------------------
//   /**
//    * React props 更新
//    * @param {Object} nextProps React props
//    */
//   componentWillReceiveProps(nextProps) {
//     const teams = nextProps.teams;
//     this.setState({
//       teams,
//       teamNames: teams.teamNames,
//     });
//   }
//   /**
//    * ドラフト速報表示します
//    * @return {XML} `div.draft-results-body`
//    * */
//   render() {
//     // console.log('*********** SPComponentFlash.render');
//     const selected = this.state.selected;
//     return (
//       <div className="draft-results-body">
//         <SPComponentSelect
//           teams={this.state.teamNames.informations}
//           selected={selected}
//         />
//         {
//           // チーム別・指名順・選手一覧
//           this.state.teams.teams.map((team, index) => {
//             const teamId = team.info.teamId;
//             return (
//               <SPComponentTable
//                 key={`team-${index}-${teamId}`}
//                 teamId={teamId}
//                 team={team}
//                 selected={selected}
//               />
//             );
//           })
//         }
//       </div>
//     );
//   }
// }

/**
 * mobile, ドラフト速報を出力します
 * @param {Teams} teams JSON
 * @returns {XML} div.draft-results-body
 * @constructor
 */
const SPComponentFlash = ({ teams }) => {
  // list 1番目を選択ずみにします, チームID
  const selected = teams.teams[0].info.teamId;
  return (
    <div className="draft-results-body">
      <SPComponentSelect
        teams={teams.teamNames.informations}
        selected={selected}
      />
      {
        // チーム別・指名順・選手一覧
        teams.teams.map((team) => {
          const teamId = team.info.teamId;
          return (
            <SPComponentTable
              key={`team-${teamId}`}
              teamId={teamId}
              team={team}
              selected={selected}
            />
          );
        })
      }
    </div>
  );
};

/**
 * React.propTypes
 * @type {{teams: Teams}}
 */
SPComponentFlash.propTypes = {
  teams: PropTypes.instanceOf(Teams).isRequired,
};

export default SPComponentFlash;
