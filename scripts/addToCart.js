async function addToCart(clickedProductId) {

    await fetch('/add-cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            clickedProductId
        })
    }).then(response => {

        if(response.status === 401) {
            window.location.href = "/index.html"
            window.alert("You must login to add product to cart!")
        }
        else if(response.status === 403) {
            window.location.href = "/index.html"
            window.alert("The product is no longer in stock!")
        }
        else {
            return response.json();
        }
    }).then(json => {

        console.log(json)
    })
}