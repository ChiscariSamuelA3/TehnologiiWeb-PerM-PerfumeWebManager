function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}

function addProductToSuggestion(productFav, productName, productImage, productPrice) {

    // new div element
    const divCard = document.createElement("div")
    divCard.className = "item item--preffered item--suggested"

    // div content
    let divType = document.createElement("div")
    divType.className = "item__type"

    let favorite = document.createElement("h3")
    favorite.textContent = "Suggestion"

    divType.appendChild(favorite)
    divCard.appendChild(divType)

    let divImg = document.createElement("div")
    divImg.className = "item__img"

    let a = document.createElement("a")
    // a.setAttribute("href", "#")

    let img = document.createElement("img")
    img.setAttribute("src", productImage)
    img.setAttribute("style", "width:85px;height:85px;")
    img.setAttribute("alt", "parfum-alt")

    a.appendChild(img)
    divImg.appendChild(a)
    divCard.appendChild(divImg)

    let divName = document.createElement("div")
    divName.className = "item__name"

    let name = document.createElement("h3")
    name.textContent = productName

    divName.appendChild(name)
    divCard.appendChild(divName)

    let divPrice = document.createElement("div")
    divPrice.className = "item__price"

    let price = document.createElement("h3")
    price.textContent = productPrice + ' RON'

    divPrice.appendChild(price)
    divCard.appendChild(divPrice)

    let divCart = document.createElement("div")
    divCart.className = "item__add"

    let iconAdd = document.createElement("i")
    iconAdd.className = "fa fa-shopping-cart"
    // cand este apasata iconita cart -> adauga produs in cos
    iconAdd.setAttribute("onClick", `addToCart("${productFav.productId}")`)

    divCart.appendChild(iconAdd)
    divCard.appendChild(divCart)

    let divRemove = document.createElement("div")
    divRemove.className = "item__remove"

    let iconRemove = document.createElement("i")
    iconRemove.className = "fa fa-trash"
    // cand este apasata iconita de stergere produs din cos
    iconRemove.setAttribute("onClick", `removeFromFav("${productFav._id}")`)

    divRemove.appendChild(iconRemove)
    divCard.appendChild(divRemove)
  

    const currentDiv = document.getElementById("reper-sg")
    insertAfter(divCard, currentDiv)  
}

// open html => use url
fetch("/get-api-suggestions", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => {

    // Converting received data to JSON
    if(response.status === 401) {
        window.location.href = "/Login.html"
        window.alert("You must login to view the Favorite page!")
    }
    else {
        return response.json();
    }
  })
  .then((json) => {
    //Loop through each data
    for(var i = 0; i < json.favorites.length; i++) {
        var productFav = json.favorites[i]
        var productName = json.names[i]
        var productImage = json.images[i]
        var productPrice = json.prices[i]

        console.log("data2:", productFav, productName, productImage, productPrice)
        addProductToSuggestion(productFav, productName, productImage, productPrice)
    }
  })
  .catch((err) => {
    console.log(err);
  });
