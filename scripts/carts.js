function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}

function addProductToCart(productCart, productName, productImage) {

    // new div element
    const divCard = document.createElement("div")
    divCard.className = "item item--cart"

    // div content
    let divImg = document.createElement("div")
    divImg.className = "item__img"

    let a = document.createElement("a")
    a.setAttribute("href", "#")

    let img = document.createElement("img")
    img.setAttribute("src", productImage)
    img.setAttribute("style", "width:95px;height:95px;")
    img.setAttribute("alt", "parfum-alt")

    a.appendChild(img)
    divImg.appendChild(a)
    divCard.appendChild(divImg)

    let divName = document.createElement("div")
    divName.className = "item__name"

    let nameh3 = document.createElement("h3")
    nameh3.textContent = productName
    divName.appendChild(nameh3)

    divCard.appendChild(divName)

    let divQuantity = document.createElement("div")
    divQuantity.className = "item__quantity"

    let quantityh3 = document.createElement("h3")
    quantityh3.textContent = productCart.quantity
    divQuantity.appendChild(quantityh3)
    divCard.appendChild(divQuantity)

    let divTotal = document.createElement("div")
    divTotal.className = "item__total"

    let totalh3 = document.createElement("h3")
    totalh3.textContent = productCart.price * productCart.quantity// total: price * quantity
    divTotal.appendChild(totalh3)
    divCard.appendChild(divTotal)

    let divRemove = document.createElement("div")
    divRemove.className = "item__remove"

    let iconRemove = document.createElement("i")
    iconRemove.className = "fa fa-trash"
    // cand este apasata iconita de stergere produs din cos
    iconRemove.setAttribute("onClick", `removeFromCart("${productCart._id}")`)

    divRemove.appendChild(iconRemove)
    divCard.appendChild(divRemove)
  
    const currentDiv = document.getElementById("cart-reper")
    insertAfter(divCard, currentDiv)  
}

// open html => use url
fetch("/get-api-carts", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => {

    // Converting received data to JSON
    if(response.status === 401) {
        window.location.href = "/Login.html"
        window.alert("You must login to view the cart page!")
    }
    else {
        return response.json();
    }
  })
  .then((json) => {
    let quantity = 0
    let amount = 0
    //Loop through each data
    for(var i = 0; i < json.carts.length; i++) {
        var productCart = json.carts[i]
        var productName = json.names[i]
        var productImage = json.images[i]

        quantity = quantity + productCart.quantity
        amount = amount + productCart.price * productCart.quantity

        console.log("data:", productCart, productName, productImage)
        addProductToCart(productCart, productName, productImage)
    }

    const totalItems = document.getElementById("total-items")
    totalItems.textContent = `Quantity: ${quantity}`

    const totalAmount = document.getElementById("total-amount")
    totalAmount.textContent = `Amount: ${amount}`
    
  })
  .catch((err) => {
    console.log(err);
  });
