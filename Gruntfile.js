'use strict';

module.exports = function (grunt) {

	require('load-grunt-tasks')(grunt);

	var config = {
		app: 'app',
		dist: 'dist'
	};

	grunt.initConfig({
		config: config,

		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				// define a string to put between each file in the concatenated output
				separator: ';'
			},
			dist: {
				// the files to concatenate
				src: ['app/**/*.js'],
				// the location of the resulting JS file
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				// the banner is inserted at the top of the output
				banner: '/*! <%= pkg.name %> - Built <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %> */\n'
			},
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},
		qunit: {
			files: ['test/**/*.html']
		},
		jshint: {
			// configure JSHint (documented at http://www.jshint.com/docs/)
			options: {
				  // more options here if you want to override JSHint defaults
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: [
				'Gruntfile.js',
				'<%= config.app %>/{,*/}*.js',
				'test/spec/{,*/}*.js'
			]
		},
		// Inject Bower components into HTML file
		wiredep: {
			app: {
				ignorePath: /^\/|\.\.\//,
				src: ['<%= config.app %>/index.html']
			}
		},
		// Rename files for browser caching
		rev: {
			dist: {
				files: {
					src: [
						'<%=  %>',
					]
				}
			}
		},
		watch: {
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= config.app %>/{,*/}*.html',
					'.tmp/styles/{,*/}*.css',
					'<%= config.app %>/images/{,*/}*'
					]
			}
		},
		connect: {
			options: {
				port: 9000,
				open: true,
				livereload: 35729,
				// Change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost'
			},
			livereload: {
				options: {
					middleware: function(connect) {
						return [
							connect.static('.tmp'),
							connect().use('/bower_components', connect.static('./bower_components')),
							connect.static(config.app)
						];
					}
				}
			},
			test: {
				options: {
					open: false,
					port: 9001,
					hostname: 'localhost',
					middleware: function(connect) {
						return [
							connect.static('.tmp'),
							connect.static('test'),
							connect().use('/bower_components', connect.static('./bower_components')),
							connect.static(config.app)
						];
					}
				}
			},
			dist: {
				options: {
					base: '<%= config.dist %>',
					livereload: false
				}
			}
		},
		mocha: {
			all: {
				options: {
					run: true,
					urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
				}
			}
		},
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= config.dist %>/*',
						'!<%= config.dist %>/.git*'
					]
				}]
			},
			server: '.tmp'
		},
		copy: {
	      dist: {
	        files: [{
	          expand: true,
	          dot: true,
	          cwd: '<%= config.app %>',
	          dest: '<%= config.dist %>',
	          src: [
	            '*.{ico,png,txt}',
	            '.htaccess',
	            '*.html',
	            'views/{,*/}*.html',
	            'bower_components/**/*',
	            'images/{,*/}*.{webp}',
	            'fonts/*'
	          ]
	        }, {
	          expand: true,
	          cwd: '.tmp/images',
	          dest: '<%= config.dist %>/images',
	          src: ['generated/*']
	        }]
	      },
	      styles: {
	        expand: true,
	        cwd: '<%= config.app %>/styles',
	        dest: '.tmp/styles/',
	        src: '{,*/}*.css'
	      }
	    },
	    ngmin: {
	      dist: {
	        files: [{
	          expand: true,
	          cwd: '.tmp/concat/scripts',
	          src: '*.js',
	          dest: '.tmp/concat/scripts'
	        }]
	      }
	    },
	    cdnify: {
	      dist: {
	        html: ['<%= config.dist %>/*.html']
	      }
	    },
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('serve', function (target) {
	    if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
	    }
	
	    grunt.task.run([
			'clean:server',
			'bower-install',
			'concurrent:server',
			'autoprefixer',
			'connect:livereload',
			'watch'
	    ]);
	});

	// this would be run by typing "grunt test" on the command line
	grunt.registerTask('test', [
	    'clean:server',
	    'concurrent:test',
	    'autoprefixer',
	    'connect:test',
	    'karma'
	]);

	grunt.registerTask('build', [
		'clean:dist',
	    'bower-install',
	    'useminPrepare',
	    'concurrent:dist',
	    'autoprefixer',
	    'concat',
	    'ngmin',
	    'copy:dist',
	    'cdnify',
	    'cssmin',
	    'uglify',
	    'rev',
	    'usemin',
	    'htmlmin'
    ]);

	grunt.registerTask('clear', ['clean']);

	// the default task can be run just by typing "grunt" on the command line
	grunt.registerTask('default', [
		'newer:jshint',
	    'test',
	    'build'
    ]);

};
