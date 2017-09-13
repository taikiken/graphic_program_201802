/*!
 * @copyright (c) 2011-@@year inazumatv.com, @@copyright.
 * @author (at)taikiken / http://inazumatv.com
 * @date @@buildTime
 * @license
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * @requires React, Sagen.js. IE: fetch, es5-promise
 */
'use strict';

// -------------------------------------
//  main
//
//  undotsushin.com library
//  メインライブラリとして使用します
// -------------------------------------

// -------------------------------------
// app
import {App} from './app/App';
import {User} from './app/User';
import {CommentsType} from './app/const/CommentsType';
import {Dom} from './app/Dom';
import {Router} from './app/Router';

// -------------------------------------
// util
import {Offset} from './util/Offset';
import {Scroll} from './util/Scroll';



// -------------------------------------
// net
import {Cookie} from './net/Cookie';
import {Ajax} from './net/Ajax';

// -------------------------------------
// model
import {Model} from './model/Model';

// -------------------------------------
// view
import {View} from './view/View';

import {ViewHeaderUser} from './view/header/ViewHeaderUser';
import {ViewHeaderSearch} from './view/header/ViewHeaderSearch';

import {ViewCategory} from './view/ViewCategory';
import {ViewSingle} from './view/ViewSingle';
// import {ViewTitle} from './view/ViewTitle';
import {ViewSearch} from './view/ViewSearch';
import {ViewCommentSingle} from './view/ViewCommentSingle';
import {ViewFirstVisit} from './view/ViewFirstVisit';

// single
import {ViewSingleTitle} from './view/single/ViewSingleTitle';
import {ViewSingleVisual} from './view/single/ViewSingleVisual';

// comment
import {ViewComments} from './view/ViewComments';
import {ViewCommentForm} from './view/comment/ViewCommentForm';

// home
import {ViewHeadline} from './view/home/ViewHeadline';
import {ViewPickup} from './view/home/ViewPickup';
import {ViewNews} from './view/home/ViewNews';

// sidebar
import {ViewRanking} from './view/sidebar/ViewRanking';
import {ViewVideos} from './view/sidebar/ViewVideos';
import {ViewRecommend} from './view/sidebar/ViewRecommend';
import {Sidebar} from './view/sidebar/Sidebar';

// modal
import {ViewDeleteModal} from './view/modal/ViewDeleteModal';
import {ViewLogoutModal} from './view/modal/ViewLogoutModal';
import {ViewFlushModal} from './view/modal/ViewFlushModal';

// ----------- users
// signup
import {SignupWizard} from './view/signup/SignupWizard';
import {ViewDeactivate} from './view/signup/ViewDeactivate';

// login
import {ViewLogin} from './view/login/ViewLogin';
import {ViewLogout} from './view/login/ViewLogout';

// mypage
import {ViewUserProfile} from './view/mypage/ViewUserProfile';
import {ViewBookmarks} from './view/mypage/ViewBookmarks';
import {ViewActivities} from './view/mypage/ViewActivities';
import {ViewNotifications} from './view/mypage/ViewNotifications';

// settings
import {ViewSettingsIndex} from './view/settings/ViewSettingsIndex';
import {ViewSettingsInterest} from './view/settings/ViewSettingsInterest';

// ----------- ga
import {Ga} from './ga/Ga';

// ui
import { TopButton } from './ui/button/TopButton';
import { PageTop } from './ui/PageTop';

// -------------------------------------
// sp

// sp/view
import { SPViewFirstVisit } from './sp/view/SPViewFirstVisit';
import { SPViewAppBanner } from './sp/view/SPViewAppBanner';

// home
import {SPViewHeadLine} from './sp/view/home/SPViewHeadLine';
import {SPViewNews} from './sp/view/home/SPViewNews';

// category
// @since 2016-09-20 remove
// import {SPViewCategoryRoot} from './sp/view/category/SPViewCategoryRoot';
// @since 2016-0920
import { SPViewCategory } from './sp/view/category/SPViewCategory';
// SPViewCategoryWithSlug が多分正解
import { SPViewCategoryWithSlug } from './sp/view/category/SPViewCategoryWithSlug';

// search
import {SPViewSearch} from './sp/view/SPViewSearch';

// Syn.
import {SPViewSyn} from './sp/view/SPViewSyn';

// header
import {SPViewHeaderUser} from './sp/view/header/SPViewHeaderUser';
import {SPViewHeaderSearch} from './sp/view/header/SPViewHeaderSearch';

// single
import {SPViewSingle} from './sp/view/SPViewSingle';
import {SPViewSingleHeader} from './sp/view/single/SPViewSingleHeader';
import {SPViewContinueRead} from './sp/view/single/SPViewContinueRead';
import {SPViewSingleRanking} from './sp/view/single/SPViewSingleRanking';
import {SPViewSingleRecommend} from './sp/view/single/SPViewSingleRecommend';

// single/comment
import {SPViewComments} from './sp/view/SPViewComments';
import {SPViewCommentForm} from './sp/view/comment/SPViewCommentForm';

// singles-option
import SPViewSinglesRecommend from './sp/view/singles-option/SPViewSinglesRecommend';


// mypage
import {SPViewUserProfile} from './sp/view/mypage/SPViewUserProfile';
import {SPViewBookmarks} from './sp/view/mypage/SPViewBookmarks';

/**
 * スポーツブル ライブラリ
 * @module UT
 * @type {{version: string, build: string, app: {App: App, User: User, Router: Router, Dom: Dom, const: {CommentsType: CommentsType}}, util: {Offset: Offset, Scroll: Scroll}, net: {Cookie: Cookie}, model: {Model: Model}, view: {View: View, ViewCategory: ViewCategory, ViewSingle: ViewSingle, ViewTitle: ViewTitle, ViewComments: ViewComments, ViewSearch: ViewSearch, ViewCommentSingle: ViewCommentSingle, ViewFirstVisit: ViewFirstVisit, comment: {ViewCommentForm: ViewCommentForm}, single: {ViewSingleTitle: ViewSingleTitle, ViewSingleVisual: ViewSingleVisual}, header: {ViewHeaderUser: ViewHeaderUser, ViewHeaderSearch: ViewHeaderSearch}, sidebar: {ViewRanking: ViewRanking, ViewVideos: ViewVideos}, home: {ViewHeadline: ViewHeadline, ViewPickup: ViewPickup, ViewNews: ViewNews}, signup: {SignupWizard: SignupWizard, ViewDeactivate: ViewDeactivate}, login: {ViewLogin: ViewLogin, ViewLogout: ViewLogout}, mypage: {ViewUserProfile: ViewUserProfile, ViewBookmarks: ViewBookmarks, ViewActivities: ViewActivities, ViewNotifications: ViewNotifications}, settings: {ViewSettingsIndex: ViewSettingsIndex, ViewSettingsInterest: ViewSettingsInterest}, modal: {ViewDeleteModal: ViewDeleteModal, ViewLogoutModal: ViewLogoutModal, ViewFlushModal: ViewFlushModal}}, sp: {view: {SPViewSyn: SPViewSyn, SPViewComments: SPViewComments, SPViewSingle: SPViewSingle, SPViewSearch: SPViewSearch, SPViewFirstVisit: SPViewFirstVisit, single: {SPViewSingleHeader: SPViewSingleHeader, SPViewReadMore: SPViewReadMore}, comment: {SPViewCommentForm: SPViewCommentForm}, home: {SPViewHeadLine: SPViewHeadLine, SPViewNews: SPViewNews}, category: {SPViewCategoryRoot: SPViewCategoryRoot}, header: {SPViewHeaderUser: SPViewHeaderUser, SPViewHeaderSearch: SPViewHeaderSearch}, mypage: {SPViewUserProfile: SPViewUserProfile, SPViewBookmarks: SPViewBookmarks}}}}}
 */
let UT = {
  version: '@@version',
  build: '@@buildTime',
  app: {
    // Env: Env,
    App: App,
    // Codes: Codes,
    User: User,
    Router,
    Dom,
    const: {
      CommentsType
    }
  },
  util: {
    Offset,
    Scroll
  },
  ui: {
    PageTop,
    button: {
      TopButton
    }
  },
  net: {
    Cookie,
    Ajax,
  },
  model: {
    Model
  },
  view: {
    View,
    ViewCategory,
    ViewSingle,
    ViewComments,
    ViewSearch,
    ViewCommentSingle,
    ViewFirstVisit,
    comment: {
      ViewCommentForm
    },
    single: {
      ViewSingleTitle,
      ViewSingleVisual
    },
    header: {
      ViewHeaderUser,
      ViewHeaderSearch
    },
    sidebar: {
      ViewRanking,
      ViewVideos,
      ViewRecommend,
      Sidebar
    },
    home: {
      ViewHeadline,
      ViewPickup,
      ViewNews
    },
    signup: {
      SignupWizard,
      ViewDeactivate
    },
    login: {
      ViewLogin,
      ViewLogout
    },
    mypage: {
      ViewUserProfile,
      ViewBookmarks,
      ViewActivities,
      ViewNotifications
    },
    settings: {
      ViewSettingsIndex,
      ViewSettingsInterest
    },
    modal: {
      ViewDeleteModal,
      ViewLogoutModal,
      ViewFlushModal
    }
  },
  sp: {
    view: {
      SPViewSyn,
      SPViewComments,
      SPViewSingle,
      SPViewSearch,
      SPViewFirstVisit,
      SPViewAppBanner,
      single: {
        SPViewSingleHeader,
        SPViewContinueRead,
        SPViewSingleRanking,
        SPViewSingleRecommend
      },
      singles: {
        SPViewSinglesRecommend,
      },
      comment: {
        SPViewCommentForm
      },
      home: {
        SPViewHeadLine,
        SPViewNews
      },
      category: {
        SPViewCategory,
        SPViewCategoryWithSlug
      },
      header: {
        SPViewHeaderUser,
        SPViewHeaderSearch
      },
      mypage: {
        SPViewUserProfile,
        SPViewBookmarks
      },
    },
  },
  Ga,
};

self.UT = UT;
