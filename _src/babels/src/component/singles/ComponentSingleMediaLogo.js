/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/25 - 23:14
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import { Message } from '../../app/const/Message';

// view
import { View } from '../../view/View';

// ga
import { Ga } from '../../ga/Ga';

// React
const React = self.React;

/**
 * 媒体ロゴ
 * @since 2016-09-25
 */
export class ComponentSingleMediaLogo extends React.Component {
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link ComponentSingleMediaLogo.propTypes}
   */
  constructor(props) {
    super(props);

    this.state = {
      single: props.single
    };

    this.boundLink = this.clickLink.bind(this);
    this.boundUrl = this.clickUrl.bind(this);
  }

  /**
   * `div,provider` コンテナを出力します
   * @return {?XML} `div,provider` コンテナを返します、表示すべきものが無い時は null を返します
   */
  render() {
    // @type {SingleDae}
    const single = this.state.single;
    // @type {UserDae}
    const user = single.user;
    // @type {LogoDae}
    const logo = user.logo;

    // ---------------
    // logo information
    // @type {string} - 媒体ロゴ画像URL
    const img = logo.img;
    // @type {string} - 媒体ロゴリンク先
    const link = logo.link;

    // ---------------
    // user information
    const name = user.name;

    // ユーザー名称・リンク・ロゴ画像、全て無い時は出力しない
    if (!name && !img && !link) {
      return null;
    }

    return (
      <div className="provider mt30">
        {this.logo(img, link)}
        {this.provider(name, link)}
      </div>
    );
  }
  /**
   * delegate, mount 後に呼び出され `View.DID_MOUNT` を発火します
   */
  componentDidMount() {
    this.props.callback(View.DID_MOUNT);
  }
  /**
   * 記事詳細 媒体ロゴ を更新します
   * @param {SingleDae} single 記事詳細 JSON data
   */
  updateSingle(single) {
    this.setState({ single });
  }
  /**
   * ロゴ画像 or ロゴ画像 + リンクを出力します
   * @param {string} img 媒体ロゴ画像URL
   * @param {string} link 媒体ロゴリンク先
   * @return {?XML} ロゴ画像 or ロゴ画像 + リンク or null を返します
   */
  logo(img, link) {
    // 画像が無い時は null
    if (!img) {
      return null;
    }

    // link が無い時は img だけ
    if (!link) {
      return (
        <i className="provider-logo">
          <img src={img} alt=""/>
        </i>
      );
    }

    // link + img
    return (
      <a href={link} onClick={this.boundLink} target="_blank">
        <i className="provider-logo">
          <img src={img} alt=""/>
        </i>
      </a>
    );
  }
  /**
   * `div.provider-data` ユーザー名称 or ユーザー名称 + リンクを出力します
   * @param {string} name ユーザー名称
   * @param {string} link 媒体ロゴリンク先
   * @return {?XML} ユーザー名称 or ユーザー名称 + リンク or null を返します
   */
  provider(name, link) {
    if (!name && !link) {
      return null;
    }

    return (
      <div className="provider-data">
        {ComponentSingleMediaLogo.providerLink(name)}
        {this.providerUrl(link)}
      </div>
    );
  }
  /**
   * `p.provider-url` ユーザー名称 + リンク
   * @param {string} link 媒体ロゴリンク先
   * @return {?XML} ユーザー名称 + リンク or null を返します
   */
  providerUrl(link) {
    if (!link) {
      return null;
    }
    
    return (
      <p className="provider-url">
        <a href={link} target="_blank" onClick={this.boundUrl}>{Message.WEBSITE}</a>
      </p>
    );
  }
  /**
   * .provider-logo > a click handler, Ga 送信します
   * @param {Event} event .provider-logo > a click event
   */
  clickLink(event) {
    event.preventDefault();
    Ga.click('provider-logo', 'provider_link', 'click', this.state.single.user.logo.link, true);
  }
  /**
   * .provider-url > a click handler, Ga 送信します
   * @param {Event} event .provider-url > a click event
   */
  clickUrl(event) {
    event.preventDefault();
    Ga.click('provider-url', 'provider_link', 'click', this.state.single.user.logo.link, true);
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{single: SingleDae, callback: Function}} React props
   */
  static get propTypes() {
    return {
      single: React.PropTypes.object.isRequired,
      callback: React.PropTypes.func.isRequired
    };
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * `p.provider-name` を出力します
   * @param {string} name ユーザー名称
   * @return {?XML} `p.provider-name` or null を返します
   */
  static providerLink(name) {
    if (!name) {
      return null;
    }

    return (
      <p className="provider-name">{name}</p>
    );
  }
}
