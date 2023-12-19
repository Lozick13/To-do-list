function categoriesUpdate(animation) {
	const tasksList = document.querySelector('.tasks').outerHTML
	localStorage.setItem('tasks', tasksList)

	const tasksListCollection = document.querySelectorAll('.task')
	const activeNowNavBtn = document.querySelector('.categories__item_selected')
	activeNowNavBtn.classList.remove('categories__item_selected')

	tasksListCollection.forEach(task => {
		task.classList.remove('active-task')
		
		task.classList.add('disable-task')
		animation !== 'none'
			? setTimeout(() => {
					task.style.display = 'none'
			  }, 300)
			: (task.style.display = 'none')
	})

	function update() {
		if (categoriesNow === 'all') {
			allNavBtn.classList.add('categories__item_selected')
			tasksListCollection.forEach(task => {
				if (
					task.className.includes('task_done') ||
					task.className.includes('task_active')
				) {
					task.classList.remove('disable-task')
					task.classList.add('active-task')
					animation !== 'none'
						? setTimeout(() => {
								task.style.display = 'flex'
						  }, 300)
						: (task.style.display = 'flex')
				}
			})
		} else if (categoriesNow === 'active') {
			activeNavBtn.classList.add('categories__item_selected')

			tasksListCollection.forEach(task => {
				if (task.className.includes('task_active')) {
					task.classList.remove('disable-task')
					task.classList.add('active-task')
					animation !== 'none'
						? setTimeout(() => {
								task.style.display = 'flex'
						  }, 300)
						: (task.style.display = 'flex')
				}
			})
		} else if (categoriesNow === 'done') {
			doneNavBtn.classList.add('categories__item_selected')

			tasksListCollection.forEach(task => {
				if (task.className.includes('task_done')) {
					task.classList.remove('disable-task')
					task.classList.add('active-task')
					animation !== 'none'
						? setTimeout(() => {
								task.style.display = 'flex'
						  }, 300)
						: (task.style.display = 'flex')
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
					animation !== 'none'
						? setTimeout(() => {
								task.style.display = 'flex'
						  }, 300)
						: (task.style.display = 'flex')
				}
			}
		}
	}

	animation !== 'none' ? setTimeout(update, 350) : update()
}
