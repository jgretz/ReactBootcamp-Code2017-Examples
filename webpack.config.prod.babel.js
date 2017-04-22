import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import {EnvironmentPlugin, optimize} from 'webpack';

const {CommonsChunkPlugin, UglifyJsPlugin} = optimize;

const config = {
  INTEGRATION: 'integration',
  QA: 'qa',
  PRODUCTION: 'production',
}[process.env.BUILD || 'INTEGRATION'];

export default {
  resolve: {
    extensions: ['.js'],
    alias: {
      configs: path.resolve(__dirname, 'configs', config),
    },
  },
  entry: {
    app: './app/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/public/',
    filename: '[name].[chunkhash].js',
  },
  plugins: [
    new EnvironmentPlugin({NODE_ENV: 'production'}),
    new CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return (module.context && /node_modules/.test(module.context)) ||
          (module.resource && /babelHelpers\.js/.test(module.resource));
      },
    }),
    new CommonsChunkPlugin({name: 'manifest'}),
    new ExtractTextPlugin({
      allChunks: true,
      filename: '[name].[chunkhash].css',
    }),
    new HtmlWebpackPlugin({
      template: 'app/index.ejs',
      inject: true,
    }),
    new UglifyJsPlugin(),
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
            ],
            plugins: [
              'transform-react-remove-prop-types',
              'transform-object-rest-spread',
              'external-helpers',
            ],
          },
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer],
              },
            },
            'sass-loader',
          ],
        }),
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
