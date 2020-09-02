const { useBabelRc, override, fixBabelImports, addDecoratorsLegacy } = require("customize-cra");

// 补充：对开发友好，打包完成桌面提醒
// const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

// 关闭 sourcemap
process.env.GENERATE_SOURCEMAP = "false";

module.exports = override(
  useBabelRc(),
  /**启动装饰器 */
  addDecoratorsLegacy(),
  /**配置antd */
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css"
  })
);
