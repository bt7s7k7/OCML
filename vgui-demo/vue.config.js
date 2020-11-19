module.exports = {
    devServer: {
        proxy: {
            "^/api|^/backend": {
                target: "http://localhost:8000"
            },
        }
    }
}