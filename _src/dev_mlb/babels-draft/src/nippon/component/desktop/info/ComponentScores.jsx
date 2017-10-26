/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/19 - 17:52
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// import { default as Type } from '../../util/Type';
//
// // react
// const React = self.React;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

// dae
import ScoreTexts from '../../../dae/nippon/game/ScoreTexts';
import Team from '../../../dae/nippon/Team';

/**
 * スコアプレー 改め「イニング速報」
 * @since 2016-10-21
 * */
export default class ComponentScores extends Component {
  // ---------------------------------------------------
  //  [RECT NATIVE] STATIC GETTER / SETTER
  // ---------------------------------------------------
  // /**
  //  * propTypes
  //  * @return {{
  //  *  scoreTexts: ScoreTexts,
  //  *  home: Team,
  //  *  visitor: Team}} React props
  //  */
  // static get propTypes() {
  //   return {
  //     // @type {ScoreTexts} - Response.gameInfo.scoreTexts scoreArray<ScoreTxt>
  //     scoreTexts: React.PropTypes.object.isRequired,
  //     // @type {Team} - response.home
  //     home: React.PropTypes.object.isRequired,
  //     // @type {Team} - response.visitor
  //     visitor: React.PropTypes.object.isRequired,
  //   };
  // }
  /**
   * React.propTypes
   * @type {{
   *    scoreTexts: ScoreTexts,
   *    home: Team,
   *    visitor: Team
   * }}
   */
  static propTypes = {
    // @type {ScoreTexts} - Response.gameInfo.scoreTexts scoreArray<ScoreTxt>
    scoreTexts: PropTypes.instanceOf(ScoreTexts).isRequired,
    // @type {Team} - response.home
    home: PropTypes.instanceOf(Team).isRequired,
    // @type {Team} - response.visitor
    visitor: PropTypes.instanceOf(Team).isRequired,
  };
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  // /**
  //  * イニング速報に伴い選手名ない時がある、対応します
  //  * @param {string} player 選手名, 【注意】無しの時があります
  //  * @return {?XML} span.name or null
  //  */
  // static scorePlayer(player) {
  //   if (!player) {
  //     return null;
  //   }
  //   return (
  //     <span className="name">{player}</span>
  //   );
  // }
  /**
   * イニング速報 - data が HTML になったのに対応する
   * @param {ScoreText} score イニング速報 情報
   * @returns {{__html: string}} react innerHTML 挿入 object
   * @since 2017-08-24
   */
  static scoreDetail(score) {
    // eslint-disable-next-line quotes
    let detail = '';
    const player = score.player;
    if (player) {
      detail += '<span class="name">';
      detail += player;
      detail += '</span>';
    }
    return { __html: detail + score.text };
  }
  /**
   * gameinfo.scoretext[].scoreflag が `1` の時に CSS class 'score-runs' を返します
   * @param {number} flag gameinfo.scoretext[].scoreflag
   * @return {string} 'score-runs' or ''
   */
  static scoreRuns(flag) {
    if (flag === 1) {
      return 'score-runs';
    }
    return '';
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link ComponentScores.propTypes}
   */
  constructor(props) {
    super(props);
    // /**
    //  * React state
    //  *
    //  * - @type {number} limit - イニング速報・表示可能なライン数
    //  * 3 -> 6 変更 on 2016-10-23
    //  * @type {{
    //  *  scoreTexts: ScoreTexts,
    //  *  home: Team,
    //  *  visitor: Team,
    //  *  limit: number
    //  * }}
    //  * @see https://aws-plus.backlog.jp/view/BGATE-189
    //  */
    /**
     * React state
     * - @type {number} limit - イニング速報・表示可能なライン数
     * 3 -> 6 変更 on 2016-10-23
     * @type {{limit: number}}
     * @see https://aws-plus.backlog.jp/view/BGATE-189
     */
    this.state = {
      // scoreTexts: props.scoreTexts,
      // home: props.home,
      // visitor: props.visitor,
      // 表示可能なライン数
      // limit: 3,
      // @since 2016-10-23 変更
      // @see https://aws-plus.backlog.jp/view/BGATE-189
      limit: 6,
    };
    /**
     * 一度に表示する表示ライン数
     * @type {number}
     */
    this.lines = 6;
    /**
     * bound onMore
     * @type {function}
     */
    this.onMore = this.onMore.bind(this);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  // /**
  //  * React props 変更を `state` に反映し描画更新します
  //  * @param {Object} nextProps 更新された React props
  //  */
  // componentWillReceiveProps(nextProps) {
  //   this.setState({ scoreTexts: nextProps.scoreTexts });
  // }
  /**
   * more button click event handler<br>
   * 隠れているリストを表示します
   * @param {Event} event more button click event
   */
  onMore(event) {
    event.preventDefault();
    this.setState({ limit: this.state.limit + this.lines });
  }

  /**
   * more button 描画コントロールします, this.satte.limit +3 します
   * @param {boolean} show true: 描画
   * @return {?XML} div.btn-more or null
   */
  moreButton(show) {
    if (!show) {
      return null;
    }
    return (
      <div id="btn-more" className="btn-more">
        <a href="#btn-more" onClick={this.onMore}>
          <span>もっと見る</span>
        </a>
      </div>
    );
  }
  /**
   * 非表示リストの表示コントーロールです、index が this.state.limit 以上は非表示になります
   * @param {number} index リスト行番号 0 ~
   * @return {string} CSS class `score-hide` or 無し
   */
  visible(index) {
    return index < this.state.limit ? '' : 'score-hide';
  }
  /**
   * section.scoreplay
   * @return {?XML} section.scoreplay or null
   */
  render() {
    // const scoreTexts = this.state.scoreTexts;
    // if (!scoreTexts.has) {
    //   return null;
    // }
    // const home = this.state.home;
    // const visitor = this.state.visitor;
    const { scoreTexts, home, visitor } = this.props;
    // 逆順使わず正順表示に変える
    // const scores = scoreTexts.reverse;
    /*
    今回は、NPBのウィジェット （https://baseballgate.jp/p/54827/?date=today&id=2017102002）と同じデータを使用しているため手を入れることが難しい状況です。
    配列の時系列は意識せずに、表示上は0から順に上から積み上げて表示いただくことは可能でしょうか？
    @see https://aws-plus.backlog.jp/view/BGATE-465#comment-1179680814
    */
    const scores = scoreTexts.scores;
    // out put
    return (
      <section className="scoreplay">
        <header className="flashreport-sec-header">
          <h2>イニング速報</h2>
        </header>
        <div className="scoreplay-body">
          <div className="scoreplay-table">
            {
              scores.map((score, index) => {
                // 0=ビジター、1=ホーム、2=試合開始、試合終了、試合前情報など
                // @since 2016-10-23 2が増えた
                // default を `X` にします
                let teamId = 'X';
                if (score.homevisitor === 0) {
                  teamId = visitor.info.id;
                } else if (score.homevisitor === 1) {
                  teamId = home.info.id;
                }
                // unique key
                const inning = index + 1;
                const key = `scores-${teamId}-${inning}`;
                const scoreClass = ComponentScores.scoreRuns(score.scoreflag);
                return (
                  <div
                    key={key}
                    className={`score-data team-${teamId} ${this.visible(index)} ${scoreClass}`}
                  >
                    <div className="inning">{score.inning}</div>
                    <div
                      className="inning-detail"
                      dangerouslySetInnerHTML={ComponentScores.scoreDetail(score)}
                    />
                  </div>
                );
              })
            }
          </div>
          {
            /* more */
            this.moreButton(this.state.limit < scoreTexts.scores.length)
          }
        </div>
      </section>
    );
  }
}
