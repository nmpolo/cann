module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: { src: 'dist/' },
            temp: { src: 'temp/' }
        },
        jshint: {
            options: {
                newcap: false
            },
            gruntfile: { src: 'Gruntfile.js' },
            src: {
                src: 'web/app/**/*.js'
            }
        },
        copy: {
            dist: {
                files: [
                    { src: '**/*', dest: 'dist/', cwd: 'temp/', expand: true }
                ]
            }
        },
        requirejs: {
            src: {
                options: {
                    name: 'main',
                    mainConfigFile: 'web/app/main.js',
                    out: 'temp/js/cann-<%= pkg.version %>.js',
                    preserveLicenseComments: false,
                    almond: true,
                    replaceRequireScript: [{
                        files: 'temp/index.html',
                        name: 'main',
                        modulePath: 'js/cann-<%= pkg.version %>'
                    }]
                }
            },
            css: {
                options: {
                    optimizeCss: 'standard',
                    cssIn: 'web/css/style.css',
                    out: 'temp/css/cann-<%= pkg.version %>.css',
                    preserveLicenseComments: false
                }
            }
        },
        htmlbuild: {
            src: {
                src: 'web/index.html',
                dest: 'temp/',
                options: {
                    styles: {
                        bundle: {
                            files: ['temp/css/cann-<%= pkg.version %>.css']
                        }
                    }
                }
            }
        },
        less: {
            src: {
                options: {
                    paths: ['web/vendor/bower/bootstrap/less']
                },
                files: {
                    'web/css/style.css': 'web/less/style.less'
                }
            }
        },
        'gh-pages': {
            options: {
                base: 'dist'
            },
            src: ['**']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-gh-pages');

    grunt.registerTask('default', ['jshint', 'clean:temp', 'less', 'requirejs:css', 'htmlbuild', 'requirejs:src', 'clean:dist', 'copy:dist', 'clean:temp']);
};
