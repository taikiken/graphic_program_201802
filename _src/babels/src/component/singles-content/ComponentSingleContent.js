/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/11/02 - 22:45
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// React
const React = self.React;

export class ComponentSingleContent extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  static get propTypes() {
    return {
      single: React.PropTypes.object.isRequired,
      show: React.PropTypes.bool.isRequired
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      single: props.single,
      show: props.show
    };
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  componentDidMount() {

  }
  /**
   * state.single 情報を更新し再描画します
   * @param {SingleDae} single state.single
   */
  updateSingle(single) {
    this.setState({ single });
  }
  updateShow(show) {
    if (this.state.show !== show) {
      this.setState({ show });
    }
  }
  render() {
    if (!this.state.show) {
      return null;
    }

    return (
      <p>XXX</p>
    );
  }
}
