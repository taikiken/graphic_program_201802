/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/19 - 21:13
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import { Empty } from '../../app/const/Empty';
import { MediaType } from '../../app/const/MediaType';

// node
import { CategoryLabelNode } from '../../node/category/CategoryLabelNode';

// Ga
import { Ga } from '../../ga/Ga';
import { GaData } from '../../ga/GaData';

// React
const React = self.React;

// ----------------------------------------

/**
 * mediaType で play button を表示するかを判断しタグを返します
 * @param {string} mediaType media type, video / image...
 * @return {?XML} play button を表示する時は img tag をそうでない時は null を返します
 */
const playMark = (mediaType) => {
  if (mediaType === MediaType.VIDEO) {
    return <img src={Empty.VIDEO_PLAY_SMALL_1X1} alt="" className="post-thumb-overlay-movie type-movie"/>;
  }

  return null;
};

/**
 * headline の 1記事
 * @since 2016-09-17
 */
export class ComponentHeadlineArticle extends React.Component {
  /**
   * プロパティを保存し必要な関数・変数を準備します
   * @param {Object} props プロパティ {@link ComponentHeadlineArticle.propTypes}
   */
  constructor(props) {
    super(props);
    /**
     * bind済み gaSend
     * @type {function}
     */
    this.boundGa = this.gaSend.bind(this);
  }

  /**
   * headline 1記事を作成します
   * @return {XML} headline 1記事を返します
   */
  render() {
    const props = this.props;
    return (
      <li className={`board-item board-item-${props.index}`}>
        <a className="post" href={props.url} onClick={this.boundGa}>
          <figure className="post-thumb post-thumb-headline">
            <img src={props.thumbnail} alt={props.title}/>
            {playMark(this.props.mediaType)}
          </figure>
          <div className="post-data">
            <p className={`post-category post-category-${props.slug}`}>
              <CategoryLabelNode
                categories={this.props.categories}
                id={`headline-label-${this.props.id}`}
                index={this.props.index}
              />
            </p>
            <h3 className="post-heading">{props.title}</h3>
            <p className="post-date">{props.date}</p>
          </div>
        </a>
      </li>
    );
  }
  /**
   * GA 計測タグを送信します {@link Ga.add}, {@link GaData}
   */
  gaSend() {
    // ----------------------------------------------
    // GA 計測タグ
    const tag = this.props.home ? 'home' : this.props.slug;
    Ga.add(new GaData('ComponentHeadlineArticle.gaSend', `${tag}_headline`, 'click', this.props.url, parseFloat(this.props.id)));
    // ----------------------------------------------
  }
}

/**
 *
 * @type {{
 *  index: number,
 *  id: string,
 *  slug: string,
 *  categories: array,
 *  url: string,
 *  date: string,
 *  title: string,
 *  thumbnail: string,
 *  mediaType: string,
 *  home: bool
 * }}
 */
ComponentHeadlineArticle.propTypes = {
  index: React.PropTypes.number.isRequired,
  id: React.PropTypes.string.isRequired,
  slug: React.PropTypes.string.isRequired,
  // @since 2016-06-27 categories へ切替
  // category: React.PropTypes.string.isRequired,
  // category2: React.PropTypes.string,
  categories: React.PropTypes.array.isRequired,
  url: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  thumbnail: React.PropTypes.string.isRequired,
  mediaType: React.PropTypes.string.isRequired,
  home: React.PropTypes.bool.isRequired
};
