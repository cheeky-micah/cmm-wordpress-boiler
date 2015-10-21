/**
 * function to help elminate the requirejs caching
 */
var __getrev = function () {
  'use strict';
  var rev = document.getElementById('requirejs').getAttribute('data-rev');
  return rev || (new Date()).getTime();
};


/**
 * require config
 */
requirejs.config({
  paths: {
    'jquery': 'vendor/jquery-global',
    'intention': 'vendor/intention',
    'underscore': 'vendor/underscore-min',
    'viewportsize': 'vendor/viewportSize-min',

    'intentcontext': 'modules/intentcontext',
  },
  shim: {
  },
  map: {
    '*': {
      'css': 'vendor/css.min'
    }
  }
});

requirejs.config({
  urlArgs: 'rev=' + __getrev(),
});


/**
 * common JS loaded on all pages
 */
require([
  'jquery',
  'underscore',
  'intentcontext',
  ], function ($, _, IntentContext) {
  'use strict';

   // DOM ready
  $(function() {

    // init the DOM elements with intentionJS
    IntentContext.intent.elements(document);

    // for debugging
    IntentContext.intent.on('xlarge', function () { console.log('xlarge'); });
    IntentContext.intent.on('desktop', function () { console.log('desktop'); });
    IntentContext.intent.on('tabletlandscape', function () { console.log('tabletlandscape'); });
    IntentContext.intent.on('tablet', function () { console.log('tablet'); });
    IntentContext.intent.on('mobilelandscape', function () { console.log('mobilelandscape'); });
    IntentContext.intent.on('mobile', function () { console.log('mobile'); });

    // call intentions for first page load init
    IntentContext.horizontal_axis.respond();

    /*
     * check of iOS, add class to <html> for alternate styling
     */
    if (navigator.userAgent.match(/(ip(hone|od|ad))/i)) {
      $('html').addClass('iOS');
    }

    /* 
     * load up featured carousel JS, if element is found
     */
    // if ($('.home-featured-slider-wrapper').length > 0) {
    //   require(['featured-posts-carousel']);
    // }

  }); // DOM ready
  
});