const url = 'http://localhost:3000/toys'
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const newForm = document.querySelector('.add-toy-form')

let addToy = false

document.addEventListener("DOMContentLoaded", init) 

function init() {
	getAllToys()
	addBtn.addEventListener('click', form)
	newForm.addEventListener('submit', addNewToy)
}

	function getAllToys() {
		fetch(url)
		.then(res => res.json())
		.then(json => {
			json.forEach(toyCard)
		});
  	}

  	function toyCard(toy) {
		let div = document.createElement('div')
		document.querySelector('#toy-collection').appendChild(div)
		div.classList.add("card")

		let h2 = document.createElement('h2')
		h2.innerText = `${toy.name}`
		div.appendChild(h2)

		let img = document.createElement('img')
		img.src = `${toy.image}`
		img.classList.add("toy-avatar")
		div.appendChild(img)

		let p = document.createElement('p')
		p.innerText = `${toy.likes} Likes`
		div.appendChild(p)

		let likeBtn = document.createElement('button')
		likeBtn.classList.add("like-btn")
		likeBtn.innerText = 'Like <3'
		likeBtn.dataset.id = `${toy.id}`
		div.appendChild(likeBtn)

		likeBtn.addEventListener('click', likeToy)

		// getCollection().innerHTML += `
		// <div data-id=${toy.id} class="card">
		// <h2>${toy.name}</h2>
		// <img src=${toy.image} class="toy-avatar"/>
		// <p> ${toy.likes} </p>
		// <button class="like-btn">Like <3</button>
		//   </div>`
	}

	function addNewToy(e) {
		e.preventDefault()
		let data = {
			name: document.querySelectorAll('input')[0].value,
			image:document.querySelectorAll('input')[1].value,
			likes: 0
		}
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify(data),
		}).then(res => res.json())
		.then(json => toyCard(json))
	}

	function form(){
		addToy = !addToy
		if (addToy) {
			toyForm.style.display = 'block'
	
		} else {
			toyForm.style.display = 'none'
		}
	}

	function likeToy(e) {
				let id = e.target.dataset.id
				let currentLike = e.target.previousElementSibling
				let likeCounter = parseInt(e.target.previousElementSibling.innerText)
				currentLike.innerText = `${++likeCounter} likes`
			
			fetch(`http://localhost:3000/toys/${id}`, {
			method: "PATCH",
			headers: {
				"Content-type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify({likes: likeCounter})
		})
		}

	//Solution 1
		// let cardEl = this.parentElement
		// 	// let id = e.target.dataset.id
		// 	let currentLikes = parseInt(this.parentElement.children[2].innerText.split(' ')[0])
		// 	let likeCounter = currentLikes + 1

			// cardEl.children[2].innerText = `${currentLikes} Likes`