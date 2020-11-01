const connection = require("./connections.js");

// * In the `orm.js` file, create the methods that will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.

const orm={
    selectAll: (table, cb)=>{
        connection.query(`SELECT * from ${table}`, (err, result)=>{
            if(err) throw err;
            cb(result);
        })
    }
}

// * `insertOne()`
// * `updateOne()`

// * Export the ORM object in `module.exports`.
module.exports=orm;
