/*
 * Base Gruntfile Module
 */
module.exports = function (grunt) {
  'use strict';

  /*
   * load grunt tasks automatically
   */
  require('load-grunt-tasks')(grunt);

  var bourbon = require('node-bourbon').includePaths;

  /*
   * setup paths
   */
  var path_vars = {
    theme_path: '../wp-content/themes/cmmwordpressboiler',
    foundation_path: '../wp-content/themes/zurb_foundation',
    compile_path: '../UI',
    bower_path: '<%= path_vars.compile_path %>/bower_components',
    gem_path: '<%= path_vars.compile_path %>/ruby_gems',
    css_base_path: '<%= path_vars.theme_path %>/css',
    js_base_path: '<%= path_vars.theme_path %>/js',
    js_src_path: '<%= path_vars.theme_path %>/js/src',
    js_bld_path: '<%= path_vars.theme_path %>/js/dist'
  };

  /*
   * foundation - core JS
   */
  var foundation_js = [
    '<%= path_vars.foundation_path %>/js/foundation.min.js',
  ];

  /*
   * grunt tasks config
   */
  grunt.initConfig({
    path_vars: path_vars,
    pkg: this.file.readJSON('package.json'),

    /*
     * grunt clean
     */
    clean: {
      css: ['<%= path_vars.theme_path %>/css'],
      js: ['<%= path_vars.theme_path %>/js/dist'],
      options: {
        force: true
      }
    },

    /*
     * grunt copy
     */
    copy: {
      main: {
        files: [{
          expand: true,
          src: [
            '<%= path_vars.bower_path %>/underscore/underscore-min.js',
            '<%= path_vars.bower_path %>/intentionjs/intention.js',
            '<%= path_vars.bower_path %>/viewportsize/viewportSize-min.js',
            '<%= path_vars.bower_path %>/requirejs/require.js',
            '<%= path_vars.bower_path %>/require-css/css.min.js',
          ],
          dest: '<%= path_vars.js_src_path %>/vendor',
          filter: 'isFile',
          flatten: true
        }]
      },
      css: {
        files: [{
          expand: true,
          src: [
            ''
          ],
          dest: '<%= path_vars.css_base_path %>',
          filter: 'isFile',
          flatten: true
        }]
      }
    },

    /*
     * minify / cleanup svg files
     */
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= path_vars.theme_path %>/images/svg',
          src: ['*.svg'],
          dest: '<%= path_vars.theme_path %>/images/svg'
        }]
      }
    },

    /*
     * compress and merge svg files into sprite file
     */
    svgstore: {
      options: {
        prefix: 'icon-',
        cleanup: ['fill', 'style'],
        svg: {
          style: 'display: none;'
        }
      },
      default: {
        files: {
          '<%= path_vars.theme_path %>/images/svg-defs.svg': ['<%= path_vars.theme_path %>/images/svg/*.svg'],
        }
      }
    },

    /*
     * grunt compass
     */
    compass: {
      clean: {
        options: {
          clean: true
        }
      },
      dev: {
        options: {
          require: ['compass'],
          basePath: '<%= path_vars.theme_path %>',
          sassDir: 'scss',
          cssDir: 'css',
          imagesDir: 'images',
          importPath: [
            '<%= path_vars.foundation_path %>/scss/'
          ],
          bundleExec: true
        },
      },
      build: {
        options: {
          basePath: '<%= path_vars.theme_path %>',
          sassDir: 'scss',
          cssDir: 'css',
          imagesDir: 'images',
          importPath: [
            '<%= path_vars.foundation_path %>/scss/'
          ],
          outputStyle: 'compressed',
          noLineComments: true,
          environment: 'production',
          bundleExec: true,
        }
      }
    },

    /*
     * grunt jshint
     */
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= path_vars.js_src_path %>/main.js',
        '<%= path_vars.js_src_path %>/modules/*.js',
        '!<%= path_vars.js_src_path %>/vendor/**/*.js'
      ]
    },

    /*
     * grunt uglify
     */
    uglify: {
      options: {
        sourceMap: false
      },
      dist: {
        files: {
          '<%= path_vars.js_base_path %>/foundation.min.js': [foundation_js]
        }
      }
    },

    /*
     * grunt requirejs
     */
    requirejs: {
      compile: {
        options: {
          baseUrl: '.',
          appDir: '<%= path_vars.js_src_path %>',
          dir: '<%= path_vars.js_bld_path %>',
          mainConfigFile: '<%= path_vars.theme_path %>/js/src/main.js',
          optimize: 'uglify',
          preserveLicenseComments: false,
          useStrict: true,
          wrap: true,
          removeCombined: true
        }
      }
    },
    
    /*
     * grunt watch
     */
    watch: {
      grunt: { files: ['Gruntfile.js'] },
      compass: {
        files: ['<%= path_vars.theme_path %>/scss/**/*.scss'],
        tasks: ['compass:dev']
      },
      js: {
        files: ['<%= jshint.all %>'],
        tasks: ['jshint', 'uglify']
      },
      svg: {
        files: ['<%= path_vars.theme_path %>/images/svg/*.svg'],
        tasks: ['svgmin', 'svgstore'],
        options: {
          spawn: false,
          livereload: false,
        }
      },
    }
  });


  /*
   * register 'dev' task
   * : for development compilation
   */
  grunt.registerTask('dev', [
    'clean',
    'copy',
    'compass:dev',
    'uglify',
    'watch'
  ]);

  /*
   * register 'build' task
   * : for production compilation
   */
  grunt.registerTask('build', [
    'clean',
    'copy',
    'compass:build',
    'uglify',
    'requirejs',
    'svgmin',
    'svgstore'
  ]);

  return this.registerTask('default', ['build']);
};
