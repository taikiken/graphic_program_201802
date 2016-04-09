/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/13 - 23:11
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// app
import {Url} from '../../app/const/Url';
import {Message} from '../../app/const/Message';

// event
import {SearchStatus} from '../../event/SearchStatus';

// data
import {ErrorMessage} from '../../data/ErrorMessage';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * 検索フォーム
 * @type {ReactClass}
 */
export let HeaderSearchNode = React.createClass( {
  propTypes: {
    listen: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      listen: false
    };
  },
  getInitialState: function() {
    this.input = null;
    this.status = null;
    this.errors = {
      keyword: new ErrorMessage()
    };

    return {
      focus: '',
      keyword: '',
      enable: '',
      error: false
    };
  },
  render: function() {

    // let _this = this;

    let errorClass = ( keyName:string ) => {
      return this.errors[ keyName ].error ? 'error' : '';
    };
/*
 ref={function( input ) {
 _this.input = input;
 }}
 */
    return (
      <div className={`head-search form-parts ${errorClass('keyword')} ${this.state.enable}`}>
        <form onSubmit={this.submitHandler}>
          <input
            type="text"
            ref="searchText"
            placeholder={Message.PLACEHOLDER_SEARCH}
            value={this.state.keyword}
            onChange={this.changeHandler}
            autoFocus="true"
          />
          <input type="submit" value={Message.SUBMIT_SEARCH}/>
        </form>
      </div>
    );
  },
  componentDidMount: function() {
    if ( this.props.listen && this.status === null ) {
      let status = SearchStatus.factory();
      this.status = status;
      status.on( SearchStatus.OPEN, this.open );
      status.on( SearchStatus.CLOSE, this.close );
    }

    /*
    if ( this.input === null ) {
      this.input = ReactDOM.findDOMNode( this.refs.searchText );
    }
    */
  },
  componentWillUnMount: function() {
    if ( this.status !== null ) {
      let status = this.status;
      status.off( SearchStatus.OPEN, this.open );
      status.off( SearchStatus.CLOSE, this.close );
    }
  },
  changeHandler: function( event ) {
    this.setState( {keyword: event.target.value} );
  },
  submitHandler: function( event ) {
    event.preventDefault();
    this.reset();

    if ( this.state.keyword === '' ) {
      this.errors.keyword.message = '***';
      this.setState( { error: true } );
    } else {

      location.href = Url.search( this.state.keyword );

    }
  },
  reset: function() {
    this.errors.keyword.reset();
    this.setState( { error: false } );
  },
  open: function() {
    this.reset();
    this.setState( { enable: 'enable' } );
    // this.input.focus();
    // ReactDOM.findDOMNode( this.refs.searchText ).focus();
    /*
    console.log( 'open input', ReactDOM.findDOMNode( this.refs.searchText ) );
    this.setState( {focus: 'focus='} );
    */
    // ToDo: open event 経由の時の focus
    // if ( this.input !== null ) {
    //   this.input.focus();
    // }
    ReactDOM.findDOMNode( this.refs.searchText ).focus();
  },
  close: function() {
    this.setState( { enable: '' } );
    // this.input.blur();
  }
} );
