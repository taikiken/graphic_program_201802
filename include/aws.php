<?php

require_once('aws.phar');

use Aws\S3\S3Client;
use Aws\S3\Exception\S3Exception;
use Guzzle\Http\EntityBody;

/**
* S3を操作するモジュールサンプル
* upload アップロードします。
* delete 削除します。
* read S3から情報を読み込みます。
*/

class S3Module {

	private $bucket = "";
	// AWSのキー名
	private $keyId = "";
	// シークレットキー
	private $secretKey = "";
	// region 東京region指定
	private $region = 'ap-northeast-1';

	/**
	* アップロードメソッド
	* $localFilePathにローカルのパスを指定するとそのファイルをアップロードします。
	* 空の場合、ファイルが存在しない時は例外が発生します。
	* $uploadFileNameにはアップロード後のファイル名を指定します。
	*/

	public function upload($localFilePath, $uploadFileName) {

		// パスのチェック　ファイルパスが空ではないか？
		if (empty($localFilePath)) {
			throw new Exception('ファイルアップロード::パスが見つかりません。');
		}

		// パスのチェック　ファイルが存在するか
		if (!file_exists($localFilePath)) {
			throw new Exception('ファイルアップロード::ファイルが存在しません。');
		}

		if (empty($uploadFileName)) {
			throw new Exception('アップロードロード::アップロードファイル名が指定されていません。');
		}

		// ファイルのMIMEを判定する
		$mimeType = mime_content_type($localFilePath);

		// s3オブジェクト生成
		$s3Object = $this->getS3ClientInstance($this->keyId, $this->secretKey, $this->region);

		// アップロードする。例外が発生するとS3Exceptionがthrowされます。
		$uploadInfo = [
			'Bucket' => $this->bucketName,
			'Key' => $uploadFileName,
			'SourceFile' => $localFilePath,
			'ContentType' => $mimeType,
		];

		// ファイルを置く。
		$result = $s3Object->putObject($uploadInfo);
		return $result;
  }

	/**
	* 指定したS3上のファイル名のオブジェクトを削除します。
	*/
	public function delete($s3FileName) {

		// パスのチェック　ファイルパスが空ではないか？
		if (empty($s3FileName)) {
			throw new Exception('ファイル削除::S3ファイル名が見つかりません。');
		}

		// s3オブジェクト生成
		$s3Object = $this->getS3ClientInstance($this->keyId, $this->secretKey, $this->region);

		// 削除する。例外が発生するとS3Exceptionがthrowされます。
		$deleteInfo = [
			'Bucket' => $this->bucketName,
			'Key' => $s3FileName,
		];

		// ファイルを置く。
		$result = $s3Object->deleteObject($deleteInfo);
		return $result;
	}

	/**
	* S3からデータを取得します。
	* 引数にはファイル名を設定してください。
	* ※ IOSなど携帯電話端末から取得はこのメソッドを使わないでください。管理画面用のメソッドです。
	*/
	public function read($s3FileName) {

		// パスのチェック　ファイルパスが空ではないか？
		if (empty($s3FileName)) {
			throw new Exception('ファイル削除::S3ファイル名が見つかりません。');
		}

		// s3オブジェクト生成
		$s3Object = $this->getS3ClientInstance($this->keyId, $this->secretKey, $this->region);

		// 削除する。例外が発生するとS3Exceptionがthrowされます。
		$dispInfo = [
			'Bucket' => $this->bucketName,
			'Key' => $s3FileName,
		];

		// ファイルを置く。
		$result = $s3Object->getObject($dispInfo);
		return $result;
	}

	/**
	* S3からURLを取得します。
	* 引数にはファイル名を設定してください。
	*/
	public function getUrl($s3FileName) {

		// パスのチェック　ファイルパスが空ではないか？
		if (empty($s3FileName)) {
			throw new Exception('ファイル削除::S3ファイル名が見つかりません。');
		}

		// s3オブジェクト生成
		$s3Object = $this->getS3ClientInstance($this->keyId, $this->secretKey, $this->region);

		// urlを取得する。
		$result = $s3Object->getObjectUrl($this->bucketName, $s3FileName);
		return $result;
	}

	/**
	* インスタンスを取得する。
	* 引数にAWSのキーとシークレットキーを指定する。
	* regionは使っているリージョンを設定する。
	*/
	private function getS3ClientInstance($keyId, $secretKey, $region, $sdkVersion = 'latest') {

		global $bucket;

		// 設定配列を作っています。S3オブジェクト生成用のオプションです。
		$s3Setting = [
/*
			'credentials' => [
				'key' => $keyId,
				'secret' => $secretKey,
			],
*/
			'region' => $region,
			'version' => $sdkVersion,
		];
    if ( UT_ENV == 'LOCAL') {
      $s3Setting['credentials'] = [
        'key' => $keyId,
        'secret' => $secretKey,
      ];
    }
		$this->bucketName=$bucket;

		// オブジェクト生成して戻す。もし、設定が間違っていたら例外がでます。
		$s3Object = S3Client::factory($s3Setting);
		return $s3Object;
	}


    function createObject($body, $object_key, $mime_type)
    {
        // パスのチェック　ファイルパスが空ではないか？
        if (empty($body)) {
            throw new Exception('ファイルアップロード::bodyが見つかりません');
        }

        // パスのチェック　ファイルが存在するか
        if (empty($mime_type)) {
            throw new Exception('ファイルアップロード::mime_typeを指定してください');
        }

        // パスのチェック　ファイルが存在するか
        if (empty($object_key)) {
            throw new Exception('ファイルアップロード::objectのkeyを指定してください');
        }

        // s3オブジェクト生成
        $s3Object = $this->getS3ClientInstance($this->keyId, $this->secretKey, $this->region);

        // アップロードする。例外が発生するとS3Exceptionがthrowされます。
        $uploadInfo = [
            'Bucket'      => $this->bucketName,
            'Key'         => $object_key,
            'Body'        => $body,
            'ContentType' => $mime_type,
            'CacheControl' => 'max-age=60',
            'Expires'     => gmdate("D, d M Y H:i:s T", strtotime("+1 min"))
        ];

        // ファイルを置く。
        $result = $s3Object->putObject($uploadInfo);
        return $result;
    }
}

$client = new Aws\S3\S3Client([
	'region' => 'ap-northeast-1',
	'version' => 'latest',
]);
$client->registerStreamWrapper();

function s3upload($from,$to){
	global $domain;
	if($domain=="http://ut")return;
	$s3i=new S3Module;
	return $s3i->upload($from,$to);
}


?>