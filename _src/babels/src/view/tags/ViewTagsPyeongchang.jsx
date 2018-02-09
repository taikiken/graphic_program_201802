/**
 * Copyright (c) 2011-2018 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2018/01/09 - 22:22
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import View from '../View';
import Tags from '../../action/tag/Tags';
import { Message } from '../../app/const/Message';

// React
/* eslint-disable no-unused-vars */
/**
 * [library] - React
 */
const React = self.React;
/* eslint-enable no-unused-vars */
/**
 * [library] - ReactDOM
 */
const ReactDOM = self.ReactDOM;

/**
 * tag api json parse します
 * @since 2018-01-10
 */
export class TagsDae {
  /**
   * `/api/v1/articles/tag/?t10=` data をパースします
   * @param {*} article JSON data
   */
  constructor(article) {
    const origin = article || {};
    /**
     * original data
     * @type {*}
     */
    this.origin = origin;
    /**
     * JSON - `articles.title`
     * @type {string}
     */
    this.title = origin.title || '';
    /**
     * JSON - `articles.img`
     * @type {string}
     */
    this.img = origin.img || '';
    /**
     * JSON - `articles.url`
     * @type {string}
     */
    this.url = origin.url || '';
  }
}

/**
 * 平昌 - widget li tag を出力します
 * @param {TagsDae} article 記事 JSON data
 * @returns {?XML} `li.widget-item`
 * @since 2018-01-10
 */
export const PyeongchangArticleComponent = ({ article }) => {
  if (!article || !article.url || !article.img || !article.title) {
    return null;
  }
  return (
    <li className="widget-item">
      <a href={article.url}>
        <figure className="widget-item-figure">
          <img src={article.img} alt={article.title} />
        </figure>
        <h3 className="widget-item-title">
          {article.title}
        </h3>
      </a>
    </li>
  );
};

/**
 * React.propTypes
 * @type {{article: TagsDae}}
 * @since 2018-01-10
 */
PyeongchangArticleComponent.propTypes = {
  article: React.PropTypes.instanceOf(TagsDae).isRequired,
};

/**
 * 平昌 - widget title 日付を出力します
 * @param {string} date 出力日付 `20180210`
 * @returns {?XML} `header.gallery__header`
 */
export const PyeongchangHeaderDateComponent = ({ date }) => {
  if (!date || !date.length || date.length !== 8) {
    return null;
  }
  // 20180214
  return (
    <header className="gallery__header">
      <h2 className="gallery__heading">
        {
          `${date.substr(0, 4)}.${date.substr(4, 2)}.${date.substr(6, 2)}`
        }
      </h2>
    </header>
  );
};

/**
 * React.propTypes
 * @type {{date: string}}
 */
PyeongchangHeaderDateComponent.propTypes = {
  date: React.PropTypes.string.isRequired,
};

/**
 * 平昌 - widget 一覧を出力します
 * @param {Array.<TagsDae>} list 出力リスト
 * @param {string} type 出力 type `highlight` or `photo`
 * @param {string} date 出力対象日
 * @returns {?XML} `div.gallery--highlight|photo`
 */
export const PyeongchangWidgetComponent = ({ list, type, date}) => {
  if (!Array.isArray(list) || !list.length) {
    return null;
  }
  const className = type === 'highlight' ? 'video' : 'photo';
  return (
    <div className={`gallery--${type}`}>
      <PyeongchangHeaderDateComponent
        date={date}
      />
      <div className="Widget_articles_tag">
        <ul className={`thumbs_list ${className}`}>
          {
            list.map((article, index) => {
              const count = index + 1;
              return (
                <PyeongchangArticleComponent
                  key={`widget-${type}-${date}-${count}`}
                  article={article}
                />
              );
            })
          }
        </ul>
      </div>
    </div>
  );
};

/**
 * React.popTypes
 * @type {{list: Array.<TagsDae>, type: string, date: string}}
 */
PyeongchangWidgetComponent.propTypes = {
  list: React.PropTypes.arrayOf(
    React.PropTypes.instanceOf(TagsDae).isRequired,
  ).isRequired,
  type: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
};

/**
 * 平昌 - JSON 取得し widget 一覧を表示します
 * - ref: UNDO_SPBL-296 【ウェブ】平昌オリンピック対応 - 記事連携(ウィジェット)
 * @see https://aws-plus.backlog.jp/view/UNDO_SPBL-296
 */
export default class ViewTagsPyeongchang extends View {
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * HIGHLIGHT - type
   * @returns {string} `highlight`
   */
  static get HIGHLIGHT() {
    return 'highlight';
  }
  /**
   * PHOTO - type
   * @returns {string} `photo`
   */
  static get PHOTO() {
    return 'photo';
  }
  /**
   * 出力年月日リスト
   * @returns {Array.<string>} 20180209 ~ 20180229
   */
  static get history() {
    return [
      20180209,
      20180210,
      20180211,
      20180212,
      20180213,
      20180214,
      20180215,
      20180216,
      20180217,
      20180218,
      20180219,
      20180220,
      20180221,
      20180222,
      20180223,
      20180224,
      20180225,
      20180226,
      20180227,
      20180228,
      20180229,
    ];
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * 動画ハイライトを出力準備します
   * - widget を insert する dom を作成します
   * - {@link Tags} action を使用して Api をたたきます
   * - tag `平昌五輪2018ハイライト`
   * - date を指定します
   */
  static highlight() {
    const highlight = document.getElementById('js-pyeongchang-highlight-container');
    if (!highlight) {
      return;
    }
    const history = ViewTagsPyeongchang.history;
    history.reverse().map((date) => {
      const div = document.createElement('div');
      div.className = `widget-pyeongchang-highlight widget-pyeongchang-highlight-${date}`;
      highlight.appendChild(div);
      const widget = new ViewTagsPyeongchang(div, '平昌五輪2018ハイライト', date, 'highlight');
      widget.start();
    });
  }
  // static photo() {
  //
  // }
  /**
   * 平昌 - 出力開始します, 外部から kick します
   */
  static init() {
    ViewTagsPyeongchang.highlight();
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * 平昌 - widget 出力します
   * @param {Element} element 出力 element
   * @param {string} tag request tag
   * @param {number|string} [date=''] 絞込み日付
   * @param {string} [type=ViewTagsPyeongchang.HIGHLIGHT] widget type
   */
  constructor(element, tag, date = '', type = ViewTagsPyeongchang.HIGHLIGHT) {
    super(element);
    /**
     * request tag
     * @type {string}
     */
    this.tag = tag;
    /**
     * 絞込み日付
     * @type {string}
     */
    this.date = `${date}`;
    /**
     * widget type
     * @type {string}
     */
    this.type = type;
    /**
     * Api request action
     * @type {Tags}
     */
    this.action = new Tags(tag, date, this.done.bind(this), this.fail.bind(this));
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * Ajax request を開始します
   */
  start() {
    this.action.next();
  }
  /**
   * Ajax success handler
   * @param {Result} result success data
   */
  done(result) {
    // console.log('ViewTagsPyeongchang.done', result);
    const articles = result.articles;
    if (!Array.isArray(articles)) {
      const error = new Error(Message.undef('[ViewTagsPyeongchang:UNDEFINED]'));
      this.executeSafely(View.UNDEFINED_ERROR, error);
      this.fail(error);
    } else if (!articles.length) {
      const error = new Error(Message.empty('[ViewTagsPyeongchang:EMPTY]'));
      this.executeSafely(View.EMPTY_ERROR, error);
      this.fail(error);
    } else {
      this.render(articles);
    }
  }

  /**
   * Ajax error handler
   * @param {Error} error Ajax error
   */
  fail(error) {
    console.warn('ViewTagsPyeongchang.fail', error, this);
  }
  /**
   * Ajax data を使用し widget を出力します
   * - {@link TagsDae} - converter
   * - {@link PyeongchangWidgetComponent} - component
   * @param {Array.<*>} articles Ajax JSON `response.articles`
   */
  render(articles) {
    const list = articles.map((article) => (new TagsDae(article)));
    ReactDOM.render(
      <PyeongchangWidgetComponent
        list={list}
        type={this.type}
        date={this.date}
      />,
      this.element,
    );
  }
}
