<?php

/**
 * helper functions for initializaing requireJS with 
 * cache busting
 */
require_once('theme-functions.php');

/**
 * create widget areas in sidebar and footer
 */
require_once( 'inc/widget-areas.php' );

/*
 * load parent theme styles
 */
function theme_enqueue_styles() {
    $parent_style = 'parent-style';

    wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style',
        get_stylesheet_directory_uri() . '/css/cmmwordpressboiler.css',
        array( $parent_style )
    );
}
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );
