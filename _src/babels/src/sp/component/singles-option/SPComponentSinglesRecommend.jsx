/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/09/12 - 21:51
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// import { SingleDae } from '../../../dae/SingleDae';
import ComponentArticleThumbnail from '../../../component/articles/ComponentArticleThumbnail';
import ComponentCategoryLabels from '../../../component/categories/ComponentCategoryLabels';

// data
import { Safety } from '../../../data/Safety';

// app
import { Empty } from '../../../app/const/Empty';
import { Env } from '../../../app/Env';

// dae
import { ArticleDae } from '../../../dae/ArticleDae';

// ga
import { Ga } from '../../../ga/Ga';

// singles-option/ad
import SPComponentSingleRecommendAd from './ad/SPComponentSingleRecommendAd';

// React
const React = self.React;

/**
 * 広告を表示します
 * @param {number} index 出力 index - 表示・非表示 flag 1 or 3
 * @param {string} slug category.slug `big6tv` 非表示
 * @returns {?XML} null or `div.board-item`
 * @constructor
 */
const BoardAd = ({ index, slug }) => {
  if (slug === 'big6tv') {
    return null;
  }
  // 2 or 5件目
  // |0|ad|1|2|ad|3|4|
  if (index === 1 || index === 3) {
    // output
    // console.log('BoardAd', index);
    return (
      <SPComponentSingleRecommendAd
        index={index}
      />
    );
  } else {
    return null;
  }
};

BoardAd.propTypes = {
  index: React.PropTypes.number.isRequired,
  slug: React.PropTypes.string.isRequired,
};

// -------------------------------------------------------------------
// Ga 追加
/**
 * Ga tag 送信します
 * ```
 * onclick="UT.Ga.click('under_article_recommend', '[読んでいる記事URL]', 'click', '[リンク先記事URL]', true);"
 * ```
 * @param {string} href リンク先記事URL
 * @param {Event} [event=null] click event
 * @since 2017-09-25
 */
const ga = (href, event = null) => {
  if (Env.mode !== Env.PRODUCTION) {
    event.preventDefault();
  }
  Ga.click('SPComponentSinglesRecommend.ga', 'under_article_recommend', location.href, 'click', href, true);
};
// -------------------------------------------------------------------

/**
 * `div.board-item` 記事コンテナを作成します, thumbnail + article
 * Ga 追加 on 2017-09-25 - https://github.com/undotsushin/undotsushin/issues/2381#issuecomment-331775622
 * ```
 * 記事下レコメンド記事
 * onclick="UT.Ga.click('under_article_recommend', '[読んでいる記事URL]', 'click', '[リンク先記事URL]', true);"
 * ```
 * @param {ArticleDae} single JSON convert data
 * @param {number} index 表示 index 0 ~ - 広告表示フラッグに使用します
 * @returns {XML} `div.board-item` 記事コンテナを返します
 * @constructor
 */
const BoardItem = ({ single, index }) => {
  const thumbnail = Safety.image(single.media.images.medium, Empty.IMG_MIDDLE);
  return (
    <div className="board-item">
      <a
        href={single.url}
        className="post"
        onClick={(event) => (ga(single.url, event))}
      >
        <ComponentArticleThumbnail
          mediaType={single.mediaType}
          thumbnail={thumbnail}
          title={single.title}
          recommend={false}
          small={true}
        />
        <div className="post-data">
          <h3 className="post-heading">{single.title}</h3>
          <ComponentCategoryLabels
            index={index}
            id={`single-popular-label-${single.id}`}
            categories={single.categories.all}
            anotherCategories={single.anotherCategories}
          />
          <p className="post-date">{single.displayDate}</p>
        </div>
      </a>
    </div>
  );
};

/**
 * React.propTypes
 * @type {{single: ArticleDae, index: number}}
 */
BoardItem.propTypes = {
  single: React.PropTypes.instanceOf(ArticleDae).isRequired,
  index: React.PropTypes.number.isRequired,
};

/**
 * 「あなたにおすすめの記事」
 * - SPComponentSinglesRecommend
 *   - {@link BoardAd}
 *   - {@link BoardItem}
 * 記事ページの最適化 #2381
 * @see https://github.com/undotsushin/undotsushin/issues/2381
 * @param {Array.<object>} list JSON result
 * @param {string} slug category slug
 * @returns {?XML} div.widget-postList or null
 * @constructor
 * @since 2017-09-13
 */
const SPComponentSinglesRecommend = ({ list, slug }) => {
  if (!Array.isArray(list) || !list.length) {
    return null;
  }
  // ---
  // render
  return (
    <div className="widget-postList widget-postList_popular">
      <div className="mod-headingA01">
        <h2>あなたにおすすめの記事</h2>
      </div>
      <div className="board">
        {
          list.map((single, index) => {
            const dae = new ArticleDae(single);
            return (
              <div
                key={`sp-singles-recommend-${dae.id}`}
                className={`singles-recommend-${index}`}
              >
                <BoardAd
                  index={index}
                  slug={slug}
                />
                <BoardItem
                  key={`singles-widget-post-list-recommend-${single.id}`}
                  single={dae}
                  index={index}
                />
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

/**
 * React.propTypes
 * @type {{list: Array.<object>, slug: string}}
 */
SPComponentSinglesRecommend.propTypes = {
  list: React.PropTypes.arrayOf(React.PropTypes.object.isRequired).isRequired,
  slug: React.PropTypes.string.isRequired,
};

export default SPComponentSinglesRecommend;
