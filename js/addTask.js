addTaskOpen.addEventListener('click', () => {
	if (addTaskForm.className.includes('active-form')) {
		addTaskForm.classList.remove('active-form')
		addTaskForm.classList.add('disable-form')
		addTaskForm.style.display = 'flex'
		setTimeout(() => {
			addTaskForm.style.display = 'none'
		}, 500)
		
	} else {
		addTaskForm.classList.remove('disable-form')
		addTaskForm.classList.add('active-form')
		addTaskForm.style.display = 'flex'
	}
})
addTask.addEventListener('click', event => {
	const taskHeader = document.querySelector('#task-header')
	if (taskHeader.value === '') return
	const taskMark = document.querySelector('#task-mark')
	const taskDate = document.querySelector('#task-date')
	countAllTask++

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
	addTaskForm.style.display = 'flex'
	setTimeout(() => {
		addTaskForm.style.display = 'none'
	}, 500)

	updateTask()
	event.preventDefault()
})
