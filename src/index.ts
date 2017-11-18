
import * as engchk from 'runtime-engine-check';
engchk(); // checks node version matches spec in package.json

import * as config from 'config';
import { winstonCfg } from 'winston-cfg';
const log = winstonCfg();

// console.log(config.get('winston'));

export function main() {}
