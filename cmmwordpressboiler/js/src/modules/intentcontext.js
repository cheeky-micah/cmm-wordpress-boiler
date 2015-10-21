/**
 * intentionJS contexts setup and init
 * 
 * @requires jquery, viewportsize, intention
 */
define([
  'jquery',
  'intention',
  'viewportsize'
], function ($, Intention, viewportsize) {
  'use strict';

  var
    IntentContext = window.IntentContext ? window.IntentContext : window.IntentContext = {};

  IntentContext.intent = new Intention();

  // Breakpoints
  IntentContext.bp_xlarge = 1280;
  IntentContext.bp_desktop = 1025;
  IntentContext.bp_tabletlandscape = 768;
  IntentContext.bp_tablet = 641;
  IntentContext.bp_mobilelandscape = 321;
  IntentContext.bp_mobile = 0;

  // setup breakpoints for intentionJS
  IntentContext.horizontal_axis = IntentContext.intent.responsive({
    ID: 'width',
    contexts: [{
      name: 'xlarge',
      min: IntentContext.bp_xlarge
    }, {
      name: 'desktop',
      min: IntentContext.bp_desktop
    }, {
      name: 'tabletlandscape',
      min: IntentContext.bp_tabletlandscape
    }, {
      name: 'tablet',
      min: IntentContext.bp_tablet
    }, {
      name: 'mobilelandscape',
      min: IntentContext.bp_mobilelandscape
    }, {
      name: 'mobile',
      min: IntentContext.bp_mobile
    }],
    matcher: function (measure, context) {
      return measure >= context.min;
    },
    measure: function () {
      IntentContext.v_width = viewportSize.getWidth();
      return IntentContext.v_width;
    }
  });

  $(window).on('resize', IntentContext.horizontal_axis.respond);

  return IntentContext;
});
