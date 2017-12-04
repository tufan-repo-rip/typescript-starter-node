
import { test } from 'ava';
import * as execa from 'execa';
import * as stripAnsi from 'strip-ansi';
import { Interaction, ENTER, UP, DOWN, run as cliInspectRun } from 'cli-inspector';

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
  const actual = await execa(`node`, [`${pkgDir}/build/cli.js`, `-h`]);
  t.deepEqual(expected, actual.stdout.split('\n').filter(l => l !== ''));
});

test(`cli ${cmdName}`, async t => {
  // This is an interactive command - starts up inquirer.
  // While the boiler plate is an empty set of inquirer questions,
  // this harness provides everything needed to start building
  // your own interactive prompts and test cases.

  const interactions = <Interaction[]>[{
    prompt: /.*info.*ms/
  }];
  try {
    const actual = await cliInspectRun(`node ${pkgDir}/build/cli.js ${cmdName}`, interactions);
    t.pass();
  } catch (err) {
    console.log(err);
    console.log(err.stack);
    t.fail(err);
  }
});

test(`cli ${cmdName} -f`, async t => {
  const actual = await execa(`node`, [`${pkgDir}/build/cli.js`, cmdName, '-f']);
  const expected = new RegExp(`info: ${cmdName} .*ms`);
  t.regex(stripAnsi(actual.stdout), expected, stripAnsi(actual.stdout));
});

test('questions', async t => {
  const expected = [];
  const actual = questions([]);
  t.deepEqual(expected, actual);
});
