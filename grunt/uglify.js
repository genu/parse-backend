module.exports = function () {
    return {
        options: {
            banner: "<%= banner %>"
        },
        build: {
            src: 'dist/parse-backend.js',
            dest: 'dist/parse-backend.min.js'
        }
    }
};