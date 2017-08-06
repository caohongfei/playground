const shared = require("./shared.js")

shared.checkDBFileEnv();

require('load-json-file')(process.env.MI_DB)
    .then(db => {
        shared.checkDBFile(db)

        if (db.length === 0) {
            console.log("None")
        }

        shared.printDB(db)
    })
    .catch(err => {
        console.log(err)
    })
