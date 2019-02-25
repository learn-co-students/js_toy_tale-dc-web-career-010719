const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const newToyForm = document.querySelector('.add-toy-form')
const toycolection = document.getElementById('toy-collection')
let addToy = false

// YOUR CODE HERE
document.addEventListener("DOMContentLoaded", getToys())


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    newToyForm.addEventListener('submit', postToy)

  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
function getToys(){
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(loadToysToPage)
}

function loadToysToPage(json){
  json.forEach((toy) =>{createElements(toy)})
}

function createElements(data){
  // debugger

  let div = document.createElement('div')
  let h2 = document.createElement('h2')
  let img = document.createElement('img')
  let p = document.createElement('p')
  let button = document.createElement('button')
  h2.innerText = data.name
  img.src = data.image
  img.classList.add("toy-avatar")
  p.innerText = `${data.likes} likes`
  button.class = "like-btn"
  button.innerText = "Like <3"
  button.addEventListener('click', likeToy)
  div.classList.add("card")
  div.setAttribute("id", `${data.id}`);
  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(button)
  addToyToColection(div)

}

function addToyToColection(el){
  toycolection.appendChild(el)
}

function postToy(e){
  e.preventDefault()
  let data = getNewToyData()
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
             },
    body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => createElements(json))

}

function getNewToyData(){
  let nameinput = document.getElementById("name-input").value
  let imageinput = document.getElementById("img-input").value
  let data = {
    name: nameinput,
    img: imageinput,
    likes: 0
  }
  return data
}

function likeToy(e){
  // let likes = e.currentTarget.parentElement.children[2].innerText.split(" ")[0]
  let currId = e.currentTarget.parentElement.id
  let data = getDataForToy(currId)
  fetch(`http://localhost:3000/toys/${currId}`, {
    method: 'PATCH',
    headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
             },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(json => renderToy(json))


}
function getDataForToy(id){
  let pOfDIv = document.getElementById(id).children[2]
  let like = parseInt(pOfDIv.innerText.split(" ")[0])
  let body = {
    "likes": like + 1
  }
  return body
}

function renderToy(data){
  let div = document.getElementById(data.id)
  let likes = div.children[2]
  likes.innerText = `${data.likes} ${likes.innerText.split(" ")[1]}`

}
