const form = document.getElementById('register-form')

form.addEventListener('submit', userRegister)

async function userRegister(event) {
    event.preventDefault()

    // form data
    const username = document.getElementById('regname').value
    const password1 = document.getElementById('regpass1').value
    const email = document.getElementById('regmail').value
    const password2 = document.getElementById('regpass2').value

    console.log("[register]", username, password1, email, password2)

    await fetch('/add-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password1,
            email,
            password2
        })
    }).then(res => {
        return res.json()
    }).then(json => {
        console.log(`http://localhost:5500${json.route}`)
        window.location.href = json.route
        window.alert(json.message)
    })

}