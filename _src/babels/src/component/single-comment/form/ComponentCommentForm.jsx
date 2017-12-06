/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/06 - 17:58
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
// CommentFormNode

import ComponentCommentFormOpener from './ComponentCommentFormOpener';
import ComponentCommentFormElement from './ComponentCommentFormElement';

// React
const React = self.React;

/**
 * comment form を表示するための基点 class です
 * - {@link ComponentCommentFormElement}
 * - {@link ComponentCommentFormOpener}
 * @param {string} uniqueId 識別子
 * @param {string} articleId 記事ID
 * @param {boolean} sign ログイン済み flag
 * @param {string} commentType comment 種別, official / normal / self
 * @param {string} url comment path
 * @param {string} toggle `open` / `close` - default `close`
 * @param {string} icon user icon path
 * @param {string} commentId comment ID
 * @param {number} commentCount comment 返信数
 * @param {boolean} parent 親コメント存在 flag
 * @param {boolean} independent 記事コメント flag
 * @returns {?XML} `div.comment-respond`
 * @constructor
 * @since 2017-12-05
 */
const ComponentCommentForm = ({
                                uniqueId,
                                articleId,
                                sign,
                                commentType,
                                url,
                                toggle,
                                icon,
                                commentId,
                                commentCount,
                                parent,
                                independent,
                              }) => {
  // ---
  if (!sign || (!parent && !independent)) {
    if (!parent) {
      return null;
    }
    // parent：下に空きをつける
    return <div className="comment-respond" />;
  }
  // -------------------------
  // parent or independent 何かを表示する
  const toggleMessage = independent ? 'open' : toggle;
  const message = 'コメント';
  // コメント数のみ表示
  let staticMessage = '';
  // 返信アクション付きコメント数
  let actionMessage = `${message}へ返信`;
  if (commentCount > 0) {
    staticMessage = `${message} (${commentCount})`;
    actionMessage = `${actionMessage} (${commentCount})`;
  }
  // output
  if (!sign) {
    // 非ログイン
    // + 親でも 記事へのコメントでもない（子供）
    if (staticMessage) {
      return (
        <div className="comment-respond">
          <p className="comment-respond-opener"><span>{staticMessage}</span></p>
        </div>
      );
    }
    return null;
  }
  // -------------------------
  // ログイン
  // ログインユーザーのみフォームを表示する
  return (
    <div className="comment-respond comment-root">
      <ComponentCommentFormOpener
        uniqueId={uniqueId}
        independent={independent}
        actionMessage={actionMessage}
      />
      <ComponentCommentFormElement
        uniqueId={uniqueId}
        toggle={toggleMessage}
        open={toggleMessage === 'open'}
        independent={independent}
        icon={icon}
        articleId={articleId}
        commentId={commentId}
        commentType={commentType}
        url={url}
      />
    </div>
  );
};

/**
 * React.propTypes
 * -
 * @type {{
 *   uniqueId: string,
 *   articleId: string,
 *   sign: boolean,
 *   commentType: string,
 *   url: string,
 *   toggle: string,
 *   icon: string,
 *   commentId: string,
 *   commentCount: number,
 *   parent: boolean,
 *   independent: boolean
 * }}
 */
ComponentCommentForm.propTypes = {
  uniqueId: React.PropTypes.string.isRequired,
  // 記事 id
  articleId: React.PropTypes.string.isRequired,
  // ログインの有無
  sign: React.PropTypes.bool.isRequired,
  // コメント種類
  commentType: React.PropTypes.string.isRequired,
  // コメント詳細 URL
  url: React.PropTypes.string.isRequired,
  // open / close, default close
  toggle: React.PropTypes.string,
  // コメント送信者（自分の）profile picture
  icon: React.PropTypes.string,
  // コメント id（オプション）
  commentId: React.PropTypes.string,
  // コメント数 default 0
  commentCount: React.PropTypes.number,
  // 親コメント? default false
  parent: React.PropTypes.bool,
  // 記事へのコメント送信 default false
  independent: React.PropTypes.bool,
};

/**
 * React.defaultProps
 * @type {{toggle: string, icon: string, commentId: string, commentCount: number, parent: boolean, independent: boolean}}
 */
ComponentCommentForm.defaultProps = {
  toggle: 'close',
  icon: '',
  commentId: '',
  commentCount: 0,
  parent: false,
  independent: false,
};

export default ComponentCommentForm;
