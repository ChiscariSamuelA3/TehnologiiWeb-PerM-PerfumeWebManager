const queryString = window.location.search;
const urlParameters = new URLSearchParams(queryString);
const id = urlParameters.get('id');

function initProduct(product) {
    console.log("PRODUCT INIT", product)

    // init product
    let productImage = `
    <img
    src="${product.imageurl}"
    style="width:500px; height: 500px"
    alt="product"
    />
    `
    document
    .getElementsByClassName('product-slider__main-item')[0]
    .innerHTML = productImage   
    
    document.getElementById('perfumeName').innerText = product.name
    document.getElementById('perfumePrice').innerText = product.price + ' RON'
    document.getElementById('shortDescription').innerText = product.shortdescription
    document.getElementById('longDescription').innerText = product.longdescription

    document.getElementsByClassName('btn btn-icon')[0].setAttribute("onclick", `addToCart("${product._id}")`)
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