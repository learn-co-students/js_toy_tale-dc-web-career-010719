document.addEventListener("DOMContentLoaded", init)

let addBtn = false

function init(){
  const newToyBtn = document.querySelector("#new-toy-btn")
  const form = document.querySelector("form")
  
  ToyController.renderToys()
  newToyBtn.addEventListener("click", newToyToggle)
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    ToyController.addToy(form)
  })
}

function newToyToggle(){
  const form = document.querySelector('.container')
  addBtn = !addBtn
  if (addBtn){
    form.style.display = "block"
  } else {
    form.style.display = "none"
  }
}
