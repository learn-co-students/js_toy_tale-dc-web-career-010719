const addBtn = document.querySelector('#new-toy-btn')
const toyFormContainer = document.querySelector('.container')
const toyForm = document.querySelector('.add-toy-form')
toyForm.addEventListener("submit", (e)=>addNewToy (e, toyForm))
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyFormContainer.style.display = 'block'
    // submit listener here
  } else {
    toyFormContainer.style.display = 'none'
  }
})


// OR HERE!
document.addEventListener("DOMContentLoaded", () => {
  fetchToys()

  })

function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(json => json.forEach(toy => renderToy(toy)))
  }

  function renderToy(toy) {
    let toyCollection = document.querySelector("#toy-collection")
    let toyCard = document.createElement("div")
    toyCard.classList.add("card")
    let name = document.createElement("h2")
    name.innerHTML = toy.name
    let image = document.createElement("img")
    image.src = toy.image
    image.classList.add("toy-avatar")
    let likesP = document.createElement("p")
    likesP.innerHTML = `${toy.likes} Likes`
    let likeButton = document.createElement("button")
    likeButton.classList.add("like-btn")
    likeButton.innerHTML = "Like <3"
    likeButton.addEventListener("click", (e)=> likeToy(e, toy))
    toyCard.append(name, image, likesP, likeButton)
    toyCollection.appendChild(toyCard)
  }

function addNewToy(e, toyForm){
  e.preventDefault
  let toy = {
    "name": `${toyForm.name.value}`,
    "image": `${toyForm.image.value}`,
    "likes": 0
  }
  renderToy(toy)
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toy)
  })
}

function likeToy(e, toy) {

  shownLikes = e.target.previousElementSibling.innerHTML.split(' ')[0]
  e.target.previousElementSibling.innerHTML = `${++shownLikes} Likes`
let data = {
  "likes": shownLikes
    }

  fetch (`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
}
