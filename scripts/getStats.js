let maxSum = 0
let maxAvg = 0

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}

function addHtmlStat(product, avg, numSales, totalSum) {

    // new div element
    const divCard = document.createElement("tr")
    divCard.className = "stats"

    let thName = document.createElement("td")
    thName.className = "name"
    thName.textContent = product.name
    divCard.appendChild(thName)

    let thCategory = document.createElement("td")

    if(totalSum === maxSum || avg === maxAvg) {
        thCategory.className = "max-val"
    }
    else {
        thCategory.className = "category"
    }

    thCategory.textContent = product.category
    divCard.appendChild(thCategory)

    let thSeason = document.createElement("td")
    thSeason.className = "season"
    thSeason.textContent = product.season
    divCard.appendChild(thSeason)

    let thGender = document.createElement("td")
    thGender.className = "gender"
    thGender.textContent = product.gender
    divCard.appendChild(thGender)

    let thSmell = document.createElement("td")
    thSmell.className = "smell"
    thSmell.textContent = product.smell
    divCard.appendChild(thSmell)

    let thinitstock = document.createElement("td")
    thinitstock.className = "init-quantity"
    thinitstock.textContent = product.initialstock
    divCard.appendChild(thinitstock)

    let thcurstock = document.createElement("td")
    thcurstock.className = "cur-quantity"
    thcurstock.textContent = product.quantity
    divCard.appendChild(thcurstock)

    let thAvg = document.createElement("td")
    
    thAvg.textContent = avg
    if(avg === maxAvg)
        thAvg.className = "max-val"
    else {
        thAvg.className = "review"
    }
    divCard.appendChild(thAvg)

    let thPrice = document.createElement("td")
    thPrice.className = "price"
    thPrice.textContent = product.price
    divCard.appendChild(thPrice)

    let thSales = document.createElement("td")
    thSales.className = "num-sales"
    thSales.textContent = numSales
    divCard.appendChild(thSales)

    let thSum = document.createElement("td")
    thSum.className = "total-sum"
    thSum.textContent = totalSum
    if(totalSum === maxSum)
        thSum.className = "max-val"
    else {
        thSum.className = "total-sum"
    }
    divCard.appendChild(thSum)

    const currentDiv = document.getElementById("row-reper")
    insertAfter(divCard, currentDiv)  
}

// open html => use url
fetch("/get-api-stats", {
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
            //Loop through each data
            for(var i = json.products.length - 1; i >= 0; i--) {
                var product = json.products[i]
                var avg = json.avgReviews[i]
                var numSales = product.initialstock - product.quantity
                var totalSum = product.price * numSales
                if(avg > maxAvg)
                    maxAvg = avg
                if(totalSum > maxSum)
                    maxSum = totalSum
            }

            for(var i = json.products.length - 1; i >= 0; i--) {
                var product = json.products[i]
                var avg = json.avgReviews[i]
                var numSales = product.initialstock - product.quantity
                var totalSum = product.price * numSales

                addHtmlStat(product, avg, numSales, totalSum)
            }

        }
    })
    .catch((err) => {
      console.log(err);
    });
  