const webpackConfig = require('./webpack.config');

module.exports = function (config) {
  config.set({
    autoWatch: false,
    browsers: ['PhantomJS'],
    colors: true,
    files: [
      'test/context.js'
    ],
    frameworks: ['mocha', 'chai', 'sinon'],
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    port: 9876,
    preprocessors: {
      'test/context.js': ['webpack', 'sourcemap']
    },
    reporters: ['progress'],
    singleRun: true,
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: webpackConfig.module.loaders
      },
      postcss : webpackConfig.postcss,
      plugins : webpackConfig.plugins,
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    },
    webpackServer: {
      noInfo: true
    }
  });
};
