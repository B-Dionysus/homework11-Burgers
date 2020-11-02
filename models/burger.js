const orm=require("../config/orm.js");


const burger={
    all:cb=>orm.selectAll("burgers",data=>cb(data)),

    update:(id, col, val, cb)=>{
        orm.update("burgers", col, val, id, data=>cb(data))
    }

};


module.exports=burger;