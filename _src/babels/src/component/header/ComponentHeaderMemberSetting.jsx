/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/12 - 18:26
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import { LogoutStatus } from '../../event/LogoutStatus';
import { CommentStatus } from '../../event/CommentStatus';
import View from '../../view/View';
import ViewHeaderMemberNotice from '../../view/header/ViewHeaderMemberNotice';
import { User } from '../../app/User';
import { Loc } from '../../util/Loc';
import Env from '../../app/Env';
import { Safety } from '../../data/Safety';
import { Empty } from '../../app/const/Empty';
import { Url } from '../../app/const/Url';

/**
 * [library] - React
 */
const React = self.React;

/**
 * header - member setting menu
 * - for login user
 */
export default class ComponentHeaderMemberSetting extends React.Component {
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * React.propTypes
   * @returns {{
   *    userName: string,
   *    icon: string,
   *    safely: function,
   *    did: function,
   *    vk: boolean
   * }}
   * React.propTypes
   */
  static get propTypes() {
    return {
      userName: React.PropTypes.string.isRequired,
      icon: React.PropTypes.string.isRequired,
      safely: React.PropTypes.func.isRequired,
      did: React.PropTypes.func.isRequired,
      vk: React.PropTypes.bool.isRequired,
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * header - member setting menu 出力準備をします
   * @param {*} props React.props
   */
  constructor(props) {
    super(props);
    // -----
    /**
     * React.state
     * @type {{open: string, userName: string, icon: string}}
     */
    this.state = {
      open: 'close',
      userName: props.userName,
      icon: props.icon,
    };
    // /**
    //  * ViewLogoutModal instance
    //  * @private
    //  * @type {?ViewLogoutModal}
    //  */
    // this.modal = null;
    /**
     * LogoutStatus instance
     * @private
     * @type {LogoutStatus}
     */
    this.status = LogoutStatus.factory();
    /**
     * CommentStatus instance
     * @private
     * @type {CommentStatus}
     */
    this.commentStatus = CommentStatus.factory();
    /**
     * time out id
     * @private
     * @type {number}
     */
    this.timer = 0;
    /**
     * bind onClick
     * @type {function}
     * */
    this.onClick = this.onClick.bind(this);
    this.onBodyClick = this.onBodyClick.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.onOk = this.onOk.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onOtherModalOpen = this.onOtherModalOpen.bind(this);
    this.noticeElement = null;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * a.onclick event handler - drop down menu open / close します
   * @param {Event} event click event
   * */
  onClick(event) {
    event.preventDefault();
    this.toggle();
  }
  /**
   * document.body.onclick event handler - dropdown menu close します
   * */
  onBodyClick() {
    if (this.state.open === 'open') {
      // document.body が a より先に反応する
      // native event bind と React 経由の違いかも
      // body click 後の処理を遅延させる, 多分気づかない程度
      this.timer = setTimeout(() => {
        this.toggle();
      }, 100);
    }
  }
  /**
   * 「ログアウト」.onclick event handler - logout modal を開くために {@link LogoutStatus}.open 通知します
   * @param {Event} event click event
   * */
  onLogoutClick(event) {
    event.preventDefault();
    event.stopPropagation();
    this.destroy();
    this.status.open(this.onOk, this.onCancel);
  }
  /**
   * logout [OK] click event handler
   * - logout します - {@link User}.logout
   * - top へ遷移します - {@link Loc}.index
   * */
  onOk() {
    if (Env.NODE_ENV === 'develop') {
      console.warn('[ComponentHeaderMemberSetting].onOk', this.state.icon);
    }
    User.logout();
    Loc.index();
  }
  /**
   * logout [CANCEL] click event handler
   * */
  onCancel() {
    this.destroy();
    this.activate();
  }
  /**
   * [notice] drop down 開くと閉じるようにするための event handler - {@link CommentStatus}.COMMENT_DELETE_MODAL_OPEN
   * */
  onOtherModalOpen() {
    // 他のmodalが開いたので閉じる
    if (this.state.open === 'open') {
      // open -> close
      this.destroy();
      this.setState({ open: 'close' });
    }
  }
  /**
   * body click からの遅延処理を clear します
   * */
  destroy() {
    // body click からの遅延処理を clear する
    // timer を 0 にし error にならないようにする
    clearTimeout(this.timer);
    this.timer = 0;
    document.body.removeEventListener('click', this.onBodyClick);
  }
  /**
   * document.body.onclick 監視をします
   * */
  activate() {
    document.body.addEventListener('click', this.onBodyClick, false);
  }
  /**
   * dropdown menu toggle 処理を行います
   * */
  toggle() {
    this.destroy();
    if (this.state.open === 'close') {
      // close -> open
      // document.body へ click event handler bind
      this.setState({ open: 'open' });
      this.activate();
    } else {
      // open -> close
      this.setState({ open: 'close' });
    }
  }
  /**
   * delegate - after mount
   * - props callback function を実行します
   * - {@link ViewHeaderMemberNotice} を mount します
   * - {@link CommentStatus}.COMMENT_DELETE_MODAL_OPEN 監視します
   * */
  componentDidMount() {
    const { safely, did } = this.props;
    safely(View.DID_MOUNT);
    did();
    // ---
    const noticeElement = this.noticeElement;
    if (noticeElement) {
      const notice = new ViewHeaderMemberNotice(noticeElement, {}, this.props.vk);
      // const notice = new ViewHeaderMemberNotice(noticeElement);
      notice.start();
    }
    const commentStatus = this.commentStatus;
    commentStatus.off(CommentStatus.COMMENT_DELETE_MODAL_OPEN, this.onOtherModalOpen);
    commentStatus.on(CommentStatus.COMMENT_DELETE_MODAL_OPEN, this.onOtherModalOpen);
  }
  /**
   * delegate - will mount - `destroy` 実行します
   * */
  componentWillUnmount() {
    this.destroy();
  }
  /**
   * delegate - 更新 props を state と比較し更新するかを決定します
   * @param {{icon: string, userName: string}} nextProps 更新 props
   * */
  componentWillReceiveProps(nextProps) {
    const { icon, userName } = nextProps;
    if (icon !== this.state.icon || userName !== this.state.userName) {
      this.setState({ icon, userName });
    }
  }
  /**
   * member setting menu を出力します
   * @returns {XML} `div.user`
   * */
  render() {
    const { userName, icon, open } = this.state;
    const iconImg = `${Url.host}${Safety.image(icon, Empty.USER_EMPTY)}`;
    const loggedIn = Safety.same(iconImg, Empty.USER_EMPTY);
    // console.log('ComponentHeaderMemberSetting.render', userName, icon, open);
    return (
      <div className="user">
        <div
          className="notice-container"
          ref={(element) => (this.noticeElement = element)}
        />
        <div className={`preference ${open}`}>
          <a className="preference-opener" href="#" onClick={this.onClick}>
            {/*
                  画像を変えてもファイル名が変わらない
                  キャッシュ問題を回避するためにDate.nowを加える
                  通常もキャッシュが効かない〜
                */}
            <span className={`preference-avatar ${loggedIn}`}>
              <img src={Empty.refresh(iconImg)} alt={userName} />
            </span>
          </a>
          <nav className="preference-menu">
            <ul className="dropMenu">
              {/*
              2018-04-19 トルツメ - display: none になってた
              <li className="dropMenu-item"><a className="dropMenu-link" href={Url.mypage()}>ブックマーク<br />アクティビティ</a></li>
              */}
              <li className="dropMenu-item"><a className="dropMenu-link" href={Url.settings('', this.props.vk)}>設定</a></li>
              <li className="dropMenu-item"><a className="dropMenu-link" href="#" onClick={this.onLogoutClick}>ログアウト</a></li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
