document.addEventListener("DOMContentLoaded", function(){
fetchToys()
})
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const addToyForm = document.querySelector('.add-toy-form').addEventListener('submit',
  function () {
    event.preventDefault()
    addingToy()
    })
let addToy = false
// YOUR CODE HERE

function addingToy(){
  data = {
   name: document.querySelector('#name-input').value,
   image: document.querySelector('#image-input').value
  }
  fetch(`http://localhost:3000/toys`, {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(newToy => render() )
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

function render(toy){
  debugger
let toyList = document.createElement('div')
toyList.className = 'card'
toyList.innerHTML += `<h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} </p>
    <button class="like-btn">Like <3</button>`

  document.getElementById('toy-collection').appendChild(toyList)
}
// OR HERE!
function fetchToys() {

  fetch(`http://localhost:3000/toys`)
  .then((resp) => resp.json())
  .then((jsonData) => {
    jsonData.forEach((toy) => render(toy))
  })
}
