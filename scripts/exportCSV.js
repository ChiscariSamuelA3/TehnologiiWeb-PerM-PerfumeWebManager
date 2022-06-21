function exportPerfumes()
{
    let CSVfile = 'data:text/csv;charset=utf-8,name,season,gender,smell,category,initial_stock,current_stock\n';
    
    fetch("/get-products", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      
      }).then(response => {
        // Converting received data to JSON
        
        return response.json();
      }).then(json => {
      
        // Loop through each data
        for(var i = json.length - 1; i >= 0; i--) {
          var product = json[i];
          CSVfile += `${product.name},${product.season},${product.gender},${product.smell},${product.category},${product.initialstock},${product.quantity}\n`
        }
        var encodedUri = encodeURI(CSVfile);
        window.open(encodedUri)

      }).catch(err => {
        console.log(err)
      })
}