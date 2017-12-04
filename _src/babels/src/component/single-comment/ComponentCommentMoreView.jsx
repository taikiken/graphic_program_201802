/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/04 - 19:38
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

const React = self.React;

export default class ComponentCommentMoreView extends React.Component {
  static get propTypes() {
    return {
      action: React.PropTypes.object.isRequired,
      show: React.PropTypes.bool,
      rest: React.PropTypes.number,
    };
  }
  static get defaultProps() {
    return {
      show: false,
      rest: 0,
    };
  }
  constructor(props) {
    super(props);
    // ---
    this.state = {
      loading: '',
      show: props.show,
      rest: props.rest,
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick(event) {
    event.preventDefault();
    this.setState({ loading: 'loading' });
    this.props.action.next();
  }
  componentWillReceiveProps(nextProps) {
    const { show, rest } = nextProps;
    const state = {};
    let changed = false;
    if (this.state.show !== show) {
      changed = true;
      state.show = show;
    }
    if (this.state.rest !== rest) {
      changed = true;
      state.rest = rest;
    }
    if (changed) {
      this.setState(state);
    }
  }
  render() {
    const { show, rest, loading } = this.state;
    if (!show || rest === 0) {
      // button 表示なし
      return (
        <div className="no-more" />
      );
    }
    // ---
    return (
      <div id="more" className={`comment-andmore loading-root ${loading}`}>
        <a href={'#more'} onClick={this.onClick} >他{rest}件を表示</a>
        <span className="loading-spinner">&nbsp;</span>
      </div>
    );
  }
}
