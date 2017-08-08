#!/usr/bin/env node

// var program = require('commander')
//
// program
//     .command('scan <dirname|dirindex>',
//         'scan a directory and save its structure into the library')
//     .command('remove <dirindex>',
//         'remove a directory\'s structure from the library')
//     .command('list [dirindex...]', 'list directory structure')
//     .command('search <keyword> [keyword...]', 'search words in the library')
//     .parse(process.argv)


var co = require('co');
var prompt = require('co-prompt');

co(function *() {
    var username = yield prompt('username: ');
    var password = yield prompt.password('password: ');
    console.log('user: %s pass: %s', username, password);
});