if (process.argv.length <= 2) {
    console.log('You must specify something to search')
    process.exit(0)
}

// search phrases are from index 2 and on
const terms = process.argv.slice(2).map(s => s.toLowerCase())

const shared = require("./shared.js")

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
            results.push('    ' + content.path)
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
            console.log("None")
        }
        for (let i = 0; i < db.length; i++) {
            let results = []
            searchOneIncludes(db[i].includes, results)
            if (results.length > 0) {
                shared.print(i, db)
                results.forEach(line => console.log(line))
            }
        }
    })
    .catch(err => {
        console.log(err)
    })
