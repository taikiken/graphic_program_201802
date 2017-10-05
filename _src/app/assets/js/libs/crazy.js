$(function () {
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
});