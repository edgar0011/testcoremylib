
import path from 'path'

import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  // context: path.join(__dirname, 'src'),
  devServer: {
    historyApiFallback: true,
    // contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: process.env.PORT || 9000,
    hot: true,
    open: true,
    host: 'localhost',
  },
  entry: './src/index.js',
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: isProd ? '[name].[hash].js' : '[name].bundle.js',
    chunkFilename: isProd ? '[name].js' : '[name].bundle.js',
  },
  // devtool: isProd ? 'source-map' : 'eval-source-map',
  devtool: isProd ? false : 'eval-source-map',
  optimization: {
    // splitChunks: {
    //   chunks: 'async',
    //   minSize: 10000,
    //   maxSize: 0,
    //   minChunks: 1,
    // },
    // splitChunks: {
    //   chunks: 'async',
    //   minSize: 20000,
    //   minRemainingSize: 0,
    //   maxSize: 0,
    //   minChunks: 1,
    //   maxAsyncRequests: 30,
    //   maxInitialRequests: 30,
    //   enforceSizeThreshold: 50000,
    //   cacheGroups: {
    //     defaultVendors: {
    //       test: /[\\/]node_modules[\\/]/,
    //       priority: -10,
    //       reuseExistingChunk: true,
    //     },
    //     default: {
    //       minChunks: 2,
    //       priority: -20,
    //       reuseExistingChunk: true,
    //     },
    //   },
    // },
    // https://webpack.js.org/guides/tree-shaking/
    usedExports: true, // could help but not necessary, is used by 3rd party plugins/optomizers,
    minimize: true,
  },
  resolve: {
    alias: {
      'react-spring$': 'react-spring/web.cjs',
      'react-spring/renderprops$': 'react-spring/renderprops.cjs',
    },
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
      {
        test: /\.css?$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            },
          },
        ],
      },
      // {
      //   test: /\.(scss|sass)$/,
      //   use: [
      //     // 'style-loader',
      //     MiniCssExtractPlugin.loader,
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         sourceMap: false,
      //       },
      //     },
      //     'resolve-url-loader',
      //     {
      //       loader: 'sass-loader',
      //       options: {
      //         sourceMap: false,
      //       },
      //     },
      //   ],
      // },
      // {
      //   test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      //   use: 'file-loader?limit=100000&mimetype=application/font-woff',
      // }, {
      //   test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      //   use: 'file-loader?limit=100000&mimetype=application/font-woff',
      // }, {
      //   test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      //   use: 'file-loader?limit=100000&mimetype=application/octet-stream',
      // }, {
      //   test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      //   use: 'file-loader?limit=100000&mimetype=application/font-eot',
      // },
      // {
      //   test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
      //   use: 'file-loader?limit=100000&mimetype=application/font-otf',
      // },
      // {
      //   test: /\.(pdf)$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         publicPath: 'documents',
      //         outputPath: 'documents',
      //         name: '[name].[ext]',
      //       },
      //     },
      //   ],
      // },
      // {
      //   // IMAGE LOADER
      //   test: /\.(jpe?g|png|gif|ico)$/i,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         outputPath: 'images',
      //       },
      //     },
      //   ],
      // },
      // {
      //   test: /\.(ttf|otf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
      //   exclude: [
      //     path.resolve(__dirname, 'src/assets/'),
      //   ],
      //   include: [
      //     path.resolve(__dirname, 'src/'),
      //     path.resolve(__dirname, 'src/SVG/'),
      //     path.resolve(__dirname, 'node_modules'),
      //   ],
      //   use: [{
      //     loader: 'file-loader',
      //     options: {
      //       outputPath: 'fonts',
      //       publicPath: 'fonts',
      //     },
      //   }],
      // },
      // {
      //   // SVG assets INLINE LOADER
      //   test: /\.(svg)$/i,
      //   include: [
      //     path.resolve(__dirname, 'src/assets/'),
      //   ],
      //   use: ['@svgr/webpack'],
      // },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
    }),
    // new CopyWebpackPlugin([
    //   { from: __dirname + '/app/src/index.html', to: __dirname + '/dist/index.html' },
    // ], {
    //   ignore: [
    //     // Doesn't copy any files with a txt extension
    //     '*.txt',

    //     // Doesn't copy any file, even if they start with a dot
    //     // { glob: '**!/!*', dot: true }
    //   ],

    //   // By default, we only copy modified files during
    //   // a watch or webpack-dev-server build. Setting this
    //   // to `true` copies all files.
    //   copyUnmodified: false,
    // }),
    new MiniCssExtractPlugin({
      filename: isProd ? '[name].[hash].css' : '[name].bundle.css',
      chunkFilename: isProd ? '[name].[contenthash].css' : '[name].bundle.css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // favicon: './src/assets/favicon32.png',
      filename: 'index.html',
      inject: 'body',
      title: 'TestCoreMyLib',
      description: 'TestCoreMyLib, javascript, babel, eslint, webpack, es6, module, lib',
      keywords: 'TestCoreMyLib, javascript, babel, eslint, webpack, es6, module, lib',
      version: `${process.env.server || 'dev'}-0.0.2`,
      chunksSortMode: 'none',
    }),
    // new ManifestPlugin(),
    // new webpack.DefinePlugin({
    //   SC_DISABLE_SPEEDY: true,
    // }),
  ].concat(!isProd ? [] : [
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('production'),
    //   PRODUCTION: JSON.stringify('production'),
    // }),
  ].concat(
    isProd && process.env.ANALYZE
      ? [
        new BundleAnalyzerPlugin(),
      ]
      : [],
  )),
}
