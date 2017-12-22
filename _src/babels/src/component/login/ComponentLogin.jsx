/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/14 - 15:27
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import { ErrorMessage } from '../../data/ErrorMessage';
import ModelLogin from '../../model/login/ModelLogin';
import { Model } from '../../model/Model';
import { ErrorTxt } from '../../app/const/ErrorTxt';
import { Form } from '../../data/Form';
import { UserDae } from '../../dae/UserDae';
import { ErrorDae } from '../../dae/error/ErrorDae';
import { User } from '../../app/User';
import { Loc } from '../../util/Loc';
import { MessageStatus } from '../../event/MessageStatus';
import { Message } from '../../app/const/Message';
import ComponentError from '../error/ComponentError';

/**
 * [library] - React
 */
const React = self.React;

/**
 * login 画面を出力し「ログイン処理」を行います
 * - {@link ModelLogin} - ログイン処理 API
 * - {@link ComponentError} - error 表示
 * - {@link ErrorTxt} - error message 定義
 * @since 2017-12-14
 */
export default class ComponentLogin extends React.Component {
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * login 画面・処理準備を行います
   * @param {*} props React.props
   * */
  constructor(props) {
    super(props);
    // ---
    /**
     * React.state
     * - error {boolean} error flag
     * - email {string} input[name=email].value
     * - password {string} input[name=password].value
     * @type {{
     *  error: boolean,
     *  email: string,
     *  password: string
     * }}
     * */
    this.state = {
      error: false,
      email: '',
      password: '',
    };
    // ---
    const onDone = this.onDone.bind(this);
    const onFail = this.onFail.bind(this);
    const callback = {};
    callback[Model.COMPLETE ] = onDone;
    callback[Model.UNDEFINED_ERROR ] = onFail;
    callback[Model.RESPONSE_ERROR ] = onFail;
    /**
     * bind onDone
     * @type {function}
     * */
    this.onDone = onDone;
    /**
     * bind onFail
     * @type {function}
     * */
    this.onFail = onFail;
    /**
     * {@link ModelLogin} callback list
     * @type {*}
     * */
    this.callback = callback;
    /**
     * form error message 表示用 Object
     * @type {{
     *  password: ErrorMessage,
     *  email: ErrorMessage,
     *  user: ErrorMessage
     * }}
     * */
    this.errors = {
      password: new ErrorMessage(),
      email: new ErrorMessage(),
      user: new ErrorMessage()
    };
    /**
     * form Element - FormData 作成に使用します
     * @type {Element}
     * */
    this.formElement = null;
    /**
     * login API request します
     * @type {ModelLogin}
     * */
    this.model = new ModelLogin(null, callback);
    /**
     * ログイン成功後の「flush message」出力します
     * @type {MessageStatus}
     * */
    this.messageStatus = MessageStatus.factory();
    /**
     * bind onEmailChange
     * @type {function}
     * */
    this.onEmailChange = this.onEmailChange.bind(this);
    /**
     * bind onPasswordChange
     * @type {function}
     * */
    this.onPasswordChange = this.onPasswordChange.bind(this);
    /**
     * bind onSubmit
     * @type {function}
     * */
    this.onSubmit = this.onSubmit.bind(this);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * input[name=email].onchange event handler - value を更新します
   * @param {Event} event input.onchange Event
   * */
  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }
  /**
   * input[name=password].onchange event handler - value を更新します
   * @param {Event} event input.onchange Event
   * */
  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  /**
   * form.onsubmit event handler
   * - error を消します `reset`
   * - 入力チェックを行います `validate`
   * @param {Event} event form.onsubmit Event
   * */
  onSubmit(event) {
    event.preventDefault();
    // error 消去
    this.reset();
    // validate
    this.validate();
  }
  /**
   * {@link ModelLogin} success callback
   * - token を取得しログイン処理を行います `next`
   * @param {Result} result Ajax JSON
   * */
  onDone(result) {
    if (result.status.code === 200) {
      // OK
      // token 取り出し
      const userDae = new UserDae(result.response);
      // -> next step - login / return to top
      this.next(userDae.accessToken);
    } else {
      // 汎用エラー
      // console.log('ComponentLogin.onDone result', result);
      this.errors.user.message = ErrorTxt.NETWORK_ERROR;
      this.setState({ error: true });
    }
  }
  /**
   * {@link ModelLogin} error callback
   * - error message を取り出し、エラー表示を行います
   * @param {Error} error Ajax Error
   * */
  onFail(error) {
    if (error && error.result) {
      const errorDae = new ErrorDae(error.result);
      if (errorDae.errors.hasErrors()) {
        // errors あり
        const errors = errorDae.errors;
        const list = errors.list;
        list.map((key) => {
          const target = this.errors[key];
          if (target) {
            target.message = errors.message(key);
          }
          return key;
        });
      } else {
        // errors なし
        // status error を表示
        this.errors.user.message = errorDae.status.userMessage;
      }
    } else {
      // 汎用エラー
      // console.log('ComponentLogin.onFail 汎用エラー', error);
      this.errors.user.message = ErrorTxt.NETWORK_ERROR;
    }
    this.setState({ error: true });
  }
  /**
   * `errors` property からエラーを表示するか否かを決定します
   * @param {string} keyName email or password or user - key name
   * @returns {string} 必要な場合 error 表示 class を返します
   * */
  errorClass(keyName) {
    const errors = this.errors[keyName];
    return errors && errors.error ? 'error' : '';
  }
  /**
   * `errors` property から error message を取得します
   * @param {string} keyName email or password or user - key name
   * @returns {string} 必要な場合 error message 表示文字列を返します
   * */
  message(keyName) {
    const errors = this.errors[keyName];
    return errors && errors.message ? errors.message : '';
  }
  /**
   * 入力チェックを行います
   * - error -> status error: true にします
   * - no error -> `request` 実行します
   * */
  validate() {
    const { email, password } = this.state;
    if (email === '' || password === '') {
      this.errors.user.message = ErrorTxt.EMAIL_OR_PWD_EMPTY;
      this.setState({ error: true });
    } else {
      this.request();
    }
  }
  /**
   * form から API へ送信する `FormData` を作成し {@link ModelLogin} request 開始します
   * */
  request() {
    const formData = Form.element(this.formElement);
    const model = this.model;
    model.data = formData;
    model.start();
  }
  /**
   * login 処理を行います
   * - 思考すると {@link MessageStatus}.flush を表示し, home(index) へ遷移します {@link Loc}.index
   * @param {string} token user token - login cookie に使用します
   * */
  next(token) {
    // login
    // token setup
    if (User.login(token)) {
      // flush message
      this.messageStatus.flush(MessageStatus.message(Message.LOGIN_COMPLETE), MessageStatus.SUCCESS);
      // return to index(top);
      setTimeout(Loc.index, 500);
    }
  }
  /**
   * error を非表示にします
   * */
  reset() {
    const errors = this.errors;
    errors.email.reset();
    errors.password.reset();
    errors.user.reset();
    this.setState({ error: false });
  }
  /**
   * ログインフォームを表示します
   * @returns {XML} `form`
   * */
  render() {
    const { email, password } = this.state;
    return (
      <form
        onSubmit={this.onSubmit}
        ref={(element) => (this.formElement = element)}
        encType="application/x-www-form-urlencoded"
      >
        <span className={`form-parts ${this.errorClass('email')}`}>
          <span className="setting-form-mail form-input">
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.onEmailChange}
              placeholder={Message.PLACEHOLDER_EMAIL}
            />
          </span>
          <ComponentError message={this.message('email')} />
        </span>
        <span className={`form-parts ${this.errorClass('password')}`}>
          <span className="setting-form-pw form-input">
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.onPasswordChange}
              placeholder={Message.PLACEHOLDER_PWD}
            />
          </span>
          <ComponentError message={this.message('password')} />
        </span>
        {/* button */}
        <div className={`form-parts form-submit-parts ${this.errorClass('user')}`}>
          <span className="setting-form-submit mod-btnA01">
            <input type="submit" value={Message.SUBMIT_LOGIN} />
          </span>
          <ComponentError message={this.message('user')} />
        </div>
      </form>
    );
  }
}
