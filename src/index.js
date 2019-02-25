const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
document.addEventListener('DOMContentLoaded', init)

// YOUR CODE HERE
function init() {
  getAllToys()
  addEventNewToy()
}

function getToyInput() {
  return {
    name: document.getElementById('new-toy-name').value,
    image: document.getElementById('new-toy-img').value,
    likes: 0
  }
}

function addEventNewToy() {
  let createBtn = document.querySelector('#new-toy-submit')
  createBtn.addEventListener('click', addNewToy)
}


function addNewToy(event) {
  event.preventDefault()
  fetch('http://localhost:3000/toys/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Accept": 'application/json'
    },
    body: JSON.stringify(getToyInput())
  })
  .then(res => res.json())
  .then(newToy => {
    renderToy(newToy)
  })
}


function getAllToys() {
  fetch('http://localhost:3000/toys/')
  .then(res => res.json())
  .then(json => {
    json.forEach((toy)=>{
      renderToy(toy)
    })
  })
}

function renderToy(toy) {
  let newToyDiv = document.createElement('div')
  newToyDiv.className = "card"
  newToyDiv.innerHTML = 
  `<h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p class=likes-${toy.id}>${toy.likes} Likes </p>
  <button class="like-btn" id=btn-${toy.id}>Like <3</button>`
  
  let toyCollection = document.getElementById('toy-collection')
  toyCollection.appendChild(newToyDiv)
  
  let likeBtn = document.getElementById(`btn-${toy.id}`)
  likeBtn.addEventListener('click', addLikesToToy)
}


function addLikesToToy(e) {
  likeToyId = parseInt(e.currentTarget.id.split('-')[1])
  likesHtml = document.querySelector(`.likes-${likeToyId}`)
  likesText = parseInt(likesHtml.innerText.split('-')[0])+1
  
  console.log(likesText)
  fetch(`http://localhost:3000/toys/${likeToyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({likes: likesText})
  })
  .then(res => res.json())
  .then(() => {
    likesHtml.innerText = `${likesText} Likes`
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
