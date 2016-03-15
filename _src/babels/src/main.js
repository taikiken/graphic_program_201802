/*!
 * Copyright (c) 2011-@@year inazumatv.com, @@copyright.
 * @author (at)taikiken / http://inazumatv.com
 * @date @@buildTime
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
// import {Env} from './app/Env';
// import {Codes} from './app/Codes';
import {User} from './app/User';
import {CommentsType} from './app/const/CommentsType';
// import {Title} from './app/const/Title';
import {Dom} from './app/Dom';
import {Router} from './app/Router';

/*
// -------------------------------------
// util
import {Loc} from './util/Loc';
import {Format} from './util/Format';

// -------------------------------------
// data
import {Data} from './data/Data';
import {Form} from './data/Form';
import {Result} from './data/Result';
import {Safety} from './data/Safety';

// -------------------------------------
// net
import {Ajax} from './net/Ajax';
import {Api} from './net/Api';
import {Types} from './net/Types';

// net/types
import {Permalink} from './net/types/Permalink';
import {Query} from './net/types/Query';
import {Queries} from './net/types/Queries';
import {Type} from './net/types/Type';
import {CommentType} from './net/types/CommentType';

// -------------------------------------
// action
import {Action} from './action/Action';
import {Offset} from './action/Offset';

// action/home
import {Pickup} from './action/home/Pickup';
import {Headline} from './action/home/Headline';
import {News} from './action/home/News';

import {PickupAuth} from './action/home/PickupAuth';
import {HeadlineAuth} from './action/home/HeadlineAuth';
import {NewsAuth} from './action/home/NewsAuth';

// action/archive
import {Category} from './action/archive/Category';
import {Ranking} from './action/archive/Ranking';
import {Videos} from './action/archive/Videos';

// action/sidebar
import {Widget} from './action/sidebar/Widget';

// action/bookmark
import {Bookmark} from './action/bookmark/Bookmark';

// action/search
import {Search} from './action/search/Search';

// action/single
import {Single} from './action/single/Single';

// action/user
import {UsersSelf} from './action/users/UsersSelf';


// -------------------------------------
// ui
import {Receiver} from './ui/Receiver';


*/
// -------------------------------------
// model
import {Model} from './model/Model';
/*
import {ModelUsersSelf} from './model/users/ModelUsersSelf';
import {ModelCategories} from './model/categoires/ModelCategories';
*/
// -------------------------------------
// view
import {View} from './view/View';

import {ViewHeaderUser} from './view/header/ViewHeaderUser';
import {ViewHeaderSearch} from './view/header/ViewHeaderSearch';

import {ViewCategory} from './view/ViewCategory';
import {ViewSingle} from './view/ViewSingle';
import {ViewTitle} from './view/ViewTitle';
import {ViewSearch} from './view/ViewSearch';
import {ViewCommentSingle} from './view/ViewCommentSingle';

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

// modal
import {ViewDeleteModal} from './view/modal/ViewDeleteModal';
import {ViewLogoutModal} from './view/modal/ViewLogoutModal';

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

// -------------------------------------
// sp

// sp/view

// home
import {SPViewHeadLine} from './sp/view/home/SPViewHeadLine';
import {SPViewNews} from './sp/view/home/SPViewNews';

// category
import {SPViewCategoryRoot} from './sp/view/category/SPViewCategoryRoot';

// Syn.
import {SPViewSyn} from './sp/view/SPViewSyn';

// header
import {SPViewHeaderUser} from './sp/view/header/SPViewHeaderUser';
import {SPViewHeaderSearch} from './sp/view/header/SPViewHeaderSearch';

// single
import {SPViewSingle} from './sp/view/SPViewSingle';
import {SPViewSingleHeader} from './sp/view/single/SPViewSingleHeader';
import {SPViewReadMore} from './sp/view/single/SPViewReadMore';

// single/comment
import {SPViewComments} from './sp/view/SPViewComments';
import {SPViewCommentForm} from './sp/view/comment/SPViewCommentForm';

// mypage
import {SPViewUserProfile} from './sp/view/mypage/SPViewUserProfile';
import {SPViewBookmarks} from './sp/view/mypage/SPViewBookmarks';


/**
 * ToDo: 対象外OS alert
 * ToDo: global 不要 class を除外する
 */


/**
 * global object
 * **usage**
 *
 * @example
 * var ut = self.UT
 *
 * @module UT
 * @type {Object}
 */
var UT = {
  version: '@@version',
  app: {
    // Env: Env,
    App: App,
    // Codes: Codes,
    User: User,
    Router: Router,
    Dom: Dom,
    const: {
      CommentsType: CommentsType
    }
  },
  /*
  ui: {
    Receiver: Receiver
  },
  data: {
    Data: Data,
    Form: Form,
    Result: Result,
    Safety: Safety
  },
  util: {
    Loc: Loc,
    Format: Format
  },
  net: {
    Ajax: Ajax,
    Api: Api,
    Types: Types,
    types: {
      Permalink: Permalink,
      Query: Query,
      Queries: Queries,
      Type: Type,
      CommentType: CommentType
    }
  },
  action: {
    Action: Action,
    Offset: Offset,
    home: {
      Pickup: Pickup,
      Headline: Headline,
      News: News,
      PickupAuth: PickupAuth,
      HeadlineAuth: HeadlineAuth,
      NewsAuth: NewsAuth
    },
    archive: {
      Category: Category,
      Ranking: Ranking,
      Videos: Videos
    },
    sidebar: {
      Widget: Widget
    },
    bookmark: {
      Bookmark: Bookmark
    },
    search: {
      Search: Search
    },
    single: {
      Single: Single
    },
    users: {
      UsersSelf: UsersSelf
    }
  },
  */
  model: {
    Model: Model/* ,
    users: {
      ModelUsersSelf: ModelUsersSelf
    },
    categories: {
      ModelCategories: ModelCategories
    }*/
  },
  view: {
    View: View,
    ViewCategory: ViewCategory,
    ViewSingle: ViewSingle,
    ViewTitle: ViewTitle,
    ViewComments: ViewComments,
    ViewSearch: ViewSearch,
    ViewCommentSingle: ViewCommentSingle,
    comment: {
      ViewCommentForm: ViewCommentForm
    },
    single: {
      ViewSingleTitle: ViewSingleTitle,
      ViewSingleVisual: ViewSingleVisual
    },
    header: {
      ViewHeaderUser: ViewHeaderUser,
      ViewHeaderSearch: ViewHeaderSearch
    },
    sidebar: {
      ViewRanking: ViewRanking,
      ViewVideos: ViewVideos
    },
    home: {
      ViewHeadline: ViewHeadline,
      ViewPickup: ViewPickup,
      ViewNews: ViewNews
    },
    signup: {
      SignupWizard: SignupWizard,
      ViewDeactivate: ViewDeactivate
    },
    login: {
      ViewLogin: ViewLogin,
      ViewLogout: ViewLogout
    },
    mypage: {
      ViewUserProfile: ViewUserProfile,
      ViewBookmarks: ViewBookmarks,
      ViewActivities: ViewActivities,
      ViewNotifications: ViewNotifications
    },
    settings: {
      ViewSettingsIndex: ViewSettingsIndex,
      ViewSettingsInterest: ViewSettingsInterest
    },
    modal: {
      ViewDeleteModal: ViewDeleteModal,
      ViewLogoutModal: ViewLogoutModal
    }
  },
  sp: {
    view: {
      SPViewSyn: SPViewSyn,
      SPViewComments: SPViewComments,
      SPViewSingle: SPViewSingle,
      single: {
        SPViewSingleHeader: SPViewSingleHeader,
        SPViewReadMore: SPViewReadMore
      },
      comment: {
        SPViewCommentForm: SPViewCommentForm
      },
      home: {
        SPViewHeadLine: SPViewHeadLine,
        SPViewNews: SPViewNews
      },
      category: {
        SPViewCategoryRoot: SPViewCategoryRoot
      },
      header: {
        SPViewHeaderUser: SPViewHeaderUser,
        SPViewHeaderSearch: SPViewHeaderSearch
      },
      mypage: {
        SPViewUserProfile: SPViewUserProfile,
        SPViewBookmarks: SPViewBookmarks
      }
    }
  }
};

self.UT = UT;
