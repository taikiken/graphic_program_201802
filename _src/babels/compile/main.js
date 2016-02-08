'use strict';

var _Loc = require('./util/Loc');

var _Format = require('./util/Format');

var _Router = require('./app/Router');

var _Env = require('./app/Env');

var _Codes = require('./app/Codes');

var _User = require('./app/User');

var _Length = require('./app/const/Length');

var _CommentsType = require('./app/const/CommentsType');

var _Data = require('./data/Data');

var _Form = require('./data/Form');

var _Result = require('./data/Result');

var _Ajax = require('./net/Ajax');

var _Api = require('./net/Api');

var _Types = require('./net/Types');

var _Permalink = require('./net/types/Permalink');

var _Query = require('./net/types/Query');

var _Queries = require('./net/types/Queries');

var _Type = require('./net/types/Type');

var _CommentType = require('./net/types/CommentType');

var _App = require('./app/App');

var _Action = require('./action/Action');

var _Offset = require('./action/Offset');

var _Pickup = require('./action/home/Pickup');

var _Headline = require('./action/home/Headline');

var _News = require('./action/home/News');

var _PickupAuth = require('./action/home/PickupAuth');

var _HeadlineAuth = require('./action/home/HeadlineAuth');

var _NewsAuth = require('./action/home/NewsAuth');

var _Category = require('./action/archive/Category');

var _Ranking = require('./action/archive/Ranking');

var _Videos = require('./action/archive/Videos');

var _Widget = require('./action/sidebar/Widget');

var _Bookmark = require('./action/bookmark/Bookmark');

var _Search = require('./action/search/Search');

var _Single = require('./action/single/Single');

var _UsersSelf = require('./action/users/UsersSelf');

var _Model = require('./model/Model');

var _ModelUsersSelf = require('./model/users/ModelUsersSelf');

var _View = require('./view/View');

var _ViewHeaderUser = require('./view/header/ViewHeaderUser');

var _ViewArchive = require('./view/ViewArchive');

var _ViewArchiveMasonry = require('./view/ViewArchiveMasonry');

var _ViewArchiveMasonryInfinite = require('./view/ViewArchiveMasonryInfinite');

var _ViewCategory = require('./view/ViewCategory');

var _ViewSingle = require('./view/ViewSingle');

var _ViewTitle = require('./view/ViewTitle');

var _ViewComments = require('./view/ViewComments');

var _ViewHeadline = require('./view/home/ViewHeadline');

var _ViewPickup = require('./view/home/ViewPickup');

var _ViewRanking = require('./view/sidebar/ViewRanking');

var _ViewVideos = require('./view/sidebar/ViewVideos');

var _Receiver = require('./ui/Receiver');

/**
 * ToDo: 確認事項
 * ToDo: 対象外OS alert
 * ToDo: title, meta, ogp
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

// -------------------------------------
// view

// -------------------------------------
// model

// action/single

// action/bookmark

// action/archive

// action/home

// -------------------------------------
// action

// net/types

// -------------------------------------
// data
/*!
 * Copyright (c) 2011-2016 inazumatv.com, Parachute.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016-02-08 16:20:39
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * @requires React, Sagen. IE: fetch, es5-promise
 *
 */
// -------------------------------------
//  main
//    target for babel compile
// -------------------------------------

// -------------------------------------
// util
var UT = {
  version: '1.0.0',
  app: {
    Env: _Env.Env,
    App: _App.App,
    Codes: _Codes.Codes,
    User: _User.User,
    Router: _Router.Router,
    const: {
      CommentsType: _CommentsType.CommentsType
    }
  },
  ui: {
    Receiver: _Receiver.Receiver
  },
  data: {
    Data: _Data.Data,
    Form: _Form.Form,
    Result: _Result.Result
  },
  util: {
    Loc: _Loc.Loc,
    Format: _Format.Format
  },
  net: {
    Ajax: _Ajax.Ajax,
    Api: _Api.Api,
    Types: _Types.Types,
    types: {
      Permalink: _Permalink.Permalink,
      Query: _Query.Query,
      Queries: _Queries.Queries,
      Type: _Type.Type,
      CommentType: _CommentType.CommentType
    }
  },
  action: {
    Action: _Action.Action,
    Offset: _Offset.Offset,
    home: {
      Pickup: _Pickup.Pickup,
      Headline: _Headline.Headline,
      News: _News.News,
      PickupAuth: _PickupAuth.PickupAuth,
      HeadlineAuth: _HeadlineAuth.HeadlineAuth,
      NewsAuth: _NewsAuth.NewsAuth
    },
    archive: {
      Category: _Category.Category,
      Ranking: _Ranking.Ranking,
      Videos: _Videos.Videos
    },
    sidebar: {
      Widget: _Widget.Widget
    },
    bookmark: {
      Bookmark: _Bookmark.Bookmark
    },
    search: {
      Search: _Search.Search
    },
    single: {
      Single: _Single.Single
    },
    users: {
      UsersSelf: _UsersSelf.UsersSelf
    }
  },
  view: {
    View: _View.View,
    ViewArchive: _ViewArchive.ViewArchive,
    ViewArchiveMasonry: _ViewArchiveMasonry.ViewArchiveMasonry,
    ViewArchiveMasonryInfinite: _ViewArchiveMasonryInfinite.ViewArchiveMasonryInfinite,
    ViewCategory: _ViewCategory.ViewCategory,
    ViewSingle: _ViewSingle.ViewSingle,
    ViewTitle: _ViewTitle.ViewTitle,
    ViewComments: _ViewComments.ViewComments,
    header: {
      ViewHeaderUser: _ViewHeaderUser.ViewHeaderUser
    },
    sidebar: {
      ViewRanking: _ViewRanking.ViewRanking,
      ViewVideos: _ViewVideos.ViewVideos
    },
    home: {
      ViewHeadline: _ViewHeadline.ViewHeadline,
      ViewPickup: _ViewPickup.ViewPickup
    }
  },
  model: {
    Model: _Model.Model,
    users: {
      ModelUsersSelf: _ModelUsersSelf.ModelUsersSelf
    }
  }
};

// -------------------------------------
// ui

// sidebar

// action/user

// action/search

// action/sidebar

// -------------------------------------
// app/App

// -------------------------------------
// net

// -------------------------------------
// app

self.UT = UT;