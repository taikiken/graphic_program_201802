<?php
if($q->get_dir() == 0)
{
    if($q->get_file() == 0)
    {
        ?>

        <tr>
            <td rowspan="2" class="inputTitle">メディア</td>
            <td class="inputFields">
                <?php
                $sql = <<<END_SQL
SELECT
    id,
    title AS name
FROM
    u_media
WHERE
    flag = 1
ORDER BY n
;
END_SQL;

                $media_list = [];
                $o->query($sql);
                while($f = $o->fetch_array())
                {
                    $media_list[]=$f;
                }

                echo generalCheckbox($media_list,4,'u_media', @join(',', $sv['p_u_media']));

                ?>
            </td>
        </tr>
        <tr>
            <td class="inputCap">外部ユーザーの場合、メディアを選択してください。</td>
        </tr>

    <?php
    }
    if($q->get_file() == 1)
    {
        ?>
        <tr>
            <td class="confTitle">メディア</td>
            <td class="confFields">
                <?php
                if(count($_POST['p_u_media']) > 0)
                {
                    $ids = join(',', $_POST['p_u_media']);
                    $sql = <<<END_DOC
SELECT
    title AS name
FROM
    u_media
WHERE
    id IN ({$ids})
ORDER BY
    n
;
END_DOC;

                    $o->query($sql);

                    $media_value = [];
                    while($f = $o->fetch_array())
                    {
                        $media_value[] = mod_HTML($f['name']);
                    }

                    unset($sv['p_u_media']);
                    $sv['p_u_media'] = join(',', $_POST['p_u_media']);

                    echo join('<br>', $media_value);

                }
                else
                {
                    echo 'メディアなし';
                }

                ?>
            </td>
        </tr>

    <?php
    }
}
if($q->get_dir() == 1)
{
    if($q->get_file() == 0)
    {
        ?>
        <tr>
            <td rowspan="2" class="inputTitle">メディア</td>
            <td class="inputFields">
                <?php
                $sql = <<<END_SQL
SELECT
    id,
    title AS name
FROM
    u_media
WHERE
    flag = 1
ORDER BY n
;
END_SQL;
                $media_list = [];
                $o->query($sql);
                while($f = $o->fetch_array())
                {
                    $media_list[]=$f;
                }

                echo generalCheckbox($media_list,4,'u_media', $p['u_media']);

                ?>
            </td>
        </tr>
        <tr>
            <td class="inputCap">外部ユーザーの場合、メディアを選択してください。</td>
        </tr>

    <?php
    }
    if($q->get_file() == 1)
    {
        ?>

        <tr>
            <td class="confTitle">メディア</td>
            <td class="confFields">
                <?php
                if(count($_POST['p_u_media']) > 0)
                {
                    $ids = join(',', $_POST['p_u_media']);
                    $sql = <<<END_DOC
SELECT
    title AS name
FROM
    u_media
WHERE
    id IN ({$ids})
ORDER BY
    n
;
END_DOC;

                    $o->query($sql);

                    $media_value = [];
                    while($f = $o->fetch_array())
                    {
                        $media_value[] = mod_HTML($f['name']);
                    }

                    unset($sv['p_u_media']);
                    $sv['p_u_media'] = join(',', $_POST['p_u_media']);

                    echo join('<br>', $media_value);

                }
                else
                {
                    echo 'メディアなし';
                }

                ?></td>
        </tr>

    <?php
    }
}
if($q->get_dir() == 2)
{
    if($q->get_file() == 0)
    {
        ?>

        <tr>
            <td class="confTitle">メディア</td>
            <td class="confFields">
                <?php

                if(strlen($p['u_media']) > 0)
                {
                    $u_media = $p['u_media'];
                    $sql = <<< END_SQL
SELECT
    title AS name
FROM
    u_media
WHERE
    id IN ({$u_media})
ORDER BY n
;
END_SQL;

                    $o->query($sql);

                    $media_value = [];
                    while($f = $o->fetch_array())
                    {
                        $media_value[] = mod_HTML($f['name']);
                    }

                    echo join('<br>', $media_value);

                }
                else
                {
                    echo 'メディアなし';
                }

                ?>
            </td>
        </tr>

    <?php
    }
    if($q->get_file() == 1)
    {
        ?>

        <tr>
            <td class="confTitle">メディア</td>
            <td class="confFields">
                <?php

                if(strlen($_POST['u_media']) > 0)
                {
                    $u_media = $p['u_media'];
                    $sql = <<< END_SQL
SELECT
    title AS name
FROM
    u_media
WHERE
    id IN ({$u_media})
ORDER BY n
;
END_SQL;

                    $o->query($sql);
                    $media_value = [];
                    while($f = $o->fetch_array())
                    {
                        $media_value[] = mod_HTML($f['name']);
                    }

                    echo join('<br>', $media_value);

                }
                else
                {
                    echo 'メディアなし';
                }

                ?>
            </td>
        </tr>

    <?php
    }
}
?>