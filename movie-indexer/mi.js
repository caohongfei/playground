#!/usr/bin/env node

// Check environment
if (!process.env.MI_DB) {
    console.log('MI_DB should be configured as the path to a JSON file')
    process.exit(0)
}

console.log('Using database:', process.env.MI_DB)

const mapper = {
    'scan': fn_scan,
    'remove': fn_remove,
    'ls': fn_list,
    's': fn_search,
    '?': fn_help,
    'q': fn_quit
}

loadDB(function(json) {
    const co = require('co')
    const prompt = require('co-prompt')
    const minimist = require('minimist')
    const argsplit = require('argsplit')

    function readCommand() {
        co(function* () {
            return yield prompt('mi> ')
        }).then(function(command) {
            let commandParams = minimist(argsplit(command))['_']
            let commandName = commandParams.shift()
            let fn = mapper[commandName] // the first param is the command name
            if (fn) {
                let promise = fn(json, commandParams)
                if (promise) {
                    promise.then(readCommand, readCommand)
                }
                else {
                    readCommand()
                }
            }
            else {
                console.log('Unrecognized command:', commandName ? commandName : 'EMPTY')
                readCommand()
            }
        })
    }

    readCommand()
})

function loadDB(callback) {
    require('load-json-file')(process.env.MI_DB)
        .then(json => {
            // Check whether DB is valid
            if (!json['directories']) {
                console.log('Invalid DB file')
                process.exit(0)
            }
            callback(json)
        })
        .catch(err => {
            if (err.errno === -2) {
                // db file not found, just create one
                let json = {'directories': []}
                saveDB(json)
                console.log('A new DB is created')
                callback(json)
            } else {
                console.log(err)
                process.exit(0)
            }
        })
}

function saveDB(json) {
    require('write-json-file')(process.env.MI_DB, json)
}

function printDBTitle(db) {
    for (let i = 0; i < db.length; i++) {
        printRow(i, db)
    }
    if (db.length === 0) {
        console.log('EMPTY LIST')
    }
}

function printRow(i, db) {
    console.log('%s: %s', (i + 1) < 10 ? ' ' + (i + 1) : i + 1, db[i].name)
}


function fn_quit() {
    process.exit(0)
}

function fn_help() {
    console.log('')
    console.log('Commands:')
    console.log('')
    console.log('scan dirname | dirindex        scan a directory and save its structure into the library')
    console.log('remove dirindex                remove a directory\'s structure from the library')
    console.log('ls [dirindex]                  list directory structure')
    console.log('s keyword [keyword...]         search words in the library')
    console.log('')
}

function fn_scan(json, params) {
    if (params.length !== 1) {
        console.log('Invalid path to scan')
        return
    }

    const db = json['directories']
    const walk = require('walkdir')
    const path = require('path')

    const index = +params[0]
    let resolvedDirName
    if (!isNaN(index) && index >= 1 && index <= db.length) {
        resolvedDirName = db[index - 1].name
    }
    else {
        // remove quotes if necessary
        const p0 = /^'.+'$/.test(params[0]) ? params[0].substr(1, params[0].length - 2) : params[0]
        resolvedDirName = path.format(path.parse(path.resolve(p0)))
    }

// contents of a store
//  {
//      name: 'x'
//      includes: {
//          dirfilename: {
//              isDirectory: true/false,
//              includes: {...},
//              statistics: stat
//          }
//      }
//  }

    const store = {}
    store.name = resolvedDirName
    store.includes = {}

    return new Promise(function(resolve, reject) {
        let hasError = false
        walk(resolvedDirName, function(pathCursor, stat) {
            if (path.basename(pathCursor).indexOf('._') === 0 || path.basename(pathCursor) === '.DS_Store') {
                // ignore ._ files and .DS_Store
                return
            }
            let realPath = pathCursor.substr(resolvedDirName.length + 1)    // +1 means to remove the trailing \, since resolvedDirName has no \
            let pathSegments = realPath.split(path.sep)
            let currentHolder = store
            for (let i = 0; i < pathSegments.length; i++) {
                let segment = pathSegments[i]
                if (!currentHolder.includes[segment]) {
                    currentHolder.includes[segment] = {
                        isDirectory: i !== pathSegments.length - 1 || stat.isDirectory(),
                        includes: {}
                    }
                }
                currentHolder = currentHolder.includes[segment]
                if (i === pathSegments.length - 1) {
                    currentHolder.statistics = {
                        size: stat.size,
                        atime: stat.atime,
                        mtime: stat.mtime,
                        ctime: stat.ctime,
                        birthtime: stat.birthtime
                    }
                    currentHolder.path = realPath
                }
            }
        }).on('error', function(err) {
            console.log('Invalid directory', err)
            hasError = true
        }).on('end', function() {
            // 'end' event triggered even the directory is invalid
            if (hasError) {
                reject()
                return
            }
            let found = false
            for (let i = 0; i < db.length; i++) {
                if (db[i].name === store.name) {
                    db[i] = store
                    found = true
                    break
                }
            }
            if (!found) {
                db.push(store)
                db.sort((a, b) => {
                    return a.name.localeCompare(b.name)
                })
            }
            saveDB(json)
            console.log('Completed - ' + resolvedDirName)
            resolve()
        })
    })
}

function fn_list(json, params) {
    const db = json['directories']

    let index = +params[0]

    if (Object.is(index, NaN)) {
        index = -1
    }

    if (index < 0) {
        printDBTitle(db)
    } else {
        if (index < 1 || index > db.length) {
            console.log('Invalid index range')
            return
        }
        printRow(index - 1, db)
        let keys = Object.keys(db[index - 1].includes)
        keys.sort((a, b) => a.localeCompare(b))
        keys.forEach(key => console.log('    ' + key))
    }
}

function fn_remove(json, params) {
    const db = json['directories']

    let index = +params[0]

    if (Object.is(index, NaN)) {
        console.log('Invalid index')
        return
    }

    if (index < 1 || index > db.length) {
        console.log('Invalid index range')
        return
    }

    db.splice(index - 1, 1)
    saveDB(json)
    console.log('Completed')

    printDBTitle(db)
}

function traverseOrderly(object, callback) {
    var array = Object.keys(object)
    array.sort((a, b) => {
        return a.localeCompare(b)
    })
    for (var i = 0; i < array.length; i++) {
        callback(array[i], object[array[i]])
    }
}

/**
 *
 * @param db
 * @param index -1 means traverse whole db
 * @param callback take two arguments: fileName, fileInfo
 */
function traverse(db, index, callback) {
    function search(includes) {
        traverseOrderly(includes, function(fileName, fileInfo) {
            callback(fileName, fileInfo)
            if (fileInfo.includes) {
                search(fileInfo.includes)
            }
        })
    }

    if (index === -1) {
        for (let i = 0; i < db.length; i++) {
            search(db[i].includes)
        }
    } else if (index >= 0 && index < db.length) {
        search(db[index].includes)
    }
}

function fn_search(json, params) {
    if (params.length === 0) {
        console.log('You must specify something to search')
        return
    }

    const db = json['directories']

    if (db.length === 0) {
        console.log('NONE')
        return
    }

    const toFindDuplicates = (params[0] === 'XYZ')
    const numeral = require('numeral')

    // search duplicated files
    function findDuplicates() {
        let sizeToFileName = {}
        let found = false
        const threshold = isNaN(+params[1]) ? 100000000 : +params[1]
        traverse(db, -1, function(fileName, fileInfo) {
            if (!fileInfo.isDirectory && fileInfo.statistics.size >= threshold) {
                if (sizeToFileName[fileInfo.statistics.size]) {
                    console.log('Size: ' + numeral(fileInfo.statistics.size).format('0,0'))
                    console.log('    ' + sizeToFileName[fileInfo.statistics.size])
                    console.log('    ' + fileInfo.path)
                    found = true
                }
                else {
                    sizeToFileName[fileInfo.statistics.size] = fileInfo.path
                }
            }
        })
        if (!found) {
            console.log('Nothing found for threshold ' + numeral(threshold).format('0,0'))
        }
    }

    function searchPhrases() {
        const terms = params.map(s => s.toLowerCase())

        for (let i = 0; i < db.length; i++) {
            let results = []
            traverse(db, i, function(fileName, fileInfo) {
                if (terms.every(term => {
                        return fileName.toLowerCase().indexOf(term) >= 0
                    })) {
                    let line = '    ' + fileInfo.path
                    if (!fileInfo.isDirectory) {
                        line += ' (' + numeral(fileInfo.statistics.size).format('0,0') + ')'
                    }
                    results.push(line)
                }
            })
            if (results.length > 0) {
                printRow(i, db)
                results.forEach(line => console.log(line))
            }
        }
    }

    if (!toFindDuplicates) {
        searchPhrases()
    } else {
        findDuplicates()
    }
}