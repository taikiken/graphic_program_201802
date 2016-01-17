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
 */
// -------------------------------------
//  main
//    target for babel compile
// -------------------------------------

// util
import {Loc} from './util/Loc';

// net
import {Ajax} from './net/Ajax';
import {Api} from './net/Api';
import {Types} from './net/Types';
import {Codes} from './net/Codes';
import {User} from './net/User';

// net/types
import {Permalink} from './net/types/Permalink';
import {Query} from './net/types/Query';
import {Queries} from './net/types/Queries';
import {Type} from './net/types/Type';

// net/comment
import {CommentType} from './net/comment/CommentType';


// action
import {Action} from './action/Action';
import {Offset} from './action/Offset';

// action/home
import {Pickup} from './action/home/Pickup';
import {Headline} from './action/home/Headline';
import {News} from './action/home/News';

// action/archive
import {Category} from './action/archive/Category';
import {Detail} from './action/archive/Detail';
import {Ranking} from './action/archive/Ranking';
import {Videos} from './action/archive/Videos';

// action/sidebar
import {Widget} from './action/sidebar/Widget';

// action/search
import {Search} from './action/search/Search';

/**
 * global object
 * こんな感じで使えます
 *
 *    var ut = self.UT
 */
var UT = {
  version: '@@version',
  util: {
    Loc: Loc
  },
  net: {
    Ajax: Ajax,
    Api: Api,
    Types: Types,
    Codes: Codes,
    User: User,
    types: {
      Permalink: Permalink,
      Query: Query,
      Queries: Queries,
      Type: Type
    },
    comment: {
      CommentType: CommentType
    }
  },
  action: {
    Action: Action,
    Offset: Offset,
    home: {
      Pickup: Pickup,
      Headline: Headline,
      News: News
    },
    archive: {
      Category: Category,
      Detail: Detail,
      Ranking: Ranking,
      Videos: Videos
    },
    sidebar: {
      Widget: Widget
    },
    search: {
      Search: Search
    }
  }

};

self.UT = UT;
