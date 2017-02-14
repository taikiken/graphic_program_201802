<?php
/**
 * W侍の応募データをDynamoに入れるだけの簡単なお仕事♪
 * User: イケノ
 * Date: 2017/02/07
 * Time: 12:17
 */

/**
 * 応答用のJSON
 * Class ResponseJson
 */
class ResponseJson {

	/**
	 * 応募結果
	 * @var boolean
	 */
	public $success;

	/**
	 * メッセージ
	 * @var string
	 */
	public $message;
}

$result = new ResponseJson();

try {
	//検証
	if (strlen($_REQUEST["mail"]) > 0 !== true){
		throw new Exception("メールアドレスが入力されていません");
	}
	if (preg_match('|^[0-9a-z_./?-]+@([0-9a-z-]+\.)+[0-9a-z-]+$|', $_REQUEST["mail"]) !== 1){
		throw new Exception("メールアドレスの形式が正しくありません");
	}
	if (strlen($_REQUEST["prize"]) > 0 !== true){
		throw new Exception("応募するコースが選択されていません");
	}
	//サニタイズ
	$_REQUEST["prize"] = ($_REQUEST["prize"] === "soccer") ? "soccer" : "baseball";

	$prizeName = ($_REQUEST["prize"] === "soccer") ?
		"サッカー日本代表賞 / 日本代表 レプリカユニフォーム" : "野球日本代表賞 / WBC 2017 試合観戦チケット";


	require_once "aws.phar";


	//認証
	$credential = new Aws\Credentials\Credentials(
		"AKIAJ75CNEK5F75MYX4A", "jETQ9f2erD4IH5v1+7fJ2aemihj0w7D1XQhIjQOz"
	);
	//接続
	$dynamo = new \Aws\DynamoDb\DynamoDbClient([
		'credentials'	=> $credential,
		'region'		=> "ap-northeast-1",
		'version'		=> 'latest',
	]);

	//挿入
	$dynamo->putItem([
		'TableName' => 'ws-test',
		'Item' => [
			'id'	=> [ 'S' => uniqid() ],
			'mail'	=> [ 'S' => $_REQUEST["mail"] ],
			'prize'	=> [ 'S' => $_REQUEST["prize"] ]
		]
	]);

	//自動返信メール
	mb_send_mail(
		$_REQUEST["mail"],
		"[SPORTS BULL]「Ｗ侍プレゼントキャンペーン」の応募を受けつけました。",
		"「Ｗ侍プレゼントキャンペーン」へのご応募を受け付けました。

---

選択した賞品 : {$prizeName}
メールアドレス : {$_REQUEST["mail"]}

---

当選者様には、抽選のうえ、メールにてお知らせいたします。
今後ともスポーツブルをよろしくお願いいたします。

[ご注意]
こちらのメールアドレスは送信専用のため、直接返信されても返答できませんので予めご了承ください。

SPORTS BULL
https://sportsbull.jp/",
		"From: noreply@sportsbull.jp"
	);

	$result->success = true;
	$result->message = "応募完了しました";
}
catch (\Aws\Exception\AwsException $e){
	$result->success = false;
	$result->message = "不明なエラーが発生しました。再度時間をおいてお試し下さい";
}
catch (Exception $e){
	$result->success = false;
	$result->message = $e->getMessage();
}


header("Content-Type: Application/json");
echo json_encode($result);
exit;