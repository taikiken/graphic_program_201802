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
import Fielders from '../../../../dae/nippon/team/Fielders';

// // Table
// import { default as Table } from '../Table';
//
// // react
// const React = self.React;

// /**
//  * 控え選手・野手
//  */
// export default class ComponentWarmerFielders extends React.Component {
//   // ---------------------------------------------------
//   //  [RECT NATIVE] STATIC GETTER / SETTER
//   // ---------------------------------------------------
//   /**
//    * propTypes
//    * @return {{pitcher: Pitchers}} React props
//    */
//   static get propTypes() {
//     return {
//       // @type {Fielders}
//       fielders: React.PropTypes.object.isRequired,
//       home: React.PropTypes.bool.isRequired,
//       // @type {string} - 日本語 捕手・内野手・外野手
//       position: React.PropTypes.string.isRequired,
//       // @type {string} - position slug, catcher, infielder, outfielder
//       slug: React.PropTypes.string.isRequired,
//       // output option
//       option: React.PropTypes.object.isRequired,
//     };
//   }
//   // ---------------------------------------------------
//   //  CONSTRUCTOR
//   // ---------------------------------------------------
//   /**
//    * default property を保存し必要な関数・変数を準備します
//    * @param {Object} props React props プロパティー {@link ComponentWarmerFielders.propTypes}
//    */
//   constructor(props) {
//     super(props);
//     /**
//      * React state
//      * @type {{fielders: Fielders, home: boolean, position: string, slug: string, option: Object}}
//      */
//     this.state = {
//       fielders: props.fielders,
//       home: props.home,
//       position: props.position,
//       slug: props.slug,
//       option: props.option,
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
//       fielders: nextProps.fielders,
//       home: nextProps.home,
//       position: nextProps.position,
//       slug: nextProps.slug,
//       option: nextProps.option,
//     });
//   }
//   /**
//    * table.catcher|infielder|outfielder
//    * @return {?XML} table.catcher|infielder|outfielder or null
//    */
//   render() {
//     const fielders = this.state.fielders;
//     if (!fielders.has) {
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
//       <table className={this.state.slug}>
//         <tbody>
//           <tr>
//             <th colSpan={col}>{this.state.position}</th>
//           </tr>
//           <tr>
//             {Table.th(option.name, '選手名', 0)}
//             {Table.th(option.armType, '投打', 1)}
//             {Table.th(option.avg, '打率', 2)}
//             {/*
//             <th>選手名</th>
//             <th>投打</th>
//             <th>打率</th>
//              */}
//           </tr>
//           {
//             fielders.fielders.map((fielder, index) => {
//               const key = `${kind}-${this.state.slug}-${index}`;
//               return (
//                 <tr key={key}>
//                   {Table.td(option.name, fielder.name, 'name')}
//                   {Table.td(option.armType, `${fielder.pitchingArm}${fielder.battingType}`)}
//                   {Table.td(option.avg, fielder.avg)}
//                   {/*
//                   <td className="name">{fielder.name}</td>
//                   <td>{fielder.pitchingArm}{fielder.battingType}</td>
//                   <td>{fielder.avg}</td>
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
 * 控え選手・野手
 * @param {Fielders} fielders 控え選手・野手データ
 * @param {boolean} home home team flag
 * @param {string} position ポジション - 日本語 捕手・内野手・外野手
 * @param {string} slug ポジション slug - catcher, infielder, outfielder
 * @param {*} option 出力項目 flag {{name: boolean, armType: boolean, avg: boolean}}
 * @returns {?XML} table
 * @constructor
 */
const ComponentWarmerFielders = ({ fielders, home, position, slug, option }) => {
  if (!fielders.has) {
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
  // ---
  // out put
  return (
    <table className={slug}>
      <tbody>
        <tr>
          <th colSpan={col}>{position}</th>
        </tr>
        <tr>
          {Table.th(option.name, '選手名', 0)}
          {Table.th(option.armType, '投打', 1)}
          {Table.th(option.avg, '打率', 2)}
        </tr>
        {
          fielders.fielders.map((fielder, index) => {
            const key = `${kind}-${slug}-${index}`;
            return (
              <tr key={key}>
                {Table.td(option.name, fielder.name, 'name')}
                {Table.td(option.armType, `${fielder.pitchingArm}${fielder.battingType}`)}
                {Table.td(option.avg, fielder.avg)}
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
 *    fielders: Fielders,
 *    home: boolean,
 *    position: string,
 *    slug: string
 *    option: object
 * }}
 */
ComponentWarmerFielders.propTypes = {
  // @type {Fielders}
  fielders: PropTypes.instanceOf(Fielders).isRequired,
  home: PropTypes.bool.isRequired,
  // @type {string} - 日本語 捕手・内野手・外野手
  position: PropTypes.string.isRequired,
  // @type {string} - position slug, catcher, infielder, outfielder
  slug: PropTypes.string.isRequired,
  // output option
  option: PropTypes.shape({
    name: PropTypes.bool.isRequired,
    armType: PropTypes.bool.isRequired,
    avg: PropTypes.bool.isRequired,
  }).isRequired,
};

export default ComponentWarmerFielders;
