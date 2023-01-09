let selectedCompanies = []

async function fillCompaniesPage() {
    const companiesListNode = document.querySelector('#companies_list')
    companiesListNode.innerHTML = ''
    for (const i in companies) {
        const company = companies[i]
        const companyNode = await createCompanyNode(company)
        companiesListNode.appendChild(companyNode)
    }
}

async function createCompanyNode(company) {
    const companyNode = document.createElement('div')
    companyNode.classList = 'flex justify-between items-center border-b pb-3 px-5 cursor-pointer opacity-80 hover:opacity-100'
    companyNode.setAttribute('onclick', `selectCompanies('${company.uuid}')`)

    const leftColumnNode = await createLeftColumnNode(company)
    companyNode.appendChild(leftColumnNode)
    const checkboxNode = await createCompanyCheckbox(company.uuid)
    companyNode.appendChild(checkboxNode)
    return companyNode
}

async function createLeftColumnNode(company) {
    const leftColumnNode = document.createElement('div')

    const nameNode = await createCompanyNameNode(company.name)
    leftColumnNode.appendChild(nameNode)

    const addressNode = await createCompanyAddressNode(company.fullAddress)
    leftColumnNode.appendChild(addressNode)
    return leftColumnNode
}

async function createCompanyNameNode(name) {
    const nameNode = document.createElement('div')
    nameNode.classList = 'font-bold'
    nameNode.innerText = name
    return nameNode
}

async function createCompanyAddressNode(address) {
    const addressNode = document.createElement('div')
    addressNode.classList = 'text-gray-400 text-sm'
    addressNode.innerText = address
    return addressNode
}

async function createCompanyCheckbox(uuidCompany) {
    const checkboxNode = document.createElement('input')
    checkboxNode.setAttribute('type', 'checkbox')
    checkboxNode.id = `${uuidCompany}`
    checkboxNode.classList = 'h-8 w-8'
    checkboxNode.setAttribute('onclick', `selectCompanies('${uuidCompany}')`)
    const isSelected = isSelectedCompanies(uuidCompany)
    checkboxNode.checked = !isSelected
    return checkboxNode
}

async function isSelectedCompanies(id) {
    return selectedCompanies.includes(id)
}

function selectCompanies(uuid) {
    const checkboxEl = document.getElementById(uuid)
    checkboxEl.checked = !checkboxEl.checked
    if (checkboxEl.checked) {
        selectedCompanies.push(uuid)
    } else {
        selectedCompanies.splice(selectedCompanies.indexOf(uuid), 1)
    }
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

function openTab(tabName) {
    const buttonNodes = document.getElementsByClassName('tab_btn')
    const tabNodes = document.getElementsByClassName('tab')
    const tabNode = document.getElementById(tabName)
    if (!tabNode.classList.contains('hidden')) return
    closeAllTab(tabNodes, buttonNodes)
    tabNode.classList.remove('hidden')
    stylizeActiveButton(tabName)
}

function closeAllTab(tabNodes, buttonNodes) {
    for (let i = 0; i < tabNodes.length; i++) {
        try {
            closeTab(tabNodes[i], buttonNodes[i])
        } catch (e) {
            console.error(e)
        }
    }
}

function closeTab(tabNode, buttonNode) {
    stylizeInactiveButton(buttonNode)
    tabNode.classList.add('hidden')
}

function stylizeInactiveButton(buttonNode) {
    buttonNode.classList.remove('border-b-[2px]')
    buttonNode.classList.remove('border-[#7a5cc9]')
    buttonNode.classList.remove('text-[#7a5cc9]')
}

function stylizeActiveButton(tabName) {
    const targetButton = document.querySelector(`#${tabName}_tab`)
    targetButton.classList.add('border-b-[2px]')
    targetButton.classList.add('border-[#7a5cc9]')
    targetButton.classList.add('text-[#7a5cc9]')
}