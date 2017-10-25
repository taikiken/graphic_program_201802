/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/16 - 18:51
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

// app/draft
import Text from '../../../../draft/app/draft/Text';
import Classes from '../../../../draft/app/draft/Classes';
import Empty from '../../../../draft/app/draft/Empty';

// ui
import ModalManager from '../../../../draft/ui/ModalManager';

// dae
import Player from '../../../dae/lives/Player';

// // app/draft
// import { default as Text } from '../../app/draft/Text';
// import { default as Classes } from '../../app/draft/Classes';
// import { default as Empty } from '../../app/draft/Empty';
//
// // ui
// import { default as ModalManager } from '../../ui/ModalManager';
//
// // util
// import { default as Type } from '../../util/Type';

// component/flash
import ComponentTableCellRank from '../../draft/live/ComponentTableCellRank';

// react
// const React = self.React;

/**
 * mobile, ドラフト速報選手一覧
 * `p.rank-N` 出力
 */
export default class SPComponentPlayer extends Component {
  // ---------------------------------------------------
  //  [RECT NATIVE] STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   *
   * - player - 選手情報
   * - position - pitcher, catcher, ...
   * - identity - highschool, university, ...
   * - rank - 1, 2, ... 指名順
   * - development - 育成 文字が出力するかないか?
   * - rankOutput - 順位 文字が出力するかないか?
   * @return {{
   *  player: Player,
   *  position: string,
   *  identity: string,
   *  rank: number,
   *  development: boolean,
   *  rankOutput: boolean
   * }} React props
   */
  static get propTypes() {
    return {
      player: PropTypes.instanceOf(Player).isRequired,
      // position
      position: PropTypes.string.isRequired,
      // high-school / university ...
      identity: PropTypes.string.isRequired,
      // 以下 ComponentTableCellRank で使用
      // 指名順
      rank: PropTypes.number.isRequired,
      // 育成 文字が出力するかないか?
      development: PropTypes.bool.isRequired,
      // 順位 文字が出力するかないか?
      rankOutput: PropTypes.bool.isRequired,
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link SPComponentPlayer.propTypes}
   */
  constructor(props) {
    super(props);
    /**
     * bound onClick, click でモーダルを開きます
     * @type {function}
     */
    this.onClick = this.onClick.bind(this);
    /**
     * モーダル管理, ModalManager instance
     * @type {ModalManager}
     */
    this.manager = ModalManager.factory();
    // /**
    //  * React state
    //  * @type {{
    //  *  status: string,
    //  *  player: Player,
    //  *  position: string,
    //  *  identity: string,
    //  *  rank: number,
    //  *  development: boolean,
    //  *  rankOutput: boolean
    //  * }}
    //  */
    // this.state = {
    //   status: Classes.situation(props.player.nominate.situation),
    //   // player: props.player,
    //   // position: props.position,
    //   // identity: props.identity,
    //   // rank: props.rank,
    //   // development: props.development,
    //   // rankOutput: props.rankOutput,
    // };
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  // /**
  //  * React props 更新
  //  * @param {Object} nextProps React props
  //  */
  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     status: Classes.situation(nextProps.player.nominate.situation),
  //     player: nextProps.player,
  //     position: nextProps.position,
  //     identity: nextProps.identity,
  //     rank: nextProps.rank,
  //     development: nextProps.development,
  //     rankOutput: nextProps.rankOutput,
  //   });
  // }
  /**
   * a.onclick event handler, modal を開きます
   * @param {Event} event a.onclick event
   */
  onClick(event) {
    event.preventDefault();
    // console.log('obClick', props.player.id, props.position, props.identity);
    // ModalManager へクリック通知
    this.manager.prepare(this.props.player, this.props.position, this.props.identity);
  }
  /**
   * 選手情報を出力します
   * @return {XML} p.rank
   */
  render() {
    // const player = this.state.player;
    // console.log('***Player.render***', this.props.rank, player.id);

    // output
    // const position = this.state.position;
    const { player, position, rank, development, rankOutput } = this.props;
    const status = Classes.situation(player.nominate.situation);
    // 選手画像存在チェック
    const thumbnail = Type.img(player.thumbnail) ? player.thumbnail : Empty.thumbnail();
    return (
      <p className={`rank rank-${rank}`}>
        <ComponentTableCellRank
          rank={this.props.rank}
          development={development}
          rankOutput={rankOutput}
        />
        <a href={`#${player.id}`} className={`status ${status}`} onClick={this.onClick}>
          <i className={`pos pos-${position}`}>{Text.short(position)}</i>
          <span className="player-image"><img src={thumbnail} alt="" /></span>
          <span className="player-name">{player.name}</span>
          <span className="player-team">{player.team}</span>
        </a>
      </p>
    );
  }
}
