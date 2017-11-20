/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/11/13 - 17:29
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

const React = self.React;

const greensock = self.com.greensock;
const TweenLite = greensock.TweenLite;
const easing = greensock.easing;

/**
 * modal - fade in します
 * @param {Element} element modal container
 * @since 2017-11-13
 */
const modalIn = (element) => {
  TweenLite.to(
    element,
    0.5,
    {
      opacity: 1,
      easing: easing.Linear.easeNone,
      onComplete: () => {
        element.style.cssText = '';
      },
    },
  );
};

/**
 * Wowma キャンペーン登録完了 modal
 * @since 2017-11-13
 */
export default class ComponentWowCompleteModal extends React.Component {
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * Wowma キャンペーン登録完了 modal 準備します
   * @param {*} props React.props
   */
  constructor(props) {
    super(props);
    // ---
    /**
     * bind onClick
     * @type {function(this:ComponentWowCompleteModal)}
     */
    this.onClick = this.onClick.bind(this);
    /**
     * div.signup_wowma__modal
     * @type {?Element}
     */
    this.modal = null;
    /**
     * location path
     * @type {string}
     */
    this.top = '/';
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * delegate mount - modal fade-in 処理を始めます
   */
  componentDidMount() {
    if (this.modal) {
      modalIn(this.modal);
    }
  }
  /**
   * コンテナ親クリックで `/` top へ遷移します
   * @param {Event} event click event
   */
  onClick(event) {
    event.preventDefault();
    location.href = this.top;
  }
  /**
   * modal を表示します
   * @returns {XML} div.signup_wowma__modal
   */
  render() {
    return (
      <div
        className="signup_wowma__modal"
        onClick={this.onClick}
        ref={(element) => (this.modal = element)}
        style={{opacity: 0}}
      >
        <div className="signup_wowma__modal__inner">
          <h2 className="signup_wowma__modal__heading">アカウント登録が完了しました。</h2>
          <p className="signup_wowma__modal__text">会員登録いただき誠にありがとうございます。<br />
            Wowma！クーポン引き換えURLをご登録いただいたメールアドレス宛にお送りいたします。</p>
          <p className="signup_wowma__modal__btn">
            <a className="signup_wowma__modal__btn__link" href="/">TOPへ</a>
          </p>
        </div>
      </div>
    );
  }
}

