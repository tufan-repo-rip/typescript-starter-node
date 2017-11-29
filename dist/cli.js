"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require("inquirer");
const questions_1 = require("./questions");
const index_1 = require("./index");
exports.cmdName = 'cmd-name';
exports.addCommand = (program, config, log) => __awaiter(this, void 0, void 0, function* () {
    return program
        .command(`${exports.cmdName}`)
        .description(`a command with magical properties.`)
        .option('-f, --force', 'bypass interactive mode - auto-magic!')
        .action((opts) => __awaiter(this, void 0, void 0, function* () {
        const start = Date.now();
        const profiler = log.startTimer();
        const defaults = {};
        const answers = !!opts.force
            ? defaults
            : yield inquirer.prompt(questions_1.questions(defaults));
        const result = yield index_1.main(answers);
        log.info(`${exports.cmdName} - ${Date.now() - start}ms`);
    }));
});
if (require.main === module) {
    require('runtime-engine-check')();
    const config = require('config');
    const log = require('winston-cfg').winstonCfg();
    const pkg = require('read-pkg').sync();
    const program = require('commander').version(pkg.version);
    exports.addCommand(program, config, log).then(() => __awaiter(this, void 0, void 0, function* () {
        program.parse(process.argv);
    }), err => {
        log.error(err.message, err);
        process.exitCode = -1;
    });
}
