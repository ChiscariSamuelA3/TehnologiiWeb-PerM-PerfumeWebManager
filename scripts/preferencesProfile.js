// open html => use url
fetch("/get-api-preferences", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  
  }).then(response => {
    // Converting received data to JSON
    
    return response.json();
  }).then(json => {
  
    console.log("PREFERNCES", json[0])
     
  }).catch(err => {
    console.log(err)
  })