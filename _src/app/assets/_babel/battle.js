!function(i){function e(r){if(n[r])return n[r].exports;var a=n[r]={exports:{},id:r,loaded:!1};return i[r].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports}var n={};return e.m=i,e.c=n,e.p="js",e(0)}([function(i,e){/*!
	 * Copyright (c) 2011-2017 inazumatv.com, inc.
	 * @author (at)taikiken / http://inazumatv.com
	 * @date 2017/02/09 - 19:05
	 *
	 * Distributed under the terms of the MIT license.
	 * http://www.opensource.org/licenses/mit-license.html
	 *
	 * This notice shall be included in all copies or substantial portions of the Software.
	 *
	 * @build 2017-10-17 18:17:47
	 */
"use strict";var n=self.UT,r=n.app.Dom,a=n.view.sidebar.ViewRanking,t=n.view.sidebar.ViewVideos,s=n.view.sidebar.ViewRecommend,o=n.view.View,v=function(){var i=r.adRanking();i&&(i.style.cssText="display: block;")},c=function(){var i=r.adVideo();i&&(i.style.cssText="display: block;")},d=function(){var i=r.ranking();if(i){var e={};e[o.DID_MOUNT]=v;var n=new a(i,e,"battle");n.start()}},f=function(){var i=r.video();if(i){var e={};e[o.DID_MOUNT]=c;var n=new t(i,e,"battle");n.start()}},u=function(){var i=r.recommend();if(i){var e=new s(i,{},"battle");e.start()}};d(),f(),u()}]);