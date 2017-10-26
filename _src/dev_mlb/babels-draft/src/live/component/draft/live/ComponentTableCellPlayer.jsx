/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/13 - 22:14
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

// // util
// import { default as Type } from '../../util/Type';
//
// // react
// const React = self.React;

/**
 * 選手情報を表示します
 */
export default class ComponentTableCellPlayer extends Component {
  // ---------------------------------------------------
  //  [RECT NATIVE] STATIC GETTER / SETTER
  // ---------------------------------------------------
  // /**
  //  * propTypes
  //  * @return {{player: Player, position: string, identity: string}} React props
  //  */
  // static get propTypes() {
  //   return {
  //     player: React.PropTypes.object.isRequired,
  //     // position
  //     position: React.PropTypes.string.isRequired,
  //     // high-school / university ...
  //     identity: React.PropTypes.string.isRequired,
  //   };
  // }
  /**
   * React.propTypes
   * - player {Player}
   * - position {string}
   * - identity {string} - high-school / university ...
   * @type {{player: Player, position: string, identity: string}}
   */
  static propTypes = {
    player: PropTypes.instanceOf(Player).isRequired,
    // position
    position: PropTypes.string.isRequired,
    // high-school / university ...
    identity: PropTypes.string.isRequired,
  };
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link ComponentTableCellPlayer.propTypes}
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
    /**
     * React state
     * @type {{
     *  status: string,
     * }}
     */
    // this.state = {
    //   status: Classes.situation(props.player.nominate.situation),
    //   // player: props.player,
    //   // position: props.position,
    //   // identity: props.identity,
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
   * - 競合選手の選択結果に `class` を追加します {@link Classes}.situation
   *    - 4: status-win
   *    - 3: status-lose
   * - 選手画像存在チェック - {@link Empty}.thumbnail
   * @return {XML} span.blank or a.status
   */
  render() {
    // const player = this.state.player;
    // if (Type.nil(player) || !Type.exist(player.id)) {
    //   // blank output
    //   return (
    //     <span className="blank">&nbsp;</span>
    //   );
    // }
    // output
    // const position = this.state.position;
    const { player, position } = this.props;
    // 競合選手の選択結果に `class` を追加します
    const status = Classes.situation(player.nominate.situation);
    // 選手画像存在チェック
    const thumbnail = Type.img(player.thumbnail) ? player.thumbnail : Empty.thumbnail();
    return (
      <a href={`#${player.id}`} className={`status ${status}`} onClick={this.onClick}>
        <i className={`pos pos-${position}`}>{Text.short(position)}</i>
        <span className="player-image"><img src={thumbnail} alt="" /></span>
        <span className="player-name">{player.name}</span>
        <span className="player-team">{player.team}</span>
      </a>
    );
  }
}
