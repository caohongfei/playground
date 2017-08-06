if (process.argv.length <= 2) {
    console.log('You must specify something to search')
    process.exit(0)
}

const toFindDuplicates = (process.argv[2] === 'XYZ')

// search duplicated files
function findDuplicates(db) {
    let sizeToFileName = {}
    let found = false
    let threshold = 1000000
    function search(includes) {
        Object.keys(includes).forEach(key => {
            let content = includes[key]
            if (content.statistics.size < threshold) {
                return
            }
            if (!content.isDirectory) {
                if (sizeToFileName[content.statistics.size]) {
                    console.log('Size: ' + numeral(content.statistics.size).format('0,0'))
                    console.log('    ' + sizeToFileName[content.statistics.size])
                    console.log('    ' + content.path)
                    found = true
                }
                else {
                    sizeToFileName[content.statistics.size] = content.path
                }
            }
            else {
                search(content.includes)
            }
        })
    }
    for (let i = 0; i < db.length; i++) {
        search(db[i].includes)
    }
    if (!found) {
        console.log('Nothing found for threshold ' + numeral(threshold).format('0,0'))
    }
    process.exit(0)
}

// search phrases are from index 2 and on
const terms = process.argv.slice(2).map(s => s.toLowerCase())
const numeral = require('numeral')

const shared = require('./shared.js')

shared.checkDBFileEnv();

function searchOneIncludes(includes, results) {
    let keys = Object.keys(includes)
    keys.sort((a, b) => {
        return a.localeCompare(b)
    })
    keys.forEach(key => {
        let content = includes[key]
        if (terms.every(term => {
            return key.toLowerCase().indexOf(term) >= 0
            })) {
            let line = '    ' + content.path
            if (!content.isDirectory) {
                line += ' (' + numeral(content.statistics.size).format('0,0') + ')'
            }
            results.push(line)
        }
        else {
            if (content.isDirectory) {
                searchOneIncludes(content.includes, results)
            }
        }
    })
}

require('load-json-file')(process.env.MI_DB)
    .then(db => {
        shared.checkDBFile(db)

        if (db.length === 0) {
            console.log('None')
        }
        if (!toFindDuplicates) {
            for (let i = 0; i < db.length; i++) {
                let results = []
                searchOneIncludes(db[i].includes, results)
                if (results.length > 0) {
                    shared.print(i, db)
                    results.forEach(line => console.log(line))
                }
            }
        } else {
            findDuplicates(db)
        }
    })
    .catch(err => {
        console.log(err)
    })
