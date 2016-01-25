'use strict';

var _Loc = require('./util/Loc');

var _Format = require('./util/Format');

var _Env = require('./app/Env');

var _Codes = require('./app/Codes');

var _Data = require('./data/Data');

var _Form = require('./data/Form');

var _Result = require('./data/Result');

var _Ajax = require('./net/Ajax');

var _Api = require('./net/Api');

var _Types = require('./net/Types');

var _User = require('./net/User');

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

var _Category = require('./action/archive/Category');

var _Ranking = require('./action/archive/Ranking');

var _Videos = require('./action/archive/Videos');

var _Widget = require('./action/sidebar/Widget');

var _Bookmark = require('./action/bookmark/Bookmark');

var _Search = require('./action/search/Search');

var _Detail = require('./action/single/Detail');

var _ViewArchive = require('./view/ViewArchive');

var _ViewHeadline = require('./view/home/ViewHeadline');

var _ViewPickup = require('./view/home/ViewPickup');

/**
 * ToDo: 確認事項
 * ToDo: 対象外OS alert
 * ToDo: index ニュース一覧 画像なしの代替画像
 * ToDo: title, meta, ogp
 */

/**
 * global object
 * こんな感じで使えます
 *
 *    var ut = self.UT
 */

// action/single

// action/bookmark

// action/archive

// -------------------------------------
// app/App

// -------------------------------------
// data

// -------------------------------------
// app
/*!
 * Copyright (c) 2011-2016 inazumatv.com, Parachute.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016-01-25 21:25:56
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
    Codes: _Codes.Codes
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
    User: _User.User,
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
      News: _News.News
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
      Detail: _Detail.Detail
    }
  },
  view: {
    ViewArchive: _ViewArchive.ViewArchive,
    home: {
      ViewHeadline: _ViewHeadline.ViewHeadline,
      ViewPickup: _ViewPickup.ViewPickup
    }
  }
};

// -------------------------------------
// view

// action/search

// action/sidebar

// action/home

// -------------------------------------
// action

// net/types

// -------------------------------------
// net

self.UT = UT;