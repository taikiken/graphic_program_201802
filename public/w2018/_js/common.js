var makeContent = {},jsondevurl,sportsBullAutoReload,scheduleCheckBaseElm,sokuhouCheckBaseElm,tournamentCheckBaseElm,rankingCheckBaseElm,teamCheckBaseElm,memberListCheckBaseElm,playerCheckBaseElm,nowTime,nowHour;
nowTime =new Date();
nowHour = nowTime.getHours();
if ( location.hostname.match(/dev./)) {
	jsondevurl = "dev-";
} else {
	jsondevurl = "";
}
//json取得
var bullGetJson = function(widgetType,url) {
	var xhr = new XMLHttpRequest(),jsonFile;
	xhr.open('GET', url);
	xhr.send();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			jsonFile = JSON.parse(xhr.responseText);
			makeContent[widgetType](jsonFile.response);
		}else if(xhr.readyState === 4 && xhr.status !== 200){
			console.log(xhr.status);
			return false;
		}
	};
}
makeContent['autoReload'] = function(jsonFile) {
	makeContent['makeCommonTag'](jsonFile);
	if (jsonFile.situation.id > 2) {
		clearInterval(sportsBullAutoReload);
	}
}
var isset = function(data){
    if(data === "" || data === null || data === undefined){
        return false;
    }else{
        return true;
    }
}
var getUrlVars = function(){
    var vars = {}; 
    var param = location.search.substring(1).split('&');
    for(var i = 0; i < param.length; i++) {
        var keySearch = param[i].search(/=/);
        var key = '';
        if(keySearch != -1) key = param[i].slice(0, keySearch);
        var val = param[i].slice(param[i].indexOf('=', 0) + 1);
        if(key != '') vars[key] = decodeURI(val);
    } 
    return vars; 
}