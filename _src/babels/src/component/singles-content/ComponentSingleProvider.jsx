/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/11/05 - 21:21
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// ga
import { Ga } from '../../ga/Ga';

// React
/**
 * [library] - React
 */
const React = self.React;

/**
 * 記事提供元情報とリンク
 *
 * 次の記事一覧コンテンツを全て `JS` 出力するので<br>
 * `/app/template/[desktop|mobile]/p.php` から移植しました
 * @since 2016-11-05
 */
export default class ComponentSingleProvider extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{single: SingleDae, index: number}} React props
   */
  static get propTypes() {
    return {
      single: React.PropTypes.object.isRequired,
      index: React.PropTypes.number.isRequired
    };
  }
  /**
   * p.provider-name
   * @param {string} userName 記事提供元名称
   * @return {?XML} p.provider-name or null
   */
  static userName(userName) {
    // 提供元名称がないときは出力しない
    if (!userName) {
      return null;
    }
    // 提供元名称
    return (
      <p className="provider-name">{userName}</p>
    );
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link ComponentSingleProvider.propTypes}
   */
  constructor(props) {
    super(props);
    /**
     * React state
     * @type {{single: SingleDae, index: number}}
     */
    this.state = {
      single: props.single,
      index: props.index
    };
    /**
     * bound logoClick
     * @type {function}
     */
    this.boundLogo = this.logoClick.bind(this);
    /**
     * bound urlClick
     * @type {function}
     */
    this.boundUrl = this.urlClick.bind(this);
  }
  /**
   * 記事提供元ロゴクリック event handler, ga 送信
   */
  logoClick() {
    const link = this.state.single.user.logo.link;
    Ga.click('provider-logo', 'provider_link', 'click', link, true);
  }
  /**
   * 記事提供元名称下「ウェブサイト」クリック event handler, ga 送信
   */
  urlClick() {
    const link = this.state.single.user.logo.link;
    Ga.click('provider-url', 'provider_link', 'click', link, true);
  }
  /**
   * 記事提供元ロゴ表示
   * @param {LogoDae} logo 記事提供元情報
   * @return {?XML} 画像がある時のみタグを返します
   */
  logo(logo) {
    const img = logo.img;
    // ロゴがなかったら表示しない
    if (!img) {
      return null;
    }
    const link = logo.link;
    if (!link) {
      // リンク(url)がなかったらロゴだけ表示
      return (
        <i className="provider-logo">
          <img src={img} alt=""/>
        </i>
      );
    }
    // リンク付き出力
    // クリックで ga 送信するので `onClick` を仕込みます
    return (
      <a href={link} target="_blank" onClick={this.boundLogo}>
        <i className="provider-logo">
          <img src={img} alt=""/>
        </i>
      </a>
    );
  }
  /**
   * 記事提供元名称下リンク
   * @param {LogoDae} logo 記事提供元情報
   * @return {?XML} url 情報がある時のみタグを返します
   */
  url(logo) {
    const link = logo.link;
    // リンク(url)がないと出力しない
    if (!link) {
      return null;
    }
    // リンク(url)が存在するときは「ウェブサイト」にリンクを設定します
    // クリックで ga 送信するので `onClick` を仕込みます
    return (
      <p className="provider-url">
        <a href={link} target="_blank" onClick={this.boundUrl}>ウェブサイト</a>
      </p>
    );
  }
  /**
   * 記事提供元情報, div.provider
   * @return {?XML} div.provider or null
   */
  render() {
    const single = this.state.single;
    // @type {UserDae} - 記事オーナー情報
    const user = single.user;
    // @type {string}
    const userName = user.userName;
    // @type {LogoDae}
    const logo = user.logo;
    // 提供元名称とロゴがなかったら表示しない
    if (!userName && !logo.img) {
      return null;
    }
    // 提供元名称とロゴのどちらかは存在する
    // さらに出力関数で判定を行います
    return (
      <div className={`provider provider-${single.id}`}>
        {this.logo(logo)}
        <div className="provider-data">
          {ComponentSingleProvider.userName(userName)}
          {this.url(logo)}
        </div>
      </div>
    );
  }
}
