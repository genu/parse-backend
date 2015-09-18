module.exports = function () {
    return {
        dest: 'docs',
        title: 'Parse Backend API',
        api: {
            src: ['<%= src %>/**/*.js'],
            title: 'API Documentation'
        }
    }
};