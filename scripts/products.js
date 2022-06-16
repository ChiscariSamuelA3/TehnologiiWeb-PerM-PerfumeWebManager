// function addToCartFunction(productId, userId) {

//   console.log("[product] prodID: ", productId)
//   console.log("[product] userId: ", userId)
// }


function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}

function addProduct(product) {
  console.log("[prod-js]", product);

  // new div element
  const divCard = document.createElement("div")
  divCard.className = "product-card"

  // div content
  let a = document.createElement("a")
  a.setAttribute("href", "product.html") // adaugare product id in url...?
  
  let divImage = document.createElement("div")
  divImage.className = "product-image"

  a.appendChild(divImage)

  let img = document.createElement("img")
  img.setAttribute("src", product.imageurl)
  img.setAttribute("style", "width:255px;height:250px;")
  img.setAttribute("alt", "parfum-alt")

  divImage.appendChild(img)

  divCard.appendChild(a)

  let divLabels = document.createElement("div")
  divLabels.className = "product-labels"

  let season = document.createElement("h2")
  season.textContent = `${product.season}`
  divLabels.appendChild(season)

  let gender = document.createElement("h2")
  gender.textContent = `__${product.gender}`
  divLabels.appendChild(gender)

  let smell = document.createElement("h2")
  smell.textContent = `__${product.smell}`
  divLabels.appendChild(smell)

  divCard.appendChild(divLabels)


  let divInfo = document.createElement("div")
  divInfo.className = "product-info"

  let pName = document.createElement("h2")
  pName.textContent = product.name
  divInfo.appendChild(pName)

  let pPrice = document.createElement("p")
  let spanPrice = document.createTextNode("span")
  spanPrice.textContent = `${product.price} RON`
  pPrice.appendChild(spanPrice)
  divInfo.appendChild(pPrice)


  let divButtons = document.createElement("div")
  divButtons.className = "product-buttons"

  let cartButton = document.createElement("button")
  cartButton.className = "button-cart"
  cartButton.name = "addcart"

  // cand este apasat butonul "Add To Cart":
  cartButton.setAttribute("onClick", `addToCart("${product._id}")`)
  
  cartButton.textContent = "Add To Cart"
  divButtons.appendChild(cartButton)

  let favoriteButton = document.createElement("button")
  favoriteButton.className = "button-favorite"
  favoriteButton.name = "addfav"
  favoriteButton.textContent = "Add To Favorite"
  divButtons.appendChild(favoriteButton)

  divInfo.appendChild(divButtons)

  divCard.appendChild(divInfo)

  const currentDiv = document.getElementById("reper")
  insertAfter(divCard, currentDiv)  
}


// open html => use url
fetch("/get-products", {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }

}).then(response => {
  // Converting received data to JSON
  
  return response.json();
}).then(json => {

  // Loop through each data
  for(var i = json.length - 1; i >= 0; i--) {
    var product = json[i];

    addProduct(product)
  }
   
}).catch(err => {
  console.log(err)
})