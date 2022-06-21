const queryStringId = window.location.search;
const urlParametersId = new URLSearchParams(queryStringId);
const idProd = urlParametersId.get("id");

const formReview = document.getElementById('review-form')

formReview.addEventListener('submit', postReview)

async function postReview(event) {
    event.preventDefault()

    // form data
    const reviewContent = document.getElementById('review-id').value
    const reviewRate = document.getElementById('rating').value

    console.log("[addReview]", reviewContent, reviewRate, idProd)

    await fetch('/add-review', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idProd,
            reviewContent,
            reviewRate
        })
    }).then(res => {
        return res.json()
    }).then(json => {
        console.log(`http://localhost:5500${json.route}`)
        window.location.href = json.route
        window.alert(json.message)
    })

}