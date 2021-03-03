const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
    content: './src/content/index.js'
  },
  mode: 'production',
  performance: {
    maxAssetSize: 1024000
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: './node_modules/reveal.js', to: './',
          filter: (resourcePath) => {
            return !resourcePath.match('(.*?\.html$)|(.*?LICENSE$)|(.*?README.md$)|(.*?\.json)');
          }
        },
        {
          from: './src', to: './',
          filter: (resourcePath) => {
            return !resourcePath.match('(.*?index\.js$)|(.*\.md$)|(markdown-loader.js)');
          }
        }
      ]
    }),
  ],
  module: {
    rules: [
      {
        test: /.*\.md$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'content/[name].[ext]',
            },
          },
          {
            loader: path.resolve('src/markdown-loader.js')
          },
        ]
      }
    ]
  }
};
