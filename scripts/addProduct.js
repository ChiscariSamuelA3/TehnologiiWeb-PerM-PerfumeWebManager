const form = document.getElementById('perfume-form')

form.addEventListener('submit', userRegister)

async function userRegister(event) {
    event.preventDefault()
    
    // form data
    const name = document.getElementById('perfname').value
    const gender = document.getElementById('gender').value
    const season = document.getElementById('season').value
    const smell = document.getElementById('smell').value
    const price = document.getElementById('price').value
    const longdescription = document.getElementById('LDesc').value
    const shortdescription = document.getElementById('SDesc').value
    const imageurl = document.getElementById('photo').value
    const initialstock = document.getElementById('quantity').value
    const category = document.getElementById('category').value
    const quantity = initialstock
    
    await fetch('/add-product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name, 
            gender, 
            season, 
            smell, 
            price, 
            longdescription, 
            shortdescription, 
            imageurl, 
            quantity, 
            category, 
            initialstock
        })
    }).then(res => {
        return res.json()
    }).then(json => {

        console.log("HEREEEE")
        window.location.href = json.route
        window.alert(json.message)
    })

}