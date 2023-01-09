



function listenSearch() {
    document.querySelector('#search_input_companies').addEventListener('input', (event) => {
        const q = event.target.value
        const filtredData = allData.companies.companies.filter((comp) => {
            textInName = comp.name.toLowerCase().includes(q.toLowerCase())
            textInAddress = comp.address.toLowerCase().includes(q.toLowerCase())
            return textInName || textInAddress
        })
        fillCompanies(filtredData)
    })
    document.querySelector('#search_input_networks').addEventListener('input', (event) => {
        const q = event.target.value
        const filtredData = allData.networks.filter((net) => net.name.toLowerCase().includes(q.toLowerCase()))
        fillNetworks(filtredData)
    })
}









function selectCompanies(id) {
    const checkboxEl = document.querySelector(`#check_c_${id}`)
    checkboxEl.checked = !checkboxEl.checked
    if (checkboxEl.checked) {
        selectedCompanies.push(id)
    } else {
        selectedCompanies.splice(selectedCompanies.indexOf(id), 1)
    }
}



listenSearch()
