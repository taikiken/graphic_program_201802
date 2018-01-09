<?php
if($q->get_dir() == 0)
{
    if($q->get_file() == 0)
    {
        ?>

        <tr>
            <td rowspan="2" class="inputTitle">カテゴリ</td>
            <td class="inputFields">
                <?php
                $sql = <<<END_SQL
SELECT
    id,
    name
FROM
    u_categories
WHERE
    flag = 1
OR
    name_e = 'all'
ORDER BY n
;
END_SQL;

                $category_list = [];
                $o->query($sql);
                while($f = $o->fetch_array())
                {
                  if ($f['name'] == 'すべて') $f['name'] = '一面';
                  $category_list[]=$f;
                }

                echo generalCheckbox($category_list,4,'u_categories', @join(',', $sv['p_u_categories']));

                ?>
            </td>
        </tr>

    <?php
    }
    if($q->get_file() == 1)
    {
        ?>
        <tr>
            <td class="confTitle">カテゴリ</td>
            <td class="confFields">
                <?php
                if(count($_POST['p_u_categories']) > 0)
                {
                    $ids = join(',', $_POST['p_u_categories']);
                    $sql = <<<END_DOC
SELECT
    name
FROM
    u_categories
WHERE
    id IN ({$ids})
ORDER BY
    n
;
END_DOC;

                    $o->query($sql);

                    $category_value = [];
                    while($f = $o->fetch_array())
                    {
                        $category_value[] = mod_HTML($f['name']);
                    }

                    unset($sv['p_u_categories']);
                    $sv['p_u_categories'] = join(',', $_POST['p_u_categories']);

                    echo join('<br>', $category_value);

                }
                else
                {
                    echo 'デフォルト';
                }

                ?>
            </td>
        </tr>

    <?php
    }
}
if($q->get_dir() == 1) // edit
{
    if($q->get_file() == 0)
    {
        ?>
        <tr>
            <td rowspan="2" class="inputTitle">カテゴリ</td>
            <td class="inputFields">
                <?php
                $sql = <<<END_SQL
SELECT
    id,
    name
FROM
    u_categories
WHERE
    flag = 1
OR
    name_e = 'all'
ORDER BY n
;
END_SQL;
                $category_list = [];
                $checked_category = [];
                $o->query($sql);
                while($f = $o->fetch_array())
                {
                  if ($f['name'] == 'すべて') $f['name'] = '一面';
                  $category_list[]=$f;
                }

                // チェックボックス初期値用
                $sql = <<<END_SQL
SELECT
    category_id
FROM
    categories_notices
WHERE
    notice_id = {$g->f("id")}
;
END_SQL;
                $o->query($sql);
                while($f = $o->fetch_array())
                {
                  $checked_category[]=$f['category_id'];
                }
                $str_category_ids = implode(',', $checked_category);

                echo generalCheckbox($category_list,4,'u_categories', $str_category_ids);

                ?>
            </td>
        </tr>


    <?php
    }
    if($q->get_file() == 1)
    {
        ?>

        <tr>
            <td class="confTitle">カテゴリ</td>
            <td class="confFields">
                <?php
                if(count($_POST['p_u_categories']) > 0)
                {
                    $ids = join(',', $_POST['p_u_categories']);
                    $sql = <<<END_DOC
SELECT
    name
FROM
    u_categories
WHERE
    id IN ({$ids})
ORDER BY
    n
;
END_DOC;

                    $o->query($sql);

                    $category_value = [];
                    while($f = $o->fetch_array())
                    {
                        $category_value[] = mod_HTML($f['name']);
                    }

                    unset($sv['p_u_categories']);
                    $sv['p_u_categories'] = join(',', $_POST['p_u_categories']);

                    echo join('<br>', $category_value);

                }
                else
                {
                    echo 'デフォルト';
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
            <td class="confTitle">カテゴリ</td>
            <td class="confFields">
                <?php

                if(strlen($p['u_categories']) > 0)
                {
                    $u_categories = $p['u_categories'];
                    $sql = <<< END_SQL
SELECT
    name
FROM
    u_categories
WHERE
    id IN ({$u_categories})
ORDER BY n
;
END_SQL;

                    $o->query($sql);

                    $category_value = [];
                    while($f = $o->fetch_array())
                    {
                        $category_value[] = mod_HTML($f['name']);
                    }

                    echo join('<br>', $category_value);

                }
                else
                {
                    echo 'デフォルト';
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
            <td class="confTitle">カテゴリ</td>
            <td class="confFields">
                <?php

                if(strlen($_POST['u_categories']) > 0)
                {
                    $u_categories = $p['u_categories'];
                    $sql = <<< END_SQL
SELECT
    name
FROM
    u_categories
WHERE
    id IN ({$u_categories})
ORDER BY n
;
END_SQL;

                    $o->query($sql);
                    $category_value = [];
                    while($f = $o->fetch_array())
                    {
                        $category_value[] = mod_HTML($f['name']);
                    }

                    echo join('<br>', $category_value);

                }
                else
                {
                    echo 'デフォルト';
                }

                ?>
            </td>
        </tr>

    <?php
    }
}
?>