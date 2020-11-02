$("document").ready(init);

function init(){
    // Add clickEvents to every Devour button
    setUpButtons();

    // When the user submits something
    $("#user-subs").on("submit",e=>{
        e.preventDefault();      

        let newName=$(e.target).children("input").val();
        // Make sure they didn't hit submit on accident
        if(newName.length===0) {
            return;
        }
        // Clean up the input area so they can submit again
        $(e.target).children("input")[0].value="";

        // If the user suggested a burger name that starts with "The", we remove it.
        // Unless they just wanted their burger to be called "The The". In which case,
        // I'll allow it.
        if(newName.split(" ")[0].toLowerCase()==="the" && newName.split(" ")[1]) {
            newName=removeTheT(newName);
        }
        // Make sure the we're getting "The Good Burger" and not "The good burger"
        newName=titleCase(newName);
        // Now that we have the new name just the way we want it, make it into an object with the key of "name", and
        // send POST it 
        $.post("/api/addBurger/", {name:newName},result=>{
            if(result.success){
                //  Success means that it was added ot the database. It will be there when we reload the page,
                // but instead of doing that we can just add it right now. First the button:
                let newButton=$("<button>").addClass("devour");
                newButton.html("Devour")
                newButton.attr("data-id",result.id)
                // And the the list element with our new name
                let newBurger=($("<li>").text("The "+result.val1.trim())).append(newButton);
                $("#left-ul").append(newBurger);

                // Finally, we need to make sure that our new button has the click event associated with it
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

// Set up a click event for every button with the "devour" class
function setUpButtons(){
    $(".devour").on("click",e=>{
        let id=$(e.currentTarget).data("id");
        $.post(`/api/devour/${id}`,result=>{
            // A result of "success" means that the burger as been devoured. Instead of reloading the
            // page, we can just move it to the appropriate place right now.
            if(result.success){
                let burgers=$("li");
                for(burg of burgers){
                    // We have to traverse our list of burgers until we find the right one. The id is buried
                    // in the button tag, though, so we have to traverse the element until we find the id
                    if($(burg).children().last().data("id")===id){
                        // If we've got it, we stick it on the right side and remove the button!
                        $("#right-ul").append($(burg));
                        $(burg).children().last().remove();
                    }
                }
            }
        })
    })
}