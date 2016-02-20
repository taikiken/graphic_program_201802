/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/19 - 19:48
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {View} from '../View';
import {ModelUserDetect} from '../../model/signup/ModelUserDetect';

// node
import {HeadingNode} from '../../node/signup/HeadingNode';
import {RootNode} from '../../node/signup/RootNode';

import {SignupStatus} from '../../event/SignupStatus';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

export class SignupWizard extends View {
  constructor( element:Element, option:Object = {} ) {
    super( element, option );
  }
  start():void {
    this.render( 1 );
  }
  render( stepNumber:Number = 1 ):void {

    let SignupDom = React.createClass( {
      propTypes: {
        step: React.PropTypes.number.isRequired
      },
      getInitialState: function() {
        this.status = SignupStatus.factory();

        return {
          step: this.props.step
        };
      },
      render: function() {
        return (
          <div className={'signup signup-' + this.state.step }>
            {/**/}
            <HeadingNode step={this.props.step} />
            <RootNode step={this.props.step} />
          </div>
        );
      },
      componentDidMount: function() {
        this.status.on( SignupStatus.SIGNUP_STEP, this.stepChange );
      },
      componentWillUnMount: function() {
        this.status.off( SignupStatus.SIGNUP_STEP, this.stepChange );
      },
      stepChange: function( event:Object ):void {
        this.updateStep( event.step );
      },
      updateStep: function( step:Number ) {
        this.setState( { step: step } );
      }
    } );

    ReactDOM.render(
      <SignupDom
        step={stepNumber}
      />,
      this.element
    );

  }
}
