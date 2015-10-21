<?php
/**
 * PGJ Widget Areas
 *
 * @package WordPress
 * @subpackage PGJ
 * @since PGJ 1.0
 */

/**
 * remove any unwanted sidebars, registered by parent theme
 */
function cmmwordpressboiler_parent_unregister_sidebars() {
  // footer sidebar
  //unregister_sidebar( 'footer_sidebar' );
}
add_action( 'widgets_init', 'cmmwordpressboiler_parent_unregister_sidebars', 100 );

/**
 * create custom sidebars
 */
if (function_exists('register_sidebar')) {

	function cmmwordpressboiler_widgets_init() {

		// right sidebar
		register_sidebar(array(
			'name'=> 'Right Sidebar',
			'id' => 'right_sidebar',
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget' => '</div>',
			'before_title' => '<h4 class="widgettitle">',
			'after_title' => '</h4>',
		));

		// footer block
		register_sidebar(array(
			'name'=> 'Footer Block',
			'id' => 'footer_block',
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget' => '</div>',
			'before_title' => '<h4 class="widgettitle">',
			'after_title' => '</h4>',
		));

	}
	add_action( 'widgets_init', 'cmmwordpressboiler_widgets_init' );
}
