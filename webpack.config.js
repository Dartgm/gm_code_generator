const HtmlWebpackPlugin=require('html-webpack-plugin')
module.exports=(env)=>{
    console.log(env)
    return ({
        mode: process.env.NODE_ENV,
        devtool: 'source-map',
        entry: {
            ui: './src/main.js',
            doc: './doc/index.js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: './src/index.js',
                chunks: ['ui'],
                minify: {
                    collapseWhitespace:true,
                    removeComments:true
                }
            }),
            new HtmlWebpackPlugin({
                template: './doc/index.html',
                filename: './doc/index.js',
                chunks: ['doc'],
                minify: {
                    collapseWhitespace: true,
                    removeComments:true
                }
            })
        ]
    })
}