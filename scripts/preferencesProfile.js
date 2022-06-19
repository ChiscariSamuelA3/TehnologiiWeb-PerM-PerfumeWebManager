// open html => use url
fetch("/get-api-preferences", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  
  }).then(response => {
    // Converting received data to JSON
    if(response.status !== 204) {
        return response.json();
    }
    else {
        let genderh3 = document.getElementById('current-gender')
        genderh3.textContent = 'Gender'

        let seasonh3 = document.getElementById('current-season')
        seasonh3.textContent = 'Season'
    
        let smellh3 = document.getElementById('current-smell')
        smellh3.textContent = 'Smell'

        return response.status;
    }
  }).then(json => {
  
    console.log("PREFERNCES", json[0])

    let genderh3 = document.getElementById('current-gender')
    genderh3.textContent = 'Current gender: ' + json[0].gender
    genderh3.setAttribute('style', 'color:blue')

    let seasonh3 = document.getElementById('current-season')
    seasonh3.textContent = 'Current season: ' + json[0].season
    seasonh3.setAttribute('style', 'color:blue')

    let smellh3 = document.getElementById('current-smell')
    smellh3.textContent = 'Current smell: ' + json[0].smell
    smellh3.setAttribute('style', 'color:blue')

  }).catch(err => {
    console.log(err)
  })