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

import React from 'react';
import PropTypes from 'prop-types';

// Table
import Table from '../Table';
// import Pitcher from '../../../../dae/nippon/team/Pitcher';
import Pitchers from '../../../../dae/nippon/team/Pitchers';

// // util
// import { default as Table } from '../Table';
//
// // react
// const React = self.React;

// /**
//  * 控え投手
//  */
// export default class ComponentWarmerPitchers extends React.Component {
//   // ---------------------------------------------------
//   //  [RECT NATIVE] STATIC GETTER / SETTER
//   // ---------------------------------------------------
//   /**
//    * propTypes
//    * @return {{pitcher: Pitchers}} React props
//    */
//   static get propTypes() {
//     return {
//       // @type {Pitchers}
//       pitchers: React.PropTypes.object.isRequired,
//       option: React.PropTypes.object.isRequired,
//       home: React.PropTypes.bool.isRequired,
//     };
//   }
//   // ---------------------------------------------------
//   //  CONSTRUCTOR
//   // ---------------------------------------------------
//   /**
//    * default property を保存し必要な関数・変数を準備します
//    * @param {Object} props React props プロパティー {@link ComponentWarmerPitchers.propTypes}
//    */
//   constructor(props) {
//     super(props);
//     /**
//      * Rect state
//      * @type {{pitchers: Pitchers}}
//      */
//     this.state = {
//       pitchers: props.pitchers,
//       option: props.option,
//       home: props.home,
//     };
//   }
//   // ---------------------------------------------------
//   //  METHOD
//   // ---------------------------------------------------
//   /**
//    * React props 変更を `state` に反映し描画更新します
//    * @param {Object} nextProps 更新された React props
//    */
//   componentWillReceiveProps(nextProps) {
//     this.setState({
//       pitchers: nextProps.pitchers,
//       option: nextProps.option,
//       home: nextProps.home,
//     });
//   }
//   /**
//    * table.pitcher
//    * @return {?XML} table.pitcher or null
//    */
//   render() {
//     const pitchers = this.state.pitchers;
//     if (!pitchers.has) {
//       return null;
//     }
//     const kind = this.state.home ? 'home' : 'visitor';
//     const option = this.state.option;
//     let col = 0;
//     Object.values(option).map((bool) => {
//       if (bool) {
//         col += 1;
//       }
//       return col;
//     });
//     // out put
//     return (
//       <table className="pitcher">
//         <tbody>
//           <tr>
//             <th colSpan={col}>投手</th>
//           </tr>
//           <tr>
//             {Table.th(option.name, '選手名', 0)}
//             {Table.th(option.armType, '投打', 1)}
//             {Table.th(option.era, '防御率', 2)}
//             {/*
//             <th>選手名</th>
//             <th>投打</th>
//             <th>防御率</th>
//              */}
//           </tr>
//           {
//             pitchers.pitchers.map((pitcher, index) => {
//               const key = `${kind}-pitcher-${index}`;
//               return (
//                 <tr key={key}>
//                   {Table.td(option.name, pitcher.name, 'name')}
//                   {Table.td(option.armType, `${pitcher.pitchingArm}${pitcher.battingType}`)}
//                   {Table.td(option.era, pitcher.era)}
//                   {/*
//                   <td className="name">{pitcher.name}</td>
//                   <td>{pitcher.pitchingArm}{pitcher.battingType}</td>
//                   <td>{pitcher.era}</td>
//                    */}
//                 </tr>
//               );
//             })
//           }
//         </tbody>
//       </table>
//     );
//   }
// }

/**
 * table - 控え投手
 * @param {Pitchers} pitchers 控え投手データ
 * @param {*} option 出力項目flag {{name: boolean, armType: boolean, avg: boolean}}
 * @param {boolean} home home team flag
 * @returns {?XML} table.pitcher
 * @constructor
 */
const ComponentWarmerPitchers = ({ pitchers, option, home }) => {
  if (!pitchers.has) {
    return null;
  }
  const kind = home ? 'home' : 'visitor';
  let col = 0;
  Object.values(option).map((bool) => {
    if (bool) {
      col += 1;
    }
    return col;
  });
  // out put
  return (
    <table className="pitcher">
      <tbody>
        <tr>
          <th colSpan={col}>投手</th>
        </tr>
        <tr>
          {Table.th(option.name, '選手名', 0)}
          {Table.th(option.armType, '投打', 1)}
          {Table.th(option.era, '防御率', 2)}
        </tr>
        {
          pitchers.pitchers.map((pitcher, index) => {
            const key = `${kind}-pitcher-${index}`;
            return (
              <tr key={key}>
                {Table.td(option.name, pitcher.name, 'name')}
                {Table.td(option.armType, `${pitcher.pitchingArm}${pitcher.battingType}`)}
                {Table.td(option.era, pitcher.era)}
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};

/**
 * React.propTypes
 * @type {{
 *    pitchers: Pitchers,
 *    option: object,
 *    home: boolean
 * }}
 */
ComponentWarmerPitchers.propTypes = {
  // @type {Pitchers}
  pitchers: PropTypes.instanceOf(Pitchers).isRequired,
  option: PropTypes.shape({
    name: PropTypes.bool.isRequired,
    armType: PropTypes.bool.isRequired,
    era: PropTypes.bool.isRequired,
  }).isRequired,
  home: PropTypes.bool.isRequired,
};

export default ComponentWarmerPitchers;
