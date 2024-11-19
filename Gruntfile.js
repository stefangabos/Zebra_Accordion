'use strict';

module.exports = function(grunt) {

    // show time spent on each taks
    require('time-grunt')(grunt);

    // required for sass
    const sass = require('sass');

    grunt.initConfig({

        // load packages.json
        pkg: grunt.file.readJSON('package.json'),

        /***************************************************************************************************************
         *  NOTIFY
         *  https://github.com/dylang/grunt-notify
         **************************************************************************************************************/
        'notify': {
            done: {
                options: {
                    title: 'Grunt ',
                    message: 'All tasks were successfully completed!'
                }
            }
        },

        /***************************************************************************************************************
         *  SASS
         *  https://www.npmjs.org/package/grunt-sass-modern
         **************************************************************************************************************/
        'sass': {
            options: {
                implementation: sass,
                api: 'modern'
            },
            expanded: {
                files: {
                    'dist/zebra_accordion.css': 'src/zebra_accordion.scss'
                }
            },
            minified: {
                options: {
                    style: 'compressed',
                },
                files: {
                    'dist/zebra_accordion.min.css': 'src/zebra_accordion.scss'
                }
            }
        },

        /***************************************************************************************************************
         *  CSSMIN
         *  https://github.com/gruntjs/grunt-contrib-cssmin
         **************************************************************************************************************/
        'cssmin': {
            beutify: {
                options: {
                    compatibility: {
                        properties: {
                            ieBangHack: true,
                            ieFilters: true,
                            iePrefixHack: true,
                            ieSuffixHack: true
                        },
                        selectors: {
                            ie7Hack: true
                        }
                    },
                    format: {
                        breaks: {
                            afterAtRule: true,
                            afterBlockBegins: true,
                            afterBlockEnds: true,
                            afterComment: true,
                            afterProperty: true,
                            afterRuleBegins: true,
                            afterRuleEnds: true,
                            beforeBlockEnds: true,
                            betweenSelectors: true
                        },
                        indentBy: 4,
                        indentWith: 'space',
                        spaces: {
                            aroundSelectorRelation: true,
                            beforeBlockBegins: true,
                            beforeValue: true
                        }
                    },
                    level: 2
                },
                files: {
                    'dist/zebra_accordion.css': 'dist/zebra_accordion.css',
                }
            },
            minify: {
                options: {
                    compatibility: {
                        properties: {
                            ieBangHack: true,
                            ieFilters: true,
                            iePrefixHack: true,
                            ieSuffixHack: true
                        },
                        selectors: {
                            ie7Hack: true
                        }
                    },
                    level: 2
                },
                files: {
                    'dist/zebra_accordion.min.css': 'dist/zebra_accordion.min.css',
                }
            }
        },

        /***************************************************************************************************************
         *  ESLINT
         *  http://eslint.org/docs/rules/
         **************************************************************************************************************/
        'eslint' : {
            src: ['src/zebra_accordion.src.js']
        },

        /***************************************************************************************************************
         *  JSHINT
         *  https://npmjs.org/package/grunt-contrib-jshint
         **************************************************************************************************************/
        'jshint': {
            options: {
                strict:     true,       //  requires all functions to run in ECMAScript 5's strict mode
                asi:        false,      //  suppresses warnings about missing semicolons
                globals: {              //  white list of global variables that are not formally defined in the source code
                    '$':                true,
                    'console':          true,
                    'jQuery':           true
                },
                esversion:  6,          //  allow ECMAScript 6 (2015) specific syntax
                browser:    true,       //  defines globals exposed by modern browsers (like `document` and `navigator`)
                bitwise:    true,       //  prohibits the use of bitwise operators such as ^ (XOR), | (OR) and others
                curly:      false,      //  whether to always put curly braces around blocks in loops and conditionals
                eqeqeq:     true,       //  this options prohibits the use of == and != in favor of === and !==
                freeze:     true,       //  this options prohibits overwriting prototypes of native objects such as Array, Date and so on
                scripturl:  true,       //  allow use of scripts
                nonew:      true,       //  this option prohibits the use of constructor functions without assigning them to a variable
                loopfunc:   true,       //  allow functions to be defined inside loops
                undef:      true        //  this option prohibits the use of explicitly undeclared variables
            },
            src: ['src/zebra_accordion.src.js']
        },

        /***************************************************************************************************************
         *  UGLIFY
         *  https://npmjs.org/package/grunt-contrib-uglify
         **************************************************************************************************************/
        'uglify': {
            options: {
                compress: true,
                mangle: true,
                beautify: false,
                ie8: true
            },
            build: {
                src: 'src/zebra_accordion.src.js',
                dest: 'dist/zebra_accordion.min.js'
            }
        },

        /***************************************************************************************************************
         *  COPY
         *  https://github.com/gruntjs/grunt-contrib-copy
         **************************************************************************************************************/
        'copy': {
            all: {
                src: 'src/zebra_accordion.src.js',
                dest: 'dist/zebra_accordion.src.js'
            }
        },

        /***************************************************************************************************************
         *  WATCH
         *  https://npmjs.org/package/grunt-contrib-watch
         **************************************************************************************************************/
        'watch': {
            js: {
                files: ['src/zebra_accordion.src.js'],
                tasks: ['newer:eslint', 'newer:jshint', 'newer:uglify', 'copy', 'notify:done'],
                options: {
                    livereload: true
                }
            },
            css: {
                files: ['src/zebra_accordion.scss'],
                tasks: ['newer:sass', 'notify:done'],
                options: {
                    livereload: true
                }
            }
        }

    });

    // register plugins
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-sass-modern');

    grunt.registerTask('default', ['sass', 'cssmin', 'eslint', 'jshint', 'uglify', 'copy', 'watch']);

};