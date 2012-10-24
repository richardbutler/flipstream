/*global module:false*/
module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            files: [ 'grunt.js', 'src/**/*.*' ],
            tasks: 'client'
        },
        coffee: {
            server: {
                options: {
                    bare: true
                },
                files: {
                    'bin/server.js': 'server/server.coffee'
                }
            },
            client: {
                options: {
                    bare: true
                },
                files: {
                    'bin/assets/scripts/flipstream.js': 'src/coffee/**/*.coffee'
                }
            }
        },
        jade: {
            compile: {
                options: {
                    compress: false
                },
                files: {
                    'bin/index.html': 'src/jade/index.jade'
                }
            }
        },
        stylus: {
            compile: {
                options: {
                    debug: true
                },
                files: {
                    'bin/assets/stylesheets/flipstream.css': 'src/stylus/flipstream.styl'
                }
            }
        },
        copy: {
            css: {
                options: {
                    basePath: 'src/css'
                },
                files: {
                    'bin/assets/stylesheets': 'src/css/**'
                }
            },
            js: {
                options: {
                    basePath: 'src/js'
                },
                files: {
                    'bin/assets/scripts': 'src/js/**'
                }
            }
        },
        clean: {
            client: {
                src: [ 'bin' ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib');

    // Default task.
    grunt.registerTask('default', 'client server');
    grunt.registerTask('server', 'coffee:server');
    grunt.registerTask('client', 'coffee:client stylus jade copy watch');

};
