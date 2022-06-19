const form = document.getElementById('login-form')

form.addEventListener('submit', loginUser)

async function loginUser(event) {
    event.preventDefault()

    // form data
    const username = document.getElementById('logname').value
    const password = document.getElementById('logpass').value

    console.log("[login]", username, password)

    await fetch('/login-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    }).then(res => {
        return res.json()
    }).then(json => {

        console.log("[login]", json.information)//token...

        let date = new Date();
        date.setTime(date.getTime() + (35 * 60 * 1000)); //35 min cookie
        const expires = date.toUTCString();
        document.cookie = `jwt=${json.information}; expires=${expires}; path=/`; 

        window.location.href = json.route
        window.alert(json.message)
    })
}