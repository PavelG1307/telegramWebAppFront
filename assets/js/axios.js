async function makeRequest(urn, method, data, query) {
    const url = await getUrl(urn)
    if (NODE_ENV === 'dev' && method && method !== 'get') {
        console.log(`Запрос: ${url}\nData:`)
        console.log(data);
        return
    }
    const response = await axios({
        url: url,
        method: method || 'get',
        data: data || null,
        query: query || null
    })
    return response
}

async function getUrl(urn) {
    if (NODE_ENV === 'dev') {
        return `${BACKEND_URL}/example/${urn}.json`
    }
    return `${BACKEND_URL}/${urn}`

}
