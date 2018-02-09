/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/13 - 16:43
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import { Empty } from '../../../app/const/Empty';
import { Safety } from '../../../data/Safety';
import { NoticeAction } from '../../../app/const/NoticeAction';
import { Url } from '../../../app/const/Url';
import { NoticeDae } from '../../../dae/user/NoticeDae';

/**
 * [library] - React
 */
const React = self.React;

/**
 * お知らせ一覧リスト「メッセージ」を出力します
 * @param {NoticeDae} notice お知らせ一覧 1 data
 * @returns {?XML} `p.info-content`
 * @constructor
 */
export const ComponentHeaderNoticeMenuItemMessage = ({ notice }) => {
  const action = notice.action;
  if (!action) {
    return null;
  }
  const message = NoticeAction.message(action);
  const user = notice.user;
  const article = notice.article;
  return (
    <p className="info-content">
      {`${user.userName}さんがあなたの「${article.title}」へのコメントに`}<strong>{message}</strong>しました。
    </p>
  );
};

/**
 * React.propType
 * @type {{notice: NoticeDae}}
 */
ComponentHeaderNoticeMenuItemMessage.propType = {
  notice: React.PropTypes.instanceOf(NoticeDae).isRequired,
};

/**
 * お知らせ一覧リストを `notice.action` type で出力を切り替えます
 * @param {NoticeDae} notice お知らせ一覧 1 data
 * @returns {?XML} `li.info-item` or `a.info-link`
 * @constructor
 */
export const ComponentHeaderNoticeMenuItem = ({ notice }) => {
  const icon = Safety.image(notice.user.profilePicture, Empty.USER_EMPTY);
  const loggedIn = Safety.same(icon, Empty.USER_EMPTY);
  // switch - output
  switch (notice.action) {
    case 'comment':
    case 'reply': {
      return (
        <li className={`info-item info-item-${notice.id}`}>
          <a
            href={notice.article.reply.url}
            className={`info-link info-link-${notice.id}`}
          >
            <figure className={`info-user-thumb ${loggedIn}`}>
              <img src={Empty.refresh(icon)} alt=""/>
            </figure>
            <ComponentHeaderNoticeMenuItemMessage notice={notice} />
            <p className="info-date">{notice.displayDate}</p>
          </a>
        </li>
      );
    }
    case 'bad':
    case 'good': {
      return (
        <li className={`info-item info-item-${notice.id}`}>
          <a
            href={notice.article.comments.url}
            className={`info-link info-link-${notice.id}`}
          >
            <figure className={`info-user-thumb ${loggedIn}`}>
              <img src={icon} alt=""/>
            </figure>
            <ComponentHeaderNoticeMenuItemMessage notice={notice} />
            <p className="info-date">{notice.displayDate}</p>
          </a>
        </li>
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
 * React.propType
 * @type {{notice: NoticeDae}}
 */
ComponentHeaderNoticeMenuItem.propType = {
  notice: React.PropTypes.instanceOf(NoticeDae).isRequired,
};

/**
 * お知らせ一覧 - drop down を open / close するコンテナを出力します
 * @param {Array.<NoticeDae>} notifications JSON お知らせリスト
 * @returns {XML} `nav.notice-menu`
 * @constructor
 */
const ComponentHeaderNoticeMenu = ({ notifications }) => (
  <nav className="notice-menu">
    <div className="dropMenu">
      <div className="info">
        <h2 className="info-heading">お知らせ</h2>
        <div className="info-btn-readAll">&nbsp;</div>
        <ul className="info-list">
          {
            notifications.map((notice) => (
              <ComponentHeaderNoticeMenuItem
                key={`notice-${notice.id}`}
                notice={notice}
              />
            ))
          }
          {/* default link menu */}
          <li className="btn-viewmore">
            <a className="btn-viewmore-link" href={Url.notifications()}>
              <span>すべて見る</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

/**
 * React.propTypes
 * @type {{notifications: Array.<NoticeDae>}}
 */
ComponentHeaderNoticeMenu.propTypes = {
  notifications: React.PropTypes.arrayOf(
    React.PropTypes.instanceOf(NoticeDae).isRequired,
  ).isRequired,
};

export default ComponentHeaderNoticeMenu;
