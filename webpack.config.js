
module.exports = {
  entry: './src/js/main.js',
  output: {
        path: 'dist',
        filename: 'bundle.js'
  },
  resolve: {
        modules: ["node_modules"],
  },
  module: {
    loaders: [
        {
          test: /.js?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015']
          }
        },
      ]
  }
  };
