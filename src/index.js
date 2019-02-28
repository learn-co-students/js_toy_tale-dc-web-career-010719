document.addEventListener("DOMContentLoaded", init())


const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
 function init() {
   getToys()
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
    .then(json => renderToys(json))
}

function renderToys(json) {
  json.forEach((el) => {
    displayToy(el)
  })
  
  
    
  
}

function displayToy(toy) {
//    if (!toy.likes) {
//      toy.likes = 0
//    } 
  let toyCollection = document.querySelector("#toy-collection")

  let newDiv = document.createElement("div")
  newDiv.className = "card"
  toyCollection.appendChild(newDiv)

  let h2 = document.createElement("h2")
  let img = document.createElement("img")
  let p = document.createElement("p")
  let button = document.createElement("button")
//  let renderedLikes = toy.likes
  button.className = "like-btn"

  h2.innerText = toy.name
  img.src = toy.image
  img.className = "toy-avatar"
  p.dataset.toyLikes = parseInt(toy.likes)
  newDiv.dataset.toyId = toy.id
//  p.innerHTML = p.dataset.toyLikes
  button.innerText = "Like <3"
  button.addEventListener("click", updateLikes)
  setLikes(p)

  newDiv.appendChild(h2)
  newDiv.appendChild(img)
  newDiv.appendChild(p)
  newDiv.appendChild(button)

}

function getInput() {
  let toyName = document.querySelectorAll("input")[0].value
  let toyImg = document.querySelectorAll("input")[1].value

  return {name: toyName, image: toyImg, likes: 0 }
}

function postToy(e) {
  e.preventDefault()
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: 
    JSON.stringify(getInput())
  })
.then(res => res.json())
.then(json => displayToy(json))
//  debugger
}

document.querySelectorAll("input")[2].addEventListener("click", postToy)

function setLikes(p) {
  p.innerText = `Likes : ${p.dataset.toyLikes}`
}

function updateLikes(e) {
  let p = e.path[1].children[2]
  let t = e.path[1].dataset.toyId
  let likes = p.dataset.toyLikes
  let parsedLikes = parseInt(likes) + 1
  p.dataset.toyLikes = parsedLikes

 
  setLikes(p)
  patchLikes(t, parsedLikes)
}

function patchLikes(toy, p) {
  let update = {likes: p}
  fetch(`http://localhost:3000/toys/${toy}`, {
	method: "PATCH",
	headers: 
	{
 	 "Content-Type": "application/json",
 	 Accept: "application/json"
	},
	body: JSON.stringify(update)
  })
	.then(res => res.json())
	.then(json => console.log(json))
}




