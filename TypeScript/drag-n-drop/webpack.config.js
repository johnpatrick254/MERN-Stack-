const path = require('path'); // output path requires absolute path
const { CleanPlugin } = require('webpack');
module.exports = {
  entry: "./app.ts", // index file for project
  mode: "development",
  output: {
    filename: "bundle.js", // file name to output code
    path: path.resolve(__dirname, 'dist'), // set path to store target files
    publicPath: 'dist' // used for webpack-dev-server
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    liveReload: true,
    hot: true,
    magicHtml: true,
    watchFiles: [path.join(__dirname, 'app.ts')],
    port: 9000,
  },
  devtool: 'inline-source-map', // used with use source map true in ts.config

  module: {
    rules: [   // set rules for different file types
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: 'sass-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.scss'] // files types to be targeted by webpack
  },
  plugins: [
    // new CleanPlugin.CleanWebpackPlugin() // use to delete previews contents of dist on every rebuild
  ]
}