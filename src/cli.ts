
import { Winston } from 'winston';
import * as inquirer from 'inquirer';

// questions() returns an array of interactive prompts usable by inquirer.
import { questions } from './questions';
import { main } from './index';

export const cmdName = 'cmd-name';
export const addCommand = async (program, config, log: Winston) => {
  return program
    .command(`${cmdName}`) // <arg> => required, [arg] => optional
    .description(`a command with magical properties.`)
    .option('-f, --force', 'bypass interactive mode - auto-magic!')
    .action(async (opts: any) => {
      const start = Date.now();
      // either set defaults or fetch values from persistence.
      const defaults = {};
      const answers = !!opts.force
        ? defaults
        : await inquirer.prompt(questions(defaults));
      // now that we have initial values, just invoke function
      await main(answers);
      log.info(`${cmdName} - ${Date.now() - start}ms`);
    });
};

// The conditional allows composing CLIs out of npm-modules per cli command.
// Even moderately complex CLIs can quickly grow into large monolithic beasts.
// This is our take on a KISS CLI.

/* istanbul ignore else */
if (require.main === module) {
  require('runtime-engine-check')(); // checks node version matches spec in package.json
  const config = require('config');
  const winston = require('winston-cfg').winstonCfg();
  const pkg = require('read-pkg').sync();
  let [org, name] = pkg.name.replace(/@/, '').split('/');
  name = name || org;
  const log = winston.loggers.get(org);
  const program = require('commander').version(pkg.version);

  /* istanbul ignore next */
  process.on('unhandledRejection', error => {
    log.error('unhandledRejection', error.message);
    log.error(error.stack);
    process.exitCode = -1;
  });

  addCommand(program, config, log).then(
    async () => {
      program.parse(process.argv);
    },
    /* istanbul ignore next */
    err => {
      log.error(err.message, err);
      process.exitCode = -1;
    });
}
