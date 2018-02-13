<?php
include $INCLUDEPATH . "conf/config.php";
include $INCLUDEPATH . $DB . ".php";
include $INCLUDEPATH . "func.php";

//強制ログアウト
logIns("ログアウトしました",getSorC("usr"));

if($SORC==1){
	$_SESSION=array();
	session_destroy();
}else{
	$cv=array("mid","alv","usr","repo","form","new","edit","delete","order","draft","categoryadmin","suadmin","formedit","download","formtemplate","master","environment","stylesheet","trackback","poll","updateping");
	for($i=0;$i<count($cv);$i++){
		setcookie($cv[$i],"",time()-3600,"/editdm/");
		setcookie($cv[$i],"",time()-3600,"/");
	}
}
$CURRENTPATH = $_SERVER["SCRIPT_FILENAME"];
if (strpos($CURRENTPATH, $ADPATH)) {
    include $INCLUDEPATH . "dbutl.php";
    include $INCLUDEPATH . "pos.php";
    include $INCLUDEPATH . "tool.php";
    include $INCLUDEPATH . "input.php";
    include $INCLUDEPATH . "param.php";
    $q = new ps($_SERVER["PHP_SELF"]);
    $g = new gm($_GET);
    if ($SORC == 1) {
        while (list($k, $v) = each($_SESSION)) {
            $_SESSION[$k] = $v;
        }
    } else {
        while (list($k, $v) = each($_COOKIE)) {
            if ($k != "repeatcount")
                setcookie($k, $v, time() + 60 * 60 * 3, "/editdm/");
        }
    }
    $o = new db;
    $o->connect();
}else {
    header('Cache-Control: no-cache="set-cookie", no-store, no-cache, must-revalidate, post-check=0, pre-check=0');
}


if (isset($_GET["jwt"])) {
    //JWT APIでユーザを取得
    $domainMap = [
        'undotsushin.local' => 'vagrant.for.mac.localhost',
        'dev.sportsbull.jp' => 'dev-cms2.sportsbull.jp',
        'stg.sportsbull.jp' => null,
        'sportsbull.jp' => null,
    ];

    $host = null;
    if(isset($domainMap[$_SERVER['SERVER_NAME']])){
        $host = $domainMap[$_SERVER['SERVER_NAME'] ];
    }
    if($host === null){
        echo 'この環境から実行するAPIのドメインが未定義です。';
        exit;
    }

    $curl = curl_init();
    // 共通のオプション
    $url = ( empty($_SERVER['HTTPS']) ? 'http://' : 'https://' )."{$host}/api/jwt/me";
    $data = ['token' => $_GET["jwt"]];
    $header = ['Content-Type: application/json', 'X-Requested-With: XMLHttpRequest',];
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'GET');
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HEADER, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
    // curl実行
    $response = curl_exec($curl);
    $headerSize = curl_getinfo($curl, CURLINFO_HEADER_SIZE);
    $body = substr($response, $headerSize);
    $result = json_decode($body, true);
    curl_close($curl);
    if (empty($result['old_admin_id'])) {
        echo '連携情報が取得できませんでした。連携の設定を確認してください';
        exit;
    }

    $sql = "select id,usr,m,pwd,email,repo,permission,systems,is_external,u_media,is_carousel_headline from authentic where id='" . $result['old_admin_id'] . "'";
    $o->query($sql);
    $f = $o->fetch_array();
    if (empty($f)) {
        echo '連携先のアカウントは存在しません。連携の設定を確認してください';
        exit;
    }
    if ($ADMINUSR == 0) {
        setcookie("adminusr", 1, time() + 60 * 60 * 24, "/editdm/");
    } else {
        setcookie("adminusr", "", time() - 3600, "/editdm/");
    }

    if ($SORC == 1) {
        //session_cache_limiter("nocache");
        //session_cache_expire(180);
        sessionregister(array("mid", "alv", "usr", "repo", "form", "new", "edit", "delete", "order", "draft", "categoryadmin", "suadmin", "formedit", "download", "formtemplate", "master", "environment", "stylesheet", "trackback", "poll", "updateping"));
    }

    setSorC("mid", $f["id"]);
    setSorC("alv", ($f["m"]));
    setSorC("usr", ($f["usr"]));

    if ($f["id"] == 1) {
        $permission = array("new", "edit", "delete", "draft", "order", "categoryadmin", "suadmin", "formedit", "download", "formtemplate", "master", "environment", "stylesheet", "trackback", "poll", "updateping");
        for ($i = 0; $i < count($permission); $i++) {
            setSorC($permission[$i], 1);
        }
        $sql = "select id from repo where rid=0";
        $o->query($sql);
        while ($ff = $o->fetch_array()) {
            $j[] = $ff["id"];
        }
        $j = @implode(",", $j);
        setSorC("repo", ($j));
    } else {
        $permission = array("new", "edit", "delete", "draft", "order");
        if (strlen($f["permission"]) > 0) {
            for ($i = 0; $i < count($permission); $i++) {
                if (gettype(strpos($f["permission"], (string) ($i + 75))) != "boolean") {
                    setSorC($permission[$i], 1);
                } else {
                    setSorC($permission[$i], 0);
                }
            }
        } else {
            for ($i = 0; $i < count($permission); $i++) {
                setSorC($permission[$i], 0);
            }
        }
        $permission = array("categoryadmin", "suadmin", "formedit", "download", "formtemplate", "master", "environment", "stylesheet", "trackback", "poll", "updateping");
        if (strlen($f["systems"]) > 0) {
            for ($i = 0; $i < count($permission); $i++) {
                if (gettype(strpos($f["systems"], (string) ($i + 86))) != "boolean") {
                    setSorC($permission[$i], 1);
                } else {
                    setSorC($permission[$i], 0);
                }
            }
        } else {
            for ($i = 0; $i < count($permission); $i++) {
                setSorC($permission[$i], 0);
            }
        }
        if ($f['usr'] == 'ut') {
            setSorC('suadmin', 1);
        }
        setSorC("repo", ($f["repo"]));
    }
    if (false === empty($f['is_external']) && $f['is_external'] > 0) {
        setSorC('is_external', 1);
    } else {
        setSorC('is_external', 0);
    }
    if (false === empty($f['is_carousel_headline']) && $f['is_carousel_headline'] > 0) {
        setSorC('is_carousel_headline', 1);
    } else {
        setSorC('is_carousel_headline', 0);
    }
    if (false === empty($f['u_media'])) {
        setSorC('u_media', $f['u_media']);
    } else {
        setSorC('is_external', 0);
    }

    $alv = addslashes($f["m"]);
    $usr = addslashes($usr);

    $sql = sprintf("insert into login(usr,m,ip,ltime) values('%s',%s,'%s',now())", $usr, $alv, getenv("REMOTE_ADDR"));
    $o->query($sql);

    logIns("ログインしました", getSorC("usr"));
    header(sprintf("Location:%s", "/editdm/index_s.php"));
    exit;
}