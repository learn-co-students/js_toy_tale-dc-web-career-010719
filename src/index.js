const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
let addToy = false;

// YOUR CODE HERE
document.addEventListener('DOMContentLoaded', init);

function init() {
  getAllToys();
  addEventNewToyBtn();
}

function getAllToys() {
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(json => json.forEach(toy => renderToys(toy)));
}

function renderToys(toy) {
  let newToyDiv = document.createElement('div');
  newToyDiv.className = 'card';
  newToyDiv.innerHTML = `<h2>${toy.name}</h2> <img src=${
    toy.image
  }  class="toy-avatar"/> <p id="toy-${toy.id}">${
    toy.likes
  } Likes</p> <button id="btn-${toy.id}" class="like-btn">Like <3</button>`;

  let toyCollection = document.querySelector('#toy-collection');
  toyCollection.appendChild(newToyDiv);

  let likeBtn = document.querySelector(`#btn-${toy.id}`);

  likeBtn.addEventListener('click', addLikes);
}

function captureNewToy() {
  let newToyName = document.querySelector('#newtoyinput').value;
  let newToyImage = document.querySelector('#newtoyimg').value;
  return { name: newToyName, image: newToyImage, likes: 0 };
}

function addEventNewToyBtn() {
  let createBtn = document.querySelector('#submitBTN');
  createBtn.addEventListener('click', addNewToy);
}

function addNewToy(event) {
  event.preventDefault();
  captureNewToy();

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(captureNewToy())
  })
    .then(res => res.json())
    .then(json => renderToys(json));
}

function addLikes(e) {
  toyId = parseInt(e.currentTarget.id.split('-')[1]);

  likes = document.querySelector(`#toy-${toyId}`);
  paragraph_likes = parseInt(likes.innerText.split(' ')[0]);
  ++paragraph_likes;

  // debugger;

  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ likes: paragraph_likes })
  })
    .then(res => res.json())
    .then(() => {
      likes.innerText = `${paragraph_likes} Likes`;
    });
}
// debugger;

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = 'block';
    // submit listener here
  } else {
    toyForm.style.display = 'none';
  }
});

// OR HERE!
