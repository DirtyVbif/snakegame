<?php

/**
 * Absolute path to the project folder on server. Includes trailing slash `/`
 */
define(
    'ROOTDIR',
    // remove `app` from the end of string in `__DIR__` constant required
    substr(__DIR__, 0, -3)
);

/**
 * Absolute path to the projects views folder on server. Includes trailing slash `/`
 */
const VIEWDIR = ROOTDIR . 'views/';

include_once ROOTDIR . 'bootstrap/bootstrap.inc';
