// open html => use url
fetch("/get-api-carts", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    // Converting received data to JSON

    console.log("[res]", response.status)
    if(response.status === 401) {
        window.location.href = "/Login.html"
        window.alert("You must login to view the cart page!")
    }
    else {
        return response.json();
    }
  })
  .then((json) => {
    console.log(json)
    
  })
  .catch((err) => {
    console.log(err);
  });
