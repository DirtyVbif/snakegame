<?php
$start_year   = 2024;
$current_year = (int)date('Y', time());
$date         = $current_year > $start_year
    ? $start_year . '—' . $current_year
    : $start_year;
?>
<div class="copyrights flex flex_center">
    <p class="copyrights__text">
        <span>All rights reserved ©</span>
        <span>
            <a href="https://vk.com/uspmm" target="_blank" title="My vk.com">Michael&nbsp;Uspensky</a>,&nbsp;<?= $date ?>
        </span>
    </p>
</div>