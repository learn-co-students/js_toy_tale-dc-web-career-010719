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
  let toyCard = document.createElement('div')
  toyCard.classList.add("card")

  let toyNameH1 = document.createElement('h1')
  toyNameH1.innerHTML = toy.name
  toyCard.id = toy.id

  let toyImageElement = document.createElement('img')
  toyImageElement.src = toy.image
  toyImageElement.classList.add("toy-avatar")

  let toyLikeButton = document.createElement('button')
  toyLikeButton.classList.add('like-btn')

  toyLikeButton.innerText = "Like <3"

  toyLikeButton.addEventListener("click", (e) => likeToy(e, toy))

  let toyLikesP = document.createElement('p')
  toyLikesP.innerHTML = `${toy.likes} Likes`


  toyCard.appendChild(toyNameH1)
  toyCard.appendChild(toyImageElement)
  toyCard.appendChild(toyLikesP)
  toyCard.appendChild(toyLikeButton)
  toyCollection.appendChild(toyCard)
}

function likeToy(e, toy){
  let toyLikes = ++toy.likes
  displayedLikes = e.target.parentElement.children[2].innerText.split(" ")[0]
  ++displayedLikes
  e.target.parentElement.children[2].innerText = `${displayedLikes} Likes`
  sendData = {"likes": toyLikes}
  fetch(`http://localhost:3000/toys/${toy.id}`,{
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
  }).then(res => res.json())
  .then(json => renderToy(json))
}
