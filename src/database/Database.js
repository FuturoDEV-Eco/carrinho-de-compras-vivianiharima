const {Pool} = require('pg')


class Database {
    constructor() {
        this.database = new Pool({
        host: 'localhost',
        port:5432,
        user: 'postgres',
        password: 'Hatsuryuu#1',
        database: 'lab_commerce'
        });
    }
}

module.exports = Database;
