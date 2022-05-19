const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  entry: './src/lib/index.ts',
  output: {
    library: 'federated_lib',
    libraryTarget: 'umd',
    filename: 'lib/index.js',
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devtool: false,

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "federated_lib",
      filename: "remoteEntry.js",
      // declare remote lib so dynamic imports resolve correctly
      remotes: {
        'federated_lib': 'federated_lib@http://localhost:8080/remoteEntry.js',
      },
    }),
  ],
};
