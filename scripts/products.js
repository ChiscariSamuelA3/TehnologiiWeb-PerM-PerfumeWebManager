// // open html => use url
// fetch("/get-products", {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json'
//   }

// }).then(response => {
//   // Converting received data to JSON
  
//   return response.json();
// }).then(json => {

//   // Create a variable to store HTML
//   let li = `<tr><th>Name</th><th>Smell</th></tr>`
//   console.log(json)
  
//   // Loop through each data and add a table row
//   for(var i = 0, len = json.length; i < len; ++i) {
//     var product = json[i];
//     li += `
//       <tr>
//         <td>${product.name}</td>
//         <td>${product.smell}</td>
//       </tr>`
//   }

//    document.getElementById("products").innerHTML = li
// }).catch(err => {
//   console.log(err)
// })

// open html => use url
fetch("/get-products", {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }

}).then(response => {
  // Converting received data to JSON
  
  return response.json();
}).then(json => {

  // Create a variable to store HTML
  
  console.log(json)
  
  // Loop through each data and add a table row
  for(var i = 0, len = json.length; i < len; ++i) {
    var product = json[i];
    let labels = `
      <h2>#${product.season}&nbsp;</h2>
      <h2>#${product.gender}&nbsp;</h2>
      <h2>#${product.smell}&nbsp;</h2>
      `
      document.getElementsByClassName('product-labels')[i].innerHTML = labels

      labels = `<img src="${product.imageurl}" style="width:255px;height:250px;" alt="parfum-alt" />`

      document.getElementsByClassName('product-image')[i].innerHTML = labels
    }
   
}).catch(err => {
  console.log(err)
})