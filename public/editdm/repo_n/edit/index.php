<?php


include $INCLUDEPATH."local.php";
include $INCLUDEPATH."_layout_template.php";
?>
<style>
	span.webview-del-btn,
	span.webview-add-btn{
		box-sizing: border-box;
		display: inline-block;
		padding: 6px 8px 6px 24px;
		margin: 0 0 0 3px;
		font-size: 12px;
		background-position: 8px 50%;
		background-repeat: no-repeat;
	}
	span.webview-del-btn{
		background-image: url(/shared/cms/img/cmd_deleteicon.gif);
	}
	span.webview-add-btn{
		margin-top: 3px;
		background-image: url(/shared/cms/img/cmd_newicon.gif);
	}
	span.btn{
		border: solid 1px #ccc;
		border-bottom-color: #999;
		border-right-color: #999;
		border-radius: 4px;
		cursor: pointer;
		transition: 0s background-color;
	}
	span.btn.disable{
		border: solid 1px #eee;
		border-bottom-color: #ccc;
		border-right-color: #ccc;
		background-color: #f5f5f5;
		color: #ccc;
		cursor: not-allowed;
		filter: 				alpha(opacity=50);
		-moz-opacity:			0.5;
		opacity:				0.5;
	}
	span.btn:not(.disable):hover{
		background-color: #f3f3f3;
		transition:300ms;
	}
</style>

<script type="text/javascript">
	//webview用の処理
	$(function(){
		//ボタンのイベント
		$(document)
			.on('click', '.webview-del-btn:not(.disable)', function(){
				var parent = $(this).closest('tr');
				del(this);
				delBtnSwitchDisplay(parent);
			})
			.on('click', '.webview-add-btn', function(){
				add(this);
				delBtnSwitchDisplay($(this).closest('tr'));
			});

		//初期処理
		function init(){
			var webviewBox = $('tr[class^="webview-"');
			var tr;
			var webviewClass;

			$.each(webviewBox, function(){
				tr = this;
				webviewClass = $(tr).attr('class').split(' ').filter(function(value, index, arr){
					return value.match(/webview-.+/) !== null;
				})[0];
				$(tr).find('td.inputFields > div').each(function(){
					insertDelButton($(this));
				});
				insertAddButton($(tr).find('td.inputFields > div:last'));
				delBtnSwitchDisplay(tr)
			});
		}

		//削除処理
		function del(btn){
			$(btn).closest('div').remove();
		}

		//追加処理
		function add(btn){
			var clone = $(btn).closest('td').find('div:first').clone(false);
			$(clone).css('display', 'none').find('input').val('').end()
					.insertBefore($(btn).closest('div')).fadeIn()
					.find('input').focus();
		}

		//要素数によって削除ボタンの表示・非表示を切り替える
		function delBtnSwitchDisplay(parent){
			var inputs = $(parent).find('input');
			if(inputs.length > 1){
				//表示
				$(parent).find('.webview-del-btn').removeClass('disable');
			}else{
				//非表示
				$(parent).find('.webview-del-btn').addClass('disable');
			}
		}

		//targetのなかに削除ボタンを追加する
		function insertDelButton(target){
			$(target).append(
				$('<span />').text('削除').addClass('webview-del-btn btn')
			);
		}
		//targetの後ろに追加ボタンを追加する
		function insertAddButton(target){
			$(target).after(
				$('<div />')
					.addClass('bl')
					.append(
						$('<span />').text('追加する').addClass('webview-add-btn btn')
					)
			);
		}

		init();
	});
</script>