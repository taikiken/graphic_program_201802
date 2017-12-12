/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/12 - 15:48
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import { ErrorMessage } from '../../data/ErrorMessage';
import { SearchStatus } from '../../event/SearchStatus';
import { Url } from '../../app/const/Url';
import { Message } from '../../app/const/Message';
// React
/**
 * [library] - React
 */
const React = self.React;

/**
 * header - 検索フォームを出力します
 */
export default class ComponentHeaderSearchForm extends React.Component {
  // ---------------------------------------------------
  //  STATIC METHODS
  // ---------------------------------------------------
  /**
   * React.propTypes
   * @returns {{listen: boolean, show: boolean}} React.propTypes
   */
  static get propTypes() {
    return {
      listen: React.PropTypes.bool,
      show: React.PropTypes.bool,
    };
  }
  /**
   * React.defaultProps
   * @returns {{listen: boolean, show: boolean}} listen: false, show: true
   */
  static get defaultProps() {
    return {
      listen: false,
      show: true,
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * header - 検索フォームの準備をします
   * @param {*} props React.props
   */
  constructor(props) {
    super(props);
    // ---
    /**
     * React.state
     * @type {{show: boolean, focus: string, keyword: string, enable: string, error: boolean}}
     */
    this.state = {
      show: props.show,
      focus: '',
      keyword: '',
      enable: '',
      error: false,
    };
    /**
     * error state
     * @type {{keyword: ErrorMessage}}
     */
    this.errors = {
      keyword: new ErrorMessage()
    };
    /**
     * sp search form open / close マネージャー
     * @type {?SearchStatus}
     */
    this.status = props.listen ? SearchStatus.factory() : null;
    /**
     * bind onOpen
     * @type {function}
     */
    this.onOpen = this.onOpen.bind(this);
    /**
     * bind onClose
     * @type {function}
     */
    this.onClose = this.onClose.bind(this);
    /**
     * bind onSubmit
     * @type {function}
     */
    this.onSubmit = this.onSubmit.bind(this);
    /**
     * bind onChange
     * @type {function}
     */
    this.onChange = this.onChange.bind(this);
  }
  // ---------------------------------------------------
  //  METHODS
  // ---------------------------------------------------
  /**
   * SearchStatus event を unwatch します
   */
  dispose() {
    const status = this.status;
    if (status) {
      status.off(SearchStatus.OPEN, this.onOpen);
      status.off(SearchStatus.CLOSE, this.onClose);
    }
  }
  /**
   * error をリセットします
   */
  reset() {
    this.errors.keyword.reset();
    this.setState({ error: false });
  }

  /**
   * form.onsubmit event handler - search location へ遷移します
   * @param {Event} event submit event
   */
  onSubmit(event) {
    event.preventDefault();
    this.reset();

    if (this.state.keyword === '') {
      this.errors.keyword.message = '***';
      this.setState({ error: true });
    } else {
      location.href = Url.search(this.state.keyword);
    }
  }
  /**
   * input.onchange event handler - input.balue を書き換えます
   * @param {Event} event input.onchange event
   */
  onChange(event) {
    this.setState({ keyword: event.target.value });
  }
  /**
   * SearchStatus.OPEN event handler
   * - SP: form open します
   */
  onOpen() {
    this.reset();
    this.setState({ enable: 'enable', show: true });
  }
  /**
   * SearchStatus.CLOSE event handler
   * - SP: form close します
   */
  onClose() {
    this.setState({ enable: '', show: false });
  }

  /**
   * delegate, after - mount
   * - SP, {@link SearchStatus}.[OPEN|CLOSE] event bind します
   */
  componentDidMount() {
    const status = this.status;
    if (status) {
      this.dispose();
      status.on(SearchStatus.OPEN, this.onOpen);
      status.on(SearchStatus.CLOSE, this.onClose);
    }
  }

  /**
   * `dispose` 実行します
   */
  componentWillUnMount() {
    this.dispose();
  }

  /**
   * header 検索フォームを出力します
   * @returns {?XML} `div.head-search` 出力します
   */
  render() {
    const {
      show,
      enable,
      keyword,
    } = this.state;
    if (!show) {
      return null;
    }

    const { listen } = this.props;
    const errorClass = this.errors.keyword.error ? 'error' : '';

    return (
      <div
        className={`head-search form-parts ${errorClass} ${enable}`}
      >
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            ref="searchText"
            placeholder={Message.PLACEHOLDER_SEARCH}
            value={keyword}
            onChange={this.onChange}
            autoFocus={listen}
          />
          <input type="submit" value={Message.SUBMIT_SEARCH}/>
        </form>
      </div>
    );
  }
}
