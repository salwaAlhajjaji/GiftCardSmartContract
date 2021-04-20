const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },

  
  plugins: [
    new CopyWebpackPlugin([
    { from: "./src/index.html", to: "index.html" },
    { from: "./src/add.html", to: "add.html" },
    { from: "./src/Buy-page.html", to: "Buy-page.html" },
    {from: "./src/checkout.html", to: "checkout.html"},
    { from: "./src/about-us.html", to: "about-us.html" },
    { from: "./src/email.html", to: "email.html" },
    { from: "./src/how.html", to: "how.html" },
    { from: "./src/redeem.html", to: "redeem.html" },
    { from: "./src/transfer.html", to: "transfer.html" },
    { from: "./src/main.js", to: "main.js" },
    { from: "./assets", to: "assets" },
    { from: "./css", to: "css" },
    
  ]),
   ],

  devServer: { contentBase: path.join(__dirname, "dist"), compress: true },
};