/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/16 - 23:42
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// node
import { CommentUserPlusCountNode } from '../../node/comment/CommentUserPlusCountNode';

// app
import { Empty } from '../../app/const/Empty';

// data
import { Safety } from '../../data/Safety';

// React
const React = self.React;

/**
 * 記事一覧・コメント・二段目
 * @since 2016-09-15
 */
export class ComponentCommentsSecond extends React.Component {
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link ComponentCommentsSecond.propTypes}
   */
  constructor(props) {
    super(props);

    /**
     * コメント一覧データ（配列）
     * @type {{seconds: Array.<PopularDae>}}
     */
    this.state = {
      seconds: props.seconds
    };
  }
  /**
   * div.commented-user を配列から出力します
   * @return {XML} div.commented-user コンテナを返します
   */
  render() {
    if (!this.props.hasSecond) {
      // 描画要素がない
      return <div className="commented-user"></div>;
    }

    const seconds = this.state.seconds;
    const articleId = this.props.articleId;
    return (
      <div className="commented-user">
        <ul className="comments-second">
          {
            seconds.map((commentDae, i) => {
              const userDae = commentDae.user;
              const picture = Safety.image(userDae.profilePicture, Empty.USER_EMPTY);
              const loggedIn = Safety.same(picture, Empty.USER_EMPTY);

              // CommentsSecond unique key は  記事Id + user Id を使用する
              // 同一ユーザーが複数投稿することがあるため
              // render 内で unique なことを保証する必要がある
              return (
                <li key={`user-${articleId}-${commentDae.id}-${userDae.id}-${i}`} className={`commented-user-item commented-user-item-${i}`}>
                  <span className={`commented-user-thumb ${loggedIn}`}>
                    <img src={Empty.refresh(picture)} alt={userDae.userName}/>
                  </span>
                </li>
              );
            })
          }
        </ul>
        <CommentUserPlusCountNode total={this.props.total} />
      </div>
    );
  }
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{seconds: Array<PopularDae>, articleId: string, total: number, hasSecond: boolean}} React props
   */
  static get propTypes() {
    return {
      // Array<PopularDae>
      seconds: React.PropTypes.array.isRequired,
      articleId: React.PropTypes.string.isRequired,
      total: React.PropTypes.number.isRequired,
      hasSecond: React.PropTypes.bool.isRequired
    };
  }
}
//
// /**
//  * デフォルトプロパティ
//  * @type {{seconds: Array<PopularDae>, articleId: string, total: number, hasSecond: boolean}}
//  */
// ComponentCommentsSecond.propTypes = {
//   // Array<PopularDae>
//   seconds: React.PropTypes.array.isRequired,
//   articleId: React.PropTypes.string.isRequired,
//   total: React.PropTypes.number.isRequired,
//   hasSecond: React.PropTypes.bool.isRequired
// };
