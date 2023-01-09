let providers = []
let networks = []
let companies =  []
let rating = []

async function bootstrap() {
    networks = await getAllData('networks')
    companies = await getAllData('companies')
    providers = await getAllData('providers')
    rating = await getAllData('rating')
    fillNetworksList(networks)
    fillMainPage()
    fillCompaniesPage()
    listenTelegramInterface()
}

async function getAllData(urn) {
    try {
        const response = await makeRequest(urn)
        if (response.status !== 200) return null
        return response.data
    } catch(e) {
        console.error(e)
        return []
    }
}

window.onload = bootstrap()
