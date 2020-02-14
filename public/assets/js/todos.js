// check off specific todos by clicking
$("ul").on("click", "li", function() {
    $(this).toggleClass("completed");
    const id = $(this).attr('data-id');
    // updateTodo(id);
});

// click on X to delete todo
$("ul").on("click", "span", function(event) {
    const id = $(this).attr('data-id');
    console.log(id);
    $(this).parent().fadeOut(500, function(){
        $(this).remove();
    });
    event.stopPropagation();
    deleteTodo(id);
});

// add new todo
$("input[type='text']").keypress(function(event) {
    if(event.which === 13){
        // grabs new todo from input
        var todoText = $(this).val();
        $(this).val("");
        // create new li and add to ul  
        createTodo(todoText);
    }
});

function renderTodo(data) {
    for (var i = 0; i < data.length; i++) {
        var todoText = data[i].message;
        var todoId = data[i]._id;
        // create new li and add to ul
        $("ul").append(`<li data-id=${todoId}><span data-id=${todoId}><i class='fas fa-trash-alt'></i></span>${todoText}</li>`);
    }
}

$(".fa-plus").click(function(){
	$("input[type='text']").fadeToggle();
});

// db calls
function getTodos(err) {
    $.ajax("/todos", {
        type: "GET",
        dataType: 'json',
        success: function(response) {
            renderTodo(response);
        }
    })
    if (err) console.log(err);
}

function createTodo(toDo, err) {
    var newTodo = {
        message: toDo
    };

    $.ajax("/todo", {
        type: "POST",
        data: newTodo
    }).then(
        function(response) {
            renderTodo(response);
            location.reload();
        }
    );
}

function deleteTodo(id) {
    $.ajax("todo/" + id, {
        type: "DELETE"
    }).then(
        function() {
            console.log("Deleted todo with id: ", id);
            location.reload();
        }
    );
};

// function updateTodo(id) {
//     $.ajax("update/" + id, {
//         type: "POST"
//     }).then(
//         function() {
//             console.log("Updated todo with id: ", id);
//             location.reload();
//         }
//     );
// }

function init() {
    getTodos();
}

init();