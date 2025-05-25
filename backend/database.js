const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./tripplanner.db");

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS trips (id INTEGER PRIMARY KEY, destination TEXT, days INTEGER, budget TEXT)");
});

module.exports = db;