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
/**
 * [library] - React
 */
const React = self.React;

/**
 * 「続きを読む」iframe 対応
 * @since 2017-04-17
 */
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
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link ComponentSinglePostBody.propTypes}
   */
  constructor(props) {
    super(props);
    /**
     * React state
     * - height @type {string} - iframe height, default: 100%
     *   iframe.onload 後に再設定します
     * @type {{height: string}}
     */
    this.state = {
      height: '100%'
    };
    /**
     * 記事id - int 保証
     * @type {Number}
     */
    this.id = parseInt(props.single.id, 10);
    /**
     * window.onmessage ラッパー {@link IFrameStatus}.UPDATE event handler
     * iframe ロード後に iframe 内関数から window.postMessage を受診します
     * @type {Function}
     */
    this.boundUpdate = this.onUpdate.bind(this);
    /**
     * iframe height を設定するために window.postMessage を受診する IFrameStatus insatnce - singleton
     * @type {IFrameStatus}
     */
    this.frameStatus = IFrameStatus.factory();
    /**
     * ifrmae コンテナがすでにマウントしたかのフラッグ
     * @type {boolean}
     * @default false;
     */
    this.didMount = false;
    /**
     * `location.search` - iframe src へ追加するために使用します
     * @type {string}
     */
    this.query = location.search;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * IFrameStatus.UPDATE event handler
   * - events.id と this.id が等価の時に処理します
   * - events.height と this.state.height が不等価の時に処理します
   * iframe 高さを設定するために state を更新します
   * @param {Object} events IFrameStatus.UPDATE event object
   */
  onUpdate(events) {
    // console.log('ComponentSinglePostBody.onUpdate', this.id, events.id, this.didMount, events.height);
    if (!this.didMount) {
      return;
    }
    const id = events.id;
    if (id !== this.id) {
      return;
    }
    // const height = events.height;
    const height = `${events.height}px`;
    if (height !== this.state.height) {
      this.setState({ height });
    }
  }
  // ---
  // delegate
  /**
   * delegate - mount 後に IFrameStatus.UPDATE event handler を bind し didMount フラッグを true に設定します
   */
  componentDidMount() {
    const frameStatus = this.frameStatus;
    frameStatus.off(IFrameStatus.UPDATE, this.boundUpdate);
    frameStatus.on(IFrameStatus.UPDATE, this.boundUpdate);
    frameStatus.mount(this.id);
    this.didMount = true;
  }
  /**
   * unmount 時に IFrameStatus.UPDATE イベントハンドラを unbind します
   */
  componentWillUnmount() {
    // console.log('ComponentSinglePostBody.componentWillUnmount', this.id);
    this.frameStatus.off(IFrameStatus.UPDATE, this.boundUpdate);
  }
  /**
   * delegate shouldComponentUpdate - 更新を height 設定が違うときのみに限定します
   * @override
   * @param {Object} nextProps next props
   * @param {Object} nextState next state
   * @returns {boolean} true: force render
   */
  shouldComponentUpdate(nextProps, nextState) {
    // console.log('ComponentSinglePostBody.shouldComponentUpdate', this.id, this.state.height, nextState.height);
    return this.state.height !== nextState.height;
  }
  /**
   * iframe.post-content-iframe をレンダリングします
   * - src - `/p/${id}/content/`
   * @returns {XML} iframe を返します
   */
  render() {
    const id = this.props.single.id;
    let query = this.query;
    return (
      <iframe
        id={`single-iframe-${id}`}
        src={`/p/${id}/content/${query}`}
        frameBorder="0"
        width="100%"
        scrolling="no"
        style={{height: this.state.height}}
        className="post-content-iframe"
      />
    );
  }
}
