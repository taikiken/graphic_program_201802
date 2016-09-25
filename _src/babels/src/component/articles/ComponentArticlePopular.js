/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/16 - 23:29
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// view
import { ComponentCommentsSecond } from './ComponentCommentsSecond';

// node(ReactClass)
import { ReactionNode } from '../../node/comment/ReactionNode';

// app
import { User } from '../../app/User';
import { Empty } from '../../app/const/Empty';

// data
import { Safety } from '../../data/Safety';

// React
const React = self.React;

/**
 * 記事一覧・コメント・一段目
 * @since 2016-09-16
 */
export class ComponentArticlePopular extends React.Component {
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link ComponentArticlePopular.propTypes}
   */
  constructor(props) {
    super(props);
  }
  /**
   * div.commented-user を配列から出力します
   * @return {?XML} div.commented-user コンテナを返します, 出力対象が無ければ null を返します
   */
  render() {
    const commentsPopular = this.props.commentsPopular;
    const hasFirst = commentsPopular.hasFirst;

    // 1 件 comment があるかをチェクする
    if (!hasFirst) {
      // 描画するべきものがない
      return null;
    }

    let total = this.props.total;
    const articleId = this.props.articleId;
    const hasSecond = commentsPopular.hasSecond;
    const firstDae = commentsPopular.first;
    const secondsDae = commentsPopular.seconds;

    if ( hasSecond ) {
      // 2件目以降も存在する
      // 合計数からアイコン描画数を引く
      total -= secondsDae.length;
    }

    // 少なくとも1件は存在する
    // 総件数から 1（アイコン描画数） マイナス
    total -= 1;

    // 1件目コメントデータを取り出し
    const first = firstDae;
    // 1件目コメント・ユーザー
    const firstUser = first.user;
    // ユーザーサムネイル
    const picture = Safety.image(firstUser.profilePicture, Empty.USER_EMPTY);
    const loggedIn = Safety.same(picture, Empty.USER_EMPTY);

    // login 済かを調べる
    const sign = User.sign;

    return (
      <div className="comments-popular">
        <div className="feature-user comment-item">
          <figure className="comment-user">
              <span className="comment-user-link">
                <span className={`comment-user-thumb ${loggedIn}`}><img src={Empty.refresh(picture)} alt={firstUser.userName}/></span>
                <div className="comment-user-data">
                  <p className="comment-user-name">{firstUser.userName}</p>
                  <p className="comment-user-job">{firstUser.bio}</p>
                </div>
              </span>
          </figure>
          {/* insert html tag into .comment-content innerHTML */}
          <div className="comment-content" dangerouslySetInnerHTML={{__html: first.body}} />
          <ReactionNode
            uniqueId={this.props.uniqueId}
            articleId={String(articleId)}
            commentId={String(first.id)}
            sign={sign}
            good={first.good}
            bad={first.bad}
            isGood={first.isGood}
            isBad={first.isBad}
            activate={false}
            url={first.url}
          />
        </div>
        <ComponentCommentsSecond
          seconds={secondsDae}
          articleId={articleId}
          total={total}
          hasSecond={hasSecond}
        />
      </div>
    );
  }
}

/**
 * デフォルトプロパティ
 * @type {{commentsPopular: Object, total: number, articleId: string, uniqueId: string}}
 */
ComponentArticlePopular.propTypes = {
  commentsPopular: React.PropTypes.object.isRequired,
  total: React.PropTypes.number.isRequired,
  articleId: React.PropTypes.string.isRequired,
  uniqueId: React.PropTypes.string.isRequired
};
