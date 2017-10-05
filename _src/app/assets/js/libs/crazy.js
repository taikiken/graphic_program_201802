$(function () {
    var offset = 0;
    var limit = 5;
    if(/detail/.test(window.location)) {
        $.ajax({
            type: 'GET',
            // リクエストURL
            url: '/api/v1/articles/category/crazy?offset=' + offset + '&length=' + limit,
            timeout: 10000,
            cache: true,
            data: {},
            dataType: 'json',
            // Ajax通信前処理
            beforeSend: function(jqXHR) {
                // falseを返すと処理を中断
                return true;
            }
        }).done(function(response, textStatus, jqXHR) {
            var cnt = 0;
            var leftWidth = 0;
            var topHeight1 = 0;
            var topHeight2 = 0;
            $(response.response.articles).each(function(key,row){
                if(cnt % 2 == 0) {
                    leftWidth =0;
                    var targetHeight = topHeight1;
                } else {
                    leftWidth =378;
                    var targetHeight =topHeight2 += 450;
                }
                var article = '                            <div class="board-item board-item-' + cnt + ' board-item-image" style="position: absolute; left: ' + leftWidth + 'px; top: ' + targetHeight + 'px;">\n' +
                    '                                <a class="post" href="' + row.url + '">\n' +
                    '                                    <figure class="post-thumb post-thumb-image" style="background: url(' + row.media.images.thumbnail  + ') center center / cover no-repeat;">\n' +
                    '                                        <img class="image-hd" src="https://sportsbull.jp/assets/images/common/thumb-16x9.png" alt="">\n' +
                    '                                    </figure>\n' +
                    '                                    <div class="post-data">\n' +
                    '                                        <p class="post-category post-category-wintersports">\n' +
                    '                                            <span class="category-label-wrapper">\n' +
                    '                                                <span class="category-label">' + row.category.label + '</span>\n' +
                    '                                            </span>\n' +
                    '                                        </p>\n' +
                    '                                        <h3 class="post-heading">' + row.title + '</h3>\n' +
                    '                                        <p class="post-date">3時間前</p>\n' +
                    '                                        <div class="post-excerpt-text">' + row.description + '</div>\n' +
                    '                                    </div>\n' +
                    '                                </a><!';
                //$('.board-large-column').append(article).css({height:'98px'});
                if(cnt % 2 == 0) {
                    topHeight1 += 450;
                } else {
                    topHeight2 += 450;
                }
                cnt++;
            });
        }).fail(function(jqXHR, textStatus, errorThrown ) {
            // 失敗時処理
        }).always(function(data_or_jqXHR, textStatus, jqXHR_or_errorThrown) {
            // doneまたはfail実行後の共通処理
        });
    } else {
        $.ajax({
            type: 'GET',
            // リクエストURL
            url: '/api/v1/articles/category/crazy/recommend?offset=0&length=4',
            timeout: 10000,
            cache: true,
            data: {},
            dataType: 'json',
            // Ajax通信前処理
            beforeSend: function(jqXHR) {
                // falseを返すと処理を中断
                return true;
            }
        }).done(function(response, textStatus, jqXHR) {
            $(response.response.articles).each(function(key,row){
                $li = $('<li></li>');
                $link = $('<a href="' + row.url + '"></a>');
                $link.append('<div class="img"><img src="' + row.media.images.medium + '" alt=""></div>');
                $div = $('<div class="txt_area"></div>');
                $div.append('<p class="category">' + row.category.label + '</p>');
                $div.append('<h3 class="post_ttl">' + row.title + '</h3>');
                $div.append('<p class="date">row.display_date</p>');
                $link.append($div);
                $li.append($link);
                $('.recommend_list .thumb_area').append($li);
            });
            // 成功時処理
            //レスポンスデータはパースされた上でresponseに渡される
        }).fail(function(jqXHR, textStatus, errorThrown ) {
            // 失敗時処理
        }).always(function(data_or_jqXHR, textStatus, jqXHR_or_errorThrown) {
            // doneまたはfail実行後の共通処理
        });
    }
});