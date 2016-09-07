#!/usr/bin/env node
var program = require('commander')
var remapper = require('remap-istanbul')
var cli = require('shelljs-nodecli')
var path = require('path')

program
  .option('-i, --input <dir>', 'Location of istanbul coverage metrics', './coverage/coverage.json')
  .option('-o, --output <dir>', 'Location of remapped coverage metrics', './coverage/typescript')
  .option('-x, --exclude <pattern>', 'file patterns to exclude from remapping and reporting')
  .parse(process.argv)


// load the coverage metrics from istanbul run
var cov = remapper.loadCoverage(program.input)
// use source-maps to remap the coverage metrics to typescript
var collector = remapper.remap(cov, {
  exclude: program.exclude || null
})
// generate an jsonhtml report
var json_ofile = path.join(program.output, 'coverage.json')
remapper
  .writeReport(collector, 'html', {}, program.output)
  .then(function() {
    remapper
      .writeReport(collector, 'json', {}, json_ofile)
      .then(function() {
        console.log('Converting (remapping) coverage reports from JavaScript -> TypeScript\n')
        process.stdout.write('================================== TypeScript ==================================')
        remapper
          .writeReport(collector, 'text-summary')
          .then(function(){
            process.stdout.write('\n')
            console.log('=============================================================================')
            cli.exec('istanbul',
              'check-coverage',
              json_ofile,
              function(code, output) {
                var o = path.resolve(path.join(program.output, 'index.html'))
                console.log('TypeScript coverage report [' + o + ']')
                console.log('=============================================================================')
                console.log('\n')
                process.exit(code)
              }
            )
          })
      })
  })

