
import { test } from 'ava';
import * as expect from 'node-suspect';
const pkgDir = require('pkg-dir').sync();
const pkg = require('read-pkg').sync();

import { questions } from '../../questions';
import { cmdName } from '../../cli';


// promisify expect.run.
const Run = (task) => new Promise((resolve, reject) => {
  task.run((err, stdout, exitCode) => err ? reject(err) : resolve(stdout));
});

test(`cli -h`, async t => {
  const expected = [
    `  Usage: cli [options] [command]`,
    `  Options:`,
    `    -V, --version  output the version number`,
    `    -h, --help     output usage information`,
    `  Commands:`,
    `    ${cmdName} [options]   a command with magical properties.`
  ];
  const task = expect
    .spawn(`node`, [`${pkgDir}/build/cli.js`, `-h`])
    .wait(`${cmdName} [options]   a command with magical properties.`);
  await Run(task).then(actual => t.deepEqual(expected, actual));
});

test(`cli ${cmdName}`, async t => {
  const expected = [/info: .*ms/];
  const task = expect
    .spawn(`node`, [`${pkgDir}/build/cli.js`, cmdName])
    .sendEof();
  await Run(task).then(actual => t.regex(actual[0], expected[0]));
});

test(`cli ${cmdName} -f`, async t => {
  const expected = [/info: .*ms/];
  const task = expect
    .spawn(`node`, [`${pkgDir}/build/cli.js`, cmdName, '-f'])
    .sendEof();
  await Run(task).then(actual => t.regex(actual[0], expected[0]));
});

test('questions', async t => {
  const expected = [];
  const actual = questions([]);
  t.deepEqual(expected, actual);
});
