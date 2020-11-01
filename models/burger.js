const orm=require("../config/orm.js");


const burger={
    all:cb=>orm.selectAll("burgers",data=>cb(data))
    };


module.exports=burger;