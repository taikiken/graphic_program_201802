/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/03 - 21:29
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

import Isotope from 'isotope-layout';

// moku/util
import Type from '../../moku/util/Type';

// dae
import PlayersDae from '../dae/PlayersDae';

// app
import Classes from '../app/draft/Classes';

// ui
import PlayerElements from '../ui/PlayerElements';

// component
import ComponentNav from './players/ComponentNav';
import ComponentFilter from './players/ComponentFilter';
import ComponentPlayer from './players/ComponentPlayer';

// async
import Creators from '../async/Creator';

// ga
import Ga from '../ga/Ga';

/**
 * ドラフト選手一覧・インターフェースも含め全出力します<br>
 * フィルタリングに `isotope` を使用します
 * @see http://isotope.metafizzy.co/
 */
export class ComponentDraftContainer extends Component {
  // ----------------------------------------
  // STATIC PROPERTY
  // ----------------------------------------
  /**
   * React.propTypes
   * - result {PlayersDae} - JSON parse data
   * @type {{result: *}}
   */
  static propTypes = {
    result: PropTypes.instanceOf(PlayersDae).isRequired,
  };
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link ComponentDraft.propTypes}
   */
  constructor(props) {
    super(props);
    // ---
    /**
     * div.players-list
     * @type {?Element}
     * */
    this.element = null;
    /**
     * bound onNav
     * @type {function}
     * */
    this.onNav = this.onNav.bind(this);
    /**
     * bound onFilter
     * @type {function}
     * */
    this.onFilter = this.onFilter.bind(this);
    /**
     * bound onLoad
     * @type {function}
     */
    this.onLoad = this.onLoad.bind(this);
    /**
     * class のためにポジションを列挙します
     * @type {[string]}
     */
    this.positions = [Classes.PITCHER];
    /**
     * 選手コンテナを管理する PlayerElements instance
     * @type {PlayerElements}
     */
    this.player = PlayerElements.factory();
    /**
     * Isotope instance, マウント後に設定されます
     * @type {?Isotope}
     */
    this.isotope = null;
    /**
     * React state
     * @type {{position: string, identity: string, hide: string}}
     */
    this.state = {
      position: Classes.PITCHER,
      identity: Classes.HIGH_SCHOOL,
      hide: 'draft-hide',
    };
    /**
     * timer id object
     * @type {{retry: number}}
     */
    this.timer = {
      retry: 0,
    };
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * マウント後に呼び出されます<br>
   * PlayerElements を初期化し各コンテナの高さを調べます
   * */
  componentDidMount() {
    const player = this.player;

    // PlayerElements.LOAD event listen
    player.on(PlayerElements.LOAD, this.onLoad);

    // player をキック
    player
      .init(this.element)
      .start();
  }
  /**
   * PlayerElements.LOAD event handler, isotope でのフィルタリングを開始します
   */
  onLoad() {
    this.player.off(PlayerElements.LOAD, this.onLoad);
    this.initIsotope();
  }
  /**
   * 所属チーム選択 event handler, 現在の選択と異なっていたら state を更新します<br>
   * 選手一覧はフィルタリングされます
   * @param {string} identity 所属チーム
   */
  onNav(identity) {
    // console.log('ComponentDraft.onNav', identity);
    if (this.state.identity !== identity) {
      this.setState({ identity });
      this.layout(identity);
    }
  }
  /**
   * ポジション選択 event handler
   * @param {string} position ポジション
   */
  onFilter(position) {
    // console.log('ComponentDraft.onNav', identity);
    if (this.state.position !== position) {
      this.setState({ position });
      this.layout(this.state.identity, position);
    }
  }
  /**
   * ポジション選択 で selected: true の処理<br>
   * 現在の選択リストに存在しなければ追加します
   * @param {number} index -1 の時に存在しない
   * @param {string} position ポジション
   */
  select(index, position) {
    if (index === -1) {
      this.positions.push(position);
    }
  }
  /**
   * ポジション選択 で selected: true の処理<br>
   * index が -1 でない時にリストから削除処理を行います
   * @param {number} index 削除する項目のリスト・インデックス
   */
  unselect(index) {
    if (index !== -1) {
      this.positions.splice(index, 1);
    }
  }
  /**
   * isotope を使用したフィルタリングを開始するための初期処理を行います
   * @see http://isotope.metafizzy.co/options.html
   */
  initIsotope() {
    this.setState({ hide: 'draft-show' });
    // @see http://isotope.metafizzy.co/options.html
    this.isotope = new Isotope(this.element, {
      itemSelector: '.draft-player',
      masonry: {
        gutter: 12,
        columnWidth: 208,
      },
      filter: this.filtering(this.state.identity),
    });
  }
  /**
   * isotope フィルタリングに必要な形式の文字列を作成します
   * @param {string} identity 所属チーム
   * @param {string} position ポジション
   * @return {string} isotope フィルタリングに必要な形式の文字列を返します
   * @since 2016-10-15 一つの組み合わせだけに変更
   */
  filtering(identity, position = this.state.position) {
    return `.${identity}.${position}`;
  }
  /**
   * isotope フィルタリングを行います
   * @param {string} identity 所属チーム
   * @param {string} position ポジション
   * @see http://isotope.metafizzy.co/methods.html#arrange-isotope
   * @since 2016-10-15 一つの組み合わせだけに変更
   */
  layout(identity, position = this.state.position) {
    if (Type.nil(this.isotope)) {
      return;
    }
    // @see http://isotope.metafizzy.co/methods.html#arrange-isotope
    this.isotope.arrange({ filter: this.filtering(identity, position) });
  }
  //
  // /**
  //  * ajax error 発生時の対応します
  //  * - 2 回まで retry します
  //  * - 3 回目
  //  *   - {@link Ga} 送信します
  //  *   - confirm を出し ok -> reload します
  //  * @param {Error} error ajax error
  //  */
  // errorHappened(error) {
  //   const { count } = this.props;
  //   clearTimeout(this.timer.retry);
  //   if (count <= 2) {
  //     console.warn('[DRAFT:PLAYER] ajax error - retry after 5s', count, error);
  //     this.timer.retry = setTimeout(() => {
  //       Creators.players();
  //     }, 1000 * 5);
  //     return;
  //   }
  //   // ---
  //   // ga
  //   Ga.add(
  //     {
  //       hitType: 'event',
  //       eventCategory: 'error',
  //       eventAction: 'draft',
  //       eventLabel: error.toString(),
  //       eventValue: 0,
  //       nonInteraction: true,
  //     },
  //   );
  //   // reload
  //   // eslint-disable-next-line no-alert
  //   if (confirm('データの読み込みエラーです。再読込を行います')) {
  //     location.reload();
  //   }
  // }

  /**
   * div.players-component を出力します
   * @return {?XML} 選手一覧 `div.players-component` を返します
   */
  render() {
    const { result } = this.props;
    const response = result.response;
    // console.log('ComponentDraftContainer.render response', response);
    // render
    return (
      <div className={`players-component ${this.state.identity} ${this.state.position}`}>
        <ComponentNav
          behavior={this.onNav}
          checked={Classes.HIGH_SCHOOL}
        />
        <ComponentFilter
          behavior={this.onFilter}
          checked={Classes.PITCHER}
        />
        <div
          className={`players-list ${this.state.hide}`}
          ref={(component) => { this.element = component; }}
        >
          {
            /**
             * @type {Player} player - 選手情報
             * @type {number} index - sequence
             */
            response.all.map((player, index) => {
              const key = `players-${player.identity}-${player.position}-${player.id}`;
              return (
                <ComponentPlayer
                  player={player}
                  index={index}
                  key={key}
                  id={player.id}
                  position={player.position}
                  identity={player.identity}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}

// ----------------------------------------
/**
 * {@link ComponentDraft}
 * error timer
 * @type {{retry: number}}
 */
const timer = {
  retry: 0,
};

/**
 * ajax error 時に retry します
 * @param {Error} error ajax Error
 * @param {number} count retry count
 */
const retry = (error, count) => {
  clearTimeout(timer.retry);
  if (count <= 2) {
    console.warn('[DRAFT:PLAYER] ajax error - retry after 5s', count, error);
    timer.retry = setTimeout(() => {
      Creators.players();
    }, 1000 * 5);
    return;
  }
  // ---
  // ga
  Ga.add(
    {
      hitType: 'event',
      eventCategory: 'error',
      eventAction: 'draft',
      eventLabel: error.toString(),
      eventValue: 0,
      nonInteraction: true,
    },
  );
  // reload
  // eslint-disable-next-line no-alert
  if (confirm('データの読み込みエラーです。再読込を行います')) {
    location.reload();
  }
};

/**
 * - {@link ComponentDraftContainer} - ドラフト選手一覧
 *   - {@link ComponentNav}
 *   - {@link ComponentFilter}
 *   - {@link ComponentPlayer}
 * @param {?PlayersDae} result JSON
 * @param {?Error} error ajax Error
 * @param {number} count ajax retry counter
 * @return {?XML} ドラフト選手一覧
 * @constructor
 */
const ComponentDraft = ({ result, error, count }) => {
  if (!result && !error) {
    return null;
  }
  if (error) {
    retry(error, count);
    return null;
  }
  return (
    <ComponentDraftContainer
      result={result}
    />
  );
};

/**
 * React.propTypes
 * @type {{result: PlayersDae, error: Error, count: number}}
 */
ComponentDraft.propTypes = {
  result: PropTypes.instanceOf(PlayersDae),
  error: PropTypes.instanceOf(Error),
  count: PropTypes.number.isRequired,
};

/**
 * React.defaultProps
 * @type {{result: null, error: null}}
 */
ComponentDraft.defaultProps = {
  result: null,
  error: null,
};

export default ComponentDraft;
