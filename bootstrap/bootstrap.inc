<?php

function view (string $__name, array $__data = []): string
{
    $__name = VIEWDIR . "$__name.tpl.php";

    ob_start();
    extract($__data, EXTR_SKIP);

    try {
        require $__name;
    } catch (\Exception $e) {
        ob_end_clean();

        throw $e;
    }

    return ob_get_clean();
}
