module.exports = function () {
    return {
        build: {
            files: [
                {
                    expand: true,
                    dot: true,
                    cwd: '<%= src %>',
                    dest: 'build',
                    src: [
                        ''
                    ]
                }
            ]
        }
    }
};