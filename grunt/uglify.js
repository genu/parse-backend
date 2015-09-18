module.exports = function () {
    return {
        build: {
            src: 'build/annotated/**/*.js',
            dest: 'build/parse-backend.min.js'
        }
    }
};