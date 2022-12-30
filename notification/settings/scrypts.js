const DEFAULT_IMAGE_URL = 'http://ap.cd31953.tmweb.ru/sites/default/files/placeholder_image.jpg'
const COUNT_STAR = 5
const starsEl = document.getElementsByClassName('star')
const titleProviders = document.querySelector('#title_providers')

let selectedStar = 0
let selectedNetworks = []
let selectedProviders = []
let selectedCompanies = []

let allData = null

let openedWindow = 'networks'
const textBtn = {
    main: 'Сохранить',
    companies: 'Выбрать',
    networks: 'Далее'
}
const prevoiceWindow = {
    main: 'networks',
    companies: 'main'
}

function listenStars() {
    for (const i in starsEl) {
        try {
            starsEl[i].addEventListener('click', (event) => {
                const id = Number(event.target.id.split('star_')[1])
                if (selectedStar === id) {
                    selectedStar = 0
                    fillStar(selectedStar)
                    return
                }
                selectedStar = id
            })
            starsEl[i].addEventListener('mouseover', (event) => {
                const id = Number(event.target.id.split('star_')[1])
                fillStar(id)
            })
            starsEl[i].addEventListener('mouseout', (event) => {
                const id = Number(event.target.id.split('star_')[1])
                fillStar(selectedStar)
            })
        } catch (e) {
        }
    }
}

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

function fillStar(count) {
    count = count | selectedStar
    for (let i = 0; i < COUNT_STAR; i++) {
        if (i <= count - 1) {
            starsEl[i].classList.add('text-yellow-400')
            starsEl[i].classList.remove('text-gray-300')
        } else {
            if (starsEl[i].classList.contains('text-yellow-400')) {
                starsEl[i].classList.remove('text-yellow-400')
                starsEl[i].classList.add('text-gray-300')
            }
        }
    }
}

function openProviders() {
    const listProviders = document.querySelector('#list_providers')
    listProviders.classList.toggle('hidden')
    if (listProviders.classList.contains('hidden')) {
        document.getElementById('icon_title_provider').innerText = '+'
    } else {
        document.getElementById('icon_title_provider').innerText = '-'
    }
}

function selectProvider(id) {
    console.log(id);
    const checkbox = document.querySelector(`#prov_${id}`)
    checkbox.checked = !checkbox.checked
    if (checkbox.checked) {
        selectedProviders.push(id)
    } else {
        const i = selectedProviders.indexOf(id)
        selectedProviders.splice(i, 1)
    }
    setTitleProviders()
    // title_providers
}

function setTitleProviders() {
    const DEFAULT_NULL_TEXT = 'Выберите платформу'
    const SINGLE_PLATPHORM = ' платформа'
    const PLURAL_PLATPHORM = ' платформы'
    const BEGGINING_OF_THE_LINE = 'Выбрано '
    const BEGGINING_OF_THE_LINE_SINGLE_PLATPHORM = 'Выбрана '
    let text = ''
    if (selectedProviders.length === 0) {
        text = DEFAULT_NULL_TEXT
    } else if (selectedProviders.length === 1) {
        text = BEGGINING_OF_THE_LINE_SINGLE_PLATPHORM + selectedProviders.length + SINGLE_PLATPHORM

    } else {
        text = BEGGINING_OF_THE_LINE + selectedProviders.length + PLURAL_PLATPHORM
    }
    titleProviders.value = text
}

function openTab(tabName) {
    const btns = document.getElementsByClassName('tab_btn')
    const tabs = document.getElementsByClassName('tab')
    const tab = document.getElementById(tabName)
    if (!tab.classList.contains('hidden')) return
    for (let i = 0; i < btns.length; i++) {
        try {
            btns[i].classList.remove('border-b-[2px]')
            btns[i].classList.remove('border-[#7a5cc9]')
            btns[i].classList.remove('text-[#7a5cc9]')
            tabs[i].classList.add('hidden')
        } catch (e) {
            console.error(e)
        }
    }
    tab.classList.remove('hidden')
    const targetBtn = document.querySelector(`#${tabName}_tab`)
    targetBtn.classList.add('border-b-[2px]')
    targetBtn.classList.add('border-[#7a5cc9]')
    targetBtn.classList.add('text-[#7a5cc9]')
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

async function getData() {
    const res = await fetch("./assets/data.json")
    allData = await res.json()
    fillCompanies(allData.companies.companies)
    fillNetworks(allData.networks)
}

function setTitleCompanies() {
    const DEFAULT_NULL_TEXT = 'Выберите филиалы'
    const SINGLE_PLATPHORM = ' филиал'
    const PLURAL_PLATPHORM = ' филиала'
    const BEGGINING_OF_THE_LINE = 'Выбрано '
    const BEGGINING_OF_THE_LINE_SINGLE_PLATPHORM = 'Выбран '
    let text = ''
    const titleCompanies = document.getElementById('title_companies')
    if (selectedCompanies.length === 0) {
        titleCompanies.value = ''
        titleCompanies.placeholder = DEFAULT_NULL_TEXT
        return
    } else if (selectedCompanies.length === 1) {
        text = BEGGINING_OF_THE_LINE_SINGLE_PLATPHORM + selectedCompanies.length + SINGLE_PLATPHORM

    } else {
        text = BEGGINING_OF_THE_LINE + selectedCompanies.length + PLURAL_PLATPHORM
    }
    titleCompanies.value = text
}

async function fillNetworks(networks) {
    const container = document.querySelector('#container')
    container.innerHTML = ''
    for (const i in networks) {
        const network = networks[i]
        const isSelected = selectedNetworks.includes(network.id)
        const itemEl = document.createElement('div')
        itemEl.classList = `w-[80vw] flex items-center justify-between py-[10px] px-[20px] pb-[5px] cursor-pointer border-b border-gray-300 ${isSelected ? 'opacity-100' : 'opacity-70'} hover:opacity-100`
        itemEl.id = `net_${network.id}`
        itemEl.setAttribute('onclick', `selectNetwork(${network.id})`)
        container.appendChild(itemEl)

        const logoEl = document.createElement('img')
        logoEl.classList = 'h-[80px] w-[80px] object-contain border rounded-lg p-[5px]'
        if (network?.logo?.image?.smallUrl) {
            logoEl.setAttribute('src', network.logo.image.smallUrl)
        } else {
            logoEl.setAttribute('src', DEFAULT_IMAGE_URL)
        }
        itemEl.appendChild(logoEl)

        const itemTextEl = document.createElement('div')
        itemTextEl.classList = 'w-full mx-5'
        itemEl.appendChild(itemTextEl)

        const nameEl = document.createElement('div')
        nameEl.classList = 'font-bold'
        nameEl.innerText = network?.name
        itemTextEl.appendChild(nameEl)

        const categoryEl = document.createElement('div')
        categoryEl.classList = 'text-sm'
        categoryEl.innerText = network?.rubric.nameRu
        itemTextEl.appendChild(categoryEl)

        const checkboxEl = document.createElement('input')
        checkboxEl.setAttribute('type', 'checkbox')
        checkboxEl.classList = 'h-8 w-8'
        checkboxEl.id = `check_${network.id}`
        checkboxEl.setAttribute('onclick', `selectNetwork(${network.id})`)
        itemEl.appendChild(checkboxEl)
    }
}

async function fillCompanies(companies) {
    const listEl = document.querySelector('#companies_list')
    listEl.innerHTML = ''
    for (const i in companies) {
        const company = companies[i]
        const itemEl = document.createElement('div')
        itemEl.classList = 'flex justify-between items-center border-b pb-3 px-5 cursor-pointer opacity-80 hover:opacity-100'
        itemEl.setAttribute('onclick', `selectCompanies(${company.id})`)
        listEl.appendChild(itemEl)

        const leftColEl = document.createElement('div')
        itemEl.appendChild(leftColEl)

        const nameEl = document.createElement('div')
        nameEl.classList = 'font-bold'
        nameEl.innerText = company.name
        leftColEl.appendChild(nameEl)

        const addressEl = document.createElement('div')
        addressEl.classList = 'text-gray-400 text-sm'
        addressEl.innerText = company.address
        leftColEl.appendChild(addressEl)

        const checkBoxEl = document.createElement('input')
        checkBoxEl.setAttribute('type', 'checkbox')
        checkBoxEl.id = `check_c_${company.id}`
        checkBoxEl.classList = 'h-8 w-8'
        checkBoxEl.setAttribute('onclick', `selectCompanies(${company.id})`)
        const isSelected = selectedCompanies.includes(company.id)
        checkBoxEl.checked = isSelected
        itemEl.appendChild(checkBoxEl)
    }
}

async function selectNetwork(idNetwork) {
    const isSelected = selectedNetworks.includes(idNetwork)
    document.querySelector(`#check_${idNetwork}`).checked = !isSelected
    if (isSelected) {
        document.querySelector(`#net_${idNetwork}`).classList.remove('opacity-100')
        document.querySelector(`#net_${idNetwork}`).classList.add('opacity-70')
        delete selectedNetworks[selectedNetworks.indexOf(idNetwork)]
    } else {
        document.querySelector(`#net_${idNetwork}`).classList.remove('opacity-70')
        document.querySelector(`#net_${idNetwork}`).classList.add('opacity-100')
        selectedNetworks.push(idNetwork)
    }
    selectedNetworks = selectedNetworks.filter(Boolean)
    if (selectedNetworks.length == 0) {
        window.Telegram.WebApp.MainButton.hide()
        return
    }
    window.Telegram.WebApp.MainButton.show()
}

function openWindow(windowName) {
    document.querySelector('#companies_window').classList.add('hidden')
    document.querySelector('#networks_window').classList.add('hidden')
    document.querySelector('#main_window').classList.add('hidden')
    document.querySelector(`#${windowName}_window`).classList.remove('hidden')
    openedWindow = windowName
    window.Telegram.WebApp.MainButton.text = textBtn[windowName]
    if (windowName === 'main') {
        setTitleCompanies()
    }
}

function save() {
    if (document.querySelector('#name_group').value !== '') document.location.href = '../'
    else {
        window.Telegram.WebApp.showAlert('Укажите название группы', () => {})
    }
}

window.Telegram.WebApp.MainButton.text = 'Далее'
window.Telegram.WebApp.MainButton.color = '#63bf9a'
window.Telegram.WebApp.enableClosingConfirmation()
window.Telegram.WebApp.MainButton.onClick(() => {
    if (openedWindow === 'networks') {
        openWindow('main')
        return
    }
    if (openedWindow === 'main') {
        save()
        return
    }
    if (openedWindow === 'companies') {
        openWindow('main')
        return
    }
})
window.Telegram.WebApp.BackButton.onClick(() => {
    if (openedWindow === 'networks') {
        window.Telegram.WebApp.showConfirm('Не сохранять изменения?', (value) => {
            if (value) window.location.href = '../'
        })
        return
    } else {
        openWindow(prevoiceWindow[openedWindow])
    }
})

listenStars()
listenSearch()
getData()
