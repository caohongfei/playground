if (process.argv.length !== 3) {
    console.log('A directory index must be specified')
    process.exit(0)
}

const index = +process.argv[2]

if (Object.is(index, NaN)) {
    console.log("Invalid index")
    process.exit(0)
}

const shared = require("./shared.js")

shared.checkDBFileEnv();

require('load-json-file')(process.env.MI_DB)
    .then(db => {
        shared.checkDBFile(db)

        if (index < 1 || index > db.length) {
            console.log("Invalid index range")
            process.exit(0)
        }

        db.splice(index - 1, 1)
        require("write-json-file")(process.env.MI_DB, db)
        console.log("Completed")

        shared.printDB(db)
    })
    .catch(err => {
        console.log(err)
    })
