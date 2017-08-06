const shared = require("./shared.js")

shared.checkDBFileEnv();

let index = +process.argv[2]

if (Object.is(index, NaN)) {
    index = -1
}

require('load-json-file')(process.env.MI_DB)
    .then(db => {
        shared.checkDBFile(db)

        if (db.length === 0) {
            console.log("None")
        }

        if (index < 0) {
            shared.printDB(db)
        } else {
            if (index < 1 || index > db.length) {
                console.log("Invalid index range")
                process.exit(0)
            }
            let storeToPrint = db[index - 1]
            console.log(storeToPrint.name)
            let keys = Object.keys(storeToPrint.includes)
            keys.sort((a, b) => a.localeCompare(b))
            keys.forEach(key => console.log("    " + key))
        }
    })
    .catch(err => {
        console.log(err)
    })
