async function removeFromFav(favId) {
    console.log("FAV ID", favId)

    await fetch('/delete-api-fav', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            favId
        })
    }).then(response => {
        return response.json();
    }).then(json => {
        window.location.href = "/favorite.html"
        console.log(json)
    })
}