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
import { SingleDae } from '../../../dae/SingleDae';
import { ComponentArticleThumbnail } from '../../../component/articles/ComponentArticleThumbnail';
import { Safety } from '../../../data/Safety';
import { Empty } from '../../../app/const/Empty';
import { ComponentCategoryLabels } from '../../../component/categories/ComponentCategoryLabels';

// React
const React = self.React;

const BoardAd = ({ index, categories }) => {
  const big6 = categories.some(category => (category.slug === 'big6tv'));
  if (big6) {
    return null;
  }
  // 2件目
  // length 2 以上
  if (index === 1 || index === 3) {
    // output
    console.log('BoardAd', index);
  } else {
    return null;
  }
};

// thumbnail + article
const BoardItem = ({ single, index }) => {
  const thumbnail = Safety.image(single.media.images.medium, Empty.IMG_MIDDLE);
  return (
    <div className="board-item">
      <a href={single.url} className="post">
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
          />
          <p className="post-date">{single.displayDate}</p>
        </div>
      </a>
    </div>
  );
};

const SPComponentSingleRecommend = ({ list, categories }) => {
  const length = list.length;
  if (!Array.isArray(list) || !length) {
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
          list.map((single, index) => (
            <div className={`singles-recommend-${index}`}>
              <BoardAd
                index={index}
                categories={categories}
              />
              <BoardItem
                key={`singles-widget-post-list-recommend-${single.id}`}
                single={single}
                index={index}
              />
            </div>
          ));
        }
      </div>
    </div>
  );
};

SPComponentSingleRecommend.propTypes = {
  list: React.PropTypes.arrayOf(SingleDae).isRequired,
  categories: React.PropTypes.arrayOf(PropTypes.shape({
    label: React.PropTypes.string.isRequired,
    slug: React.PropTypes.string.isRequired,
  })).isRequired,
};

export default SPComponentSingleRecommend;
