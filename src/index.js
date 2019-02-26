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
document.addEventListener("DOMContentLoaded", fetchAllToys)
let newToyForm = document.querySelector(".add-toy-form")
newToyForm.addEventListener("submit", createToy)
let toyCollection = document.querySelector('#toy-collection')


function fetchAllToys(){
  toyCollection.innerHTML = ""
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(json => json.forEach(toy => renderToy(toy)))
}

function renderToy(toy){
  makeToyCard()
  toyCollection.appendChild(toyCard)
toyCard.id = toy.id
toyNameH1.innerHTML = toy.name
toyImageElement.src = toy.image
toyLikeButton.dataset.likes = toy.likes
toyLikesP.innerHTML = `${toyLikeButton.dataset.likes} Likes`
toyLikeButton.innerText = "Like <3"
toyLikeButton.addEventListener("click", likeToy)
}

function likeToy(e){
  previousLikes = parseInt(e.target.previousElementSibling.innerHTML)
  previousLikes++
  e.target.previousElementSibling.innerHTML = `${previousLikes} Likes`
  sendData = {"likes": ++e.target.dataset.likes}
  fetch(`http://localhost:3000/toys/${e.target.parentElement.id}`,{
  method: "PATCH",
  headers:
    {
    "Content-Type": "application/json",
    "Accept": "application/json"
    },
   body: JSON.stringify(sendData)
  }
    )

}

function makeToyCard(){
 toyCard = document.createElement('div')
    toyCard.classList.add("card")
  toyNameH1 = document.createElement('h1')
   toyImageElement = document.createElement('img')
   toyImageElement.classList.add("toy-avatar")
   toyLikesP = document.createElement('p')
   toyLikeButton = document.createElement('button')
    toyLikeButton.classList.add('like-btn')

  toyCard.appendChild(toyNameH1)
  toyCard.appendChild(toyImageElement)
  toyCard.appendChild(toyLikesP)
  toyCard.appendChild(toyLikeButton)
}

function createToy(e){

let toyInfo = {name: e.target.name.value,
     image: e.target.image.value,
      likes: 0}

fetch('http://localhost:3000/toys', {
    method: "POST",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toyInfo)
  }).then(res => fetchAllToys())
}
