class ToyController {
  
  static renderToys(){
    Adapter.getToy()
    .then(toys => {
      toys.forEach((toyObj) => {
        const toy = new Toy(toyObj)
        ToyController.displayToy(toy)
      })
    })
  }
  
  static displayToy(toy){
    const collection = document.querySelector("#toy-collection")
    collection.append(toy.div())
  }
  
  static addToy(form){
    const toyObj = {name: form.name.value, image: form.name.value, likes: 0}
    const toy = new Toy(toyObj)
    
    ToyController.displayToy(toy)
    Adapter.postToy(toy)
    
  }
  
  static increaseLike(toy, btn) {
    toy.likes += 1
    btn.previousSibling.innerText = `${toy.likes} Likes`
    const data = {likes: toy.likes}
    Adapter.patchLikes(toy.id, data)
  }
  
  
  
  
  
}

