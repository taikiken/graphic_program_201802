'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/09/20 - 15:59
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// moku/dom

var Tag = function () {
  function Tag() {
    _classCallCheck(this, Tag);
  }

  _createClass(Tag, null, [{
    key: 'pc',
    value: function pc() {
      var script = document.createElement('script');
      // eslint-disable-next-line max-len
      script.innerHTML = 'googletag.cmd.push(function(){googletag.display("div-gpt-ad-1505887740744-0");});';
      return script;
    }
  }, {
    key: 'sp',
    value: function sp() {
      var script = document.createElement('script');
      // eslint-disable-next-line max-len
      script.innerHTML = 'googletag.cmd.push(function(){googletag.display("div-gpt-ad-1505887822751-0");});';
      return script;
    }
  }]);

  return Tag;
}();

var bg = function bg() {
  var element = document.createElement('div');
  element.className = 'modal-bg';
  element.id = 'js-modal-bg';
  return element;
};

var contents = function contents() {
  var element = document.createElement('div');
  element.className = 'modal-intro-contents';
  return element;
};

var link = function link() {
  var element = document.createElement('div');
  element.className = 'modal-intro-link';
  return element;
};

var button = function button() {
  var element = document.createElement('div');
  element.className = 'modal-intro-close';
  var a = document.createElement('a');
  a.className = 'modal-intro-close-btn';
  a.href = '#js-modal-bg';
  a.innerHTML = '閉じる';
  element.appendChild(a);
};

var _pc = function _pc(modal) {
  var contentsElement = contents();
  var linkElement = link();
  var scriptElement = document.createElement('script');
  // eslint-disable max-len
  scriptElement.innerHTML = 'googletag.cmd.push(function() {\n          googletag.defineSlot(\'/531683568/download-popup/download-popup-desktop\', [580, 280], \'div-gpt-ad-1505887740744-0\').addService(googletag.pubads());\n          googletag.pubads().enableSingleRequest();\n          googletag.enableServices();\n        });';
  // eslint-enable max-len
  var target = document.createElement('div');
  target.id = 'div-gpt-ad-1505887740744-0';
  target.style.cssText = 'height:280px; width:580px;';
  var close = button();
  // ---
  // link
  linkElement.appendChild(scriptElement);
  linkElement.appendChild(target);
  // contents
  contentsElement.appendChild(linkElement);
  contentsElement.appendChild(close);
  // element
  modal.appendChild(bg());
  modal.appendChild(contentsElement);
  // body
  document.body.appendChild(modal);
  // return
  return {
    target: target,
    close: close
  };
};

var Modal = function () {
  _createClass(Modal, null, [{
    key: 'sp',
    value: function sp(modal) {
      // todo make modal dom
      console.log('Modal.sp', modal);
    }
  }, {
    key: 'pc',
    value: function pc(modal) {
      // todo make modal dom
      console.log('Modal.pc', modal);

      var _pc2 = _pc(modal),
          close = _pc2.close,
          target = _pc2.target;

      var instance = new Modal(modal, close, target, false);
      instance.start();
    }
  }]);

  function Modal(modal, close, target, sp) {
    _classCallCheck(this, Modal);

    this.modal = modal;
    this.close = close;
    this.target = target;
    this.onClick = this.onClick.bind(this);
    this.sp = sp;
  }

  _createClass(Modal, [{
    key: 'start',
    value: function start() {
      this.close.addEventListener('click', this.onClick, false);
      this.modal.style.cssText = 'display: block;';
      var script = this.sp ? Tag.sp : Tag.pc();
      this.target.appendChild(script);
    }
  }, {
    key: 'onClick',
    value: function onClick(event) {
      event.preventDefault();
      this.close.removeEventListener('click', this.onClick);
      this.modal.style.cssText = '';
    }
  }]);

  return Modal;
}();

exports.default = Modal;