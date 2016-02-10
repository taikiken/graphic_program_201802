<html>
    <head>
        <meta charset="utf-8"/>
        <title>Slim 3</title>
        <link href='//fonts.googleapis.com/css?family=Lato:300' rel='stylesheet' type='text/css'>
        <style>
            body {
                margin: 50px 0 0 0;
                padding: 0;
                width: 100%;
                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                text-align: center;
                color: #aaa;
                font-size: 18px;
            }

            h1 {
                color: #719e40;
                letter-spacing: -3px;
                font-family: 'Lato', sans-serif;
                font-size: 100px;
                font-weight: 200;
                margin-bottom: 0;
            }

            pre {
                text-align:left;
                background:#eee;
                font-family:monospace;
                margin:20px;
            }
        </style>
    </head>
    <body>
        <h1>Slim</h1>
        <div>a microframework for PHP</div>

        <p>Try <a href="/SlimFramework">/SlimFramework</a>


        <h2>$request</h2>
<?php var_dump($request); ?>

        <h2>$response</h2>
<?php var_dump($response); ?>

        <h2>$args</h2>
<?php var_dump($args); ?>


    </body>
</html>
