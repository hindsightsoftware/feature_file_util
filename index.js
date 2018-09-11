#!/usr/bin/env node
var feature_gen = require('./feature_generator')
var program = require('commander')


program
  .option('-n, --number <number>', 'The number of feature files to generate')
  .option('-d, --directory <directory>', 'The directory the sub-directory feature_files will be created under')
  .action(function() {
    feature_gen.generate(program.number, program.directory)
  })
  .parse(process.argv)
