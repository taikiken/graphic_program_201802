<?php


function inhightvGetHighlight( $count = 4, $host ) {

  global $page;

  $highlight = array();

  $get_options = [
    'http' => [
        'method'  => 'GET',
        'timeout' => 2,
    ]
  ];

  if ( in_array(UT_ENV, array('LOCAL', 'LOCAL_DB')) ) :
    $host = 'https://dev.sportsbull.jp';
  endif;

  $highlight = @file_get_contents($host.'/api/v1/articles/tag/?t10=インハイ2017_ハイライト&offset=0&length='.$count, false, stream_context_create($get_options));
  if ( $highlight ) :
    $highlight = json_decode($highlight, true);
    if ( !empty($highlight['response']['articles']) ) :
      $highlight = $highlight['response']['articles'];
    endif;
  endif;

  return $highlight;
}



function inhightvGetDigest( $count = 4 ) {

  $db = new db;
  $db->connect();

  $movie     = array();
  $subdomain = preg_match("/dev/",$_SERVER["SERVER_NAME"])?"dev-img":"img";
  $i         = 0;

  $sql       = "select id,img1,title,a1,a2,a3 from repo_n where d2=54 and flag=1 and swf is not null order by (a1||'-'||a2||'-'||a3||' '||a4||':'||a5||':'||a6)::timestamp desc limit ".$count;
  $db->query($sql);

  while( $f = $db->fetch_array() ) {
    $movie['movie'][sprintf("%s.%s.%s",$f["a1"],$f["a2"],$f["a3"])][] = array(
      "title" => htmlspecialchars($f["title"]),
      "date"  => sprintf("%s/%s",(int)$f["a2"],(int)$f["a3"]),
      "img"   => sprintf("https://%s.sportsbull.jp/thumbnail1/%s",$subdomain,$f["img1"]),
      "url"   => sprintf("/p/%s/",$f["id"])
    );
    if($i==0)$movie['end']=sprintf("%s.%s",$f["a2"],$f["a3"]);
    $movie['start']=sprintf("%s.%s.%s",$f["a1"],$f["a2"],$f["a3"]);
    $i++;
  }

  return $movie;
}


