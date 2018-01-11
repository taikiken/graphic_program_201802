/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/14 - 21:13
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import { NoticeDae } from '../../dae/user/NoticeDae';
import { Safety } from '../../data/Safety';
import { Empty } from '../../app/const/Empty';
import { NoticeAction } from '../../app/const/NoticeAction';

/**
 * [library] - React
 */
const React = self.React;

/**
 * mypage 「お知らせ」 1 データを出力します
 * @param {NoticeDae} notice Ajax JSON お知らせ
 * @returns {XML} `a.info-link`
 * @since 2017-12-14
 */
export const ComponentNotificationsMessage = ({ notice }) => {
  const icon = Safety.image(notice.user.profilePicture, Empty.USER_EMPTY);
  const loggedIn = Safety.same(icon, Empty.USER_EMPTY);
  switch (notice.action) {
    // 本来は reply だった
    // API が comment と間違えているのでしょうがなく追加した
    case 'comment':
    case 'reply': {
      return (
        <a href={notice.article.reply.url} className="info-link">
          <figure className={`info-user-thumb ${loggedIn}`}>
            <img src={Empty.refresh(icon)} alt=""/>
          </figure>
          <div className="info-content">
            {notice.user.userName}さんがあなたの「{notice.article.title}」へのコメントに<strong>{NoticeAction.message(notice.action)}</strong>しました。
          </div>
          <p className="act-date">{notice.displayDate}</p>
        </a>
      );
    }
    case 'bad':
    case 'good': {
      return (
        <a href={notice.article.comments.url} className="info-link">
          <figure className={`info-user-thumb ${loggedIn}`}>
            <img src={icon} alt=""/>
          </figure>
          <div className="info-content">
            {notice.user.userName}さんがあなたの「{notice.article.title}」へのコメントに<strong>{NoticeAction.message(notice.action)}</strong>しました。
          </div>
          <p className="act-date">{notice.displayDate}</p>
        </a>
      );
    }
    case 'notice': {
      return (
        <a href={notice.url} className="info-link">
          <div className="activity-content">
            {notice.body}
          </div>
          <p className="act-date">{notice.displayDate}</p>
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
 * @type {{notice: NoticeDae}}
 */
ComponentNotificationsMessage.propType = {
  notice: React.PropTypes.instanceOf(NoticeDae).isRequired,
};

/**
 * mypage 「お知らせ」一覧を出力します
 * @since 2017-12-14
 */
export default class ComponentNotifications extends React.Component {
  // ---------------------------------------------------
  //  STAtiC METHOD
  // ---------------------------------------------------
  /**
   * React.propTypes
   * @returns {{
   *   list: Array.<NoticeDae>,
   *   afterUpdate: function,
   *   afterMount: function
   * }} React.propTypes
   */
  static get propTypes() {
    return {
      list: React.PropTypes.arrayOf(
        React.PropTypes.instanceOf(NoticeDae).isRequired,
      ).isRequired,
      afterUpdate: React.PropTypes.func.isRequired,
      afterMount: React.PropTypes.func.isRequired,
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * mypage 「お知らせ」一覧準備をします
   * @param {*} props React.props
   */
  constructor(props) {
    super(props);
    // ---
    /**
     * React.state
     * @type {{list: Array.<NoticeDae>}}
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
    const { afterUpdate, afterMount } = this.props;
    afterUpdate();
    afterMount();
  }
  /**
   * delegate - before update props
   * - list 値が変化していたら `setState` 実行し表示を更新します + props.callback を実行します
   * @param {{list: Array.<NoticeDae>}} nextProps next React.props
   */
  componentWillReceiveProps(nextProps) {
    const { list } = nextProps;
    this.setState({ list });
    this.props.afterUpdate();
  }

  /**
   * list Array.<NoticeDae> からお知らせ一覧を出力します
   * - {@link ComponentNotificationsMessage}
   * @returns {?XML} `div.info`
   */
  render() {
    const { list } = this.state;
    if (!list.length) {
      return null;
    }
    return (
      <div className="info">
        <ul className="info-list">
          {
            // loop start
            list.map((dae) => (
              <li
                key={`info-${dae.id}`}
                className={`info-item info-item-${dae.id}`}
              >
                <ComponentNotificationsMessage
                  notice={dae}
                />
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}
