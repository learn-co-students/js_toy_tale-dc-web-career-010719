class Toy {
   constructor(toyObj) {
    this.id = toyObj.id
    this.image = toyObj.image
    this.likes = toyObj.likes
    this.name = toyObj.name
    Toy.all.push(this)
  }
  
  div(){
    const div = document.createElement("div")
    div.className = "card"
    div.append(this.h2(), this.img(), this.p(), this.btn())
    
    return div
  }
  
  h2(){
    const h2 = document.createElement("h2")
    h2.innerText = this.name
    return h2
  }
  
  img(){
    const img = document.createElement("img")
    img.src = this.image
    img.className = "toy-avatar"
    return img
  }
  
  p(){
    const p = document.createElement("p")
    p.innerText = `${this.likes} Likes`
    return p
  }
  
  btn(){
    const btn = document.createElement("button")
    btn.className = "like-btn"
    btn.innerText = "Like <3"
    btn.addEventListener("click", () => {ToyController.increaseLike(this, btn)})
    return btn
  }
}

Toy.all = []