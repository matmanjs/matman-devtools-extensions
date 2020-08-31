const path = require('path');
const shelljs = require('shelljs');
const fse = require('fs-extra');

const workspaceRootPath = path.join(__dirname, '../');
const unzipOutputPath = path.join(workspaceRootPath, 'chrome-extensions');

/**
 * 构建 Create-React-App 项目
 * @param {String} projectName 项目名
 */
function buildCRAProject(projectName) {
  const currentProjectRoot = path.join(workspaceRootPath, projectName);
  const currentProjectBuildPath = path.join(currentProjectRoot, 'build');
  const currentProjectOutputPath = path.join(unzipOutputPath, projectName);

  // 清空产物输出文件夹
  fse.removeSync(currentProjectOutputPath);

  // 创建产物输出文件夹
  fse.ensureDirSync(currentProjectOutputPath);

  // 是否在构建之前需要执行 install
  const NPM = process.env.RUN_NPM_INSTALL;

  // install
  if (NPM) {
    shelljs.exec(`${NPM} i`, { cwd: currentProjectRoot });
  }

  // 构建
  shelljs.exec('npm run build', { cwd: currentProjectRoot });

  // copy 构建之后的放置到对应子目录下
  fse.copySync(currentProjectBuildPath, currentProjectOutputPath);
}

module.exports = {
  workspaceRootPath,
  unzipOutputPath,
  buildCRAProject
};
