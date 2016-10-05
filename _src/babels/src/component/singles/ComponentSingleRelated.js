/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/24 - 15:52
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import { Message } from '../../app/const/Message';
import { Empty } from '../../app/const/Empty';

// data
import { Safety } from '../../data/Safety';

// node
import { ComponentCategoryLabels } from '../categories/ComponentCategoryLabels';

// component
import { ComponentArticleThumbnail } from '../articles/ComponentArticleThumbnail';

// React
const React = self.React;

/**
 * 「関連記事」を出力します<br>
 * 記事詳細汎用化のためにコンポーネント化します<br>
 * ViewRelated {@link ViewRelated}
 *
 * **desktop では使用しない**
 * <pre>
 * desktop/p.php
 * `_popIn_recommend` に JS で出力
 * </pre>
 * @since 2016-09-24
 */
export class ComponentSingleRelated extends React.Component {
  /**
   * プロパティを保存し必要な関数・変数を準備します
   * @param {Object} props プロパティ {@link ComponentSingleRelated.propTypes}
   */
  constructor(props) {
    super(props);

    /**
     * React state
     * @type {{list: Array<RelatedDae>}}
     * */
    this.state = {
      list: props.list
    };
  }
  /**
   * state.list を元に `div.related-post` を出力します<br>
   * list.length が `0` の時には null を返します
   * @return {?XML} ist.length が `0` の時には null を返します
   * */
  render() {
    const list = this.state.list;
    // ない時は表示しない
    if (list.length === 0) {
      return null;
    }

    return (
      <div className="related-post">
        <div className="comment-heading">
          <h2>{Message.RELATED_TITLE}</h2>
        </div>

        <ul className="board-small column2">
          {
            list.map((dae, i) => {
              const thumbnail = Safety.image(dae.media.images.thumbnail, Empty.IMG_SMALL);
              return (
                <li className="board-item column2" key={`related-${dae.id}`}>
                  <a href={dae.url} id={`related-${dae.id}`} className={`post post-${i}`}>
                    {/*
                    <figure className="post-thumb">
                      <img src={thumbnail} alt={dae.title}/>
                    </figure>
                   */}
                    <ComponentArticleThumbnail
                      mediaType={dae.media.mediaType}
                      thumbnail={thumbnail}
                      title=""
                      recommend={false}
                    />
                    <div className="post-data">
                      {/* <p className={`post-category post-category-${dae.category.slug}`}>{dae.category.label}</p> */}
                      <ComponentCategoryLabels
                        index={i}
                        id={`related-${dae.id}`}
                        categories={dae.categories.all}
                        slug={dae.categories.slug}
                      />
                      <h3 className="post-heading">{dae.title}</h3>
                      <p className="post-date">{dae.displayDate}</p>
                    </div>
                  </a>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
  /**
   * list を更新します
   * @param {Array<RelatedDae>} list 表示する関連記事配列
   */
  updateList(list) {
    this.setState({ list });
  }
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{list: array<RelatedDae>}} React props
   */
  static get propTypes() {
    return {
      list: React.PropTypes.array.isRequired
    };
  }
}
//
// /**
//  * プロパティ
//  * @type {{list: array<RelatedDae>}}
//  */
// ComponentSingleRelated.propTypes = {
//   list: React.PropTypes.array.isRequired
// };
