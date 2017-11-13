/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/11/13 - 16:00
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import { Api } from '../../net/Api';

// React
const React = self.React;

/**
 * 移設 - from {@link LegendStep1Node}
 * @param {bool} wow Wowma キャンペーン flag
 * @returns {?XML} div > div.linkage-sns
 * @constructor
 * @since 2017-11-13 Wowma
 */
const ComponentSignupSNS = ({ wow }) => {
  // wow flag
  const note = wow ? <p className="wowma-attention">【注意！】Wowma !クーポンはTwitterとFacebook でのご登録では受け取れません。<br />
    下の入力欄にメールアドレスを入力し、ご登録をお願いいたします。</p> : '';
  // 移設 - from LegendStep1Node.js
  return (
    <div className="react-linkage-sns">
      <div className="linkage-sns">
        <ul className="linkage-sns-list">
          <li className="linkage-sns-item">
            {/* https://github.com/undotsushin/undotsushin/issues/334 */}
            <a href={Api.auth('tw').url} className="linkage-sns-link linkage-sns-tw"><span>Twitterで新規登録</span></a>
          </li>
          <li className="linkage-sns-item">
            <a href={Api.auth('fb').url} className="linkage-sns-link linkage-sns-fb"><span>Facebookで新規登録</span></a>
          </li>
        </ul>
      </div>
      {note}
      <p className="register-or">または</p>
    </div>
  );
};

ComponentSignupSNS.propTypes = {
  wow: React.PropTypes.bool.isRequired,
};

export default ComponentSignupSNS;
