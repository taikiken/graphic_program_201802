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
 * @requires React, Sagen. IE: fetch, es5-promise
 *
 */
'use strict';

// -------------------------------------
//  main
//    target for babel compile
// -------------------------------------

// -------------------------------------
// util
import {Loc} from './util/Loc';
import {Format} from './util/Format';
import {Router} from './app/Router';

// -------------------------------------
// app
import {Env} from './app/Env';
import {Codes} from './app/Codes';
import {User} from './app/User';
import {CommentsType} from './app/const/CommentsType';
import {Title} from './app/const/Title';

// -------------------------------------
// data
import {Data} from './data/Data';
import {Form} from './data/Form';
import {Result} from './data/Result';

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
// app/App
import {App} from './app/App';

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
// model
import {Model} from './model/Model';
import {ModelUsersSelf} from './model/users/ModelUsersSelf';
import {ModelCategories} from './model/categoires/ModelCategories';

// -------------------------------------
// view
import {View} from './view/View';

import {ViewHeaderUser} from './view/header/ViewHeaderUser';
/*
import {ViewArchive} from './view/ViewArchive';
import {ViewArchiveMasonry} from './view/ViewArchiveMasonry';
*/
import {ViewArchiveMasonryInfinite} from './view/ViewArchiveMasonryInfinite';
import {ViewCategory} from './view/ViewCategory';
import {ViewSingle} from './view/ViewSingle';
import {ViewTitle} from './view/ViewTitle';

import {ViewComments} from './view/ViewComments';
import {ViewCommentForm} from './view/comment/ViewCommentForm';

import {ViewHeadline} from './view/home/ViewHeadline';
import {ViewPickup} from './view/home/ViewPickup';

// sidebar
import {ViewRanking} from './view/sidebar/ViewRanking';
import {ViewVideos} from './view/sidebar/ViewVideos';

// -------------------------------------
// ui
import {Receiver} from './ui/Receiver';

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
    Env: Env,
    App: App,
    Codes: Codes,
    User: User,
    Router: Router,
    const: {
      CommentsType: CommentsType,
      Title: Title
    }
  },
  ui: {
    Receiver: Receiver
  },
  data: {
    Data: Data,
    Form: Form,
    Result: Result
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
  view: {
    View: View,
    /*
    ViewArchive: ViewArchive,
    ViewArchiveMasonry: ViewArchiveMasonry,
    */
    ViewArchiveMasonryInfinite: ViewArchiveMasonryInfinite,
    ViewCategory: ViewCategory,
    ViewSingle: ViewSingle,
    ViewTitle: ViewTitle,
    ViewComments: ViewComments,
    comment: {
      ViewCommentForm: ViewCommentForm
    },
    header: {
      ViewHeaderUser: ViewHeaderUser
    },
    sidebar: {
      ViewRanking: ViewRanking,
      ViewVideos: ViewVideos
    },
    home: {
      ViewHeadline: ViewHeadline,
      ViewPickup: ViewPickup
    }
  },
  model: {
    Model: Model,
    users: {
      ModelUsersSelf: ModelUsersSelf
    },
    categories: {
      ModelCategories: ModelCategories
    }
  }
};

self.UT = UT;
