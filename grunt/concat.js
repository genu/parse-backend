module.exports = function () {
    return {
        separator: ';',
        build: {
            files: [{
                expand: true,
                cwd: '<%= src %>',
                src: '**/*.js',
                dest: 'build/parse-backend.js'
            }]
        }
    }
};