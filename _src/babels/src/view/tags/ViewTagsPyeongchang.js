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

export const PyeongchangArticleComponent = ({ article }) => {
  if (!article || !article.url || !article.img) {
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
            list.map((article) => (
              <PyeongchangComponent
                article={article}
              />
            ))
          }
        </ul>
      </div>
    </div>
  );
};

export class TagsDae {
  constructor(article) {
    const origin = article || {};
    this.origin = origin;
    this.title = origin.title || '';
    this.img = origin.img || '';
    this.url = origin.url || '';
  }
}

export default class ViewTagsPyeongchang extends View {
  static get HIGHLIGHT() {
    return 'highlight';
  }
  static get PHOTO() {
    return 'photo';
  }
  static get hisotry() {
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
  static highlight() {
    const highlight = document.getElementById('js-pyeongchang-highlight-container');
    if (!highlight) {
      return;
    }
    const history = ViewTagsPyeongchang.history;
    history.map((date, index) => {
      const div = document.createElement('div');
      div.className = `widget-pyeongchang-highlight widget-pyeongchang-highlight-${index}`;
      highlight.appendChild(div);
      const widget = new ViewTagsPyeongchang(div, '平昌五輪2018ハイライト', date, 'highlight');
      widget.start();
    });
  }
  // static photo() {
  //
  // }
  static init() {
    ViewTagsPyeongchang.highlight();
  }
  constructor(element, tag, date, type = ViewTagsPyeongchang.HIGHLIGHT) {
    super(element);
    this.tag = tag;
    this.date = `${date}`;
    this.type = type;
    this.action = new Tags(tag, date, this.done.bind(this), this.fail.bind(this));
  }
  // ---------------------------------------------------
  //  Method
  // ---------------------------------------------------
  /**
   * Ajax request を開始します
   */
  start() {
    this.action.next();
  }
  done(result) {
    console.log('ViewTagsPyeongchang.done', result);
    const articles = result.articles;
    if (!Array.isArray(articles)) {
      const error = new Error( Message.undef('[ViewTagsPyeongchang:UNDEFINED]') );
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
  fail(error) {
    console.warn('ViewTagsPyeongchang.fail', error, this);
  }
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
