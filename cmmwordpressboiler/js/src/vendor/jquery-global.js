// Check if WP added jQuery first, return global function
if (typeof jQuery === 'function') {
	define('jquery', [], function() {
		'use strict';
		return jQuery;
	});
}
