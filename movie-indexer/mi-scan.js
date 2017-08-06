if (process.argv.length !== 3) {
    console.log('A directory must be specified')
    process.exit(0)
}

const shared = require("./shared.js")

shared.checkDBFileEnv();

const walk = require('walkdir')
const path = require('path')

const resolvedDirName = path.format(path.parse(path.resolve(process.argv[2])))

// contents of a store
//  {
//      name: "x"
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

walk(resolvedDirName, function(pathCursor, stat) {
    if (path.basename(pathCursor).indexOf("._") === 0 || path.basename(pathCursor) === ".DS_Store") {
        // ignore ._ files and .DS_Store
        return
    }
    let realPath = pathCursor.substr(resolvedDirName.length + 1)    // +1 means the trailing \
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
}).on('end', function() {
    require('load-json-file')(process.env.MI_DB)
        .then(db => {
            shared.checkDBFile(db)

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
            require("write-json-file")(process.env.MI_DB, db)
            console.log("Completed")
        })
        .catch(err => {
            if (err.errno === -2) {
                // db file not found, just create one
                require('write-json-file')(process.env.MI_DB, [store])
            } else {
                console.log(err)
            }
        })
})