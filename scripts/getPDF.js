function getPdf() {
    // open html => use url
fetch('/api/stats/pdf', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
  
      // Converting received data to JSON
      if(response.status === 401) {
          window.location.href = "/Login.html"
          window.alert("You must login as an ADMIN to view the STATS!")

          return response.status
      }
      else if(response.status === 409) {
           window.location.href = "/Login.html"
           window.alert("You are not an ADMIN!")

           return response.status
      }
      else {
          return response.json();
      }
    })
    .then((json) => {
        if(json !== 401 && json !== 409) {
            window.location.href = json.route
        }
    })
    .catch((err) => {
      console.log(err);
    });
}
