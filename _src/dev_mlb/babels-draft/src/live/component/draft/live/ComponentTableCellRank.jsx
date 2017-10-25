/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/13 - 22:47
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

// // react
// const React = self.React;

// /**
//  * 左端、指名順枠を出力します
//  */
// export default class ComponentTableCellRank extends Component {
//   // ---------------------------------------------------
//   //  [RECT NATIVE] STATIC GETTER / SETTER
//   // ---------------------------------------------------
//   /**
//    * propTypes
//    * @return {{rank: number, development: boolean, rankOutput: boolean}} React props
//    */
//   static get propTypes() {
//     return {
//       rank: React.PropTypes.number.isRequired,
//       // 育成 文字が出力するかないか?
//       development: React.PropTypes.bool.isRequired,
//       // 順位 文字が出力するかないか?
//       rankOutput: React.PropTypes.bool.isRequired,
//     };
//   }
//   // ---------------------------------------------------
//   //  STATIC METHOD
//   // ---------------------------------------------------
//   /**
//    * span.text-s, 育成枠の時のみ出力します
//    * @param {boolean} development true: 育成枠
//    * @return {?XML} span.text-s or null
//    */
//   static development(development) {
//     if (development) {
//       return (
//         <span className="text-s">育<br />成<br /></span>
//       );
//     }
//     return null;
//   }
//   // ---------------------------------------------------
//   //  CONSTRUCTOR
//   // ---------------------------------------------------
//   // /**
//   //  * default property を保存し必要な関数・変数を準備します
//   //  * @param {Object} props React props プロパティー {@link ComponentTableCellRank.propTypes}
//   //  */
//   // constructor(props) {
//   //   super(props);
//   //   /**
//   //    * React state
//   //    * @type {{rank: number, development: boolean, rankOutput: boolean}}
//   //    */
//   //   this.state = {
//   //     rank: props.rank,
//   //     development: props.development,
//   //     rankOutput: props.rankOutput,
//   //   };
//   // }
//   // ---------------------------------------------------
//   //  METHOD
//   // ---------------------------------------------------
//   // /**
//   //  * React props 更新
//   //  * @param {Object} nextProps React props
//   //  */
//   // componentWillReceiveProps(nextProps) {
//   //   this.setState({
//   //     rank: nextProps.rank,
//   //     development: nextProps.development,
//   //     rankOutput: nextProps.rankOutput,
//   //   });
//   // }
//   /**
//    * i.ranking を出力します
//    * @return {XML} i.ranking
//    */
//   render() {
//     if (!this.props.rankOutput) {
//       // empty
//       return <i className="ranking">&nbsp;</i>;
//     }
//     return (
//       <i className="ranking">
//         {ComponentTableCellRank.development(this.props.development)}
//         <span className="num">{this.props.rank}</span><br />位
//       </i>
//     );
//   }
// }

/**
 * 「育成」文字出力する
 * @param {boolean} development 「育成」文字出力 flag
 * @returns {?XML} span.text-s
 */
const dev = (development) => {
  if (development) {
    return (
      <span className="text-s">育<br />成<br /></span>
    );
  }
  return null;
};

/**
 * 左端、指名順枠を出力します
 * @param {number} rank 順位
 * @param {boolean} development 「育成」文字が出力する or 否か?
 * @param {boolean} rankOutput 「順位」文字が出力する or 否か?
 * @returns {XML} i.ranking
 * @constructor
 */
const ComponentTableCellRank = ({ rank, development, rankOutput }) => {
  if (!rankOutput) {
    return (
      <i className="ranking">&nbsp;</i>
    );
  }
  return (
    <i className="ranking">
      {dev(development)}
      <span className="num">{rank}</span><br />位
    </i>
  );
};

/**
 * React.propTypes
 * @type {{rank: number, development: boolean, rankOutput: boolean}}
 */
ComponentTableCellRank.propTypes = {
  rank: PropTypes.number.isRequired,
  // 育成 文字が出力するかないか?
  development: PropTypes.bool.isRequired,
  // 順位 文字が出力するかないか?
  rankOutput: PropTypes.bool.isRequired,
};

export default ComponentTableCellRank;
