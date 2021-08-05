const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './index.js', // entry point is the index.js in the root of the project folder
  mode: 'development',
  output: {
    path: __dirname, // bundle.js will be in the root of the project folder
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(css|scss)$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: 'image-gallery.css',
    }),
  ],
};
