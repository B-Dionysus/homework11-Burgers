const orm=require("../config/orm.js");

// We get some data and a callback function from burger_controller.js, and we pass it, and the callback
// function, and any final data, to orm.js for the final leg of database processing
const burger={
    // For "all", which selects everything in the table, we just need to send it the name of the
    // table and a callback function, which will get the data orm.js returns
    all:cb=>orm.selectAll("burgers",data=>cb(data)),

    // For update, we need to send the id we're updating, the table name ("burgers"), which
    // column is getting updated, its new value, and the callback function, which will get the data 
    // orm.sj returns.
    update:(id, col, val, cb)=>{
        orm.update("burgers", col, val, id, data=>cb(data))
    },
    // Finally, for insert we need to send the name of the table, the name of the columns, the value for the new
    // name, the value for devoured (all burgers start undevoured, so this is "false") and a callback function.
    insert:(name, cb)=>{
        orm.insert("burgers", "burger_name", "devoured", name, false, data=>cb(data))
    }
};


module.exports=burger;