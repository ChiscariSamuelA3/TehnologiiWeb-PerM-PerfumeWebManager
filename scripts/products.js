// const apiUrl = 'http://localhost:5500'

// async function fetchProducts() {
//   try {
//     const response = await fetch(`${apiUrl}/get-products`, {
//         mode: 'no-cors' // 'cors' by default
//       })

//     console.log(response)

//     if (!response.ok) {
//       throw new Error(`Faild to fetch products: ${response.status}`);
//     }

//     return await response.json();
//   } catch (err) {
//     console.log(err);
//   }
// }

// function listsProducts(productContainerId) {
//     const productContainer = document.getElementById(productContainerId)

//     if(!productContainer) {
//         return
//     }

//     fetchProducts().then(products => {
//         if(!products) {
//             productContainer.innerHTML = 'No products fetched'
//             return
//         }

//         for(const product of products) {
//             //productContainer.appendChild(productElement(product))
//             productElement(product)
//         }
//     })
//     .catch(err => {
//         console.log(err)
//     })

// }

// function productElement(product) {
//     console.log(product)

// }

// async function fetchProducts() {
//   const body = {}

//   await fetch('/get-products', {
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json"
//     }  
//   }).then(res => {
//     if(res.status === 200) {
//       console.log("AICII")
//     }
//   })
// }

// function listsProducts(productContainerId) {
//       const productContainer = document.getElementById(productContainerId)
  
//       if(!productContainer) {
//           return
//       }
  
//       fetchProducts()
  
//   }

// open html => use url
fetch("http://localhost:5500/get-products", {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*'
  },
  mode: 'no-cors'

}).then(response => {
  // Converting received data to JSON
  console.log(response)
  response.text();
}).then(json => {

  // Create a variable to store HTML
  let li = `<tr><th>Name</th><th>Smell</th></tr>`
 
  // Loop through each data and add a table row
  // json.foreach(product => {
  //    li += `
  //       <tr>
  //         <td>${product.name}</td>
  //         <td>${product.smell}</td>
  //       </tr>` 

  //  })

  //  document.getElementById("products").innerHTML = li
}).catch(err => {
  console.log(err)
})