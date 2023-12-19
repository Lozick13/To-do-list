const tasksList = document.querySelector('.tasks')
if (localStorage.getItem('tasks', tasksList) !== null)
	tasksList.innerHTML = localStorage.getItem('tasks', tasksList).slice(19, -6)

	
let categoriesNow = 'all'
const doneTasks = []
const deleteTasks = []
const addTaskForm = document.querySelector('.add-task__block')
const addTask = document.querySelector('#add-task')
const addTaskOpen = document.querySelector('#add-task-open')

let countAllTask = document.querySelectorAll('.task').length
updateTask()
const allNavBtn = document.querySelector('#nav-all')
allNavBtn.addEventListener('click', () => {
	categoriesNow = 'all'
	categoriesUpdate()
})
const activeNavBtn = document.querySelector('#nav-active')
activeNavBtn.addEventListener('click', () => {
	categoriesNow = 'active'
	categoriesUpdate()
})
const doneNavBtn = document.querySelector('#nav-done')
doneNavBtn.addEventListener('click', () => {
	categoriesNow = 'done'
	categoriesUpdate()
})
const deleteNavBtn = document.querySelector('#nav-delete')
deleteNavBtn.addEventListener('click', () => {
	categoriesNow = 'delete'
	categoriesUpdate()
})
categoriesUpdate()
