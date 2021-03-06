/*sidebar fileters toggle*/
var acc = document.getElementsByClassName("filter");
var i;
for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    var panel = this.nextElementSibling;

    if (panel.style.display === "none") {
      panel.style.display = "block";
    } else {
      panel.style.display = "none";
    }
  });
}

/*count add-to-cart*/
let cart_text = document.querySelector(".cart .text");
let cart_icon = document.querySelector(".cart .icon");

console.log(cart_text);
console.log(cart_icon);

const mapIdCount = new Map();
let addButton = document.getElementsByClassName("button-cart");

for (let b of addButton) {
  b.onclick = (e) => {
    /*
    in meniul orizontal (text)
    si cel vertical (icon)
    este actualizat numarul de produse adaugate in cos
    */
    let count_text = Number(cart_text.getAttribute("product-count") || 0);
    let count_icon = Number(cart_icon.getAttribute("product-count") || 0);
    cart_text.setAttribute("product-count", count_text + 1);
    cart_icon.setAttribute("product-count", count_icon + 1);

    /*button value
    retine cate produse de un anumit tip au fost adaugate in cos*/
    b.setAttribute("value", 1 + parseInt(b.getAttribute("value") || 0));
    console.log(b.getAttribute("value"));
  };
}
