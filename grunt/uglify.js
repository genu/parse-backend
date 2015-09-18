module.exports = function () {
    return {
        build: {
            src: 'dist/annotated/**/*.js',
            dest: 'dist/parse-backend.min.js'
        }
    }
};