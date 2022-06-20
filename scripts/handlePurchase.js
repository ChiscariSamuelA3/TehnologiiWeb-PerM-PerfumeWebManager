const form = document.getElementById('address-form')

form.addEventListener('submit', confirmOrder)

async function confirmOrder(event) {
    event.preventDefault()

    await fetch('/confirm-order', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res.json()
    }).then(json => {
        let total = 0
        let amount = 0
        for(const product of json.carts) {
            total += product.quantity
            amount += (product.quantity * product.price)
        }
        window.alert(`Order - quantity: ${total} - amount: ${amount} - Confirmed!`)
        window.location.href = './index.html'
    })

  
}