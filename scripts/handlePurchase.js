const form = document.getElementById('address-form')

form.addEventListener('submit', loginUser)

async function loginUser(event) {
    event.preventDefault()

    window.alert("Order Confirmed!")
    window.location.href = './index.html'
}