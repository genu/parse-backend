var path = require('path');

module.exports = function (grunt) {
    require('time-grunt')(grunt);

    require('load-grunt-config')(grunt, {
        data: {
            pkg: grunt.file.readJSON('bower.json'),
            src: 'src',
            banner: '/*!\n * <%= pkg.name %> -v<% pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n */\n\n'
        }
    });
};
