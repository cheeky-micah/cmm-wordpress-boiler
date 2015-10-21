/*******************************
 * How to build the front-end
 ******************************/

1)
You first need to install:

NODEJS
https://nodejs.org/

BOWER
http://bower.io/

BUNDLER
http://bundler.io/

You may also need grunt-cli
https://github.com/gruntjs/grunt-cli


2)
From the UI folder, run: "npm install"

This will install the npm / bower / gem dependencies locally to this project


3)
When working locally, and only for development/debugging, run

"grunt dev"

This command will run the 'dev' task, which compiles/copies everything and 'watches' for changes while you code your CSS/JS

After completing your work and before you do a Git Commit, run

"grunt build"

This will re-compile everything and minify the css and uglify/compress the JS, making it ready for production.