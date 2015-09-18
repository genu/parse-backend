module.exports = function () {
    return {
        docs: {
            files: [
                {
                    src: ['docs']
                }
            ]
        },
        build: {
            files: {
                src: ['dist']
            }
        },
        annotated: {
            files: {
                src: ['dist/annotated']
            }
        }
    }
};