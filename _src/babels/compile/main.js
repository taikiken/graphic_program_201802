'use strict';

var _Env = require('./app/Env');

var _Loc = require('./util/Loc');

var _Format = require('./util/Format');

var _Data = require('./data/Data');

var _Form = require('./data/Form');

var _Result = require('./data/Result');

var _Ajax = require('./net/Ajax');

var _Api = require('./net/Api');

var _Types = require('./net/Types');

var _Codes = require('./net/Codes');

var _User = require('./net/User');

var _Permalink = require('./net/types/Permalink');

var _Query = require('./net/types/Query');

var _Queries = require('./net/types/Queries');

var _Type = require('./net/types/Type');

var _CommentType = require('./net/comment/CommentType');

var _Action = require('./action/Action');

var _Offset = require('./action/Offset');

var _Pickup = require('./action/home/Pickup');

var _Headline = require('./action/home/Headline');

var _News = require('./action/home/News');

var _Category = require('./action/archive/Category');

var _Detail = require('./action/archive/Detail');

var _Ranking = require('./action/archive/Ranking');

var _Videos = require('./action/archive/Videos');

var _Widget = require('./action/sidebar/Widget');

var _Bookmark = require('./action/bookmark/Bookmark');

var _Search = require('./action/search/Search');

/**
 * global object
 * こんな感じで使えます
 *
 *    var ut = self.UT
 */

// action/bookmark

// action/home

// action

// net
/*!
 * Copyright (c) 2011-2016 inazumatv.com, Parachute.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016-01-21 22:15:37
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
// app
var UT = {
  version: '1.0.0',
  app: {
    Env: _Env.Env
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
    Codes: _Codes.Codes,
    User: _User.User,
    types: {
      Permalink: _Permalink.Permalink,
      Query: _Query.Query,
      Queries: _Queries.Queries,
      Type: _Type.Type
    },
    comment: {
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
      Detail: _Detail.Detail,
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
    }
  }
};

// action/search

// action/sidebar

// action/archive

// net/comment

// net/types

// data

// util

self.UT = UT;