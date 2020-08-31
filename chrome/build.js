const path = require('path');
const shelljs = require('shelljs');
const fse = require('fs-extra');
const ChromeExtension = require('crx');

const pkgInfo = require('../package.json');

const workspaceRootPath = path.join(__dirname, '../');
const chromePublicSrcPath = path.join(workspaceRootPath, 'chrome/public');
const unzipOutputPath = path.join(workspaceRootPath, 'chrome-extensions');
const releaseRootPath = path.join(workspaceRootPath, 'release');

(function () {
  // 创建文件夹
  fse.ensureDirSync(unzipOutputPath);

  // 删除文件
  shelljs.rm('-rf', unzipOutputPath);

  // 复制 devtools 的一些公共文件
  shelljs.cp('-r', chromePublicSrcPath, unzipOutputPath);

  // 是否在构建之前需要执行 install
  const NPM = process.env.RUN_NPM_INSTALL;

  // 编译打包，有多个项目需要执行命令
  const dirs = ['sidebar', 'panel'];
  for (const subDir of dirs) {
    // 子文件根目录
    const currentDirRoot = path.join(workspaceRootPath, subDir);

    // install
    if (NPM) {
      shelljs.exec(`${NPM} i`, { cwd: currentDirRoot });
    }

    // 构建
    shelljs.exec('npm run build', { cwd: currentDirRoot });

    shelljs.cp(
      '-r',
      path.resolve(currentDirRoot, 'build'),
      path.resolve(`build/${subDir}`),
    );

    // copy 构建之后的放置到对应子目录下
    shelljs.cp(
      '-r',
      path.join(currentDirRoot, 'build'),
      path.join(unzipOutputPath, subDir),
    );
  }

  // 更新 manifest.json 中的版本
  const manifestJsonOriginalFilePath = path.join(chromePublicSrcPath, 'manifest.json');
  const manifestJsonFilePath = path.join(unzipOutputPath, 'manifest.json');
  const manifestJson = fse.readJsonSync(manifestJsonOriginalFilePath);
  manifestJson.version = pkgInfo.version;
  fse.writeJsonSync(manifestJsonFilePath, manifestJson);

  // 打包 crx
  generateCrx(unzipOutputPath);
})();

// https://www.npmjs.com/package/crx
function generateCrx(unzipOutputPath) {
  const crx = new ChromeExtension({
    privateKey: fse.readFileSync(path.join(__dirname, './key.pem')),
  });

  crx.load(unzipOutputPath)
    .then(crx => crx.pack())
    .then(crxBuffer => {
      fse.outputFileSync(path.join(releaseRootPath, `Matman-Chrome-Extensions-v${pkgInfo.version}.crx`), crxBuffer);
    })
    .catch(err => {
      console.error(err);
    });
}
