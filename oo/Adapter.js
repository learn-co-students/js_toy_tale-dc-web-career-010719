class Adapter {
  
  static getToy(){
    return fetch(`http://localhost:3000/toys`)
      .then(res => res.json())
  }
  
  static postToy(data){
    return fetch(`http://localhost:3000/toys`, {
      method: "POST",
      headers: {
        'Application': "application/json",
        'Content-Type': "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(alert("New toy added. Check it out below!"))
  }
  
  static patchLikes(id, data) {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        'Application': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(console.log)
  }
}