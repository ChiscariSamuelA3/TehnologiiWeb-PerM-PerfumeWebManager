const queryString2 = window.location.search;
const urlParameters2 = new URLSearchParams(queryString2);
const prodId = urlParameters2.get("id");

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function addReview(review) {
  console.log("[review-js]", review);

  // new div element
  const divCard = document.createElement("div")
  divCard.className = "review-item"

  const divHead = document.createElement("div")
  divHead.className = "review-item__head"

  const divAuthor = document.createElement("div")
  divAuthor.className = "review-item__author"

  let imgUser = document.createElement("img")
  imgUser.setAttribute("src", "images/user.png")
  imgUser.className = "js-img"
  imgUser.setAttribute("alt", "user-img")
  divAuthor.appendChild(imgUser)

  let spanName = document.createElement("span")
  spanName.className = "review-item__name"
  spanName.textContent = review.username
  divAuthor.appendChild(spanName)

  let spanDate = document.createElement("span")
  spanDate.className = "review-item__date"
  spanDate.textContent = "June, 2022"
  divAuthor.appendChild(spanDate)

  divHead.appendChild(divAuthor)

  const divRating = document.createElement("div")
  divRating.className = "review-item__rating"

  let ulRating = document.createElement("ul")
  ulRating.className = "star-rating"

  for (var i = 0; i < review.grade; i++) {
    let liRating = document.createElement("li")
    liRating.innerHTML = '<i class="fa fa-star"></i>'

    ulRating.appendChild(liRating)
  } 
  divRating.appendChild(ulRating)

  let spanRate = document.createElement("span")
  spanRate.textContent = review.grade
  divRating.appendChild(spanRate)

  divHead.appendChild(divRating)
  divCard.appendChild(divHead)

  const divContent = document.createElement("div")
  divContent.className = "review-item__content"
  divContent.innerText = `${review.comment}`

  divCard.appendChild(divContent)

  const currentDiv = document.getElementById("review-reper");
  insertAfter(divCard, currentDiv);
}

// open html => use url
fetch(`/get-api-reviews/${prodId}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    // Converting received data to JSON

    return response.json();
  })
  .then((json) => {
    // Loop through each data
    for (var i = json.length - 1; i >= 0; i--) {
      var review = json[i];

      addReview(review);
    }
  })
  .catch((err) => {
    console.log(err);
  });
