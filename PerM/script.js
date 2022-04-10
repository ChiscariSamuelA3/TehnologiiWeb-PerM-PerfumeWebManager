var acc = document.getElementsByClassName('filter');
var i;
for (i = 0; i < acc.length; i++) {
    
    acc[i].addEventListener("click", function() {
            var panel = this.nextElementSibling;
           
            if (panel.style.display === "none") {
                panel.style.display = "block";
            } 
            else {
                panel.style.display = "none";
            }
        });
}
