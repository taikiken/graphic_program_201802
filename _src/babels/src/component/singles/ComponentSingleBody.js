/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/25 - 12:46
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// React
const React = self.React;

export class ComponentSingleBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      single: props.single
    };
  }
  componentDidMount() {}
  render() {}
  updateBody(single) {
    this.setState({ single });
  }
}

ComponentSingleBody.propTypes = {
  single: React.PropTypes.object.isRequired,
  callback: React.PropTypes.func.isRequired
};
