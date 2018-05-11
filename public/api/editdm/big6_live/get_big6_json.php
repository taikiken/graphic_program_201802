<?php

date_default_timezone_set('Asia/Tokyo');
setlocale(LC_ALL, 'ja_JP.UTF-8');

$servername=$_SERVER["SERVER_NAME"];
if (preg_match("/cms/",$servername) ||
  preg_match("/dev/",$servername))
{
  include_once __DIR__."/../../../../include/conf/config.php";
  include_once __DIR__."/../../../../app/helpers/env.helper.php";
  include_once __DIR__ . "/../../../../include/aws.php";

// run
// ==============================

      $big6 = $BIG6_FILENAME;

      $S3Module = new S3Module;
      $url = $cf_bucket. $big6;

      $file = file_get_contents($url);
      $res = json_decode($file);

      if(empty($res)){
        $res = 'ファイルが存在しません';
        echo $res;
      } else {
        $res = $res->response;
        $isPlaying = $res->live->isPlaying == true ? "true" : "false";
        $source_default = [];
        $source_sp_default = [];
        for($count = 0;$count < 5;$count++){
          $source_default[$count] = $res->live->video->sources[$count]->default ? "true" : "false";
        }
        for($count = 0;$count < 4;$count++){
          $source_sp_default[$count] = $res->live->video->sources_sp[$count]->default ? "true" : "false";
        }
        $json =<<<_EOD
{
    response: 
    {
        lastupdate: {$res->lastupdate},
        live:
        { 
            alt: 
            {
                large: {$res->live->alt->large}
                medium: {$res->live->alt->medium}
            },
            error:
            {
                large: {$res->live->error->large}
                medium: {$res->live->error->medium}
            },
            interval: {$res->live->interval}
            isPlaying: {$isPlaying}
            video:
            {
                id: {$res->live->video->id}
                ad_url:
                {
                    android: {$res->live->video->ad_url->android}
                    ios: {$res->live->video->ad_url->ios}
                    pc: {$res->live->video->ad_url->pc}
                    sp: {$res->live->video->ad_url->sp}
                },
                source: {$res->live->video->source}
                sources:
                [
                    {
                      label: {$res->live->video->sources[0]->label}
                      default: {$source_default[0]}
                      res: {$res->live->video->sources[0]->res}
                      url: {$res->live->video->sources[0]->url}
                    }
                ],
                [
                    {
                      label: {$res->live->video->sources[1]->label}
                      default: {$source_default[1]}
                      res: {$res->live->video->sources[1]->res}
                      url: {$res->live->video->sources[1]->url}
                    }
                ],
                [
                    {
                      label: {$res->live->video->sources[2]->label}
                      default: {$source_default[2]}
                      res: {$res->live->video->sources[2]->res}
                      url: {$res->live->video->sources[2]->url}
                    }
                ],
                [
                    {
                      label: {$res->live->video->sources[3]->label}
                      default: {$source_default[3]}
                      res: {$res->live->video->sources[3]->res}
                      url: {$res->live->video->sources[3]->url}
                    }
                ]
                sources_sp:
                [
                    {
                      label: {$res->live->video->sources_sp[0]->label}
                      default: {$source_sp_default[0]}
                      res: {$res->live->video->sources_sp[0]->res}
                      url: {$res->live->video->sources_sp[0]->url}
                    }
                ],
                [
                    {
                      label: {$res->live->video->sources_sp[1]->label}
                      default: {$source_sp_default[1]}
                      res: {$res->live->video->sources_sp[1]->res}
                      url: {$res->live->video->sources_sp[1]->url}
                    }
                ],
                [
                    {
                      label: {$res->live->video->sources_sp[2]->label}
                      default: {$source_sp_default[2]}
                      res: {$res->live->video->sources_sp[2]->res}
                      url: {$res->live->video->sources_sp[2]->url}
                    }
                ],
            }
        }
    }
}        
_EOD;

        echo $json;
      }
}
else
{
  header('Location: ' . '/', true, 301);
  exit;
}