'use strict';

module.exports = function (grunt) {

	require('load-grunt-tasks')(grunt);

	var config = {
		app: 'app',
		dist: 'dist',
		bower_config: grunt.file.readJSON('bower.json')
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
				dest: '.tmp/concat/assets/js/app.min.js'
			}
		},

		uglify: {
			options: {
				// the banner is inserted at the top of the output
				banner: '/*! <%= pkg.name %> - Built <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %> */\n'
			},
			dist: {
				files: {
					'<%= config.dist %>/assets/js/app.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},

		cssmin: {
      dist: {
        files: {
          '<%= config.dist %>/assets/css/app.min.css': [
            '.tmp/concat/assets/css/{,**/}*.css',
            '<%= config.app %>/{,**/}*.css'
          ]
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
				'!<%= config.app %>/vendor/*',
				'test/spec/{,*/}*.js'
			]
		},
		// Inject Bower components into HTML file
		wiredep: {
			app: {
				ignorePath: /^\/|\.\.\//,
				src: ['<%= config.app %>/index.html']
			},
		},
		// Rename files for browser caching
		rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/assets/js/{,*/}*.js',
            '<%= config.dist %>/assets/css/{,*/}*.css',
            '<%= config.dist %>/assets/img/{,*/}*.*',
            '!<%= config.dist %>/assets/fonts/{,*/}*.*',
            '<%= config.dist %>/*.{ico,png}'
          ]
        }
      }
    },

		useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: '<%= config.app %>/index.html'
    },

		usemin: {
			html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/assets/css/{,*/}*.css'],
      js: ['<%= config.dist %>/assets/js/{,*/}*.js'],
      options: {
        assetsDirs: [
          '<%= config.dist %>',
          '<%= config.dist %>/assets/img',
          '<%= config.dist %>/assets/css'
        ],
        patterns: {
          js: [[/(img\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']],
          css: [[/(img\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']]
        }
      }
    },

		imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/assets/img',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %>/assets/img'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/assets/img',
          src: '{,*/}*.svg',
          dest: '<%= config.dist %>/assets/img'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: '{,**/}*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },

		watch: {
			bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= config.app %>/{,**/}*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      jstest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['test:watch']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      styles: {
        files: ['<%= config.app %>/{,**/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.app %>/{,**/}*.html',
          '<%= config.app %>/assets/img/{,**/}*'
        ]
      }
		},

		connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: '0.0.0.0'
      },
			livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/app',
                connect.static('./app')
              ),
              connect.static(config.app)
            ];
          }
        }
      },

      test: {
        options: {
          open: false,
          port: 9001,
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
					open: true,
          base: '<%= config.dist %>',
          livereload: false
        }
      }
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
            '{,**/}*.html'
          ]
        }, {
          src: 'node_modules/apache-server-configs/dist/.htaccess',
          dest: '<%= config.dist %>/.htaccess'
        }, {
          src: '<%= config.app %>/assets/fonts/{,**/}*.*',
          dest: '<%= config.dist %>/assets/fonts'
        }, {
          expand: true,
          dot: true,
          cwd: '.tmp/concat/',
          dest: '<%= config.dist %>',
          src: [
            '{,**/}*.js',
            '{,**/}*.css',
          ]
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      fonts_materialize: {
        expand: true,
        dot: true,
        cwd: 'bower_components/materialize/dist/font',
        dest: '<%= config.dist %>/assets/font',
        src: '{,**/}*.*'
      },
      fonts_mdi: {
        expand: true,
        dot: true,
        cwd: 'bower_components/mdi/fonts',
        dest: '<%= config.dist %>/assets/fonts',
        src: '{,**/}*.*'
      },
      dist_temp: {
        files: [{
          expand: true,
          dot: true,
          cwd: '.tmp/concat/',
          dest: '<%= config.dist %>',
          src: [
            '{,**/}*.js',
            '{,**/}*.css',
          ]
        }, {
          src: 'node_modules/apache-server-configs/dist/.htaccess',
          dest: '<%= config.dist %>/.htaccess'
        }, {
          src: '<%= config.app %>/assets/fonts/{,**/}*.*',
          dest: '<%= config.dist %>/assets/fonts'
        }]
      },
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

		autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/',
          src: '{,*/}*.css',
          dest: '.tmp/'
        }]
      }
    },

		concurrent: {
      server: [
        'copy:styles',
				'copy:dist_temp'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },

		injector: {
	    options: {},
	    local_dependencies: {
	      files: {
	        '<%= config.app %>/index.html': ['<%= config.app %>/**/*.js', '<%= config.app %>/**/*.css'],
	      }
	    }
	  },
	});

	grunt.loadNpmTasks('grunt-injector');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-include-source');

	grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
		if (grunt.option('allow-remote')) {
			grunt.config.set('connect.options.hostname', '0.0.0.0');
		}
		if (target === 'dist') {
			return grunt.task.run(['build-human', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'wiredep',
			'concurrent:server',
			'connect:livereload',
			'watch'
		]);
	});

	grunt.registerTask('server', function (target) {
		grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
		grunt.task.run([target ? ('serve:' + target) : 'serve']);
	});

	grunt.registerTask('build-human', [
    'clean:dist',
    'copy:fonts_materialize',
    'copy:fonts_mdi',
		'injector',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'concat:dist',
    'copy:dist',
		'rev',
    'usemin'
  ]);

	grunt.registerTask('test', function (target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'concurrent:test',
        'autoprefixer'
      ]);
    }

    grunt.task.run([
      'connect:test',
      'mocha'
    ]);
  });

	grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'cssmin',
    'uglify',
    'copy:dist',
    'rev',
    'usemin',
    'htmlmin'
  ]);

	grunt.registerTask('build-xdk', [ // TODO: Intel XDK build task
    'clean:dist',
		'injector',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'cssmin',
    'uglify',
    'copy:dist',
		'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'build-human'
  ]);

};
