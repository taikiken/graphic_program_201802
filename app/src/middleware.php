<?php
// Application middleware

// e.g: $app->add(new \Slim\Csrf\Guard);

use Psr\Http\Message\RequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

// #852 トレイリングスラッシュあり対応
$app->add(function (Request $request, Response $response, callable $next) {
    $uri  = $request->getUri();
    $path = $uri->getPath();

    // 検索は末スラ対象から除外
    if ( strncmp($path, '/search/', strlen('/search/') ) !== 0 ) {
      if ($path != '/' && substr($path, -1) !== '/') {
          $uri = $uri->withPath( $path.'/' );
          return $response->withRedirect((string)$uri, 301);
      }
    }

    return $next($request, $response);
});