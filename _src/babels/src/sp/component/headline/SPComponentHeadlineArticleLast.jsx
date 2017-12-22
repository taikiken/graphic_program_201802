/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/20 - 14:50
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
// React
import ComponentArticleThumbnail from '../../../component/articles/ComponentArticleThumbnail';
import { Empty } from '../../../app/const/Empty';
import { Safety } from '../../../data/Safety';
import ComponentCategoryLabels from '../../../component/categories/ComponentCategoryLabels';
import { ArticleDae } from '../../../dae/ArticleDae';
import { RelatedDae } from '../../../dae/RelatedDae';

/**
 * [library] - React
 */
const React = self.React;

/**
 * SP headline - 死後の記事を大きく表示
 * @param {ArticleDae} dae JON 記事データ
 * @param {number} index index
 * @returns {?XML} `div.headline--last`
 * @since 2017-12-18
 */
const SPComponentHeadlineArticleLast = ({ dae, index }) => {
  if (!dae) {
    return null;
  }
  const thumbnail = Safety.image(dae.media.images.carousel, Empty.IMG_CAROUSEL);
  return (
    <div className="headline--last">
      <div className="board">
        <div className="board-item board-item--big">
          <a href={dae.url} className="post">
            <ComponentArticleThumbnail
              mediaType={dae.mediaType}
              thumbnail={thumbnail}
              title={dae.title}
              recommend={false}
              small={false}
            />
            <div className="post-data">
              <h3 className="post-heading">{dae.title}</h3>
              <ComponentCategoryLabels
                categories={dae.categories.all}
                id={`archive-label-${dae.id}`}
                index={index}
                mediaType={dae.mediaType}
                recommend={false}
                anotherCategories={dae.anotherCategories}
              />
              <p className="post-date">{dae.displayDate}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

/**
 * React.propTypes
 * @type {{dae: [ArticleDae|RelatedDae], index: number}}
 */
SPComponentHeadlineArticleLast.propTypes = {
  dae: React.PropTypes.oneOfType([
    React.PropTypes.instanceOf(ArticleDae).isRequired,
    React.PropTypes.instanceOf(RelatedDae).isRequired,
  ]).isRequired,
  index: React.PropTypes.number.isRequired,
};

export default SPComponentHeadlineArticleLast;
