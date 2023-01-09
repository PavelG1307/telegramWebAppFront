let selectedRating = 0
let selectedProviders = []

const photoProviders = {
    1: 'https://sun6-21.userapi.com/s/v1/if1/upYY30zwD3vU6FtWlamVKUWphrDw-4FZa7_WmQ6_1y8W7jVssGoZeNapWeAr1w7CYBpFngMJ.jpg?size=960x960&quality=96&crop=0,0,960,960&ava=1',
    2: 'https://i.pinimg.com/originals/1f/4f/43/1f4f43227e28b87d4712a24c28cde98d.png',
    3: 'https://images.spasibovsem.ru/catalog/original/2gis-dlya-windows-otzyvy-1358286497.png'
}

function fillMainPage() {
    fillProviders()
    listenHoverOnStars()
}

async function fillProviders() {
    const providersList = document.getElementById('list_providers')
    for (const i in providers) {
        const provider = providers[i]
        const providerNode = await createProviderNode(provider)
        providersList.appendChild(providerNode)
    }
}

async function createProviderNode(provider) {
    const PROVIDER_NODE_CLASS = 'hover:bg-gray-50 ease-in-out cursor-pointer border-b-2 py-3 flex items-center justify-between border-solid border-bottom-gray-300'
    const providerId = `field_prov_${provider.id}`
    
    const providerNode = document.createElement('div')
    providerNode.classList = PROVIDER_NODE_CLASS
    providerNode.id = providerId
    providerNode.setAttribute('onclick', `selectProviders(${provider.id})`)
    
    const labelNode = await createProviderLabelNode(provider)
    providerNode.appendChild(labelNode)

    const checkboxNode = await createProviderCheckboxNode(provider)
    providerNode.appendChild(checkboxNode)

    return providerNode
}

async function createProviderLabelNode(provider) {
    const LABEL_NODE_CLASS = 'ml-4 form-check-label flex'
    const labelNode =  document.createElement('label')
    labelNode.classList = LABEL_NODE_CLASS
    const imageProviderNode = await createImageProviderNode(provider)
    labelNode.appendChild(imageProviderNode)
    const nameNode = await createNameProviderNode(provider.name)
    labelNode.appendChild(nameNode)

    return labelNode
}

async function createNameProviderNode(name) {
    const nameNode =  document.createElement('div')
    nameNode.innerText = name
    return nameNode
}

async function createImageProviderNode(provider) {
    const imageNode = document.createElement('img')
    const src = await getSrcProviderLogo(provider.id)
    imageNode.setAttribute('src', src)
    imageNode.classList = 'w-5 h-5 mr-2'
    imageNode.id = provider.id
    return imageNode
}

async function getSrcProviderLogo(id) {
   return photoProviders[id]
}

async function createProviderCheckboxNode(provider) {
    const CHECKBOX_NODE = 'mr-4 h-5 w-5 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-right mr-2 cursor-pointer'
    const checkboxNode = document.createElement('input')
    checkboxNode.setAttribute('type', 'checkbox')
    checkboxNode.setAttribute('class', CHECKBOX_NODE)
    checkboxNode.setAttribute('id', `prov_${provider.id}`)

    return checkboxNode
}

async function selectProviders(id) {
    const checkbox = document.querySelector(`#prov_${id}`)
    checkbox.checked = !checkbox.checked
    if (checkbox.checked) {
        selectedProviders.push(id)
    } else {
        const i = selectedProviders.indexOf(id)
        selectedProviders.splice(i, 1)
    }
    setTitleProviders()
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
    const titleProviders = document.querySelector('#title_providers')
    titleProviders.value = text
}

async function openProviders() {
    const listProviders = document.querySelector('#list_providers')
    listProviders.classList.toggle('hidden')
    await setTitleIconProviders(listProviders)
}

async function setTitleIconProviders(listProviders) {
    const isHidden = listProviders.classList.contains('hidden')
    document.getElementById('icon_title_provider').innerText = isHidden ? '+' : '-'
}

function listenHoverOnStars() {
    const starNodes = document.getElementsByClassName('star')
    for (let i = 0; i < starNodes.length; i++) {
        starNodes[i].addEventListener('click', (event) => clickOnStar(event, starNodes))
        starNodes[i].addEventListener('mouseover', (event) => {
            const id = Number(event.target.id.split('star_')[1])
            fillStar(starNodes, id)
        })
        starNodes[i].addEventListener('mouseout', (event) => {
            fillStar(starNodes, selectedRating)
        })
    }
}

function clickOnStar(event, starNodes) {
    const id = Number(event.target.id.split('star_')[1])
    if (selectedRating === id) {
        selectedRating = 0
        return fillStar(starNodes, selectedRating)
    }
    selectedRating = id
}

async function fillStar(starNodes, count) {
    count = count | selectedRating
    const countStar = rating.length
    for (let i = 0; i < countStar; i++) {
        if (i <= count - 1) {
            await fillStarYellow(starNodes[i])
            
        } else {
            await fillStarGray(starNodes[i])
        }
    }
}

async function fillStarYellow(star) {
    if (!star) return
    star.classList.add('text-yellow-400')
    star.classList.remove('text-gray-300')
}

async function fillStarGray(star) {
    if (!star) return
    const isYellowStar = star.classList.contains('text-yellow-400')
    if (isYellowStar) {
        star.classList.remove('text-yellow-400')
        star.classList.add('text-gray-300')
    }
}

async function save() {
    const name = document.querySelector('#name_group').value
    const ratings = await getRatings()
    if (name === '') {
        window.Telegram.WebApp.showAlert('Укажите название группы', () => {})
        return
    }
    const data = {
        name,
        networkUuids: selectedNetworks,
        ratings,
        companyUuids: selectedCompanies,
        providerIds: selectedProviders
    }
    await makeRequest('notification-criteria', 'post', data)
    // window.location.href = '../'
}

async function getRatings() {
    const rating = []
    for (let i = 0; i <= selectedRating; i++) {
        rating.push(i)
    }
    return rating
}

// setTitleCompanies