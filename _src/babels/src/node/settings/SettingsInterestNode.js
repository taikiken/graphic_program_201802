/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/02 - 17:53
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// app
import {Message} from '../../app/const/Message';

// data
// import {Result} from '../../data/Result';
import {Form} from '../../data/Form';
// import {ErrorMessage} from '../../data/ErrorMessage';

// dae
import {StatusDae} from '../../dae/StatusDae';

// node
// import {ErrorNode} from '../error/ErrorNode';

// event
import {SettingsStatus} from '../../event/SettingsStatus';
import {MessageStatus} from '../../event/MessageStatus';

// model
import {Model} from '../../model/Model';
import {ModelInterestEdit} from '../../model/settings/ModelInterestEdit';

// import {SlugDae} from '../../dae/categories/SlugDae';

// react
/**
 * [library] - React
 */
const React = self.React;
// const ReactDOM = self.ReactDOM;

/**
 * パーソナライズ設定
 * - 興味のある競技
 * @type {ReactClass}
 */
export const SettingsInterestNode = React.createClass( {
  propTypes: {
    dae: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    this.status = SettingsStatus.factory();
    // message status instance
    this.messageStatus = MessageStatus.factory();

    this.model = null;
    this.callback = null;
    // ---
    // refs. やめる - 2017-12-27
    this.settingsElement = null;
    // ---
    return {
      dae: this.props.dae,
      loading: ''
    };
  },
  submitHandler: function( event:Event ) {
    event.preventDefault();
    this.prepareNext();
  },
  prepareNext: function():void {
    // let formData = Form.element( ReactDOM.findDOMNode( this.refs.settings ) );
    const formData = Form.element(this.settingsElement);

    let model = this.model;
    if (model === null) {
      model = new ModelInterestEdit(formData, this.callback);
      this.model = model;
    } else {
      model.data = formData;
    }
    // error 消去
    this.reset();
    // ajax start
    model.start();
  },
  next: function() {
    this.status.dispatch({ type: SettingsStatus.INTEREST_COMPLETE });
  },
  done: function(result) {
    // console.log( 'interest ** done ', result );
    this.setState({ loading: '' });

    if (result.status.code === 200) {
      // OK -> next step
      this.next();
      // flush message
      const status = new StatusDae(result.status);
      this.messageStatus.flush(MessageStatus.message(status.userMessage), MessageStatus.SUCCESS);
    }
  },
  fail: function(/* error:Error */) {
    // console.log( 'fail', error );
    this.setState({ loading: '' });
  },
  reset: function() {
    this.setState({ error: false });
  },
  componentDidMount: function() {
    if (this.callback === null) {
      const callback = {};
      this.callback = callback;
      callback[Model.COMPLETE] = this.done;
      callback[Model.UNDEFINED_ERROR] = this.fail;
      callback[Model.RESPONSE_ERROR] = this.fail;
    }
  },
  render: function() {
    const categories = this.state.dae.all;
    /*
    let checkedClass = ( category:SlugDae ):string => {
      return category.isInterest ? 'checked="checked"' : '';
    };
    */
    return (
      <div className="interest-setting setting-form">
        <form
          ref={(element) => (this.settingsElement = element)}
          className={`loading-root ${this.state.loading}`}
          onSubmit={this.submitHandler}
        >
          <fieldset className="fieldset-step-3">
            <div className="setting-form-interest">
              <ul className="setting-form-interest-list">
                {
                  // @param {SlugDae} category
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
                          defaultChecked={category.isInterest ? 'checked' : ''}
                        />
                        <label
                          htmlFor={`interest-item-${category.slug}`}
                          className="setting-form-interest-title"
                        >
                          <span>{category.label}</span>
                        </label>
                      </li>
                    );
                  } )
                }
              </ul>
            </div>
          </fieldset>
          {/* button */}
          <div className="form-parts">
            <span className="setting-form-submit mod-btnB01">
              <input type="submit" value={Message.BUTTON_SAVE} />
            </span>
          </div>
          <div className="loading-spinner" />
        </form>
      </div>
    );
  },
  /*
  componentWillUnMount: function() {
    this.dispose();
  },*/
  /* ,
  dispose: function() {

  }*/
} );
