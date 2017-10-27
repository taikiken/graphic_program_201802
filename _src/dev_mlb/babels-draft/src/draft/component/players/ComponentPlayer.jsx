/**
 * @license inazumatv.com
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/08
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 * 4
 */

// react
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// moku/util
import Type from '../../../moku/util/Type';

// moku/dom
import Elements from '../../../moku/dom/Elements';


// app/draft
import Text from '../../app/draft/Text';
import Classes from '../../app/draft/Classes';
import Empty from '../../app/draft/Empty';

// app
import Env from '../../app/Env';

// ui
import PlayerElements from '../../ui/PlayerElements';
import ModalManager from '../../ui/ModalManager';

// dae
import Player from '../../dae/players/Player';

// dom
// import { default as Elements } from '../../dom/Elements';

// util
// import { default as Type } from '../../util/Type';

// react
// const React = self.React;

/**
 * 選手情報を表示します, クリックでモーダルに詳細情報を表示します
 */
export default class ComponentPlayer extends Component {
  // ---------------------------------------------------
  //  [RECT NATIVE] STATIC GETTER / SETTER
  // ---------------------------------------------------
  // /**
  //  * propTypes
  //  * @return {{
  //  *  player: Player,
  //  *  id: string,
  //  *  index: number,
  //  *  position: string,
  //  *  identity: string,
  //  * }} React props
  //  */
  // static get propTypes() {
  //   return {
  //     // @type {Player}
  //     player: React.PropTypes.object.isRequired,
  //     // unique key
  //     id: React.PropTypes.string.isRequired,
  //     // array index
  //     index: React.PropTypes.number.isRequired,
  //     // position
  //     position: React.PropTypes.string.isRequired,
  //     // high-school / university ...
  //     identity: React.PropTypes.string.isRequired,
  //   };
  // }

  /**
   * React.propTypes
   * - player - {@link Player}
   * - id @type{string} - unique key
   * - index @type{number} - array index
   * - position @type{string} - position
   * - identity @type{string} - high-school / university ...
   * @type {{player: Player, id: string, index: number, position: string, identity: string}}
   */
  static propTypes = {
    player: PropTypes.instanceOf(Player).isRequired,
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    position: PropTypes.string.isRequired,
    identity: PropTypes.string.isRequired,
  };
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * CSS style height object を作成します
   * @param {string} height 設定する height
   * @return {{}} CSS style height object, {{height: string}} or {{}}
   */
  static height(height) {
    // console.log('ComponentPlayer.height', height, Type.number(height));
    if (!Type.number(height)) {
      return {};
    }
    return { height: `${height}px` };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link ComponentPlayer.propTypes}
   */
  constructor(props) {
    super(props);
    // ---
    const player = PlayerElements.factory();
    const onLoad = this.onLoad.bind(this);
    if (!Env.sp) {
      player.on(PlayerElements.LOAD, onLoad);
    }
    /**
     * 選手コンテナを管理する PlayerElements instnace
     * @type {PlayerElements}
     */
    this.player = player;
    /**
     * bound onLoad
     * @type {function}
     */
    this.onLoad = onLoad;
    /**
     * `p.player` Element, マウント後に設定されます
     * @type {?Element}
     */
    this.element = null;
    /**
     * bound onClick, click でモーダルを表示します
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
     *  highschool: string,
     *  university: string,
     *  works: string,
     *  independent: string,
     *  height: ''
     * }}
     */
    this.state = {
      highschool: '',
      university: '',
      works: '',
      independent: '',
      height: '',
    };
    // state を props.identity を元に checked にします
    this.state[props.identity] = Classes.CHECKED;
    /**
     * マウント後に div.player を Elements instance に変換します
     * @type {?Elements}
     */
    this.elements = null;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * delegate, マウント後に `div.player` Element を `this.element` へ保存し<br>
   * PlayerElements へ Elements instance に変換し add します
   */
  componentDidMount() {
    const element = this.element;
    const elements = new Elements(element);
    this.elements = elements;
    this.player.add(elements);
  }
  /**
   * a.onclick event handelr, ModalManager.prepare をキックします
   * @param {Event} event a.onclick event
   */
  onClick(event) {
    event.preventDefault();
    const props = this.props;
    // console.log('ComponentPlayer.onClick', props.player.id, props.position, props.identity);
    // ModalManager へクリック通知
    this.manager.prepare(props.player, props.position, props.identity);
  }
  /**
   * PlayerElements.LOAD event handler, 画像読込完了後にコンテナの高さを揃えます
   * @param {Events} events PlayerElements.LOAD event
   */
  onLoad(events) {
    // console.log('ComponentPlayer.onLoad', this.props.id, events);
    this.player.off(PlayerElements.LOAD, this.onLoad);
    this.setState({ height: events.height });
  }
  /**
   * `div.player` を出力します
   * @return {XML} `div.player`
   */
  render() {
    const { id, index, player, position, identity } = this.props;
    const { height } = this.state;
    // const id = `player-${this.props.id}`;
    // const index = this.props.index;
    // // @type {Player}
    // const player = this.props.player;
    // const position = this.props.position;
    const tagId = `player-${id}`;
    // 選手画像存在チェック
    const thumbnail = Type.img(player.thumbnail) ? player.thumbnail : Empty.thumbnail();
    // console.log('ViewPlayer.render', index, position, player);
    return (
      <div id={tagId} className={`player draft-player ${position} ${identity}`}>
        <div
          className="height-target"
          ref={(component) => { this.element = component; }}
          style={ComponentPlayer.height(height)}
        >
          <a href={`#${tagId}`} onClick={this.onClick}>
            <i className={`player-pos player-pos-${index} ${position}`}>{Text.short(position)}</i>
            <figure className="player-image">
              <img src={thumbnail} alt="" />
            </figure>
            <div className="player-info">
              <p className="player-name">{player.name}</p>
              <p className="player-team">{player.team}</p>
            </div>
          </a>
        </div>
      </div>
    );
  }
}
