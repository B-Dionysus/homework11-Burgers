$("document").ready(init);
let _rep;
function init(){
    $(".devour").on("click",e=>{
        let id=$(e.currentTarget).data("id");
        $.post(`/api/devour/${id}`,result=>{
            if(result.success){
                let burgers=$("li");
                for(burg of burgers){
                    if($(burg).children().last().data("id")===id){
                        $("#right-ul").append($(burg));
                        $(burg).children().last().remove();
                    }
                }
            }
        })
    })

    $("#user-subs").on("submit",e=>{
        e.preventDefault();
        _rep=e;
        let newName=$(e.target).children("input").val();
        $(e.target).children("input")[0].value="";
        $.post("/api/addBurger/", newName,result=>{
            console.log(result);
        })
    })
}



