module.exports = function () {
    return {
        build: {
            options: {
                banner: '<%= banner %>'
            },
            files: {
                'dist/parse-backend.js': ['src/**/*.js', '!src/**/*.spec.js']
            }
        }
    }
};