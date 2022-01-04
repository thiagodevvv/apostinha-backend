const mysql = require('mysql');


async function connect() {

    if(global.connection && global.connection !== 'disconnected') 
        return global.connection

    try {
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '12345',
            database: 'apostinha',
            port: 3306
        })
        console.log('Database connect!')
        global.connection = conn
        return conn;

    }catch(err) {
        console.log(err)
    }
}

connect()

module.exports = {}