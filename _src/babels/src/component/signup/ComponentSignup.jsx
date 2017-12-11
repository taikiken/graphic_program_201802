/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/11/07 - 14:15
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// event
import { SignupStatus } from '../../event/SignupStatus';

// dae
import { CategoriesDae } from '../../dae/categories/CategoriesDae';

// node
import { HeadingNode } from '../../node/signup/HeadingNode';
import { RootNode } from '../../node/signup/RootNode';

// React
const React = self.React;

/**
 * {@link SignupWizard} から抜き出す - ユーザー新規登録ウィザード
 * - signup wizard を作成しステップ入力画面を管理します
 * @since 2017-11-07
 */
export default class ComponentSignup extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * React.propTypes
   * - step {number} - wizard step
   * - dae {CategoriesDae} - JSON data
   * - didMount {?function} - componentDidMount callback
   * - beforeRedirect {?function} - 登録完了 callback
   * - sp {boolean=false} - sp flag
   * @returns {{step: number, dae: CategoriesDae, didMount: function, beforeRedirect: function, sp: boolean}}
   * React.propTypes を返します
   */
  static get propTypes() {
    return {
      step: React.PropTypes.number.isRequired,
      // 興味のあるカテゴリーに使用するカテゴリー一覧
      dae: React.PropTypes.instanceOf(CategoriesDae).isRequired,
      // 以下 isRequired へ変更 - 2017-11-13
      didMount: React.PropTypes.func.isRequired,
      beforeRedirect: React.PropTypes.func.isRequired,
      sp: React.PropTypes.bool.isRequired,
      // since 2017-11-13
      wow: React.PropTypes.bool.isRequired,
      // div#js-wow-modal-container - modal insert container
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
   * ユーザー新規登録ウィザード - property の準備をします
   * @param {*} props React.props
   */
  constructor(props) {
    super(props);
    // ---
    /**
     * React.state
     * @type {{step: number}}
     */
    this.state = {
      step: props.step,
    };
    /**
     * SignupStatus instance - wizard step 通知を受けます
     * @type {SignupStatus}
     */
    this.status = SignupStatus.factory();
    /**
     * bind onStepChange - {@link SignupStatus}.SIGNUP_STEP event handler
     * @type {function(this:ComponentSignup)}
     */
    this.onStepChange = this.onStepChange.bind(this);
    /**
     * bind onBeforeRedirect - 登録完了時に呼び出される callback
     * @type {function(this:ComponentSignup)}
     */
    this.onBeforeRedirect = this.onBeforeRedirect.bind(this);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * {@link SignupStatus}.SIGNUP_STEP event handler
   * - step status を変更します
   * @param {{step: number}} events SignupStatus.SIGNUP_STEP event
   */
  onStepChange(events) {
    // SignupStatus.SIGNUP_STEP 発生後 step 値を update する
    this.updateStep(events.step);
  }
  /**
   * 登録完了 `Component` から呼び出されます
   * `props.beforeRedirect` を call します
   */
  onBeforeRedirect() {
    // onbeforeunload を unbind し
    // home へ遷移するのに警告が出ないようにします
    if (this.props.beforeRedirect) {
      this.props.beforeRedirect();
    }
  }
  /**
   * delegate - componentDidMount
   * - `props.didMount` を call します
   * - {@link SignupStatus}.SIGNUP_STEP event を bind します
   */
  componentDidMount() {
    if (this.props.didMount) {
      this.props.didMount();
    }
    // SignupStatus
    this.dispose();
    this.status.on(SignupStatus.SIGNUP_STEP, this.onStepChange);
  }
  /**
   * delegate - componentWillUnMount
   * - {@link SignupStatus}.SIGNUP_STEP event を unbind します
   */
  componentWillUnMount() {
    this.dispose();
  }
  /**
   * `state.step` を変更します
   * @param {number} step 更新する step No.
   */
  updateStep(step) {
    this.setState({ step });
  }
  /**
   * delegate - componentWillUnMount
   * - {@link SignupStatus}.SIGNUP_STEP event を unbind します
   */
  dispose() {
    this.status.off(SignupStatus.SIGNUP_STEP, this.onStepChange);
  }
  /**
   * React.render
   * - {@link HeadingNode}
   * - {@link RootNode}
   * @returns {XML} div.signup-step
   */
  render() {
    const { step, dae, sp } = this.props;
    return (
      <div className={`signup-step signup-${this.state.step}`}>
        <HeadingNode
          step={step}
        />
        <RootNode
          step={step}
          categories={dae.categories}
          sp={sp}
          beforeRedirect={this.onBeforeRedirect}
          wow={this.props.wow}
          container={this.props.container}
        />
      </div>
    );
  }
}
