const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')
const editBtns = document.querySelectorAll('span.edit');
const completedTasks = document.getElementById('completedTasks');  // Get the completed tasks element

Array.from(deleteBtn).forEach((el)=>{  
    el.addEventListener('click', deleteTodo)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

Array.from(editBtns).forEach((el) => { 
    el.addEventListener('click', editTodo); 
});

async function deleteTodo(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function editTodo() {
    const li = this.parentNode;
    const span = li.querySelector('span.not, span.completed'); 
    const oldText = span.innerText;

    const input = document.createElement('input');
    input.type = 'text';
    input.value = oldText;
    span.replaceWith(input);
    input.focus();

    const saveEdit = async () => {
        const newText = input.value.trim();
        if (newText && newText !== oldText) {
            try {
                const response = await fetch('todos/editTodo', {
                    method: 'put',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        todoIdFromJSFile: li.dataset.id,
                        newTodoText: newText
                    })
                });
                const data = await response.json();
                console.log(data);
                location.reload();
            } catch (err) {
                console.error(err);
            }
        } else {
            input.replaceWith(span);
        }
    };

    input.addEventListener('blur', saveEdit);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') saveEdit();
    });
}

// Update message when all todos are completed
function updateMessage(){
    const todos = document.querySelectorAll('span.not, span.completed');
    const completed = document.querySelectorAll('span.completed');
    const total = todos.length;
    const done = completed.length;
    
    if(done === total && total > 0){
        completedTasks.style.display = 'block';
    } else {
        completedTasks.style.display = 'none';
    }
}
updateMessage();