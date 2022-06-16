

async function addToCart(clickedProductId) {

    await fetch('/add-cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            clickedProductId
        })
    }).then(res => {
        // de tratat aici ALERT in functie de status cod 401, 403
        return res.json()
    }).then(json => {

        console.log(json)
    })
}