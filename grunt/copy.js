module.exports = function () {
    return {
        styles: {
            expand: true,
            cwd: '<%= src %>/css',
            dest: '<%= tmp %>/css',
            src: '{,*/}*.css'
        }
    }
};