<?php
/**
 * W侍の応募データをDynamoから出すだけな簡単な仕事
 * @todo 認証処理が必要かも IP制限とかいいかも
 * User: イケノ
 * Date: 2017/02/07
 * Time: 12:17
 */

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

//テーブル指定
$scan = [
	'TableName' => 'ws-test'
];
if ($_REQUEST["prize"] !== null){
	//サニタイズ
	$_REQUEST["prize"] = ($_REQUEST["prize"] === "soccer") ? "soccer" : "baseball";
	//条件追加
	$scan['ScanFilter'] = array(
		'prize' => array(
			'AttributeValueList' => array(
				array('S' => $_REQUEST["prize"])
			),
			'ComparisonOperator' => 'EQ'
		),
	);
}

$iterator = $dynamo->getIterator('Scan', $scan);
?>
<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="UTF-8">
	<title>応募者リスト</title>
</head>
<body>
	<h1>応募者リスト</h1>

	<a href="?">全て</a>
	|
	<a href="?prize=soccer">サッカー応募者</a>
	|
	<a href="?prize=baseball">野球応募者</a>

	<hr/>

	<table>
		<tr>
			<th>メールアドレス</th>
			<th>応募種別</th>
		</tr>
		<?php foreach ($iterator as $row){ ?>

			<tr>
				<td><?php echo $row["mail"]["S"]; ?></td>
				<td><?php echo $row["prize"]["S"]; ?></td>
			</tr>

		<?php } ?>
	</table>

</body>
</html>