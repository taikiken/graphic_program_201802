/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/28 - 22:07
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// // react
// import React from 'react';
// import PropTypes from 'prop-types';
//
// // dae
// import DaeInnings from '../../../dae/games/DaeInnings';
//
// // util
// import Print from '../../../util/Print';
//
// const inningsBody = () => {};
//
// const inningsHead = () => {};
//
// const inningEvents = (events) => {
//   // home -> visitor
//   // 3out -> 0out
//   const home = events.home;
//   const visitor = events.visitor;
//   let pitcher = '';
//   // home
//   // render
//   return (
//     <div className="mlb_live__inning__container mlb_live__inning--home">
//       <h2 className="mlb_live__inning__heading">
//         {Print.str(home.title)}
//       </h2>
//       <table className="mlb_live__inning">
//         {
//           home.events.oppoite.map((event) => {
//             if (event.pitcher !== pitcher) {
//               pitcher = event.pitcher;
//               return inningsHead();
//             }
//             return null;
//           })
//         }
//       </table>
//     </div>
//   );
// };
//
// const ComInning = ({ innings }) => {
//   const events = innings.opposite;
//   // render
//   return (
//     <div className="mlb_live__inning__section">
//       {
//         events.map(inning => (inningEvents(innings.board[inning])))
//       }
//     </div>
//   );
// };
//
// ComInning.propTypes = {
//   innings: PropTypes.instanceOf(DaeInnings).isRequired,
// };
