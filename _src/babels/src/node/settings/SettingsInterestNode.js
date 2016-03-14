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
'use strict';

// app
import {Message} from '../../app/const/Message';

// data
import {Result} from '../../data/Result';
import {Form} from '../../data/Form';
// import {ErrorMessage} from '../../data/ErrorMessage';

// node
// import {ErrorNode} from '../error/ErrorNode';

// event
import {SettingsStatus} from '../../event/SettingsStatus';

// model
import {Model} from '../../model/Model';
import {ModelInterestEdit} from '../../model/settings/ModelInterestEdit';

import {SlugDae} from '../../dae/caegories/SlugDae';

// react
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * <h3>React component<h3>
 * **SettingsInterestNode**
 * パーソナライズ設定
 * 興味のある競技
 */
export let SettingsInterestNode = React.createClass( {
  propTypes: {
    dae: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    this.status = SettingsStatus.factory();
    this.model = null;
    this.callback = null;

    return {
      dae: this.props.dae,
      loading: ''
    };
  },
  render: function() {

    let categories = this.state.dae.all;
    /*
    let checkedClass = ( category:SlugDae ):string => {
      return category.isInterest ? 'checked="checked"' : '';
    };
    */

    return (
      <div className="interest-setting setting-form">
        <form ref="settings" className={'loading-root ' + this.state.loading} onSubmit={this.submitHandler}>
          <fieldset className="fieldset-step-3">
            <div className="setting-form-interest">
              <ul className="setting-form-interest-list">
                {
                  categories.map( function( category:SlugDae, i ) {
                    return (
                      <li key={category.slug} className={'setting-form-interest-item interest-item-' + category.slug }>
                        <input
                          className={'interest-item interest-item-' + i}
                          type="checkbox"
                          name="interest[]"
                          id={'interest-item-' + category.slug}
                          defaultValue={category.id}
                          defaultChecked={category.isInterest ? 'checked' : ''}
                        />
                        <label htmlFor={'interest-item-' + category.slug} className="setting-form-interest-title">
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
          <div className="loading-spinner"></div>
        </form>
      </div>
    );
  },
  componentDidMount: function() {
    if ( this.callback === null ) {
      let callback = {};
      this.callback = callback;
      callback[ Model.COMPLETE ] = this.done;
      callback[ Model.UNDEFINED_ERROR ] = this.fail;
      callback[ Model.RESPONSE_ERROR ] = this.fail;
    }
  },
  componentWillUnMount: function() {
    this.dispose();
  },
  submitHandler: function( event:Event ) {
    event.preventDefault();
    this.prepareNext();
  },
  prepareNext: function():void {
    let formData = Form.element( ReactDOM.findDOMNode( this.refs.settings ) );

    let model = this.model;
    if ( model === null ) {
      model = new ModelInterestEdit( formData, this.callback );
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
    this.status.dispatch( { type: SettingsStatus.INTEREST_COMPLETE } );
  },
  done: function( result:Result ) {
    console.log( 'done ', result );
    this.setState( { loading: '' } );

    if ( result.status.code === 200 ) {
      // OK -> next step
      this.next();
    }
  },
  fail: function( error:Error ) {
    console.log( 'fail', error );
    this.setState( { loading: '' } );
  },
  reset: function() {
    this.setState( { error: false } );
  },
  dispose: function() {

  }
} );
