function createToy() {
  let ToyID = 0
  let allToys = []

  return class {
    // Create toy
    constructor(name, image, likes=0) {
      this.name = name
      this.image = image
      this.likes = likes
      this.id = ++ToyID
      allToys.push(this)
    }

    // Format card
    format() {
      let div = document.createElement('div')
      let h2 = document.createElement('h2')
      let img = document.createElement('img')
      let p = document.createElement('p')
      let button = document.createElement('button')

      div.classList.add('card')
      div.id = `toy${this.id}`
      img.classList.add('toy-avatar')
      p.id = `likes${this.id}`
      button.classList.add('like-btn')
      button.id = `like${this.id}`

      h2.innerText = this.name
      img.src = this.image
      p.innerText = `${this.likes} Likes`
      button.innerText = "Like ❤️"

      div.appendChild(h2)
      div.appendChild(img)
      div.appendChild(p)
      div.appendChild(button)
      toyCollection().appendChild(div)
    }

    // Edit/display object's likes
    editLikes(data) {
      this.likes = data.likes
      document.querySelector(`#likes${this.id}`).innerText = `${this.likes} Likes`
    }

    // Class methods
    static all() {
      return allToys
    }

    static displayAll() {
      this.all().forEach(toy => toy.format())
    }

  }
}

const Toy = createToy()
