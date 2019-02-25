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
toyCollection = document.querySelector("#toy-collection")

document.addEventListener('DOMContentLoaded', fetchToys)
newToyForm = document.querySelector(".addToyForm")
document.addEventListener("submit", createToy)

function fetchToys(){
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(json => json.forEach(toy => renderToy(toy)))
}

function renderToy(toy){
  cardDiv = document.createElement('div')
  cardDiv.classList.add("card")
  toyCollection.appendChild(cardDiv)

  nameHead = document.createElement("h2")
  nameHead.innerHTML = toy.name
  cardDiv.appendChild(nameHead)

  imgTag = document.createElement('img')
  imgTag.classList.add("toy-avatar")
  imgTag.src = toy.image
  cardDiv.appendChild(imgTag)

  likesTag = document.createElement("p")
  likesTag.innerHTML = `${toy.likes} Likes`
  cardDiv.appendChild(likesTag)

  button = document.createElement("button")
  button.dataset.id = `${toy.id}`
  button.classList.add("like-btn")
  button.innerHTML = "Like <3"
  button.addEventListener("click", increaseLikes)
  cardDiv.appendChild(button)
}

function increaseLikes(e){
let currentLikes = e.target.previousElementSibling.innerText
currentLikesNum = parseInt(currentLikes)
 e.target.previousElementSibling.innerText = `${++currentLikesNum} Likes`


fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
  method: "PATCH",
  headers:
  {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body:
  JSON.stringify({
    "likes": currentLikesNum
  })

  })
}


function createToy(e){
  e.preventDefault
  data = {
"name": e.target[0].value ,
"image": e.target[1].value ,
"likes": 0
}
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
  "Content-Type": "application/json",
  "Accept" : "application/json"
    },
    body: JSON.stringify(data)})
    .then(res => json(res))
    .then(json => console.log(json))
}
