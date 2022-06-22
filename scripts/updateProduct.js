const form = document.getElementById('perfume-form')

form.addEventListener('submit', loginUser)

async function loginUser(event) {
    event.preventDefault()

    // form data
    const id = document.getElementById('perfname').value
    const quantity = document.getElementById('quantity').value

    console.log("[update]", id, quantity)

    await fetch(`/update-product/${id}/${quantity}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {

        if(res.status === 401) {
            window.alert("You must login as an ADMIN to update a product!")
            window.location.href = "/Login.html"
            return res.status
        }
        else if(res.status === 404) {
            window.alert("Product not found!")
            window.location.href = "/Update.html"
            return res.status
        }
        else if(res.status === 409) {
            window.alert("You are not an ADMIN!")
            window.location.href = "/index.html"
            return res.status
        }
        else {
            return res.json()
        }
    }).then(json => {
        if(json !== 401 && json !== 404 && json !== 409) {
            window.alert("Product updated!")
            window.location.href = "/index.html"
        }
        
    })
}