
# Slim Framework

ViewのルーティングにSlimというフレームワークを導入してます。

ref. [slimphp/Slim: Slim Framework source code](https://github.com/slimphp/Slim)

demo : http://undotsushin.local/demo/
- `/public/index.php` 参照


## Directoreis

slim/slim-skeleton をベースにしています。

[slimphp/Slim-Skeleton: Slim Framework 3 skeleton application](https://github.com/slimphp/Slim-Skeleton)


## templates(view)

- `/app/templates/` にテンプレートファイルを設置してます
- `_default.php` を基点とする
- `_header.php`、`_footer.php` をinclude
- ルーター側でテンプレートを指定


## data

- テンプレート上で `$page` に出力用のデータを渡す（想定）


## Routes

### ルーティングの例


```php
// ex. /users/23423423/
$app->get('/users/{id:[0-9]+}', function ($request, $response, $args) {
    //
});

# ルーティングに名前をつけて呼び出し
$app->get('/hello/{name}', function ($request, $response, $args) {
    echo "Hello, " . $args['name'];
})->setName('hello');

echo $app->router->pathFor('hello', [
    'name' => 'Josh'
]);
```


### グループルーティングの例

```php
$app->group('/users/{id:[0-9]+}', function () {
    $this->map(['GET', 'DELETE', 'PATCH', 'PUT'], '', function ($request, $response, $args) {
        // Find, delete, patch or replace user identified by $args['id']
    })->setName('user');
    $this->get('/reset-password', function ($request, $response, $args) {
        // Route for /users/{id:[0-9]+}/reset-password
        // Reset the password for user identified by $args['id']
    })->setName('user-password-reset');
});
```


### Middlewareの例

```php
$app->get('/', function ($request, $response) {
    return $response->getBody()->write('Hello World');
});

$app->group('/utils', function () use ($app) {
    $app->get('/date', function ($request, $response) {
        return $response->getBody()->write(date('Y-m-d H:i:s'));
    });
    $app->get('/time', function ($request, $response) {
        return $response->getBody()->write(time());
    });
})->add(function ($request, $response, $next) {
    $response->getBody()->write('It is now ');
    $response = $next($request, $response);
    $response->getBody()->write('. Enjoy!');

    return $response;
});
```

