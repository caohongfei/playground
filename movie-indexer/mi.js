#!/usr/bin/env node

var program = require('commander')

program
    .command('scan <dirname>',
        'scan a directory and save its structure in a JSON file')
    .command('remove <dirindex>',
        'remove a directory\'s structure from JSON file')
    .command('list', 'list all saved directories')
    .command('search <keywords>', 'search in JSON file')
    .parse(process.argv)