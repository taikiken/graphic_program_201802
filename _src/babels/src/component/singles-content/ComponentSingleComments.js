/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/11/05 - 12:31
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// React
const React = self.React;

export class ComponentSingleComments extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  static get propTypes() {
    return {
      single: React.PropTypes.object.isRequired,
      sign: React.PropTypes.bool.isRequired,
      index: React.PropTypes.number.isRequired,
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      single: props.single,
      sign: props.sign,
      index: props.index
    };
  }
  componentDidMount() {

  }
  render() {
    if (!this.state.sign) {
      return null;
    }
    return (
      <div className={`comment comment-${this.state.single.id}`}>
        <div className="comment-self-container" ref="commentSelf" />
        <div className="comment-official-container" ref="commentOfficial" />
        <div className="comment-normal-container" ref="commentNormal" />
        <div className="comment-form-container" ref="commentForm" />
      </div>
    );
  }
}
