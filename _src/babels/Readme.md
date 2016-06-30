# Project library

## UT

global object

出力クラスリスト

```
let UT = {
  version: '@@version',
  build: '@@buildTime',
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
  util: {
    Offset: Offset,
    Scroll: Scroll
  },
  net: {
    Cookie: Cookie
  },
  model: {
    Model: Model
  },
  view: {
    View: View,
    ViewCategory: ViewCategory,
    ViewSingle: ViewSingle,
    // ViewTitle: ViewTitle,
    ViewComments: ViewComments,
    ViewSearch: ViewSearch,
    ViewCommentSingle: ViewCommentSingle,
    ViewFirstVisit: ViewFirstVisit,
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
      ViewVideos: ViewVideos,
      ViewRecommend: ViewRecommend,
      Sidebar: Sidebar
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
      ViewLogoutModal: ViewLogoutModal,
      ViewFlushModal: ViewFlushModal
    }
  },
  sp: {
    view: {
      SPViewSyn: SPViewSyn,
      SPViewComments: SPViewComments,
      SPViewSingle: SPViewSingle,
      SPViewSearch: SPViewSearch,
      SPViewFirstVisit: SPViewFirstVisit,
      single: {
        SPViewSingleHeader: SPViewSingleHeader,
        SPViewReadMore: SPViewReadMore,
        SPViewSingleRanking: SPViewSingleRanking,
        SPViewSingleRecommend: SPViewSingleRecommend
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
  },
  Ga: Ga
};
```

## ES2015, JSX Harmony

babel + webpack を使用します

## ESLint

Quality check tool


## ESDoc

Document 出力は ESDoc を使います

[ESDoc](https://esdoc.org/)

plugin `esdoc-es7-plugin` を使用します


    sudo npm install -g esdoc
    sudo npm install -g esdoc-es7-plugin

Document 出力

    cd _src/babels
    esdoc -c esdoc.json

あるいは

    npm run esdoc
    
babels/_docs に出力されます

_docs は ignore 対象です  

docs が必要な時は出力コマンド実行します