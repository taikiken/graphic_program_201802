# Project library

## UT

global object

出力クラスリスト

```
const UT = {
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
    Scroll,
    Elements,
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
    ViewArea,
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
        SPViewSinglesRanking,
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
        SPViewCategoryWithSlug,
        SPViewArea,
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