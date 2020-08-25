const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const PnpWebpackPlugin = require('pnp-webpack-plugin');

module.exports = {
  entry: ['./src/game.ts', './webpack/credits.js'],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  resolve: {
    plugins: [
      PnpWebpackPlugin,
    ],
    extensions: ['.ts', '.tsx', '.js']
  },
  resolveLoader: {
    plugins: [
      PnpWebpackPlugin.moduleLoader(module),
    ]
  },
  module: {
    rules: [{ 
      test: /\.tsx?$/, 
      include: path.join(__dirname, '../src'), 
      loader: require.resolve('ts-loader') 
    }]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          filename: '[name].bundle.js'
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({ gameName: 'Arkade kolliball', template: 'src/index.html' }),
    new CopyWebpackPlugin([
      { from: 'src/assets', to: 'assets' },
      { from: 'pwa', to: '' },
      { from: 'src/favicon.ico', to: '' }
    ]),
    new InjectManifest({
      swSrc: path.resolve(__dirname, '../pwa/sw.js')
    })
  ]
}
