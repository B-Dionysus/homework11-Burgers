$("document").ready(init);
let _rep;
function init(){
    setUpButtons();

    $("#user-subs").on("submit",e=>{
        e.preventDefault();
        _rep=e;
        let newName=$(e.target).children("input").val();
        $(e.target).children("input")[0].value="";

        // If the user suggested a burger name that starts with "The", we remove it.
        // Unless they just wanted their burger to be called "The The". In which case,
        // I'll allow it.
        if(newName.split(" ")[0].toLowerCase()==="the" && newName.split(" ")[1]) {
            newName=removeTheT(newName);
        }
        // Make sure the we're getting "The Good Burger" and not "The good burger"
        newName=titleCase(newName);
        $.post("/api/addBurger/", {name:newName},result=>{
            if(result.success){
                console.log("ID:"+result.id);
                let newButton=$("<button>").addClass("devour");
                newButton.html("Devour")
                newButton.attr("data-id",result.id)
                let newBurger=($("<li>").text("The "+result.val1.trim())).append(newButton);
                $("#left-ul").append(newBurger);
//                $("#left-ul").append(newButton);
                setUpButtons();
            }
        })
    })
}
// Our burger menu lists all of the burgers as "The Classic" and "The Hawaiian," so the user might be
// tempted to call their own suggestion something like "The New Burger". THEY MUST NOT! We add those
// "The"s on our own, and we do it just right. If they tried to do it themself, they would mess it all
// up, and we'd be displaying "The The New Burger" and it would just be awful.
function removeTheT(name){
    n=name.split(" ");
    n.shift();
    return(n.join(" "));
}

// Some users are so pressed for time that they haven't a spare second to properly capitalize
// their burger suggestions. Fortunately, the robots can do this task in an instant!
function titleCase(n){
    n=n.split(" ");
    let final=[];
    for(l of n){
        a=l.slice(0,1).toUpperCase();
        b=l.slice(1,l.length);
        final.push((a+b));
    }
    return(final.join(" "));
}


function setUpButtons(){
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
}