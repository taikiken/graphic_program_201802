/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/19 - 21:10
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// //
// import { default as Table } from '../Table';
//
// // react
// const React = self.React;

import React from 'react';
import PropTypes from 'prop-types';

// Table
import Table from '../Table';

// dae
// import Fielder from '../../../../dae/nippon/team/Fielder';
import Batter from '../../../../dae/nippon/team/Batter';

// /**
//  * 先発野手
//  */
// export default class ComponentStarterBatter extends React.Component {
//   // ---------------------------------------------------
//   //  [RECT NATIVE] STATIC GETTER / SETTER
//   // ---------------------------------------------------
//   /**
//    * propTypes
//    * @return {{batter: Batter}} React props
//    */
//   static get propTypes() {
//     return {
//       // @type {Fielder}
//       batter: React.PropTypes.object.isRequired,
//       // @type {Object}
//       option: React.PropTypes.object.isRequired,
//     };
//   }
//   // ---------------------------------------------------
//   //  CONSTRUCTOR
//   // ---------------------------------------------------
//   /**
//    * default property を保存し必要な関数・変数を準備します
//    * @param {Object} props React props プロパティー {@link ComponentStarterBatter.propTypes}
//    */
//   constructor(props) {
//     super(props);
//     /**
//      * React state
//      * @type {{batter: Batter, option: Object}}
//      */
//     this.state = {
//       batter: props.batter,
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
//       batter: nextProps.batter,
//       option: nextProps.option,
//     });
//   }
//   /**
//    * tr
//    * @return {?XML} tr or null
//    */
//   render() {
//     const batter = this.state.batter;
//     if (!batter.has) {
//       return null;
//     }
//     const option = this.state.option;
//     // out put
//     return (
//       <tr>
//         {Table.td(option.batNo, batter.batNo)}
//         {Table.td(option.position, batter.position)}
//         {Table.td(option.name, batter.name, 'name')}
//         {Table.td(option.battingType, batter.battingType)}
//         {Table.td(option.avg, batter.avg)}
//         {/*
//         <td>{batter.batNo}</td>
//         <td>（{batter.position}）</td>
//         <td className="name">{batter.name}</td>
//         <td>{batter.battingType}</td>
//         <td>{batter.avg}</td>
//          */}
//       </tr>
//     );
//   }
// }

/**
 * tr - 先発野手
 * ```
 * table.batter
 *   ComponentStarterBatter
 * ```
 * @param {Fielder} batter 先発野手
 * @param {*} option 野手出力項目 flag
 * @returns {?XML} tr
 * @constructor
 */
const ComponentStarterBatter = ({ batter, option }) => (
  <tr>
    {Table.td(option.batNo, batter.batNo)}
    {Table.td(option.position, batter.position)}
    {Table.td(option.name, batter.name, 'name')}
    {Table.td(option.battingType, batter.battingType)}
    {Table.td(option.avg, batter.avg)}
  </tr>
);

/**
 * React.propTypes
 * @type {{
 *    batter: Fielder,
 *    option: object
 * }}
 */
ComponentStarterBatter.propTypes = {
  // @type {Fielder}
  batter: React.PropTypes.instanceOf(Batter).isRequired,
  // @type {Object}
  option: React.PropTypes.shape({
    batNo: PropTypes.bool.isRequired,
    position: PropTypes.bool.isRequired,
    name: PropTypes.bool.isRequired,
    battingType: PropTypes.bool.isRequired,
    avg: PropTypes.bool.isRequired,
  }).isRequired,
};

export default ComponentStarterBatter;
