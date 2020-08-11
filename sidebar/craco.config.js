const path = require('path');
const CracoAntDesignPlugin = require('craco-antd');
const CracoLessPlugin = require('craco-less');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  webpack: {
    plugins: [
      new MonacoWebpackPlugin({
        languages: ['javascript'],
      }),
    ],
  },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
    },
    {
      plugin: CracoLessPlugin,
      options: {
        cssLoaderOptions: {
          modules: true,
        },
        modifyLessRule: (lessRule, context) => ({
          ...lessRule,
          exclude: path.join(__dirname, 'node_modules'),
        }),
      },
    },
  ],
};
