(function() {
  window.Synapse = {
    endpoint: 'https://api.synapse-link.com',
    ad: {
      endpoint: 'https://ssl.socdm.com'
    },
    version: '1.1.0'
  };

  document.addEventListener('DOMContentLoaded', function(event) {
    return Array.prototype.forEach.call(document.querySelectorAll('.synapse-page-tracker'), function(element) {
      return Synapse.Page.initializeWithHTMLElement(element);
    });
  });

}).call(this);

(function() {
  Synapse.Logger = (function() {
    function Logger() {}

    Logger.DEBUG = 0;

    Logger.INFO = 1;

    Logger.WARN = 2;

    Logger.ERROR = 3;

    Logger.logLevel = 3;

    Logger.debug = function(text) {
      if (this.logLevel <= this.DEBUG) {
        return console.log("%c" + text, 'color: #808080');
      }
    };

    Logger.info = function(text) {
      if (this.logLevel <= this.INFO) {
        return console.info("%c" + text, 'color: #0000CD');
      }
    };

    Logger.warn = function(text) {
      if (this.logLevel <= this.WARN) {
        return console.warn("%c" + text, 'color: #FF8C00');
      }
    };

    Logger.error = function(text) {
      if (this.logLevel <= this.ERROR) {
        return console.error("%c" + text, 'color: red; font-style: italic');
      }
    };

    return Logger;

  })();

}).call(this);

(function() {
  Synapse.EventListener = (function() {
    EventListener.prototype.className = 'Synapse.EventListener';

    function EventListener(handler) {
      this.handler = handler;
    }

    return EventListener;

  })();

}).call(this);

(function() {
  var slice = [].slice;

  Synapse.MVCObject = (function() {
    function MVCObject() {}

    MVCObject.prototype.className = 'Synapse.MVCObject';

    MVCObject.prototype.addListener = function(eventName, handler) {
      var eventListener;
      this._listeners || (this._listeners = {});
      eventListener = new Synapse.EventListener(handler);
      if (typeof this._listeners[eventName] === 'undefined') {
        this._listeners[eventName] = [eventListener];
      } else {
        this._listeners[eventName].push(eventListener);
      }
      return eventListener;
    };

    MVCObject.prototype.fire = function() {
      var args, eventName;
      eventName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      this._listeners || (this._listeners = {});
      if (typeof this._listeners[eventName] === 'object') {
        return this._listeners[eventName].forEach(function(element) {
          return element.handler.apply(self, args);
        });
      }
    };

    MVCObject.prototype.removeListener = function(eventName, eventListener) {
      var index;
      this._listeners || (this._listeners = {});
      if (typeof this._listeners[eventName] === 'object') {
        index = this._listeners[eventName].indexOf(eventListener);
        return this._listeners[eventName].splice(index, 1);
      }
    };

    return MVCObject;

  })();

}).call(this);

(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Synapse.APIResponse = (function(superClass) {
    extend(APIResponse, superClass);

    APIResponse.prototype.className = 'Synapse.APIResponse';

    APIResponse.prototype.status = null;

    APIResponse.prototype.headers = {};

    APIResponse.prototype.responseObject = null;

    APIResponse.prototype.responseText = null;

    APIResponse.prototype.isSuccess = false;

    function APIResponse() {
      this.setResponseObject = bind(this.setResponseObject, this);
      this.setHeaders = bind(this.setHeaders, this);
      this.updateWithXHRObject = bind(this.updateWithXHRObject, this);
    }

    APIResponse.prototype.updateWithXHRObject = function(xhr) {
      var ref;
      this.status = xhr.status;
      this.setHeaders(xhr.getAllResponseHeaders());
      this.responseText = xhr.responseText;
      this.responseObject = this.setResponseObject(xhr.responseText);
      this.isSuccess = (ref = this.status >= 200 && this.status < 400) != null ? ref : {
        "true": false
      };
      return this.fire('update');
    };

    APIResponse.prototype.setHeaders = function(headersString) {
      return headersString.split("\r\n").forEach((function(_this) {
        return function(keyPairString) {
          var keyPair;
          keyPair = keyPairString.split(':');
          if (keyPair.length === 2) {
            return _this.headers[keyPair[0].trim()] = keyPair[1].trim();
          }
        };
      })(this));
    };

    APIResponse.prototype.setResponseObject = function(responseText) {
      try {
        return this.responseObject = JSON.parse(responseText);
      } catch (_error) {
        return this.responseObject = null;
      }
    };

    return APIResponse;

  })(Synapse.MVCObject);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Synapse.APIClient = (function(superClass) {
    extend(APIClient, superClass);

    APIClient.prototype.className = 'Synapse.APIClient';

    APIClient.prototype.STATE_INTIALIZED = 0;

    APIClient.prototype.STATE_LOADED = 1;

    APIClient.prototype.timeout = 2000;

    function APIClient(options) {
      if (options == null) {
        options = {};
      }
      this.endpoint = (options.endpoint || Synapse.endpoint).replace(/\/$/, '');
      this.serviceUUID = options.serviceUUID;
      this.useCookie = true;
      Synapse.Logger.debug("Synapse.APIClient initialized.");
    }

    APIClient.prototype.get = function(path, options) {
      var apiResponse, pairs, propertyName, url, xhr;
      if (options == null) {
        options = {};
      }
      options['synapse_js_sdk_version'] = Synapse.version;
      pairs = [];
      for (propertyName in options) {
        pairs.push(propertyName + "=" + (encodeURIComponent(options[propertyName])));
      }
      if (pairs.length > 0) {
        url = ["" + this.endpoint + path, pairs.join('&')].join('?');
      } else {
        url = "" + this.endpoint + path;
      }
      xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      Synapse.Logger.debug("XHR GET Request: " + url);
      xhr.timeout = this.timeout;
      xhr.withCredentials = this.useCookie;
      xhr.send();
      apiResponse = new Synapse.APIResponse();
      xhr.onreadystatechange = (function(_this) {
        return function() {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            return apiResponse.updateWithXHRObject(xhr);
          }
        };
      })(this);
      xhr.ontimeout = (function(_this) {
        return function() {
          return apiResponse.fire('timeout');
        };
      })(this);
      return apiResponse;
    };

    return APIClient;

  })(Synapse.MVCObject);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Synapse.Menu = (function(superClass) {
    extend(Menu, superClass);

    Menu.prototype.className = 'Synapse.Menu';

    function Menu(menuName) {
      this.menuName = menuName;
      this.status = Synapse.APIClient.prototype.STATE_INTIALIZED;
      this._apiClient = new Synapse.APIClient();
      this._eventSender = new Synapse.EventSender(this._apiClient);
    }

    Menu.prototype.init = function() {
      this.serviceList = new Synapse.ServiceList(this);
      this.serviceList.addListener('load', (function(_this) {
        return function() {
          _this.status = Synapse.APIClient.prototype.STATE_LOADED;
          _this.serviceList.serviceListItems.forEach(function(item) {
            item._bindToServiceNotification(_this.serviceNotification);
            return item.addListener('notification_update', function() {
              return _this.fire('service_notification_update');
            });
          });
          _this.fire('service_list_load');
          return _this._fire_ready();
        };
      })(this));
      this.serviceList.fetch();
      this.serviceNotification = new Synapse.ServiceNotification(this);
      this.serviceNotification.addListener('load', (function(_this) {
        return function() {
          return _this.fire('service_notification_load');
        };
      })(this));
      return this.serviceNotification.fetch();
    };

    Menu.prototype._fire_ready = function() {
      if (this.serviceList.status === Synapse.APIClient.prototype.STATE_LOADED) {
        return this.fire('ready');
      }
    };

    Menu.prototype.trackShowEvent = function() {
      this.serviceList._clearShowServiceList();
      return this._eventSender.send('show_menu', {
        menu_name: this.menuName
      });
    };

    return Menu;

  })(Synapse.MVCObject);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Synapse.ServiceList = (function(superClass) {
    extend(ServiceList, superClass);

    ServiceList.prototype.className = 'Synapse.ServiceList';

    function ServiceList(menu) {
      this.menu = menu;
      this.status = Synapse.APIClient.prototype.STATE_INTIALIZED;
      this.serviceListItems = [];
      this._displayedItems = {};
      Synapse.Logger.debug('Synapse.ServiceList initialized.');
    }

    ServiceList.prototype.fetch = function() {
      var response;
      response = this.menu._apiClient.get('/api/v2/service_lists/show.json', {
        menu_name: this.menu.menuName
      });
      return response.addListener('update', (function(_this) {
        return function() {
          _this.status = Synapse.APIClient.prototype.STATE_LOADED;
          _this._extractResponseObject(response.responseObject);
          Synapse.Logger.debug('Done: load service list done.');
          return _this.fire('load');
        };
      })(this));
    };

    ServiceList.prototype._extractResponseObject = function(responseObject) {
      var items;
      items = responseObject.service_list_items;
      if (items) {
        return items.forEach((function(_this) {
          return function(item) {
            var serviceListItem;
            serviceListItem = new Synapse.ServiceListItem(_this);
            serviceListItem._extractResponseObject(item);
            return _this.serviceListItems.push(serviceListItem);
          };
        })(this));
      }
    };

    ServiceList.prototype._clearShowServiceList = function() {
      return this._displayedItems = {};
    };

    ServiceList.prototype._isShowServiceItem = function(itemId) {
      return this._displayedItems[itemId];
    };

    ServiceList.prototype._setShowServiceItem = function(itemId) {
      return this._displayedItems[itemId] = true;
    };

    return ServiceList;

  })(Synapse.MVCObject);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Synapse.ServiceListItem = (function(superClass) {
    extend(ServiceListItem, superClass);

    ServiceListItem.prototype.className = 'Synapse.ServiceListItem';

    function ServiceListItem(serviceList) {
      this.serviceList = serviceList;
      this._elements = {};
      this._elements.container = document.createElement('div');
      this._elements.container.className = 'synapse_container';
      this._elements.anchor = document.createElement('a');
      this._elements.container.appendChild(this._elements.anchor);
      this._elements.icon = document.createElement('img');
      this._elements.icon.className = 'synapse_icon';
      this._elements.anchor.appendChild(this._elements.icon);
      this._elements.category = document.createElement('div');
      this._elements.category.className = 'synapse_category';
      this._elements.categoryText = document.createTextNode('');
      this._elements.category.appendChild(this._elements.categoryText);
      this._elements.anchor.appendChild(this._elements.category);
      this._elements.serviceName = document.createElement('div');
      this._elements.serviceName.className = 'synapse_service_name';
      this._elements.serviceNameText = document.createTextNode('');
      this._elements.serviceName.appendChild(this._elements.serviceNameText);
      this._elements.anchor.appendChild(this._elements.serviceName);
      this._elements.notificationCount = document.createElement('div');
      this._elements.notificationCount.className = 'synapse_notification_count';
      this._elements.notificationCountText = document.createTextNode('');
      this._elements.notificationCount.appendChild(this._elements.notificationCountText);
      this._elements.anchor.appendChild(this._elements.notificationCount);
      this._elements.notificationBody = document.createElement('div');
      this._elements.notificationBody.className = 'synapse_notification_text';
      this._elements.notificationBodyText = document.createTextNode('');
      this._elements.notificationBody.appendChild(this._elements.notificationBodyText);
      this._elements.anchor.appendChild(this._elements.notificationBody);
    }

    ServiceListItem.prototype.notifications = [];

    ServiceListItem.prototype._elements = {};

    ServiceListItem.prototype._extractResponseObject = function(responseObject) {
      var image, link;
      this.id = responseObject.id;
      this.serviceName = responseObject.service_name;
      this.category = responseObject.category;
      this.displayName = responseObject.display_name;
      if (responseObject.dark_theme_icon) {
        image = new Synapse.Image(this);
        image._extractResponseObject(responseObject.dark_theme_icon);
        this.darkThemeIcon = image;
      }
      if (responseObject.light_theme_icon) {
        image = new Synapse.Image(this);
        image._extractResponseObject(responseObject.light_theme_icon);
        this.lightThemeIcon = image;
      }
      if (responseObject.link) {
        link = new Synapse.Link(this);
        link._extractResponseObject(responseObject.link);
        link.serviceListItem = this;
        return this.link = link;
      }
    };

    ServiceListItem.prototype._updateHTMLElement = function() {
      var icon, link;
      this._elements.categoryText.nodeValue = this.category;
      this._elements.serviceNameText.nodeValue = this.displayName;
      if (this._theme === 'dark') {
        icon = this.darkThemeIcon;
      } else {
        icon = this.lightThemeIcon;
      }
      if (icon) {
        this._elements.icon.src = icon.src;
        this._elements.icon.width = icon.width;
        this._elements.icon.height = icon.height;
      }
      if (this.notifications[0] && this.notifications[0].link) {
        link = this.notifications[0].link;
      } else {
        link = this.link;
      }
      this._elements.anchor.href = link.url;
      this._elements.anchor.target = '_blank';
      this._elements.anchor.rel = 'nofollow';
      this._elements.anchor.addEventListener('click', (function(_this) {
        return function(event) {
          event.preventDefault();
          return link.open(event);
        };
      })(this));
      if (this.notifications.length > 0) {
        this._elements.notificationBodyText.nodeValue = this.notifications[0].text;
        return this._elements.notificationCountText.nodeValue = this.notifications.length;
      } else {
        return this._elements.notificationCountText.nodeValue = '';
      }
    };

    ServiceListItem.prototype.toHTMLElement = function(options) {
      if (options == null) {
        options = {};
      }
      this._theme = options.theme || 'light';
      this._updateHTMLElement();
      return this._elements.container;
    };

    ServiceListItem.prototype._bindToServiceNotification = function(serviceNotification) {
      this._updateNotifications(serviceNotification);
      return serviceNotification.addListener('update', (function(_this) {
        return function() {
          return _this._updateNotifications(serviceNotification);
        };
      })(this));
    };

    ServiceListItem.prototype._updateNotifications = function(serviceNotification) {
      var currentItemIds, newItemIds, notifications;
      notifications = serviceNotification.getNotificationItemsByServiceName(this.serviceName);
      currentItemIds = this.notifications.map(function(item) {
        return item.id;
      });
      newItemIds = notifications.map(function(item) {
        return item.id;
      });
      if (currentItemIds.sort().toString() !== newItemIds.sort().toString()) {
        this.notifications = notifications;
        this.notifications.forEach((function(_this) {
          return function(notification) {
            if (notification.link) {
              return notification.link.serviceListItem = _this;
            }
          };
        })(this));
        this._updateHTMLElement();
        this.fire('notification_update');
      }
      if (currentItemIds.length !== newItemIds.length) {
        return this.fire('notification_count_change');
      }
    };

    ServiceListItem.prototype.trackShowEvent = function() {
      var params;
      params = {
        menu_name: this.serviceList.menu.menuName,
        service_list_item_id: this.id
      };
      if (this.notifications.length > 0) {
        params.service_notification_id = this.notifications[0].id;
      }
      if (!this.serviceList._isShowServiceItem(this.id)) {
        this.serviceList._setShowServiceItem(this.id);
        return this.serviceList.menu._eventSender.send('show_service_list_item', params);
      }
    };

    ServiceListItem.prototype.trackClickEvent = function(options) {
      var params;
      if (options == null) {
        options = {};
      }
      params = {
        menu_name: this.serviceList.menu.menuName,
        service_list_item_id: this.id,
        is_deep_link: !!options.isDeepLink,
        is_deep_link_fallback: !!options.isDeepLinkFallback
      };
      if (options.nextUrl) {
        params.next_url = options.nextUrl;
      }
      if (options.urlSignature) {
        params.url_signature = options.urlSignature;
      }
      if (this.notifications.length > 0) {
        params.service_notification_id = this.notifications[0].id;
      }
      return this.serviceList.menu._eventSender.send('click_service_list_item', params, !!options.redirect);
    };

    return ServiceListItem;

  })(Synapse.MVCObject);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Synapse.ServiceNotification = (function(superClass) {
    extend(ServiceNotification, superClass);

    ServiceNotification.prototype.className = 'Synapse.ServiceNotification';

    function ServiceNotification(menu) {
      this.menu = menu;
      this.status = Synapse.APIClient.prototype.STATE_INTIALIZED;
      this.serviceNotificationItems || (this.serviceNotificationItems = []);
    }

    ServiceNotification.prototype.fetch = function() {
      var response;
      response = this.menu._apiClient.get('/api/v2/service_notifications.json', {
        menu_name: this.menu.menuName
      });
      return response.addListener('update', (function(_this) {
        return function() {
          _this.status = Synapse.APIClient.prototype.STATE_LOADED;
          _this._extractResponseObject(response.responseObject);
          _this.fire('load');
          return _this.fire('update');
        };
      })(this));
    };

    ServiceNotification.prototype._extractResponseObject = function(responseObject) {
      var items;
      items = responseObject.service_notifications;
      if (items) {
        return items.forEach((function(_this) {
          return function(item) {
            var serviceNotificationItem;
            serviceNotificationItem = new Synapse.ServiceNotificationItem(_this);
            serviceNotificationItem._extractResponseObject(item);
            return _this.serviceNotificationItems.push(serviceNotificationItem);
          };
        })(this));
      }
    };

    ServiceNotification.prototype.getNotificationItemsByServiceName = function(serviceName) {
      return this.serviceNotificationItems.filter(function(item) {
        return item.serviceName === serviceName;
      });
    };

    return ServiceNotification;

  })(Synapse.MVCObject);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Synapse.ServiceNotificationItem = (function(superClass) {
    extend(ServiceNotificationItem, superClass);

    ServiceNotificationItem.prototype.className = 'Synapse.ServiceNotificationItem';

    function ServiceNotificationItem(service_notification) {
      this.service_notification = service_notification;
    }

    ServiceNotificationItem.prototype._extractResponseObject = function(responseObject) {
      var link;
      this.id = responseObject.id;
      this.serviceName = responseObject.service_name;
      this.text = responseObject.text;
      if (responseObject.link) {
        link = new Synapse.Link(this);
        link._extractResponseObject(responseObject.link);
        return this.link = link;
      }
    };

    return ServiceNotificationItem;

  })(Synapse.MVCObject);

}).call(this);

(function() {
  Synapse.Navigation = (function() {
    function Navigation() {}

    Navigation.redirect = function(url, target) {
      if (target == null) {
        target = '_self';
      }
      return document.location = url;
    };

    return Navigation;

  })();

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Synapse.Image = (function(superClass) {
    extend(Image, superClass);

    Image.prototype.className = 'Synapse.Image';

    function Image(imageable) {
      this.imageable = imageable;
    }

    Image.prototype.src = null;

    Image.prototype.width = null;

    Image.prototype.height = null;

    Image.prototype._extractResponseObject = function(responseObject) {
      this.width = responseObject.width;
      this.height = responseObject.height;
      return this.src = responseObject.src;
    };

    return Image;

  })(Synapse.MVCObject);

}).call(this);

(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Synapse.Link = (function(superClass) {
    extend(Link, superClass);

    Link.prototype.className = 'Synapse.Link';

    function Link(linkable) {
      this.linkable = linkable;
      this._fallbackTimer = bind(this._fallbackTimer, this);
      this._fallback = bind(this._fallback, this);
    }

    Link.prototype.url = null;

    Link.prototype.urlSignature = null;

    Link.prototype.fallbackUrl = null;

    Link.prototype.fallbackUrlSignature = null;

    Link.prototype.androidPackageName = null;

    Link.prototype.serviceListItem = null;

    Link.prototype._extractResponseObject = function(responseObject) {
      this.url = responseObject.url;
      this.urlSignature = responseObject.url_signature;
      this.fallbackUrl = responseObject.fallback_url;
      this.fallbackUrlSignature = responseObject.fallback_url_signature;
      return this.androidPackageName = responseObject.android_package_name;
    };

    Link.prototype.open = function() {
      var iframe, scheme;
      scheme = this.url.match(/^(\w+)/)[1];
      if (scheme !== 'http' && scheme !== 'https') {
        this.serviceListItem.trackClickEvent({
          isDeepLink: true,
          isDeepLinkFallback: false,
          redirect: false
        });
        if ((navigator.userAgent.indexOf('iPhone') >= 0) || (navigator.userAgent.indexOf('iPad') >= 0) || (navigator.userAgent.indexOf('iPod') >= 0)) {
          if (navigator.userAgent.indexOf('CriOS') >= 0) {
            return Synapse.Navigation.redirect(this.fallbackUrl);
          } else {
            iframe = document.createElement('iframe');
            iframe.style.border = 'none';
            iframe.style.width = '1px';
            iframe.style.height = '1px';
            iframe.setAttribute('src', this.url);
            document.body.appendChild(iframe);
            return this._fallbackTimer(2000, iframe);
          }
        } else {
          return Synapse.Navigation.redirect(this.url);
        }
      } else {
        return this.serviceListItem.trackClickEvent({
          nextUrl: this.url,
          urlSignature: this.urlSignature,
          isDeepLink: false,
          isDeepLinkFallback: false,
          redirect: true
        });
      }
    };

    Link.prototype._fallback = function() {
      return this.serviceListItem.trackClickEvent({
        nextUrl: this.fallbackUrl,
        urlSignature: this.fallbackUrlSignature,
        isDeepLink: false,
        isDeepLinkFallback: true,
        redirect: true
      })();
    };

    Link.prototype._fallbackTimer = function(time, iframe) {
      var start;
      start = Date.now();
      return setTimeout((function(_this) {
        return function() {
          var diff;
          document.body.appendChild(iframe);
          diff = Date.now() - start - time;
          if (diff < 30) {
            return _this._fallback();
          }
        };
      })(this), time);
    };

    return Link;

  })(Synapse.MVCObject);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Synapse.EventSender = (function(superClass) {
    extend(EventSender, superClass);

    function EventSender(_apiClient) {
      this._apiClient = _apiClient;
    }

    EventSender.prototype.send = function(tag_name, options, redirect) {
      var ext, pairs, path, propertyName;
      if (options == null) {
        options = {};
      }
      if (redirect == null) {
        redirect = false;
      }
      ext = redirect ? "html" : "json";
      path = "/api/v2/events/" + tag_name + "." + ext;
      if (redirect) {
        pairs = [];
        for (propertyName in options) {
          pairs.push(propertyName + "=" + (encodeURIComponent(options[propertyName])));
        }
        Synapse.Logger.debug("make redirection to: " + Synapse.endpoint + path + "?" + (pairs.join('&')));
        return Synapse.Navigation.redirect("" + Synapse.endpoint + path + "?" + (pairs.join('&')));
      } else {
        return this._apiClient.get(path, options);
      }
    };

    return EventSender;

  })(Synapse.MVCObject);

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Synapse.Page = (function(superClass) {
    extend(Page, superClass);

    Page.prototype.className = 'Synapse.Page';

    Page.prototype.customParameters = ['source', 'medium', 'campaign', 'term', 'content'];

    Page.prototype.customParameterAttributes = {};

    function Page(pageName) {
      this.pageName = pageName;
      this._referenceId = Math.floor(Math.random() * 100000000);
      this._eventSender = new Synapse.EventSender(new Synapse.APIClient());
    }

    Page.prototype.extractParametersFromLocation = function(location) {
      var queryString;
      queryString = location.search.split('?')[1];
      if (queryString) {
        return queryString.split('&').forEach((function(_this) {
          return function(pair) {
            var keyValues, matches, parameter;
            keyValues = pair.split('=');
            matches = keyValues[0].match(/utm_(\w+)/);
            if (matches) {
              parameter = matches[1];
              if (keyValues[1] && _this.customParameters.indexOf(parameter) >= 0) {
                return _this.customParameterAttributes[parameter] = decodeURIComponent(keyValues[1]);
              }
            }
          };
        })(this));
      }
    };

    Page.prototype.overrideParametersWithHTMLElement = function(element) {
      return this.customParameters.forEach((function(_this) {
        return function(parameter) {
          if (element.dataset[parameter]) {
            return _this.customParameterAttributes[parameter] = element.dataset[parameter];
          }
        };
      })(this));
    };

    Page.prototype.trackVisitEvent = function() {
      var params, prop;
      params = {
        page_name: this.pageName,
        http_referrer: document.referrer
      };
      for (prop in this.customParameterAttributes) {
        params["utm_" + prop] = this.customParameterAttributes[prop];
      }
      return this._eventSender.send('visit_page', params);
    };

    Page.initializeWithHTMLElement = function(element) {
      var page;
      if (element.dataset.endpoint) {
        Synapse.endpoint = element.dataset.endpoint;
      }
      if (element.dataset.logLevel) {
        Synapse.Logger.logLevel = Synapse.Logger[element.dataset.logLevel];
      }
      if (element.dataset.pageName && !element.dataset.referenceId) {
        page = new Synapse.Page(element.dataset.pageName);
        element.dataset._referenceId = page.referenceId;
        page.extractParametersFromLocation(location);
        page.overrideParametersWithHTMLElement(element);
        return page.trackVisitEvent();
      }
    };

    return Page;

  })(Synapse.MVCObject);

}).call(this);
