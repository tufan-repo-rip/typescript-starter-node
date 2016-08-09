#!/usr/bin/env node
var program = require('commander')
var remapper = require('remap-istanbul')
var cli = require('shelljs-nodecli')
var path = require('path')

program
  .option('-i, --input <dir>', 'Location of istanbul coverage metrics', './coverage/coverage.json')
  .option('-o, --output <dir>', 'Location of remapped coverage metrics', './coverage/typescript')
  .option('-s, --statements <number>', 'statement coverage threshold', 90)
  .option('-b, --branches <number>', 'branch coverage threshold', 90)
  .option('-f, --functions <number>', 'function coverage threshold', 90)
  .option('-l, --lines <number>', 'line coverage threshold', 90)
  .parse(process.argv)


// load the coverage metrics from istanbul run
var cov = remapper.loadCoverage(program.input)
// use source-maps to remap the coverage metrics to typescript
var collector = remapper.remap(cov)
// generate an jsonhtml report
var json_ofile = path.join(program.output, 'coverage.json')
remapper
  .writeReport(collector, 'html', {}, program.output)
  .then(function() {
    console.log('> Generated typescript remapped  html-report to ' + program.output)
    remapper
      .writeReport(collector, 'json', {}, json_ofile)
      .then(function() {
        console.log('> checking coverage of typescript source')
        cli.exec('istanbul',
          'check-coverage',
          '--statements ' + program.statements,
          '--branches ' + program.branches,
          '--functions ' + program.functions,
          '--lines ' + program.lines,
          json_ofile
         )
      })
  })

