
// view
import View from '../../../view/View';

// app
import { Url } from '../../../app/const/Url';
// import { Message } from '../../app/const/Message';

// // node
// import { BannerNode } from '../../node/single/BannerNode';

// view
import Banner from '../../../view/Banner';

// React
/**
 * [library] - React
 */
const React = self.React;

/**
 * 記事詳細下部を出力します
 * - 汎用化のために `ViewSingleFooter` {@link ViewSingleFooter} から分離します
 *
 * 記事詳細下部, TAG 部分の出力 `div.post-footer`
 * - Banner {@link Banner} の出力を行います
 * @since 2016-09-24
 */
export default class SPViewSingleTags extends View {
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * プロパティを保存し必要な関数・変数を準備します
   * @param {Object} props プロパティ {@link ComponentSingleFooter.propTypes}
   */
  constructor(keywords, element) {
    super(element);
    /**
     * React state
     * @type {{single: SingleDae}}
     * */
    this.keywords = keywords;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * delegate, mount 後に呼び出され `View.DID_MOUNT` を発火します
   */
  start() {
    this.render();
  }
  /**
   * `div.post-footer` を出力します
   * @return {XML} `div.post-footer` を返します
   * */
  render() {
    const keywords = this.keywords;

    ReactDOM.render(
      <div className="post-footer">
        {/* TAGS */}
        <div className="post-tags">
          <h2 className="post-tags-heading">タグ</h2>
          <ul className="post-tags-list">
            {
              keywords.map((keyword, i) => {
                return (
                  <li key={`keyword-${i}`} className="post-tags-item">
                    {/* link は 検索パターンにしています */}
                    <a href={Url.search(keyword)}>{keyword}</a>
                  </li>
                );
              })
            }
          </ul>
        </div>
      </div>
      ,
      this.element
    );
  }
}
