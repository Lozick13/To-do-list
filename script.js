let categoriesNow = 'all'
const doneTasks = []
const deleteTasks = []

// обновление
function updateTask() {
	const tasksListCollection = document.querySelectorAll('.task')
	for (let index = 1; index <= tasksListCollection.length; index++) {
		const doneBtn = document.querySelector('#done' + index)
		const deleteBtn = document.querySelector('#delete' + index)

		// выполнение
		doneBtn.addEventListener('click', () => {
			// вкладка удалённые
			if (categoriesNow === 'delete') {
				doneBtn.style.backgroundImage = "url('../images/checked.png')"
				deleteTasks.splice(
					deleteTasks.indexOf(tasksListCollection[index - 1]),
					1
				)
				tasksListCollection[index - 1].classList.remove('task_delete')
				tasksListCollection[index - 1].classList.add('task_active')
				categoriesUpdate()
				return
			}
			if (doneTasks.includes(tasksListCollection[index - 1])) {
				doneTasks.splice(doneTasks.indexOf(tasksListCollection[index - 1]), 1)
				tasksListCollection[index - 1].classList.remove('task_done')
				tasksListCollection[index - 1].classList.add('task_active')
			} else {
				tasksListCollection[index - 1].classList.remove('task_active')
				tasksListCollection[index - 1].classList.add('task_done')
				doneTasks.push(tasksListCollection[index - 1])
			}
			categoriesUpdate()
		})

		// удаление
		deleteBtn.addEventListener('click', () => {
			// вкладка удалённые
			if (categoriesNow === 'delete') {
				deleteTasks.splice(
					deleteTasks.indexOf(tasksListCollection[index - 1]),
					1
				)
				tasksListCollection[index - 1].parentNode.removeChild(
					tasksListCollection[index - 1]
				)
				countAllTask--
				for (let i = index; i <= countAllTask; i++) {
					const doneBtn = document.querySelector('#done' + (i + 1))
					const deleteBtn = document.querySelector('#delete' + (i + 1))
					doneBtn.id = 'done' + i
					deleteBtn.id = 'delete' + i
				}
				categoriesUpdate()
				return
			}
			if (deleteTasks.includes(tasksListCollection[index - 1])) {
				deleteTasks.splice(
					deleteTasks.indexOf(tasksListCollection[index - 1]),
					1
				)
				tasksListCollection[index - 1].classList.remove('task_delete')
				tasksListCollection[index - 1].classList.add('task_active')
			} else {
				tasksListCollection[index - 1].classList.remove('task_active')
				tasksListCollection[index - 1].classList.remove('task_done')
				tasksListCollection[index - 1].classList.add('task_delete')
				deleteTasks.push(tasksListCollection[index - 1])
			}
			categoriesUpdate()
		})
	}
}

const addTaskOpen = document.querySelector('#add-task-open')
const addTaskForm = document.querySelector('.add-task__block')
const addTask = document.querySelector('#add-task')
const tasksList = document.querySelector('.tasks')
if (localStorage.getItem('tasks', tasksList) !== null)
	tasksList.innerHTML = localStorage.getItem('tasks', tasksList).slice(19, -6)
updateTask()

const tasksListCollection = document.querySelectorAll('.task')
console.log(tasksListCollection)
let countAllTask = tasksListCollection.length
// добавление
addTaskOpen.addEventListener('click', () => {
	if (addTaskForm.className.includes('active-form')) {
		addTaskForm.classList.remove('active-form')
		addTaskForm.classList.add('disable-form')
	} else {
		addTaskForm.classList.remove('disable-form')
		addTaskForm.classList.add('active-form')
	}
})
addTask.addEventListener('click', event => {
	countAllTask++
	const taskHeader = document.querySelector('#task-header')
	const taskMark = document.querySelector('#task-mark')
	const taskDate = document.querySelector('#task-date')

	const taskTemplate =
		'<article class="task task_active"><div class="task__information"><span class="header-text task__header">' +
		taskHeader.value +
		'</span><div class="task__line"><span class="text mark">' +
		taskMark.value +
		'</span><div class="deadline"><img class="deadline__image"src="images/calendar.svg"alt="calendar"/><span class="deadline__time text">' +
		taskDate.value +
		'</span></div></div></div><div class="task__buttons"><button id="done' +
		countAllTask +
		'" class="task__button done"></button><button id="delete' +
		countAllTask +
		'"  class="task__button delete"></button></div></article>'

	taskHeader.value = ''
	taskMark.value = ''
	taskDate.value = ''
	tasksList.innerHTML += taskTemplate
	addTaskForm.classList.remove('active-form')
	addTaskForm.classList.add('disable-form')

	categoriesUpdate()
	updateTask()
	event.preventDefault()
})

const allNavBtn = document.querySelector('#nav-all')
const activeNavBtn = document.querySelector('#nav-active')
const doneNavBtn = document.querySelector('#nav-done')
const deleteNavBtn = document.querySelector('#nav-delete')

// вкладки
function categoriesUpdate() {
	const tasksList = document.querySelector('.tasks').outerHTML
	localStorage.setItem('tasks', tasksList)
	const tasksListCollection = document.querySelectorAll('.task')
	const activeNowNavBtn = document.querySelector('.categories__item_selected')
	activeNowNavBtn.classList.remove('categories__item_selected')

	tasksListCollection.forEach(task => {
		task.classList.remove('active-task')
		task.classList.add('disable-task')
		setTimeout(() => {
			task.style.display = 'none'
		}, 500)
	})

	if (categoriesNow === 'all') {
		allNavBtn.classList.add('categories__item_selected')
		tasksListCollection.forEach(task => {
			if (
				task.className.includes('task_done') ||
				task.className.includes('task_active')
			) {
				task.classList.remove('disable-task')
				task.classList.add('active-task')
				setTimeout(() => {
					task.style.display = 'flex'
				}, 500)
			}
		})
	} else if (categoriesNow === 'active') {
		activeNavBtn.classList.add('categories__item_selected')

		tasksListCollection.forEach(task => {
			if (task.className.includes('task_active')) {
				task.classList.remove('disable-task')
				task.classList.add('active-task')
				setTimeout(() => {
					task.style.display = 'flex'
				}, 500)
			}
		})
	} else if (categoriesNow === 'done') {
		doneNavBtn.classList.add('categories__item_selected')

		tasksListCollection.forEach(task => {
			if (task.className.includes('task_done')) {
				task.classList.remove('disable-task')
				task.classList.add('active-task')
				setTimeout(() => {
					task.style.display = 'flex'
				}, 500)
			}
		})
	} else if (categoriesNow === 'delete') {
		deleteNavBtn.classList.add('categories__item_selected')
		for (let index = 0; index < tasksListCollection.length; index++) {
			const task = tasksListCollection[index]

			if (task.className.includes('task_delete')) {
				const doneBtn = document.querySelector('#done' + (index + 1))
				doneBtn.style.backgroundImage = "url('../images/recovery.png')"
				task.classList.remove('disable-task')
				task.classList.add('active-task')
				setTimeout(() => {
					task.style.display = 'flex'
				}, 500)
			}
		}
	}
}
allNavBtn.addEventListener('click', () => {
	categoriesNow = 'all'
	categoriesUpdate()
})
activeNavBtn.addEventListener('click', () => {
	categoriesNow = 'active'
	categoriesUpdate()
})
doneNavBtn.addEventListener('click', () => {
	categoriesNow = 'done'
	categoriesUpdate()
})
deleteNavBtn.addEventListener('click', () => {
	categoriesNow = 'delete'
	categoriesUpdate()
})
categoriesUpdate()
