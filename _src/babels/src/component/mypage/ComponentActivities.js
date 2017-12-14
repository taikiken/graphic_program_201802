/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/14 - 19:11
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import { ActivityDae } from '../../dae/user/ActivityDae';
// import { UserDae } from '../../dae/UserDae';
// import { NoticeArticleDae } from '../../dae/user/NoticeArticleDae';
// import { PopularDae } from '../../dae/comments/PopularDae';

/**
 * [library] - React
 */
const React = self.React;

/**
 * {@link ComponentActivities}
 * mypage [activities] 誰が「誰に」の出力判定を行います
 * @param {UserDae} commentUser {@link ActivityDae}.article {@link NoticeArticleDae}.comments {@link PopularDae},user {@link UserDae}
 * @param {UserDae} me {@link ActivityDae}.user {@link UserDae}
 * @returns {XML} `<strong>自分</strong>` or `<span><strong>{commentUser.userName}</strong>さん</span>`
 */
export const who = (commentUser, me) => {
  if (me.id === commentUser.id) {
    return <strong>自分</strong>;
  }
  return <span><strong>{commentUser.userName}</strong>さん</span>;
};

/**
 * {@link ComponentActivities}
 * ActivityDae.action 種別で出力形式を変更します
 * - comment
 * - reply
 * - good
 * - bad
 * - bookmark
 * @param {ActivityDae} dae Ajax JSON activities data
 * @returns {XML} `a.activity-link`
 */
export const ComponentActivitiesMessage = ({ dae }) => {
  const article = dae.article;
  switch (dae.action) {
    case 'comment': {
      return (
        <a href={article.comments.url} className="activity-link">
          <div className="activity-content">
            「{article.title}」へ<strong>コメント</strong>しました。
          </div>
          <p className="act-date">{dae.displayDate}</p>
        </a>
      );
    }
    case 'reply': {
      return (
        <a href={article.reply.url} className="activity-link">
          <div className="activity-content">
            「{article.title}」の{who(article.comments.user, dae.user)}のコメントに<strong>返信</strong>しました。
          </div>
          <p className="act-date">{dae.displayDate}</p>
        </a>
      );
    }
    case 'good': {
      return (
        <a href={article.comments.url} className="activity-link">
          <div className="activity-content">
            「{article.title}」の{who(article.comments.user, dae.user)}のコメントに<strong>GOOD</strong>しました。
          </div>
          <p className="act-date">{dae.displayDate}</p>
        </a>
      );
    }
    case 'bad': {
      return (
        <a href={article.comments.url} className="activity-link">
          <div className="activity-content">
            「{article.title}」の{who(article.comments.user, dae.user)}のコメントに<strong>BAD</strong>しました。
          </div>
          <p className="act-date">{dae.displayDate}</p>
        </a>
      );
    }
    case 'bookmark': {
      return (
        <a href={article.url} className="activity-link">
          <div className="activity-content">
            「{article.title}」を<strong>ブックマーク</strong>しました。
          </div>
          <p className="act-date">{dae.displayDate}</p>
        </a>
      );
    }
    default: {
      return null;
    }
  }
};

/**
 * React.propTypes
 * @type {{dae: ActivityDae}}
 */
ComponentActivitiesMessage.propTypes = {
  dae: React.PropTypes.instanceOf(ActivityDae).isRequired,
};

/**
 * mypage activities 一覧を出力します
 * @since 2017-12-14
 */
export default class ComponentActivities extends React.Component {
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * React.propTypes
   * @returns {{
   *   list: Array.<ActivityDae>,
   *   callback: function
   * }}
   * React.propTypes
   */
  static get propTypes() {
    return {
      list: React.PropTypes.arrayOf(
        React.PropTypes.instanceOf(ActivityDae).isRequired,
      ).isRequired,
      callback: React.PropTypes.func.isRequired,
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * mypage activities 一覧準備をします
   * @param {*} props React.props
   */
  constructor(props) {
    super(props);
    // --
    /**
     * React.state
     * @type {{list: Array.<ActivityDae>}}
     */
    this.state = {
      list: props.list,
    };
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * delegate - after mount
   * - props.callback を実行します
   */
  componentDidMount() {
    this.props.callback();
  }
  // /**
  //  * delegate - before update props
  //  * - list 値が変化していたら `setState` 実行し表示を更新します + props.callback を実行します
  //  * @param {{list: Array.<ActivityDae>}} nextProps next React.props
  //  */
  // componentWillReceiveProps(nextProps) {
  //   const { list } = nextProps;
  //   console.log('ComponentActivities.componentWillReceiveProps', nextProps, this.state, list !== this.state.list);
  //   if (list !== this.state.list) {
  //     this.setState({ list });
  //     this.props.callback();
  //   }
  // }
  /**
   * delegate - before update props
   * - list 値が変化していたら `setState` 実行し表示を更新します + props.callback を実行します
   * @param {{list: Array.<ActivityDae>}} nextProps next React.props
   */
  componentWillReceiveProps(nextProps) {
    const { list } = nextProps;
    this.setState({ list });
    this.props.callback();
  }
  /**
   * list: Array.<ActivityDae> から一覧を出力します
   * - {@link ComponentActivitiesMessage}
   * @returns {?XML} `div.activity`
   */
  render() {
    const { list } = this.state;
    if (!list.length) {
      return null;
    }
    // ---
    return (
      <div className="activity">
        <ul className="activity-list">
          {
            // loop start
            list.map((dae => (
              <li
                key={`activity-${dae.id}`}
                className={`board-stacks activity-item activity-item-${dae.id}`}
              >
                <ComponentActivitiesMessage dae={dae} />
              </li>
            )))
          }
        </ul>
      </div>
    );
  }
}
