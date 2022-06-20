const formFilters = document.getElementById('filters-form')

formFilters.addEventListener('submit', filtersHandle)

async function filtersHandle(event) {
    event.preventDefault()

    const floral = document.getElementById('chanel').checked
    const oriental = document.getElementById('sauvage').checked
    const lemnos = document.getElementById('prada').checked

    window.location.href = `/filter.html?floral=${floral}&oriental=${oriental}&lemnos=${lemnos}`
}