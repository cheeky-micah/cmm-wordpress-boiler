<aside class="sidebar">
	<?php do_action( 'zurb_foundation_before_sidebar' ); ?>
	<?php if ( is_active_sidebar( 'right_sidebar' ) ) : ?>
		<?php dynamic_sidebar( 'right_sidebar' ); ?>
	<?php endif; ?>
	<?php do_action( 'zurb_foundation_after_sidebar' ); ?>
</aside>