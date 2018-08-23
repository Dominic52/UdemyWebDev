//Toggles todo list elements
$("ul").on("click", "li", function(){
    $(this).toggleClass("completed");    
})

//Deleted list element on X click
$("ul").on("click", "span", function(event){
    $(this).parent().fadeOut(300,function(){
        $(this).remove();
    })
    event.stopPropagation();
})

//Adds new todo from input field
$("input[type='text']").keypress(function(event){
    if(event.which === 13){
        var todoText = $(this).val();
        $("ul").append("<li><span><i class='fas fa-trash-alt'></i> </span>" + todoText + "</li>")
        $(this).val("");
    }
})

//Toggles input field availability
$(".fa-plus").click(function(){
    $("input[type='text']").fadeToggle(300);
})