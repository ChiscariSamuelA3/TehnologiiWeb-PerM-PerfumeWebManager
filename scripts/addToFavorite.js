async function addToFavorite(clickedProductId) {

    await fetch('/add-fav', {
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
            window.alert("You must login to add product to favorite list!")
        }
        else if(response.status === 204) {
            window.location.href = "/index.html"
            window.alert("Product already exists in favorite list!")
        }
        else {
            return response.json();
        }
    }).then(json => {

        console.log(json)
    })
}