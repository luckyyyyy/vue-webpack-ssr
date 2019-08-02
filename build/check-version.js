const { execSync } = require('child_process');
const semver = require('semver');
const chalk = require('chalk');
const { dependencies, devDependencies, engines } = require('../package.json');

const { log, table } = console;

const nodeVersion = process.version;
// const rez = process.env.npm_config_user_agent.match(/^npm\/([^\s]+)/);
// const npmVersion = rez[1];
const npmVersion = execSync('npm --version').toString().trim();

const brokenDeps = [];

if (!semver.satisfies(nodeVersion, engines.node)) {
  brokenDeps.push({
    package: 'node',
    expect: engines.node,
    current: nodeVersion,
  });
}

if (!semver.satisfies(npmVersion, engines.npm)) {
  brokenDeps.push({
    package: 'npm',
    expect: engines.npm,
    current: npmVersion,
  });
}

const deps = [
  ...Object.entries(dependencies),
  ...Object.entries(devDependencies),
];

for (let [package, expect] of deps) {
  const { version } = require(`${package}/package.json`);
  const isSat = semver.satisfies(version, expect);
  // console.log(isSat);
  if (!isSat) {
    brokenDeps.push({ package, expect, current: version });
  }
}

if (brokenDeps.length > 0) {
  log(chalk.white.bgRed(' Error ') + ' 依赖版本存在不符项，请重新安装');

  table(brokenDeps);

  process.exit(1);
}
