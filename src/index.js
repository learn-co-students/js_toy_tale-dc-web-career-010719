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

const allToyDiv = document.getElementById('toy-collection')
document.addEventListener('DOMContentLoaded', fetchToys)

function fetchToys () {
  fetch('http://localhost:3000/toys/')
  .then(res => res.json())
  .then(toys => {
    toys.forEach(showToy)
  })
}
function showToy (toy) {
  let toyDiv = document.createElement('div')
  toyDiv.className = 'card'
  allToyDiv.appendChild(toyDiv)

  let header = document.createElement('h2')
  header.innerText = `${toy.name}`
  toyDiv.appendChild(header)

  let img = document.createElement('img')
  img.className = 'toy-avatar'
  img.src = `${toy.image}`
  toyDiv.appendChild(img)

  let p = document.createElement('p')
  p.setAttribute('id', `likes-${toy.id}`)
  p.innerText = `${toy.likes} Likes`
  toyDiv.appendChild(p)

  let likeBtn = document.createElement('button')
  likeBtn.setAttribute('id', `toy-${toy.id}`)
  likeBtn.innerText = 'Like <3'
  likeBtn.addEventListener('click', likeToy)
  toyDiv.appendChild(likeBtn)
}


let form = document.querySelector('form')
form.addEventListener('submit', likeToy)

function postNewToy (e) {
  e.preventDefault()
  let data = {
    "name": document.getElementsByClassName('input-text')[0].value,
    "image": document.getElementsByClassName('input-text')[1].value,
    "likes": 0
  }
  fetch(
    'http://localhost:3000/toys/', {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
  .then(res => res.json())
  .then(toy => showToy(toy))
}

function likeToy (e) {
  let id = e.currentTarget.id.split('-')[1]
  let p = document.getElementById(`likes-${id}`)
  let likes = parseInt(p.innerText) + 1
  let data = {
    "likes": likes
  }
  fetch(
    `http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
  .then(res => res.json())
  .then(toy => {
    p.innerText = `${likes} Likes`
  })
}
