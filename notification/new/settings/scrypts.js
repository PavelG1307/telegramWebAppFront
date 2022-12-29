const starsEl = document.getElementsByClassName('star')
selectedStar = 0
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

const COUNT_STAR = 5
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
    document.querySelector('#list_providers').classList.toggle('hidden')
}

let selectedProviders = []

const titleProviders = document.querySelector('#title_providers')
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

let tabIsClosed = true

window.Telegram.WebApp.BackButton.onClick(() => {
    if (tabIsClosed) {
        window.location.href = '../networks'
        return
    } else {
        closeCompanies()
    }
})


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

async function fill(companies) {
    const listEl = document.querySelector('#companies_list')
    listEl.innerHTML = ''
    for (const i in companies) {
        const company = companies[i]
        const itemEl = document.createElement('div')
        itemEl.classList = 'flex justify-between items-center border-b pb-3 px-5 cursor-pointer opacity-70 hover:opacity-100'
        itemEl.setAttribute('onclick', `selectCompanies(${company.id})`)
        listEl.appendChild(itemEl)

        const leftColEl = document.createElement('div')
        itemEl.appendChild(leftColEl)

        const nameEl = document.createElement('div')
        nameEl.classList = 'font-bold'
        nameEl.innerText = company.name
        leftColEl.appendChild(nameEl)

        const addressEl = document.createElement('div')
        addressEl.classList = 'text-gray-300 text-sm'
        addressEl.innerText = company.address
        leftColEl.appendChild(addressEl)

        const checkBoxEl = document.createElement('input')
        checkBoxEl.setAttribute('type', 'checkbox')
        checkBoxEl.id = `check_c_${company.id}`
        checkBoxEl.setAttribute('onclick', `selectCompanies(${company.id})`)
        const isSelected = selectedCompanies.includes(company.id)
        checkBoxEl.checked = isSelected
        itemEl.appendChild(checkBoxEl)
    }
}

const selectedCompanies = []
function selectCompanies(id) {
    const checkboxEl = document.querySelector(`#check_c_${id}`)
    checkboxEl.checked = !checkboxEl.checked
    if (checkboxEl.checked) {
        selectedCompanies.push(id)
    } else {
        selectedCompanies.splice(selectedCompanies.indexOf(id), 1)
    }
}

let allData = null
async function getData() {
    const res = await fetch("./assets/data.json")
    allData = await res.json()
    fill(allData.companies.companies)
}
getData()

document.querySelector('#search_input').addEventListener('input', (event) => {
    const q = event.target.value
    const filtredData = allData.companies.companies.filter((comp) => {
        textInName = comp.name.toLowerCase().includes(q.toLowerCase())
        textInAddress = comp.address.toLowerCase().includes(q.toLowerCase())
        return textInName || textInAddress
    })
    fill(filtredData)
})

function openCompanies() {
    document.querySelector('#main').classList.add('hidden')
    document.querySelector('#companies_window').classList.remove('hidden')
    window.Telegram.WebApp.MainButton.text = 'Выбрать'
    window.Telegram.WebApp.MainButton.onClick(closeCompanies)
    tabIsClosed = false
}

function closeCompanies() {
    document.getElementById('companies_window').classList.add('hidden')
    document.getElementById('main').classList.remove('hidden')
    setTitleCompanies()
    window.Telegram.WebApp.MainButton.text = 'Сохранить'
    tabIsClosed = true
}

function setTitleCompanies() {
    const DEFAULT_NULL_TEXT = 'Выберите филиалы'
    const SINGLE_PLATPHORM = ' филиал'
    const PLURAL_PLATPHORM = ' филиала'
    const BEGGINING_OF_THE_LINE = 'Выбрано '
    const BEGGINING_OF_THE_LINE_SINGLE_PLATPHORM = 'Выбран '
    let text = ''
    if (selectedCompanies.length === 0) {
        text = DEFAULT_NULL_TEXT
    } else if (selectedCompanies.length === 1) {
        text = BEGGINING_OF_THE_LINE_SINGLE_PLATPHORM + selectedCompanies.length + SINGLE_PLATPHORM

    } else {
        text = BEGGINING_OF_THE_LINE + selectedCompanies.length + PLURAL_PLATPHORM
    }
    document.getElementById('title_companies').value = text
}

window.Telegram.WebApp.MainButton.show()
window.Telegram.WebApp.MainButton.text = 'Сохранить'
window.Telegram.WebApp.MainButton.color = '#63bf9a'
window.Telegram.WebApp.enableClosingConfirmation()