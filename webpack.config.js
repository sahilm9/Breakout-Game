let path = require('path');
module.exports = {
  entry: "./app/src/scripts/app.js",
  output:{
    path: path.resolve(__dirname, "./app/dist/scripts"),
    filename: "app.js"
  },
  module:{
    loaders:[
        {
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        },
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
}