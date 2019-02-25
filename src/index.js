const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toySubmitBtn = document.querySelector('.submit')
let addToy = false

// YOUR CODE HERE

document.addEventListener('DOMContentLoaded', init)

function init() {

  displayToys()
  addBtn.addEventListener('click', toggleForm)
  toySubmitBtn.addEventListener('click', createToy)
}

function displayToys() {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(json => json.forEach(renderToy))
}

function toggleForm() {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
}

function renderToy(toy) {
  let div = document.createElement('div')
  document.getElementById('toy-collection').appendChild(div)
  div.classList.add("card")
  div.dataset.id = `${toy.id}`
  div.id = `toy-${toy.id}`

  let h2 = document.createElement('h2')
  h2.innerText = `${toy.name}`
  div.appendChild(h2)

  let img = document.createElement('img')
  img.src = toy.image
  img.classList.add('toy-avatar')
  div.appendChild(img)

  let p = document.createElement('p')
  p.innerText = `${toy.likes} Likes`
  div.appendChild(p)

  let likeBtn = document.createElement('button')
  likeBtn.classList.add('like-btn')
  likeBtn.innerText = 'Like <3'
  div.appendChild(likeBtn)
  likeBtn.addEventListener('click', likeToy)

  // toyHTML =
  //   `<div class="card" id="${toy.id}">
  //     <h2>${toy.name}</h2>
  //     <img src=${toy.image} class="toy-avatar" />
  //     <p>${toy.likes} Likes </p>
  //     <button class="like-btn">Like <3</button>
  //   </div>`
  // document.getElementById('toy-collection').innerHTML += toyHTML
}

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
  .then(json => renderToy(data))
}

function likeToy() {
  let card = this.parentElement
  let currentLikes = parseInt(card.children[2].innerText.split(' ')[0])
  let newLikes = currentLikes + 1
  console.log('this part works fine')
  fetch(`http://localhost:3000/toys/${card.dataset.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({likes: newLikes})
  })
  .then(resp => resp.json())
  .then(json => () => {
    debugger
    console.log('hi')
    card.children[2].innerText = `<p>${newLikes} Likes</p>`
  })
}






//
