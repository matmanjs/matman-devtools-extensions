const CracoAntDesignPlugin = require('craco-antd');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  webpack: {
    plugins: [
      new MonacoWebpackPlugin({
        languages: ['javascript'],
      }),
    ],
  },
  plugins: [{ plugin: CracoAntDesignPlugin }],
};
