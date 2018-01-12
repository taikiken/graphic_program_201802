/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/11/07 - 16:35
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// event
import { SignupStatus } from '../../event/SignupStatus';
import { MessageStatus } from '../../event/MessageStatus';

// model
import { Model } from '../../model/Model';

// data
import { Form } from '../../data/Form';

// model
import { ModelSignup } from '../../model/signup/ModelSignup';

// dae
import { UserDae } from '../../dae/UserDae';
import { StatusDae } from '../../dae/StatusDae';

// app
import { User } from '../../app/User';
import { Message } from '../../app/const/Message';

// util
import { Loc } from '../../util/Loc';

// modal
import ComponentWowCompleteModal from '../modal/ComponentWowCompleteModal';

// React
/**
 * [library] - React
 */
const React = self.React;
/**
 * [library] - ReactDOM
 */
const ReactDOM = self.ReactDOM;

/**
 * {@link SignupWizard} から抜き出す - ユーザー新規登録ウィザード - step 3
 * - 最終 submit
 * @since 2017-11-07
 */
export class ComponentStep3Form extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * React.propTypes
   * @returns {{step: number, categories: Array.<*>, getForm: function, beforeRedirect: function, wow: boolean}}
   * React.propTypes を返します
   */
  static get propTypes() {
    return {
      step: React.PropTypes.number.isRequired,
      categories: React.PropTypes.array.isRequired,
      getForm: React.PropTypes.func.isRequired,
      beforeRedirect: React.PropTypes.func.isRequired,
      // since 2017-11-07
      wow: React.PropTypes.bool.isRequired,
      container: React.PropTypes.object,
    };
  }
  /**
   * React.defaultProps
   * @returns {{container: null}} React.defaultProps
   */
  static get defaultProps() {
    return {
      container: null,
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * ユーザー新規登録ウィザード - step 3 - property を準備します
   * @param {*} props React.props
   */
  constructor(props) {
    super(props);
    // ---
    this.state = {
      categories: props.categories,
      // step: props.step,
      // error: false,
    };
    /**
     * SignupStatus instance - wizard step 通知を受けます
     * @type {SignupStatus}
     */
    this.status = SignupStatus.factory();
    // message status instance
    /**
     * MessageStatus instance - flush message
     * @type {MessageStatus}
     */
    this.messageStatus = MessageStatus.factory();
    /**
     * ModelSignup - signup action
     * @type {?ModelSignup}
     */
    this.model = null;
    /**
     * {@link ModelSignup} event handler
     * @type {?object}
     */
    this.callback = null;
    /**
     * reset callback
     * @type {?function}
     */
    this.reset = null;
    /**
     * bind onStepChange - {@link SignupStatus}.SIGNUP_STEP event handler
     * @type {function(this:ComponentStep3Form)}
     */
    this.onStepChange = this.onStepChange.bind(this);
    /**
     * bind onSubmitHandler - {@link SignupStatus}.SIGNUP_SUBMIT event handler
     * @type {function(this:ComponentStep3Form)}
     */
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    /**
     * bind onNextHandler - input['button'].onclick event handler
     * @type {function(this:ComponentStep3Form)}
     */
    this.onNextHandler = this.onNextHandler.bind(this);
    /**
     * bind done - {@link Model}.COMPLETE event handler
     * @type {function(this:ComponentStep3Form)}
     */
    this.done = this.done.bind(this);
    /**
     * bind fail - {@link Model}.[UNDEFINED_ERROR|RESPONSE_ERROR] event handler
     * @type {function(this:ComponentStep3Form)}
     */
    this.fail = this.fail.bind(this);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * {@link SignupStatus}.SIGNUP_STEP event handler
   * @param {{ step: number }} events SignupStatus.SIGNUP_STEP
   */
  onStepChange(events) {
    this.updateStep(events.step);
  }
  /**
   * {@link SignupStatus}.SIGNUP_SUBMIT event handler
   * @param {{ step: number }} events SignupStatus.SIGNUP_SUBMIT
   */
  onSubmitHandler(events) {
    if (events.step === this.props.step) {
      this.prepareNext();
    }
  }
  /**
   * input['button'].onclick event handler
   * @param {Event} event click Event
   */
  onNextHandler(event) {
    event.preventDefault();
    this.prepareNext();
  }
  /**
   * delegate componentDidMount
   * - SignupStatus.SIGNUP_STEP - event bind
   * - SignupStatus.SIGNUP_SUBMIT - event bind
   *
   * - {@link Model}.[COMPLETE|UNDEFINED_ERROR|RESPONSE_ERROR] 設定します
   */
  componentDidMount() {
    this.unbind();
    const status = this.status;
    status.on(SignupStatus.SIGNUP_STEP, this.onStepChange);
    status.on(SignupStatus.SIGNUP_SUBMIT, this.onSubmitHandler);
    // ---
    let callback = this.callback;
    if (!callback) {
      callback = {};
      callback[Model.COMPLETE] = this.done;
      callback[Model.UNDEFINED_ERROR] = this.fail;
      callback[Model.RESPONSE_ERROR] = this.fail;
      this.callback = callback;
    }
  }
  /**
   * delegate componentWillUnMount
   * - SignupStatus.SIGNUP_STEP - event unbind
   * - SignupStatus.SIGNUP_SUBMIT - event unbind
   */
  componentWillUnMount() {
    this.unbind();
  }
  /**
   * delegate shouldComponentUpdate
   * @param {*} nextProps 次の props
   * @param {*} nextState 次の state
   * @returns {boolean} true: render
   */
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.step === nextState.step;
  }
  /**
   * - SignupStatus.SIGNUP_STEP - event unbind
   * - SignupStatus.SIGNUP_SUBMIT - event unbind
   */
  unbind() {
    const status = this.status;
    status.off(SignupStatus.SIGNUP_STEP, this.onStepChange);
    status.off(SignupStatus.SIGNUP_SUBMIT, this.onSubmitHandler);
  }

  /**
   * state.step 値を更新します
   * @param {number} step wizard step
   */
  updateStep(step) {
    this.setState({ step });
  }
  // ---------------------------------------------------
  /**
   * 次の表示の準備を行います
   * - {@link ModelSignup} リクエストを行います
   */
  prepareNext() {
    const formData = Form.element(this.props.getForm());
    // create
    // 新規登録
    formData.append('create', true);
    let model = this.model;
    if (!model) {
      model = new ModelSignup(formData, this.callback);
      this.model = model;
    } else {
      model.data = formData;
    }
    // error 消去
    if (this.reset) {
      this.reset();
    }
    // ajax start
    model.start();
  }
  /**
   * {@link ModelSignup} リクエスト success
   * - {@link UserDae} token 取り出し
   * - {@link StatusDae}, {@link MessageStatus} - flush message を使用します
   * -
   * @param {Result} result ajax JSON data
   */
  done(result) {
    if (result.status.code === 200) {
      // wow 別処理
      if (this.props.wow) {
        this.doneWow(result);
        return;
      }
      // OK
      // token 取り出し
      const userDae = new UserDae(result.response);

      // flush message
      const status = new StatusDae(result.status);
      this.messageStatus.flush(MessageStatus.message(status.userMessage), MessageStatus.SUCCESS);

      // -> next step
      this.next( userDae.accessToken );
    }
  }
  /**
   * {@link ModelSignup} リクエスト error
   * @param {Error} error ajax error
   */
  fail(error) {
    console.warn('ComponentStep3Form.fail', error, this.wow);
  }

  /**
   * `signup-wow` 登録完了処理を行います
   * - modal を表示し OK で top へ戻ります
   * @param {Result} result ajax JSON data
   */
  doneWow(result) {
    // OK
    // token 取り出し
    const userDae = new UserDae(result.response);
    if (User.login(userDae.accessToken)) {
      // modal open
      // console.log('ComponentStep3Form.doneWow', this.wow);
      // onbeforeunload を解除するため
      this.props.beforeRedirect();
      // modal component
      ReactDOM.render(
        <ComponentWowCompleteModal />,
        this.props.container
      );
    }
  }
  next(token) {
    // login
    // console.log( '----success--- ', token );
    // token setup
    if (User.login(token)) {
      // redirect 通知
      // onbeforeunload を解除するため
      this.props.beforeRedirect();
      // home
      Loc.index();
    }
  }
  render() {
    const { categories } = this.props;
    return (
      <fieldset className="fieldset-step-3">
        <div className="setting-form-interest">
          <ul className="setting-form-interest-list">
            {
              categories.map((category, i) => {
                return (
                  <li
                    key={category.slug}
                    className={`setting-form-interest-item interest-item-${category.slug}`}
                  >
                    <input
                      className={`interest-item interest-item-${i}`}
                      type="checkbox"
                      name="interest[]"
                      id={`interest-item-${category.slug}`}
                      defaultValue={category.id}
                    />
                    <label htmlFor={`interest-item-${category.slug}`} className="setting-form-interest-title">
                      <span>{category.label}</span>
                    </label>
                  </li>
                );
              } )
            }
          </ul>
        </div>
        <div className="form-parts">
          <span className="setting-form-submit mod-btnA01">
            <input type="button" value={Message.BUTTON_RESISTER} onClick={this.onNextHandler}/>
          </span>
        </div>
      </fieldset>
    );
  }
}

/**
 * **signup step 3**
 *
 * 新規会員登録」入力フォームコンテナ<br>
 * 「興味のある競技」
 * @param {number} step - wizard step
 * @param {Array.<object>} categories - {@link CategoriesDae}.categories JSON response.categories
 * @param {function} getForm - callback
 * @param {function} beforeRedirect - callback
 * @param {boolean} wow - signup-wow flag
 * @param {Element} container - modal insert container
 * @returns {XML} `div.fieldset-container.fieldset-container-3`
 * @constructor
 */
export const ComponentLegendStep3 = ({ step, categories, getForm, beforeRedirect, wow, container }) => {
  return (
    <div className="fieldset-container fieldset-container-3">
      <ComponentStep3Form
        step={step}
        categories={categories}
        getForm={getForm}
        beforeRedirect={beforeRedirect}
        wow={wow}
        container={container}
      />
    </div>
  );
};

/**
 * {@link LegendStep3Node} - React.propTypes
 * @type {{step: number, categories: Array.<object>, getForm: function, beforeRedirect: function, wow: boolean, container: Element}}
 */
ComponentLegendStep3.propTypes = {
  step: React.PropTypes.number.isRequired,
  categories: React.PropTypes.array.isRequired,
  getForm: React.PropTypes.func.isRequired,
  beforeRedirect: React.PropTypes.func.isRequired,
  wow: React.PropTypes.bool.isRequired,
  container: React.PropTypes.object,
};

ComponentLegendStep3.defaultProps = {
  container: null,
};
