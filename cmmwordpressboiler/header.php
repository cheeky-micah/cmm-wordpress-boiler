<?php
/**
 * The Main Header Template
 *
 * @package WordPress
 * @subpackage CMM
 * @since PGJ
 */
?>

<!DOCTYPE html>
<html class="no-js" <?php language_attributes(); ?>>
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

    <?php wp_head(); ?>

    <script id="requirejs" data-rev="<?php print cmm_rjs_rev(); ?>" data-main="<?php print cmm_path_to_rjs_main(); ?>" src="<?php print cmm_path_to_rjs(); ?>"></script>
  </head>

  <body <?php body_class(); ?>>
    <?php do_action( 'zurb_foundation_after_body' ); ?>

    <div class="site-wrapper">

      <header>
        
        <div class="row">
        </div>

      </header>

      <?php do_action( 'zurb_foundation_after_header' ); ?>

