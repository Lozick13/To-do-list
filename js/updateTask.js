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
				categoriesUpdate('none')
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
			categoriesUpdate('none')
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
				categoriesUpdate('none')
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
			
			categoriesUpdate('none')
		})
	}
}
