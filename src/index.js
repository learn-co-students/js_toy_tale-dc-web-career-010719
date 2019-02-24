const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

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
fetch('http://localhost:3000/toys')
.then(resp => resp.json())
.then(json => json.forEach(renderToy))

function renderToy(toy) {
  // let div = document.createElement('div')
  // div.class = "card"
  // div.id = `${toy.id}`
  // let h2 = document.createElement('h2')
  // h2.innerText = `${toy.name}`
  // div.appendChild(h2)
  // div.innerHTML += `<img src=${toy.image} class="toy-avatar" />`
  //
  toyHTML =
    `<div class="card" id="${toy.id}">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn">Like <3</button>
    </div>`
  document.getElementById('toy-collection').innerHTML += toyHTML
  // let newLikeBtn = document.getElementById('toy-collection').lastChild.querySelector('button')
  // newLikeBtn.addEventListener('click', () => {console.log('hi')})
}

let createButton = document.querySelectorAll('input')[2]
createButton.addEventListener('click', createToy)

function createToy(e) {
  e.preventDefault()
  let data = {
    name: document.querySelectorAll('input')[0].value,
    image: document.querySelectorAll('input')[1].value,
    likes: 0
  }

  fetch(`http://localhost:3000/toys`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(resp => resp.json())
  .then(json => renderToy)
}

// document.querySelectorAll('.like-btn').addEventListener('click', likeToy)
// document.querySelector('.like-btn').parentElement.id

function likeToy() {
  let currentId = document.querySelector('.like-btn').parentElement.id
  fetch(`http://localhost:3000/toys/${currentId}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: {likes: 10}
  })
  .then(resp => resp.json())
  .then(json => console.log(json))
}

allLikeBtn = document.getElementById('toy-collection').querySelectorAll('button')
for (let i = 0; i < allLikeBtn.length; i++) {
  allLikeBtn[i].addEventListener('click', ()=>{console.log('hi')})
}



//
