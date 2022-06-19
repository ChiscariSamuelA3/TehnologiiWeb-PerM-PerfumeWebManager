const form = document.getElementsByClassName('right')[0]

form.addEventListener('submit', savePref)

async function savePref(event) {
    event.preventDefault()
    
    // form data
    const gender = document.getElementById('gender').value
    const season = document.getElementById('season').value
    const smell = document.getElementById('fruit').value

    console.log("[profile-pref]", gender, season, smell)

    await fetch('/add-preference', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          gender,
          season, 
          smell
        })
    }).then(res => {
        return res.json()
    }).then(json => {
        window.location.href = json.route
        window.alert(json.message)
    })

}