module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        //Read the package.json (optional)
        pkg: grunt.file.readJSON('package.json'),

        // Metadata.
        meta: {
            basePath: '../',
            srcPath: 'sass/',
            deployPath: 'css/',
            srcLessPath: 'less/'
        },

        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> ',

        // Task configuration.
        sass: {
            dist: {
                files: {
                    '<%= meta.deployPath %>main.css': '<%= meta.srcPath %>main.scss'
                },
                options: {
                    sourcemap: 'true'
                }
            }
        },
        less: {
            dist: {
                files: {
                    '<%= meta.deployPath %>less.css': '<%= meta.srcLessPath %>main.less'
                },
                options: {
                    sourcemap: 'true'
                }
            }
        },
        cssmin: {
            options: {

                //css压缩文件头部注释生成
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'

            },
            dist: {

                //文件对象模式
                files: {

                    'css/main.css': ['css/main.css'],
                    'css/less.css': ['css/less.css']

                }
            }
        },
        watch: {
            scripts: {
                files: [
                    '<%= meta.srcPath %>/**/*.scss',
                    '<%= meta.srcLessPath %>/**/*.less',
                    'Gruntfile.js'
                ],
                tasks: ['sass', 'less','cssmin']
            }
        },
        jshint: {

            //校验files数组中js文件的语法
            //files: ['gruntfile.js', 'src/**/*.js'],
            files: ['Gruntfile.js', 'src/config.js'],

            options: {

                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task.
    grunt.registerTask('default', ['less', 'sass', 'cssmin', 'watch','jshint']);
};
