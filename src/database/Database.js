const { Pool } = require('pg');

class Database {
    constructor() {
        this.database = new Pool({
            host: 'localhost',
            port: 5432,
            user: 'postgres',
            password: '123456',
            database: 'lab_commerce'
        });
    }
}

module.exports = Database;
