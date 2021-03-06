const queryString = window.location.search;
const urlParameters = new URLSearchParams(queryString);
const id = urlParameters.get('id');

function initProduct(product) {
    console.log("PRODUCT INIT", product)

    // init product
    let productImage = `
    <img
    src="${product.imageurl}"
    style="width:400px; height: 400px"
    alt="product"
    />
    `
    document
    .getElementsByClassName('product-slider__main-item')[0]
    .innerHTML = productImage   
    
    document.getElementById('perfumeName').innerText = product.name

    const nume = document.getElementById('perfumeName')
    const eticheta = document.createElement('h2')
    eticheta.textContent = product.gender + '-' + product.season + '-' + product.smell
    nume.appendChild(eticheta)
    const categorie = document.createElement('h2')
    categorie.textContent = product.category
    nume.appendChild(categorie)


    document.getElementById('perfumePrice').innerText = product.price + ' RON'
    document.getElementById('shortDescription').innerText = product.shortdescription
    document.getElementById('longDescription').innerText = product.longdescription

    document.getElementsByClassName('btn btn-icon')[0].setAttribute("onclick", `addToCart("${product._id}")`)
    document.getElementsByClassName('btn btn-grey btn-icon')[0].setAttribute("onclick", `addToFavorite("${product._id}")`)
}

// open html => use url
fetch(`/get-product/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  
  }).then(response => {
    // Converting received data to JSON
    
    return response.json();
  }).then(json => {
  
    initProduct(json[0])
     
  }).catch(err => {
    console.log(err)
  })