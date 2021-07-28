const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')

//localStorageからget
const todos = JSON.parse(localStorage.getItem('todos'))

if(todos) {
  todos.forEach(todo => addTodo(todo))
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  addTodo()
})

function addTodo(todo)
{
   let todoText = input.value

   if(todo) {
     todoText = todo.text
   }

    if(todoText) {
      const todoEl = document.createElement('li')
      if (todo && todo.completed) {
        todoEl.classList.add('completed')
      }
      todoEl.innerHTML = todoText
      //ひだりクリックならcompletedクラスをtoggle
      todoEl.addEventListener('click' , () => {todoEl.classList.toggle('completed')
      updateLS()
    })

      //右クリックの場合はremove
      todoEl.addEventListener('contextmenu' , (e) => {
        e.preventDefault()
        todoEl.remove() 
        updateLS()
      })
      todosUL.appendChild(todoEl)

      input.value = ''
      updateLS()
    }
}

function updateLS() {
  todosEl = document.querySelectorAll('li')

  const todos = []

  todosEl.forEach(todoEl => {
     todos.push({
       text: todoEl.innerText,
       //completedを含むかどうか判定
       completed: todoEl.classList.contains('completed')
     })
  })
  //文字列に変更
 localStorage.setItem('todos', JSON.stringify(todos))
}