document.addEventListener("DOMContentLoaded", init())


const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
 function init() {
   getToys()
   const form = document.querySelector("form")
   form.addEventListener("submit", (e) => {
     e.preventDefault()
     postToy(form)
   })
 }

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      // submit listener here
    } else {
      toyForm.style.display = 'none'
    }
  }) 

// OR HERE!

function getToys() {
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toys => toys.forEach(displayToy))
}

function displayToy(toy) {
//create elements
  const toyCollection = document.querySelector("#toy-collection")
  const newDiv = document.createElement("div")
  const h2 = document.createElement("h2")
  const img = document.createElement("img")
  const p = document.createElement("p")
  const button = document.createElement("button")

//set attributes
  newDiv.className = "card"
  h2.innerText = toy.name
  img.src = toy.image
  img.className = "toy-avatar"
  p.innerHTML = `${toy.likes} Likes`
  button.className = "like-btn"
  button.innerText = "Like <3"
  
//set event listeners
  button.addEventListener("click", () => {updateLikes(toy, button)})

//append elements
  newDiv.appendChild(h2)
  newDiv.appendChild(img)
  newDiv.appendChild(p)
  newDiv.appendChild(button)
  toyCollection.appendChild(newDiv)
}

function postToy(form) {
//collect input data from form
  const data = {name: form.name.value, image: form.image.value, likes: 0 }
  
//post input information to the database
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(toy => displayToy(toy)) //render new toy to DOM
  .then(form.reset()) //reset form
}

function updateLikes(toy, btn) {
  //set likes and update DOM innerText
  toy.likes += 1
  btn.previousSibling.innerText = `Likes : ${toy.likes}`
  
  //create data for db patch
  const data = {likes: toy.likes}
  
  //send toy ID and data for fetch patch
  patchLikes(toy.id, data)
}

function patchLikes(id, data) {
  fetch(`http://localhost:3000/toys/${id}`, {
	method: "PATCH",
	headers: 
	{
 	 "Content-Type": "application/json",
 	 Accept: "application/json"
	},
	body: JSON.stringify(data)
  })
	.then(res => res.json())
	.then(json => console.log(json))
}




