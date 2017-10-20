
// react
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// TweenMax
import { TweenLite, Linear } from 'gsap';

// app/draft
import Text from '../../app/draft/Text';
import Empty from '../../app/draft/Empty';
import Env from '../../app/Env';

// moku/util
import Type from '../../../moku/util/Type';

// // util
// import { default as Type } from '../../util/Type';

// ui
import ModalManager from '../../ui/ModalManager';

// dae
import Player from '../../dae/players/Player';
import UrlsDae, { UrlDae } from '../../dae/players/UrlsDae';

// // react
// const React = self.React;

// // TweenLite
// const TweenLite = self.TweenLite;
// const easing = self.com.greensock.easing;

/**
 * 選手記事リンク - 複数件
 * @param {UrlsDae} urls JSON.urls 選手記事リンク
 * @returns {XML} ul.player-link-detail
 * @constructor
 */
const UrlSeveral = ({ urls }) => (
  <ul className="player-link-detail">
    {
      urls.list.map((url, index) => (
        <li key={`link-${url.id}-${url.index}`}>
          <a href={url.url} target="_blank">
            選手詳細記事&nbsp;{index + 1}
          </a>
        </li>
      ))
    }
  </ul>
);

/**
 * React.propTypes
 * @type {{urls: UrlsDae}}
 */
UrlSeveral.propTypes = {
  urls: PropTypes.instanceOf(UrlsDae).isRequired,
};

/**
 * 選手記事リンク - 1件
 * @param {UrlDae} url JSON.urls[0] 1 data
 * @returns {XML} ul.player-link-detail
 * @constructor
 */
const UrlOne = ({ url }) => (
  <ul className="player-link-detail">
    <li>
      <a href={url.url} target="_blank">選手詳細記事へ</a>
    </li>
  </ul>
);

/**
 * React.propTypes
 * @type {{url: UrlDae}}
 */
UrlOne.propTypes = {
  url: PropTypes.instanceOf(UrlDae).isRequired,
};

/**
 * 選手記事リンク・コンテナを出力します
 * - 0: null
 * - 1: {@link UrlOne}
 * - > 1: {@link UrlSeveral}
 * @param {UrlsDae} urls JSON.urls 選手記事リンク
 * @returns {?XML} 選手記事リンク・コンテナ
 * @constructor
 */
const ComponentUrls = ({ urls }) => {
  const length = urls.length;
  switch (length) {
    case 1: {
      const url = urls.list[0];
      if (url.has) {
        return (
          <UrlOne
            url={url}
          />
        );
      }
      return null;
    }
    case 0: {
      return null;
    }
    default: {
      return (
        <UrlSeveral
          urls={urls}
        />
      );
    }
  }
};

/**
 * React.propTypes
 * @type {{urls: UrlsDae}}
 */
ComponentUrls.propTypes = {
  urls: PropTypes.instanceOf(UrlsDae).isRequired,
};

/**
 * <p>モーダルコンテナを管理します<br>
 * `ModalManager.PREPARE_OPEN` event を監視しイベントが発火すると<br>
 * `Events` instance の `player`, `position`, `identity` を使用し表示を更新します<br>
 * マウント後 Fadein animation で登場します</p>
 * {@link ModalManager}
 * {@link Events}
 */
export default class ComponentModal extends Component {
  // ---------------------------------------------------
  //  [RECT NATIVE] STATIC GETTER / SETTER
  // ---------------------------------------------------
  // /**
  //  * propTypes
  //  * @return {{player: ?Player}} React props
  //  */
  // static get propTypes() {
  //   return {
  //     // @type {Player}
  //     player: React.PropTypes.object,
  //   };
  // }
  // /**
  //  * defaultProps
  //  * @return {{player: null}} React props
  //  */
  // static get defaultProps() {
  //   return {
  //     player: null,
  //   };
  // }
  /**
   * React.propTypes
   * @type {{player: ?Player}}
   */
  static propTypes = {
    player: PropTypes.instanceOf(Player),
  };
  /**
   * React.defaultProps
   * @type {{player: ?Player}}
   */
  static defaultProps = {
    player: null,
  };
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * figure tag を出力します
   * @param {string} thumbnail thumbnail path
   * @return {XML} figure tag を返します
   */
  static figure(thumbnail) {
    return (
      <figure className="player-image">
        <img src={thumbnail} alt="" />
      </figure>
    );
  }
  /**
   * figure tag を出力します, PC / SP で出力場所が違うので関数で振り分けます
   * @param {string} thumbnail thumbnail path
   * @return {?XML} figure tag を返します
   */
  static figureDesktop(thumbnail) {
    if (Env.sp) {
      return null;
    }
    return ComponentModal.figure(thumbnail);
  }
  /**
   * figure tag を出力します, PC / SP で出力場所が違うので関数で振り分けます
   * @param {string} thumbnail thumbnail path
   * @return {?XML} figure tag を返します
   */
  static figureMobile(thumbnail) {
    if (!Env.sp) {
      return null;
    }
    return ComponentModal.figure(thumbnail);
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link ComponentModal.propTypes}
   */
  constructor(props) {
    super(props);
    /**
     * React state
     * - {?Player} player - 選手データ
     * - {{opacity: number}} overlay - div.overlay style, fade に使用します
     * - {{opacity: number}} information - div.players-info style, fade に使用します
     * - {string} position - ポジション
     * - {string} identity - 所属
     * - {string} activate - モーダル状態を設定する CSS class name
     * @type {{
     *  player: ?Player,
     *  overlay: {opacity: number},
     *  information: {opacity: number},
     *  position: string,
     *  identity: string,
     *  activate: string
     * }}
     */
    this.state = {
      player: props.player,
      overlay: { opacity: 0 },
      information: { opacity: 0 },
      position: '',
      identity: '',
      activate: '',
    };

    const manager = ModalManager.factory();
    /**
     * event を通知・監視する管理クラス インスタンス
     * @type {ModalManager}
     */
    this.manager = manager;
    /**
     * bound onClose
     * @type {function}
     */
    this.onClose = this.onClose.bind(this);
    /**
     * fade animation 中フラッグ
     * @type {boolean}
     */
    this.motioning = false;

    /**
     * div.player-modal
     * @type {?Element}
     */
    this.modal = null;

    manager.on(ModalManager.PREPARE_OPEN, this.onPrepare.bind(this));
    // console.log('*********** ComponentModal ***********');
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  // /**
  //  * delegate, マウント後 Fadein を開始します
  //  */
  // componentDidMount() {
  //   console.log('************* ComponentModal.componentDidMount');
  //   this.open();
  // }
  /**
   * ModalManager.PREPARE_OPEN event handler<br>
   * Events instance の `player`, `position`, `identity` を使用し表示を更新します
   * @param {Events} events ModalManager.PREPARE_OPEN Events instance
   */
  onPrepare(events) {
    // console.log('ComponentModal.onPrepare', events);
    this.setState({
      player: events.player,
      position: events.position,
      identity: events.identity,
      activate: 'activate',
    });
    // componentDidMount は 1回だけなので render 前に始めます
    // open 関数側で element の存在チェックを行います
    this.open();
  }
  /**
   * 背景・ボタンクリックで反応しモーダルを閉じます
   * @param {Event} event click Event
   */
  onClose(event) {
    event.preventDefault();
    this.close();
  }
  /**
   * Fadein を開始します
   *
   * - motioning flag を true
   * - ModalManager.beforeOpen をキック
   * - 完了後 motioning flag を false
   */
  open() {
    // console.log('ComponentModal.open', this.motioning, this.modal);
    if (this.motioning) {
      return;
    }
    // element の存在チェックを行います
    if (Type.nil(this.modal)) {
      setTimeout(() => { this.open(); }, 25);
      return;
    }
    // flag on
    this.motioning = true;
    // TweenLite target
    const information = { opacity: 0 };
    const overlay = { opacity: 0 };
    // event fire
    this.manager.beforeOpen();

    // fadein start
    //
    // information
    TweenLite.to(
      information,
      0.32,
      {
        delay: 0.32,
        opacity: 1,
        easing: Linear.easeNone,
        onUpdate: () => {
          this.setState({
            information: { opacity: information.opacity },
          });
        },
        onComplete: () => {
          this.setState({
            information: { opacity: 1 },
          });
        },
      },
    );
    // overlay
    TweenLite.to(
      overlay,
      0.64,
      {
        opacity: 1,
        easing: Linear.easeNone,
        onUpdate: () => {
          this.setState({
            overlay: { opacity: overlay.opacity },
          });
        },
        onComplete: () => {
          this.setState({
            overlay: { opacity: 1 },
          });
          // flag を off に戻します
          this.motioning = false;
        },
      },
    );
  }

  /**
   * Fadeout 開始します
   *
   * - motioning flag を true
   * - 完了後 motioning flag を false
   * - 完了後 ModalManger.closed キック
   */
  close() {
    if (this.motioning) {
      return;
    }
    // flag on
    this.motioning = true;
    // TweenLite target
    const information = { opacity: 1 };
    const overlay = { opacity: 1 };
    // fadeout start
    //
    // information
    TweenLite.to(
      information,
      0.32,
      {
        opacity: 0,
        easing: Linear.easeNone,
        onUpdate: () => {
          this.setState({
            information: { opacity: information.opacity },
          });
        },
        onComplete: () => {
          this.setState({
            information: { opacity: 0 },
            activate: '',
          });
        },
      },
    );
    // overlay
    TweenLite.to(
      overlay,
      0.32,
      {
        delay: 0.2,
        opacity: 0,
        easing: Linear.easeNone,
        onUpdate: () => {
          this.setState({
            overlay: { opacity: overlay.opacity },
          });
        },
        onComplete: () => {
          this.setState({
            overlay: { opacity: overlay.opacity },
            activate: '',
            player: null,
          });
          // motion flag off
          this.motioning = false;
          // element property null へ
          this.modal = null;
          // event fire
          this.manager.closed();
        },
      },
    );
  }
  /**
   * `div.player-modal` を作成します
   * @return {?XML} `div.player-modal` or null
   */
  render() {
    // const player = this.state.player;
    const { player } = this.state;
    // player データが null の時は処理しない
    if (Type.nil(player) || !Type.exist(player)) {
      return null;
    }

    // 選手画像存在チェック
    const thumbnail = Type.img(player.img) ? player.img : Empty.thumbnail();
    // rendering
    return (
      <div
        className={`player-modal ${this.state.activate}`}
        ref={(component) => { this.modal = component; }}
      >
        {/* overlay */}
        <div
          className="overlay"
          style={this.state.overlay}
          onClick={this.onClose}
          role="presentation"
        >
          &nbsp;
        </div>
        {/* players-info */}
        <div className="players-info" style={this.state.overlay}>
          <div
            className="players-info-inner"
            onClick={this.onClose}
            role="presentation"
          >
            <div
              className="players-info-inner2"
              onClick={event => (event.stopPropagation())}
              role="presentation"
            >
              {/* close button */}
              <i
                className="btn-close"
                onClick={this.onClose}
                role="presentation"
              >
                &nbsp;
              </i>
              {/* header > h2 */}
              <header className="players-info-header">
                {
                  /* mobile thumbnail */
                  ComponentModal.figureMobile(thumbnail)
                }
                <h2>
                  <span className={`player-pos ${this.state.position}`}>
                    {Text.long(this.state.position)}
                  </span>
                  <span className="player-name">
                    {player.name}
                  </span>
                  <span className={`player-category player-${this.state.identity}`}>
                    【{Text.identity(this.state.identity)}】
                  </span>
                </h2>
              </header>
              {/* information */}
              <div className="players-info-body">
                <div className="row">
                  {
                    /* desktop thumbnail */
                    ComponentModal.figureDesktop(thumbnail)
                  }
                  {/* detail */}
                  <div className="players-info-detail">
                    <dl>
                      <dt>・所属</dt>
                      <dd className="player-career">{player.team}</dd>
                    </dl>
                    <dl>
                      <dt>・年齢</dt>
                      <dd className="player-age">{player.age}</dd>
                    </dl>
                    <dl>
                      <dt>・身長</dt>
                      <dd className="player-height">{player.height}</dd>
                    </dl>
                    <dl>
                      <dt>・体重</dt>
                      <dd className="player-weight">{player.weight}</dd>
                    </dl>
                    <dl>
                      <dt>・投打</dt>
                      <dd className="player-handed">{player.pitchingAndBatting}</dd>
                    </dl>
                    <dl>
                      <dt>・経歴</dt>
                      <dd className="player-profile">{player.profile}</dd>
                    </dl>
                  </div>
                </div>
                <p className="player-comment">{player.comment}</p>
                <ComponentUrls
                  urls={player.urls}
                />
              </div>{/* players-info-body */}
            </div>{/* players-info-inner2 */}
          </div>{/* players-info-inner */}
        </div>
      </div>
    );
  }// render
}
