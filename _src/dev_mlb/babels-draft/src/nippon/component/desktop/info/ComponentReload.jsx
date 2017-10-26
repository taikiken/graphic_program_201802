/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/18 - 21:32
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import React, { Component } from 'react';
import PropTypes from 'prop-types';

// event
import RefreshEvent from '../../../event/RefreshEvent';

/**
 * リフレッシュ管理コンテナ出力
 */
export default class ComponentReload extends Component {
  // ---------------------------------------------------
  //  [RECT NATIVE] STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * React.propTypes
   * @type {{interval: number, statusId: number}}
   */
  static propTypes = {
    interval: PropTypes.number.isRequired,
    statusId: PropTypes.number.isRequired,
  };
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link ComponentReload.propTypes}
   */
  constructor(props) {
    super(props);
    /**
     * React state
     * @type {{
     *    reload: string,
     *    loading: string,
     *    auto: string,
     *    manual: string
     * }}
     */
    this.state = {
      reload: 'auto',
      loading: '',
      auto: 'checked',
      manual: '',
      // statusId: props.statusId,
      // interval: props.interval,
    };
    /**
     * リフレッシュ管理（マネージャー機能）instance
     * @type {RefreshEvent}
     * */
    this.refresh = RefreshEvent.factory();
    /**
     * bound onChange, RefreshEvent.DRIVE を発火させます
     * @type {function}
     * */
    this.onChange = this.onChange.bind(this);
    /**
     * bound onClick, RefreshEvent.REFRESH を発火させます
     * @type {function}
     * */
    this.onClick = this.onClick.bind(this);
    /**
     * bind onLoad
     * @type {function(this:ComponentReload)}
     */
    this.onLoad = this.onLoad.bind(this);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  // componentWillMount() {
  //   console.log('ComponentReload.componentWillMount', this.state);
  // }
  /**
   * マウント後に RefreshEvent.LOAD の監視を始めます
   * */
  componentDidMount() {
    this.refresh.on(RefreshEvent.LOAD, this.onLoad);
  }
  // /**
  //  * React props 変更を `state` に反映し描画更新します
  //  * @param {Object} nextProps 更新された React props
  //  */
  // componentWillReceiveProps(nextProps) {
  //   const statusId = nextProps.statusId;
  //   if (statusId !== this.state.statusId) {
  //     this.setState({
  //       statusId,
  //       interval: nextProps.interval,
  //     });
  //   }
  // }
  /**
   * radio.onchange event handler,  RefreshEvent.DRIVE を発火させます
   * @param {Event} event radio.onchange event
   * */
  onChange(event) {
    // event.preventDefault();
    const target = event.target;
    const value = target.value;
    if (value !== this.state.reload) {
      // console.log('onChange', value);
      const state = {
        reload: value,
        auto: '',
        manual: '',
      };
      state[value] = 'checked';
      this.setState(state);
      this.refresh.drive(value);
    }
  }
  /**
   * 再読み込みを開始します
   * @param {Event} event a.onclick event
   * */
  onClick(event) {
    event.preventDefault();
    // this.setState({ loading: 'loading' });
    this.setLoading();
    this.refresh.refresh();
  }
  /**
   * Ajax 取得完了時の event handler, `loading` class を除去します
   * */
  onLoad() {
    // this.setState({ loading: '' });
    if (this.state.loading) {
      this.resetLoading();
    }
  }

  /**
   * state.loading: `loading` 設定します
   * @param {string} [loading=loading] loading 中表示設定
   */
  setLoading(loading = 'loading') {
    this.setState({ loading });
  }

  /**
   * state.loading: `` 設定します
   * @param {string} [loading=loading] loading 中表示削除
   */
  resetLoading(loading = '') {
    // console.log('ComponentReload.resetLoading', this.state);
    this.setState({ loading });
  }
  /**
   * div.reload-block
   * @return {?XML} div.reload-block or null
   * */
  render() {
    // const statusId = this.state.statusId;
    // const interval = this.state.interval;
    const { statusId, interval } = this.props;
    // 0=試合前、1=試合中、2=試合開始遅延、3=試合中断、4=試合終了 8=試合中中止、9=試合前中止
    // if (statusId === 4 || statusId === 8 || statusId === 9) {
    //   return null;
    // }
    // 自動更新 stop 条件を 8=試合中中止、9=試合前中止 へ変更
    // @since 2016-10-23
    if (statusId === 8 || statusId === 9 || interval < 0) {
      return null;
    }
    // output
    return (
      <div id="reload" className="reload-block">
        {/* radio */}
        <div className="reload-switch">
          <div className="switch-auto">
            <input
              type="radio"
              name="reload"
              value="auto"
              id="switch-auto"
              checked={this.state.auto}
              onChange={this.onChange}
            />
            <label htmlFor="switch-auto" className="radio">自動更新{interval}秒</label>
          </div>
          <div className="switch-manual">
            <input
              type="radio"
              name="reload"
              value="manual"
              id="switch-manual"
              checked={this.state.manual}
              onChange={this.onChange}
            />
            <label htmlFor="switch-manual" className="radio">手動更新</label>
          </div>
        </div>
        {/* button */}
        <div className={`btn-reload ${this.state.loading}`}>
          <a href="#reload" onClick={this.onClick}><span>更新</span></a>
        </div>
      </div>
    );
  }
}

