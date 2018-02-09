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
// import ComponentArticleThumbnail from '../../../component/articles/ComponentArticleThumbnail';
import { Empty } from '../../../app/const/Empty';
import { Safety } from '../../../data/Safety';
import ComponentCategoryLabels from '../../../component/categories/ComponentCategoryLabels';
import { ArticleDae } from '../../../dae/ArticleDae';
import { RelatedDae } from '../../../dae/RelatedDae';
import { MediaType } from '../../../app/const/MediaType';

/**
 * [library] - React
 */
const React = self.React;


/**
 * SP - headline last thumbnail video
 * @param {ArticleDae|RelatedDae} dae JSON data
 * @param {string} thumbnail thumbnail path
 * @returns {XML} `figure.post-thumb`
 * @since 2018-01-11
 */
export const SPComponentHeadlineArticleLastThumbnailVideo = ({ dae, thumbnail }) => (
  <figure className={`post-thumb post-thumb-${dae.mediaType}`}>
    <img className="video-thumbnail" src={thumbnail} alt={dae.title}/>
    <img className="post-thumb-overlay-movie type-movie" src={Empty.VIDEO_PICKUP_PLAY} alt="" />
  </figure>
);

/**
 * React.propTypes
 * @type {{dae: [ArticleDae|RelatedDae], thumbnail: string}}
 */
SPComponentHeadlineArticleLastThumbnailVideo.propTypes = {
  dae: React.PropTypes.oneOfType([
    React.PropTypes.instanceOf(ArticleDae).isRequired,
    React.PropTypes.instanceOf(RelatedDae).isRequired,
  ]).isRequired,
  thumbnail: React.PropTypes.string.isRequired,
};

/**
 * SP - headline last thumbnail image
 * @param {ArticleDae|RelatedDae} dae JSON data
 * @param {string} thumbnail thumbnail path
 * @returns {XML} `figure.post-thumb`
 * @since 2018-01-11
 */
export const SPComponentHeadlineArticleLastThumbnailImage = ({ dae, thumbnail }) => (
  <figure className={`post-thumb post-thumb-${dae.mediaType}`}>
    <img src={thumbnail} alt=""/>
  </figure>
);

/**
 * React.propTypes
 * @type {{dae: [ArticleDae|RelatedDae], thumbnail: string}}
 */
SPComponentHeadlineArticleLastThumbnailImage.propTypes = {
  dae: React.PropTypes.oneOfType([
    React.PropTypes.instanceOf(ArticleDae).isRequired,
    React.PropTypes.instanceOf(RelatedDae).isRequired,
  ]).isRequired,
  thumbnail: React.PropTypes.string.isRequired,
};

/**
 * SP - headline last thumbnail video or image
 * @param {ArticleDae|RelatedDae} dae JSON data
 * @param {string} thumbnail thumbnail path
 * @returns {?XML} `figure.post-thumb`
 * @since 2018-01-11
 */
export const SPComponentHeadlineArticleLastThumbnail = ({ dae, thumbnail }) => {
  switch (dae.mediaType) {
    case MediaType.IMAGE: {
      // image
      return (
        <SPComponentHeadlineArticleLastThumbnailImage
          dae={dae}
          thumbnail={thumbnail}
        />
      );
    }
    case MediaType.VIDEO: {
      // video
      return (
        <SPComponentHeadlineArticleLastThumbnailVideo
          dae={dae}
          thumbnail={thumbnail}
        />
      );
    }
    default: {
      // 該当なし
      return null;
    }
  }
};

/**
 * React.propTypes
 * @type {{dae: [ArticleDae|RelatedDae], thumbnail: string}}
 */
SPComponentHeadlineArticleLastThumbnail.propTypes = {
  dae: React.PropTypes.oneOfType([
    React.PropTypes.instanceOf(ArticleDae).isRequired,
    React.PropTypes.instanceOf(RelatedDae).isRequired,
  ]).isRequired,
  thumbnail: React.PropTypes.string.isRequired,
};

/**
 * SP headline - 最後の記事を大きく表示
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
            {/*
            <SPComponentHeadlineArticleLastThumbnail
              mediaType={dae.mediaType}
              thumbnail={thumbnail}
              title={dae.title}
              recommend={false}
              small={false}
            />
            */}
            <SPComponentHeadlineArticleLastThumbnail
              dae={dae}
              thumbnail={thumbnail}
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
