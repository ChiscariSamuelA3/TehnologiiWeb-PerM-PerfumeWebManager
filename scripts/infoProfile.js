function userInfo(user) {
    console.log("USER INFO", user)

    // user info
    let userInfo = `
    <h3>Information</h3>
    <div class="info_data">
        <div class="data">
            <h4>Email</h4>
            <p>${user.email}</p>
        </div>
        <div class="data">
            <h4>Username</h4>
            <p>${user.username}</p>
        </div>
    </div>
    `
    document
    .getElementsByClassName('info')[0]
    .innerHTML = userInfo
}


// open html => use url
fetch("/get-api-user", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  
  }).then(response => {
    // Converting received data to JSON
    if(response.status === 401) {
        window.location.href = "/Login.html"
        window.alert("You must login to view Profile page!")
    }
    else {
        return response.json();
    }
  }).then(json => {
  
    userInfo(json[0])
     
  }).catch(err => {
    console.log(err)
  })