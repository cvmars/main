module.exports = function(grunt) {

    grunt.initConfig({

        //grunt读取外部json文件
        //grunt.file.readYAML  YAML   Yet Another Markup Language
        pkg: grunt.file.readJSON('package.json'),

        //被配置为合并，名称可以自定义，也可以自定义多个目标，例如a:options、files、dist b:options、files、dist
        //grunt concat:a    grunt concat:b
        //在一个任务配置中，options属性可以用来指定覆盖内置属性的默认值
        //a下面也可以由options，属于目标级options ，可以覆盖任务级的options
        // 目标（target）级的平options将会覆盖任务级的options。
        // src-dest(源文件-目标文件)文件映射的方式
        concat: {

            //文件对象格式
            // foo: {
            //     files: {
            //         'dest/a.js': ['src/aa.js', 'src/aaa.js'],
            //         'dest/a1.js': ['src/aa1.js', 'src/aaa1.js'],
            //     },
            // },

            // 简洁格式
            // bar: {
            //     src: ['src/bb.js', 'src/bbb.js'],
            //     dest: 'dest/b.js',
            // },

            // 文件数组格式,可以允许有额外的属性
            // bar: {
            //     files: [{
            //         src: ['src/bb.js', 'src/bbb.js'],
            //         dest: 'dest/b/',
            //         nonull: true
            //     }, {
            //         src: ['src/bb1.js', 'src/bbb1.js'],
            //         dest: 'dest/b1/',
            //         filter: 'isFile'
            //     }, ],
            // },

            options: { //任务级options
                // 定义一个用于插入合并输出文件之间的字符
                separator: ';'
            },
            dist: {

                // 将要被合并的文件
                src: ['src/*.js'], //把src中所有js都合并到dist目录下这个pkg配置中名字为name的js文件中

                // 合并后的JS文件的存放位置  destination
                dest: 'js_build/<%= pkg.name %>.js' 

            }

        },

        //被配置为压缩，名称可以自定义
        uglify: {

            options: {

                //压缩后，头部显示的注释信息
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'

            },
            dist: {

                //文件对象格式
                files: {
                    'js_build/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
            //用于将一个js文件压缩为一个目标文件
            // ,
            // build: {
            //     src: 'src/<%= pkg.name %>.js',
            //     dest: 'build/<%= pkg.name %>.min.js'
            // }

        },

        //代码校验
        jshint: {

            //校验files数组中js文件的语法
            //files: ['gruntfile.js', 'src/**/*.js'],
            files: ['Gruntfile.js', 'src/go1.js'],

            options: {

                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },

        //被配置为css文件压缩，名称可以自定义
        cssmin: {
            options: {

                //css压缩文件头部注释生成
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'

            },
            dist: {

                //文件对象模式
                files: {

                    'css_build/main.css': ['css/main.css']

                }
            }
        },

        log: {
            foo: [1, 2, 3],
            bar: 'hello world',
            baz: false
        },

        //单元测试插件
        qunit: {
            files: ['*.html']
        },

        //被配置为监听
        watch: {
            options: {

            },
            css: {
                files: ['less/*.less'],
                tasks: ['less']
            },
            grunt: {
                files: ['Gruntfile.js']
            },
            cssmin: {
                files: ['css/*.css'],
                tasks: ['cssmin']
            }
        },
        less: {
            go: { //自定义名称
                
                files: { // 文件files 固定命名
                    'css/main.css': 'less/main.less'
                }
            }
        },

        //配置路径信息
        // meta: {
        //     basePath: '../',
        //     srcPath: '../assets/sass/',
        //     deployPath: '../assets/css/'
        // },

        sass: {
            dist: {
                files: {
                    'css/sass.css': 'sass/sass.scss'
                },
                options: {
                    sourcemap: 'true'
                }
            }
        },
        
        sprite: {
            allslice: {
                files: [ //使用标准的动态文件对象
                    {
                        //启用动态扩展
                        // expand: true,

                        // css文件源的文件夹
                        // cwd: 'css',

                        // 匹配规则
                        // src: ['*.css'],

                        //导出css和sprite的路径地址
                        // dest: 'tmp/',

                        // 导出的css名
                        // ext: '.sprite.css'

                        // src: "img/*.png",
                        // destImg: "spritesheet/spritesheet.png",
                        // destCSS: "css/sprite.css",
                        // algorithm: "binary-tree"
                    }
                ],
                all: {
                    src: 'img/*.png',
                    destImg: 'spr/spritesheet.png',
                    destCSS: 'spr/sprites.css'
                },
                options: {

                    // 默认使用GM图像处理引擎
                    'engine': 'gm',

                    // 默认使用二叉树最优排列算法
                    'algorithm': 'binary-tree',

                    // 默认给雪碧图追加时间戳
                    'imagestamp': true,

                    // 默认给样式文件追加时间戳
                    'cssstamp': true

                }
            }
        }


    });

    //载入js压缩插件
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //载入文件检测文件是否规范插件
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // grunt.loadNpmTasks('grunt-contrib-qunit');

    //载入文件监听插件
    grunt.loadNpmTasks('grunt-contrib-watch');

    //载入js合并插件
    grunt.loadNpmTasks('grunt-contrib-concat');

    //载入less编译插件
    grunt.loadNpmTasks('grunt-contrib-less');

    //载入sass编译插件
    grunt.loadNpmTasks('grunt-contrib-sass');

    //载入css 压缩插件
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    //载入单元测试插件
    grunt.loadNpmTasks('grunt-contrib-qunit');

    //自动生成雪碧图
    grunt.loadNpmTasks('grunt-sprite');

    //注册代码校验插件
    grunt.registerTask('test', ['jshint']);

    // grunt.registerTask('less', ['less']);

    //注册雪碧图生成任务
    grunt.registerTask('spr', ['sprite']);

    //sass
    grunt.registerTask('sass', ['sass']);

    grunt.registerTask('less', ['less']);

    //注册模式事件
    grunt.registerTask('default', ['concat', 'uglify', 'less', 'cssmin', 'watch']);

    //自定义任务，不依赖任何任务
    grunt.registerTask('gogo', 'hellow word', function() {

        grunt.log.write('hello word joker');

    });

    //自定义
    grunt.registerMultiTask('log', 'Log stuff.', function() {
        // grunt.log.writeln(this.target + ': ' + this.data);

        if (arguments.length === 0) {

            grunt.log.writeln(this.name + ", no args");

        } else {

            grunt.log.writeln(this.name + ", " + arg1 + " " + arg2);

        }

    });

    // 在一个任务内部，你可以执行其他的任务。
    grunt.registerTask('foo', 'My "foo" task.', function() {

        // Enqueue "bar" and "baz" tasks, to run after "foo" finishes, in-order.
        grunt.task.run('bar', 'baz');
        
        // Or:
        grunt.task.run(['bar', 'baz']);
    });

};




// atten
// 注意： grunt --help 命令将列出所有可用的任务。

//grunt.registerTask('dist', ['concat:dist', 'uglify:dist']);