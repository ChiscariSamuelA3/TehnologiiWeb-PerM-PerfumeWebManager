const queryString = window.location.search;
const urlParameters = new URLSearchParams(queryString);
const floral = urlParameters.get('floral');
const oriental = urlParameters.get('oriental');
const lemnos = urlParameters.get('lemnos');

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
    //a.setAttribute("href", "product.html") // adaugare product id in url...?
    
    let divImage = document.createElement("div")
    divImage.className = "product-image"
  
    a.appendChild(divImage)
  
    let img = document.createElement("img")
    img.setAttribute("src", product.imageurl)
    img.setAttribute("style", "width:255px;height:250px;")
    img.setAttribute("alt", "parfum-alt")
    // cand este apasata imaginea -> redirectionare catre pagina produsului:
    img.setAttribute("onClick", `location.href="/product.html?id=${product._id}"`)
    //img.setAttribute("onClick", `productPage("${product}")`)
  
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

    let categorie = document.createElement("h3") 
    categorie.textContent = '#' + product.category
    divInfo.appendChild(categorie)
  
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
  
      // cand este apasat butonul "Add To Favorite":
    favoriteButton.setAttribute("onClick", `addToFavorite("${product._id}")`)
  
    favoriteButton.textContent = "Add To Favorite"
    divButtons.appendChild(favoriteButton)
  
    divInfo.appendChild(divButtons)
  
    divCard.appendChild(divInfo)
  
    const currentDiv = document.getElementById("reper")
    insertAfter(divCard, currentDiv)  
  }

// open html => use url

fetch(`/get-filters/${floral}/${oriental}/${lemnos}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  
  }).then(response => {
    // Converting received data to JSON
    return response.json()
    
  }).then(json => {
    // Loop through each data
  for(var i = json.length - 1; i >= 0; i--) {
    var product = json[i];

    console.log("PRODUCT FILTER", product)
    addProduct(product)
  }
  }).catch(err => {
    console.log(err)
  })



//window.alert(`/filter.html?floral=${floral}&oriental=${oriental}&lemnos=${lemnos}`)
    //location.href = `/filter.html?floral=${floral}&oriental=${oriental}&lemnos=${lemnos}`

    // await fetch(`/get-filters/${floral}/${oriental}/${lemnos}`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
      
    //   }).then(response => {
    //     // Converting received data to JSON
    //     return response.json()
        
    //   }).then(json => {
    //     console.log("PRODUSE FILTRATE", json)
    //   }).catch(err => {
    //     console.log(err)
    //   })