const formSearch = document.getElementById("search-form");
formSearch.addEventListener("submit", searchParam);

async function searchParam(event) {
  event.preventDefault();

  // form data
  const param = document.getElementById("search-box-id").value;

  console.log("[SEARCH]", param);

  await fetch("/get-products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      // Converting received data to JSON

      return response.json();
    })
    .then((json) => {
      if (param.length > 15) {
        window.alert('Name too long!')
      } 
      else if(!param.match(/^[a-zA-Z0-9_.-]*$/)) {
        window.alert('Invalid characters $[]() etc.!')
      }
      else {
        let isParamName = false;
        // Loop through each data
        for (var i = json.length - 1; i >= 0; i--) {
          var product = json[i];

          if (product.name.toLowerCase() === param.toLowerCase()) {
            window.location.href = "/product.html?id=" + product._id;
            isParamName = true;
            break;
          }
        }

        if (isParamName === false) {
          window.alert(`No products with ${param} name were found!`);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
