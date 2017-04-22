import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import {
  EnvironmentPlugin,
  NamedModulesPlugin,
  HotModuleReplacementPlugin,
  NoEmitOnErrorsPlugin,
  SourceMapDevToolPlugin,
  optimize,
} from 'webpack';

const {CommonsChunkPlugin} = optimize;

export default {
  resolve: {
    extensions: ['.js'],
    alias: {
      configs: path.resolve(__dirname, 'configs', 'local.js'),
    },
  },
  entry: [
    './app/webpack-public-path.js',
    'webpack-hot-middleware/client?reload=true',
    './app/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  plugins: [
    new EnvironmentPlugin({NODE_ENV: 'development'}),
    new CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return (module.context && /node_modules/.test(module.context)) ||
          (module.resource && /babelHelpers\.js/.test(module.resource));
      },
    }),
    new CommonsChunkPlugin({name: 'manifest'}),
    new NamedModulesPlugin(),
    new HotModuleReplacementPlugin(),
    new NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'app/index.ejs',
      inject: true,
    }),
    new SourceMapDevToolPlugin({
      test: /main\.js/,
      filename: '[file].map',
      columns: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|babelHelpers)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                targets: {
                  browsers: ['last 2 versions', 'not ie < 11'],
                },
                modules: false,
              }],
              'react',
              'react-hmre',
            ],
            plugins: [
              'transform-object-rest-spread',
              'external-helpers',
            ],
          },
        },
      },
      {
        test: /(\.css|\.scss)$/,
        use: [
          'style-loader',
          'css-loader?sourceMap',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer],
            },
          },
          'sass-loader?sourceMap',
        ],
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: ['file-loader'],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['file-loader'],
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: ['file-loader'],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: ['file-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        use: ['file-loader'],
      },
    ],
  },
};
