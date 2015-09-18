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
                src: ['build']
            }
        },
        annotated: {
            files: {
                src: ['build/annotated']
            }
        }
    }
};