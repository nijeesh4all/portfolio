module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            main: {
                cwd: 'src',
                src: ['**', '!**/*.scss'],
                dest: 'build',
                expand: true
            },
            dist: {
                files: [{
                    cwd: 'build/',
                    src: ['**', "!css/**"],
                    dest: 'dist/',
                    expand: true
                }],
            }
        },

        clean: {
            build: {
                src: ['build']
            },
            dist: {
                src: ['dist']
            }
        },

        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/css',
                    src: ['*.scss'],
                    dest: 'build/css/',
                    ext: '.css'
                }]
            }
        },

        autoprefixer: {
            build: {
                expand: true,
                cwd: 'build',
                src: ['**/*.css', "!**/*.min.css"],
                dest: 'build'
            }
        },

        cssmin: {
            build: {
                files: {
                    'build/application.css': ['build/**/*.css']
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 4000,
                    base: 'build',
                    hostname: '*'
                }
            }
        },

        watch: {
            css: {
                files: 'src/**',
                tasks: ['build']
            }
        },

    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('copy-all', ['copy:main']);
    grunt.registerTask('copy-dist', ['copy:dist']);

    grunt.registerTask(
        'build',
        'Compiles all of the assets and copies the files to the build directory.',
        ['clean:build', 'copy-all', 'stylesheets']
    );

    grunt.registerTask(
        'stylesheets',
        'Compiles the stylesheets.',
        ['sass', 'autoprefixer', 'cssmin']
    );

    grunt.registerTask('dist',
        'Compiles all of the assets and copies the files to the build directory and copy all the necessory code to dist',
        ['build', 'clean:dist', 'copy-dist']
    )


    grunt.registerTask('default', ['build' , 'connect', 'watch']);
}