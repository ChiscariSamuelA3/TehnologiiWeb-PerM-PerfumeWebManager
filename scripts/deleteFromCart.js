async function removeFromCart(cartId) {
    console.log("CART ID", cartId)

    await fetch('/delete-api-cart', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cartId
        })
    }).then(response => {
        return response.json();
    }).then(json => {
        window.location.href = "/cart.html"
        console.log(json)
    })
}