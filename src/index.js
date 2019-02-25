const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const create = document.querySelector('.submit')
let addToy = false

document.addEventListener("DOMContentLoaded", getToys)

function getToyDiv() {
  return document.querySelector("#toy-collection")
}

addBtn.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    create.addEventListener('click', handleSubmitForm)
  } else {
    toyForm.style.display = 'none'
  }
})

function handleSubmitForm(e){
  e.preventDefault()
  postNewToy()
}

function getToys() {
  fetch(`http://localhost:3000/toys`)
  .then(res =>res.json())
  .then(toyArray => {
    toyArray.forEach(renderToy)
  })
}

function renderToy(toy) {
  let toyId = toy.id
   let div = document.createElement('div')
   getToyDiv().appendChild(div)
   div.classList.add("card")
   div.dataset.id = toyId
   div.id = "toy-" + toyId
   let h2 = document.createElement('h2')
   div.appendChild(h2)
   h2.innerText = toy.name

   let img = document.createElement('img')
   img.src = toy.image
   img.classList.add("toy-avatar")
   div.appendChild(img)

   let p = document.createElement('p')
   p.innerText = toy.likes
   div.appendChild(p)

   let button = document.createElement('button')
   button.innerText = "Like <3"
   button.id = "like-" + toyId
   button.addEventListener('click', handleLikeOfToy)
   div.appendChild(button)
}

function postNewToy() {
  let data = {
    name: document.querySelector("#name-input").value,
    image: document.querySelector("#img-input").value,
    likes: 0
  }
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type":"application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  }).then(resp => resp.json())
  .then(newToy => {
    renderMonster(newToy)
  })
}

function handleLikeOfToy(event){
  let toyId = event.target.id.split("-")[1]
  let amount = document.querySelector(`#toy-${toyId}`).getElementsByTagName("p")[0].innerText
  let likeAmount = parseInt(amount)
  patchNewToy(likeAmount, toyId)
  document.querySelector(`#toy-${toyId}`).getElementsByTagName("p")[0].innerText = likeAmount + 1
}

function patchNewToy(likeAmount, toyId) {
  let data = {likes: likeAmount + 1}
  return fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type":"application/json",
    },
    body: JSON.stringify(data)
  }).then(resp => resp.json())
}
