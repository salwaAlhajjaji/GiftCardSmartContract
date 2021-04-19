const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      // {
      //   // test: /\.styl$/,
      //   test: /\.(css)$/,
      //   loader: "stylus-loader", // compiles Styl to CSS
      // },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  // entry: "./assets/..",
  // output: {
  //   filename: "Picture1.png",
  //   path: path.resolve(__dirname, "dist"),
  // },
  plugins: [
    new CopyWebpackPlugin([{ from: "./src/index.html", to: "index.html" }]),
        // new CopyWebpackPlugin([{ from: "./src/index.html", to: "index.html" }]),
    new CopyWebpackPlugin([{ from: "./src/add.html", to: "add.html" }]),
    new CopyWebpackPlugin([{ from: "./src/Buy-page.html", to: "Buy-page.html" }]),
    new CopyWebpackPlugin([{ from: "./src/checkout.html", to: "checkout.html" }]),
    new CopyWebpackPlugin([{ from: "./src/about-us.html", to: "about-us.html" }]),
    new CopyWebpackPlugin([{ from: "./src/email.html", to: "email.html" }]),
    new CopyWebpackPlugin([{ from: "./src/how.html", to: "how.html" }]),
    new CopyWebpackPlugin([{ from: "./assets/", to: "index.html" }]),
  ],
  devServer: { contentBase: path.join(__dirname, "dist"), compress: true },
};


// const path = require("path");
// const CopyWebpackPlugin = require("copy-webpack-plugin");

// module.exports = {
//   mode: 'development',
//   entry: "./src/index.js",
//   output: {
//     filename: "index.js",
//     path: path.resolve(__dirname, "dist"),
//   },
//   plugins: [
//     new CopyWebpackPlugin([{ from: "./src/index.html", to: "index.html" }]),
//     // new CopyWebpackPlugin([{ from: "./src/index.html", to: "index.html" }]),
//     // new CopyWebpackPlugin([{ from: "./src/Buy-page.html", to: "Buy-page.html" }]),
//     // new CopyWebpackPlugin([{ from: "./src/checkout.html", to: "checkout.html" }]),
//     // new CopyWebpackPlugin([{ from: "./src/about-us.html", to: "about-us.html" }]),
//     // new CopyWebpackPlugin([{ from: "./src/email.html", to: "email.html" }]),
//     // new CopyWebpackPlugin([{ from: "./src/how.html", to: "how.html" }]),

//   ],
//   devServer: { contentBase: path.join(__dirname, "dist"), compress: true },
// };
