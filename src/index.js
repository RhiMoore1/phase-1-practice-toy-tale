let addToy = false; 


function updateLikes(id, newNumberOfLikes) {
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": newNumberOfLikes
    })
  })
  .then(res => res.json())
  .then()
}

const url = 'http://localhost:3000/toys';
const addBtn = document.querySelector('#new-toy-btn');
const form = document.querySelector('.add-toy-form')




function createCardElement(toy) {
  let card = document.createElement("div");
  card.className = ("card");

  let h2 = document.createElement("h2");
  h2.textContent = toy.name;

  let img = document.createElement("img");
  img.src = toy.image;
  img.classList.add("toy-avatar");

  let p = document.createElement("p");
  p.textContent = `${toy.likes} Likes`;

  let button = document.createElement("button");
  button.addEventListener("click", () => {
    p.textContent = `${toy.likes += 1} Likes`;
    updateLikes(toy.id, toy.likes)
  })
  button.classList.add("like-btn");
  button.id = toy.id;
  button.textContent = "Like ❤️";

  card.append(h2, img, p, button);
  
  document.getElementById("toy-collection").append(card);
}

function sendItOut(newToy) {
  fetch("http://localhost:3000/toys", {
    method: "POST", 
    headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },

body: JSON.stringify({
  ...newToy,
  "likes": 0
})
}).then(
  (res) => res.json()
)
.then(responseToy => createCardElement(responseToy))
}


document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toys => toys.forEach(toy => createCardElement(toy)))

  const form = document.querySelector("form.add-toy-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    sendItOut(formData)
  })

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
