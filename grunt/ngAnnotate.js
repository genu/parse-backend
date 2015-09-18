module.exports = function () {
    return {
        build: {
            files: [{
                expand: true,
                cwd: '<%= src %>',
                src: '**/*.js',
                dest: 'build/annotated'
            }]
        }
    }
};