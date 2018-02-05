$(function () {
    var html = $('html');
    var main = $('main article');
    var eventsList = eventsList || {};
    var eventsLen = 0;
    var eventUnits = [];
    var commonFlag = false;
    var news = $('aside .news ul');
    var jsonPath = 'https://sportsbull.jp/sokuhou/data/';
    var createUnit = function (id, data) {
        var _delete_flag = data.delete_flag;
        var _class = 'time_line' + data.time_line + ' ' + 'hide_' + _delete_flag + ' ' + 'event_id_' + data.event_id;
        var _unit = $('<section></section>', { 'id': 'unit-' + id, 'class': _class, 'data-update': data.updated_at });
        var _time = $('<p></p>', { 'class': 'time', 'text': data.event_time });
        var _text = $('<p></p>', { 'class': 'text', 'html': data.event_text });
        _unit.append(_time).append(_text);
        return _unit;
    };
    var BeforeTheGame = function () {
        var _unit = $('<section></section>', { 'class': 'BeforeTheGame', 'html': '<p class="text">2016年11月15日 19:35 <em><img src="/sokuhou/img/txt_kickoff.png" alt="KICK-OFF"></em></p>' });
        main.append(_unit);
    };
    var setEvents = function (data) {
        eventUnits = [];
        eventsLen = Object.keys(data).length;
        for (var i in data) {
            var _unit = createUnit(i, data[i]);
            eventUnits.push(_unit);
        }
        if (eventsLen) {
            outputEvents();
        }
        else {
            if (!main.find('.BeforeTheGame').length)
                BeforeTheGame();
        }
    };
    var outputEvents = function () {
        var _units = eventUnits.slice();
        _units.reverse();
        main.empty();
        for (var i in _units) {
            if (!_units[i].attr('class').match(/hide_true/)) {
                main.append(_units[i]);
            }
        }
    };
    var updateEvents = function (data) {
        for (var i in data) {
            if (Number(i) <= eventsLen) {
                if (data[i].updated_at !== eventUnits[Number(i) - 1].attr('data-update')) {
                    var _unit = createUnit(i, data[i]);
                    eventUnits.splice(Number(i) - 1, 1, _unit);
                }
            }
            else {
                var _unit = createUnit(i, data[i]);
                eventUnits.push(_unit);
            }
        }
        eventsLen = Object.keys(data).length;
        if (eventsLen) {
            outputEvents();
        }
    };
    var loadTimeline = function () {
        $.ajax({
            type: 'GET',
            url: jsonPath + 'text_event.json',
            cache: false,
            dataType: 'json',
            success: function (data) {
                setEvents(data.events);
            }
        });
    };
    var updateTimeline = function () {
        $.ajax({
            type: 'GET',
            url: jsonPath + 'text_event.json',
            cache: false,
            dataType: 'json',
            success: function (data) {
                updateEvents(data.events);
            }
        });
    };
    var loadScore = function () {
        $.ajax({
            type: 'GET',
            url: jsonPath + 'score.json',
            cache: false,
            dataType: 'json',
            success: function (data) {
                var _left = $('.fixtures .score span:eq(0)');
                var _right = $('.fixtures .score span:eq(1)');
                var _state = $('#header .state span');
                _left.html(data.score.home_score);
                _right.html(data.score.away_score);
                _state.html(data.score.game_state);
            }
        });
    };
    var newsArray = [];
    var loadNews = function () {
        $.ajax({
            type: 'GET',
            url: jsonPath + 'news.json',
            cache: false,
            dataType: 'json',
            success: function (data) {
                newsArray = [];
                news.empty();
                for (var i in data) {
                    var _li = $('<li></li>');
                    var _a = $('<a></a>', { 'href': data[i].news_url, 'html': data[i].caption, 'target': '_blank' });
                    _li.append(_a);
                    if (!data[i].delete_flag)
                        newsArray.push(_li);
                }
                newsArray.reverse();
                for (var i in newsArray) {
                    news.append(newsArray[i]);
                }
            }
        });
    };
    setInterval(function () {
        loadTimeline();
        loadScore();
    }, 10000);
    setInterval(function () {
        loadNews();
    }, 120000);
    var init = function () {
        loadTimeline();
        loadScore();
        loadNews();
    }();
});
