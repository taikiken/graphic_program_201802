/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/04/12 - 18:43
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// event
import { IFrameStatus } from '../../event/IFrameStatus';

// React
const React = self.React;

export class ComponentSinglePostBody extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * - single {@link SingleDae} - 記事データ
   * - sp {boolean} - SP フラッグ
   * @return {{single: SingleDae, sp: boolean}} React props
   */
  static get propTypes() {
    return {
      single: React.PropTypes.object.isRequired,
      sp: React.PropTypes.bool.isRequired
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      height: '100%'
    };
    this.id = parseInt(props.single.id, 10);
    this.boundUpdate = this.onUpdate.bind(this);
    this.frameStatus = IFrameStatus.factory();
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  onUpdate(events) {
    const id = events.id;
    if (id !== this.id) {
      return;
    }
    const height = events.height;
    if (height !== this.state.height) {
      this.setState({ height });
    }
  }
  componentDidMount() {
    this.frameStatus.off(IFrameStatus.UPDATE, this.boundUpdate);
    this.frameStatus.on(IFrameStatus.UPDATE, this.boundUpdate);
  }
  render() {
    const id = this.props.single.id;
    return (
      <iframe
        id={`single-iframe-${id}`}
        src={`/single_content/?page=${id}`}
        frameBorder="0"
        width="100%"
        scrolling="no"
        height={this.state.height}
        className="post-content-iframe"
      />
    );
  }
}
