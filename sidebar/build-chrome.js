const path = require('path');
const shelljs = require('shelljs');
const fse = require('fs-extra');

const workspaceRootPath = path.join(__dirname, '../');
const unzipOutputPath = path.join(workspaceRootPath, 'chrome-extensions');

const moduleName = 'sidebar';
const currentModuleRoot = path.join(workspaceRootPath, moduleName);

const currentModuleBuildPath = path.join(currentModuleRoot, 'build');
const currentModuleOutputPath = path.join(unzipOutputPath, moduleName);

(() => {
  // 清空产物输出文件夹
  fse.removeSync(currentModuleOutputPath);

  // 创建产物输出文件夹
  fse.ensureDirSync(currentModuleOutputPath);

  // 是否在构建之前需要执行 install
  const NPM = process.env.RUN_NPM_INSTALL;

  // install
  if (NPM) {
    shelljs.exec(`${NPM} i`, { cwd: currentModuleRoot });
  }

  // 构建
  shelljs.exec('npm run build', { cwd: currentModuleRoot });

  // copy 构建之后的放置到对应子目录下
  fse.copySync(currentModuleBuildPath, currentModuleOutputPath);
})();
