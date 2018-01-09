/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/25 - 17:55
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
// SPCommentFormNode
// React
import ComponentCommentFormOpener from '../../../../component/single-comment/form/ComponentCommentFormOpener';
import SPComponentCommentFormElement from './SPComponentCommentFormElement';

/**
 * [library] - React
 */
const React = self.React;

/**
 * SP: comment form を表示します
 * @param {string} uniqueId 識別子
 * @param {string} articleId 記事 id
 * @param {boolean} sign ログインの有無
 * @param {string} commentType コメント種類
 * @param {string} url コメント詳細URL - ga 送信で使用します
 * @param {string} [toggle=close] open / close, default close
 * @param {string} [icon=''] コメント送信者（自分の）profile picture
 * @param {string} [commentId=''] コメント id
 * @param {number} [commentCount=0] コメント数
 * @param {boolean} [parent=false] 親コメント flag
 * @param {boolean} [independent=false] 記事へのコメント送信 flag
 * @return {?XML} `div.comment-form` or `div.comment-respond`
 * @constructor
 * @since 2017-12-25 component
 */
const SPComponentCommentForm = ({
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
  if (!sign || (!parent && !independent)) {
    if (!parent) {
      return null;
    }
    // parent：下に空きをつける
    return <div className="comment-respond" />;
  }
  // -------------------------
  // prent or independent 何かを表示する
  const message = 'コメント';
  // コメント数のみ表示
  let staticMessage = '';
  // 返信アクション付きコメント数
  let actionMessage = `${message}へ返信`;
  if (commentCount > 0) {
    // コメント数のみ表示
    staticMessage = `${message} (${commentCount})`;
    // 「返信」とコメント数
    actionMessage = `${actionMessage} (${commentCount})`;
  }
  if (!sign) {
    // 非ログイン
    // + 親でも 記事へのコメントでもない（子供）
    if (staticMessage !== '') {
      return (
        <div className="comment-respond">
          <p className="comment-respond-opener"><span>{staticMessage}</span></p>
        </div>
      );
    }
    return null;
  }
  // console.log('SPComponentCommentForm', SPComponentCommentFormElement);
  // output
  const toggleState = independent ? 'open' : toggle;
  const open = toggleState === 'open';
  const commentClass = independent ? 'comment-form' : 'comment-respond';
  return (
    <div className={`comment-root ${commentClass}`}>
      <ComponentCommentFormOpener
        uniqueId={uniqueId}
        independent={independent}
        actionMessage={actionMessage}
      />
      <SPComponentCommentFormElement
        uniqueId={uniqueId}
        toggle={toggleState}
        open={open}
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
 *   independent: booelan
 * }}
 */
SPComponentCommentForm.propTypes = {
  // 識別子
  uniqueId: React.PropTypes.string.isRequired,
  // 記事 id
  articleId: React.PropTypes.string.isRequired,
  // ログインの有無
  sign: React.PropTypes.bool.isRequired,
  // コメント種類
  commentType: React.PropTypes.string.isRequired,
  // コメント詳細URL for ga
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
SPComponentCommentForm.defaultProps = {
  toggle: 'close',
  icon: '',
  commentId: '',
  commentCount: 0,
  parent: false,
  independent: false,
};

export default SPComponentCommentForm;

