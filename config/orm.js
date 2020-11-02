const connection = require("./connections.js");

// Orm.js is completely project agnostic, and receives all of the data from the model (burger.js, in this case).
// After it gets a response from the database it puts call the callback function, returning the data
const orm={
    // For select all, we are returning an array of all of the data from every row in whatever table was requested
    selectAll: (table, cb)=>{
        connection.query(`SELECT * from ${table}`, (err, result)=>{
            if(err) throw err;
            cb(result);
        })
    },
    // For updated, we are returning an object with a key of "success" and a value of "true", unless there's
    // an error
    update:(table, col, val, id, cb)=>{
        let query="UPDATE ?? set ??=? where id=?";
        connection.query(query, [table, col, val, id], (err, results)=>{
            if(err) throw err;
            else cb({success:true});
        })
    },
    // And for insert, we're returning all of the same values that were passed to us, as well as
    // success:true and the new object's id.
    insert:(table, col1, col2, val1, val2, cb)=>{
        let query="INSERT into ?? (??, ??) VALUES(?, ?)"
        connection.query(query, [table, col1, col2, val1, val2], (err, results)=>{
            if(err) throw err;
            else {
                cb({success: true, id:results.insertId, col1:col1, col2:col2, val1:val1, val2:val2});}
        })

    }
}
module.exports=orm;
