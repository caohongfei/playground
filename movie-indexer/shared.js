module.exports = {
    checkDBFileEnv: function() {
        if (!process.env.MI_DB) {
            console.log('MI_DB should be configured as the path to a JSON file')
            process.exit(0)
        }
        console.log("Using database:", process.env.MI_DB)
    },
    checkDBFile: function(db) {
        if (!typeof db.splice === "function") {
            console.log("Invalid DB file")
            process.exit(0)
        }
    },
    printDB: function(db) {
        for (let i = 0; i < db.length; i++) {
            this.print(i, db)
        }
    },
    print: function(i, db) {
        console.log("%s: %s", (i + 1) < 10 ? " " + (i + 1) : i + 1, db[i].name)
    }
}