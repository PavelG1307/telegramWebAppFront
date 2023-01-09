async function bootstrap() {
    const response = await makeRequest('notification-criteria')
    if (response.status === 200) {
        createAllCriteriaAndAddButton(response.data)
        return
    }
    showStartPage()
}

async function createAllCriteriaAndAddButton(allCriteria) {
    const parrentNode = document.querySelector('#criteria_list')
    for (const i in allCriteria) {
        const criteria = allCriteria[i]
        const criteriaNode = await getCriteriaNode(criteria)
        parrentNode.appendChild(criteriaNode)
    }
    const addButtonNode = await createAddButtonNode()
    parrentNode.appendChild(addButtonNode)
}

async function getCriteriaNode(criteria) {
    const criteriaNode = await createExternalNode(criteria.id)
    const upRowNode = await createUpRowNode(criteria)
    criteriaNode.appendChild(upRowNode)
    const downRowNode = await createDownRowNode(criteria)
    criteriaNode.appendChild(downRowNode)
    return criteriaNode
}

async function createExternalNode(criteriaID) {
    const EXTERNAL_NODE_CLASS = 'w-full flex flex-col px-4 py-2 border rounded-lg opacity-80 hover:opacity-100 ease-in-out duration-300 cursor-pointer'
    const externalNode = document.createElement('div')
    externalNode.classList = EXTERNAL_NODE_CLASS
    externalNode.id = criteriaID
    return externalNode
}

async function createUpRowNode(criteria) {
    const UP_ROW_NODE_CLASS = 'flex items-center justify-between m-2 mb-0'
    const upRowNode = document.createElement('div')
    upRowNode.classList = UP_ROW_NODE_CLASS
    const nameCriteriaNode = await createNameCriteriaNode(criteria.name)
    upRowNode.appendChild(nameCriteriaNode)
    const buttonsNode = await createButtonsNode(criteria)
    upRowNode.appendChild(buttonsNode)
    return upRowNode
}

async function createNameCriteriaNode(criteriaName) {
    const nameCriteriaNode = document.createElement('div')
    nameCriteriaNode.innerText = criteriaName
    return nameCriteriaNode
}

async function createButtonsNode(criteria) {
    const BUTTONS_NODE_CLASS = 'flex'
    const URL_IMG_EDIT_BUTTON = './assets/img/edit.png'
    const URL_IMG_DELETE_BUTTON = './assets/img/delete.png'

    const buttonsNode = document.createElement('div')
    buttonsNode.classList = BUTTONS_NODE_CLASS

    const editButtonNode = await createImgButtonsNode(URL_IMG_EDIT_BUTTON, criteria.id, editCriteria)
    buttonsNode.appendChild(editButtonNode)

    const deleteButtonNode = await createImgButtonsNode(URL_IMG_DELETE_BUTTON, criteria.id, deleteCriteria)
    buttonsNode.appendChild(deleteButtonNode)

    return buttonsNode
}

async function editCriteria(id) {
    console.log(`Редактировать ${id} критерий`);
    goTo(`./edit/index.html?id=${id}`)
}

async function deleteCriteria(id) {
    window.Telegram.WebApp.showConfirm('Удалить группу?', () => {
        // makeRequest()
    })
}

async function createImgButtonsNode(src, id, onClick) {
    const STYLE_BUTTON_CLASS = 'h-4 mr-4 opacity-50 hover:opacity-100 hover:scale-110 ease-in-out duration-200 cursor-pointer'

    const buttonNode = document.createElement('img')
    buttonNode.classList = STYLE_BUTTON_CLASS
    buttonNode.id = id
    buttonNode.setAttribute('src', src)
    buttonNode.setAttribute('onclick', 'onClick(id)')
    buttonNode.onClick = onClick
    return buttonNode
}

async function createDownRowNode(criteria) {
    const DOWN_ROW_NODE_CLASS = 'w-full flex mt-2 flex-wrap items-center m-2 mt-0'
    const downRowNode = document.createElement('div')
    downRowNode.classList = DOWN_ROW_NODE_CLASS
    const networkCountTag = await getNetworkCountTag(criteria.networks)
    downRowNode.appendChild(networkCountTag)
    const providersCountTag = await getProviderCountTag(criteria.providers)
    downRowNode.appendChild(providersCountTag)
    const ratingCountTag = await getRatingCountTag(criteria.ratings)
    downRowNode.appendChild(ratingCountTag)
    return downRowNode
}

async function getNetworkCountTag(networks) {
    const count = networks.length
    if (count === 0) return null
    let textTag = `${count} сетей`
    if (count === 1) textTag = `${count} сеть`
    if (count > 1 && count < 5) textTag = `${count} сети`
    return await createTagNode(textTag)
}

async function getProviderCountTag(providers) {
    const count = providers.length
    let textTag = `${count} платформ`
    if (count === 1) textTag = `${count} платформa`
    if (count > 1 && count < 5) textTag = `${count} платформы`
    return await createTagNode(textTag)
}

async function getRatingCountTag(rating) {
    const count = rating.length - 1
    let textTag = `${count} звезд`
    if (count === 1) textTag = `${count} звезда`
    if (count > 1 && count < 5) textTag = `${count} звезды`
    return await createTagNode(textTag)
}

async function createTagNode(text) {
    const TAG_NODE_CLASS = 'bg-gray-200 mr-4 mt-2 px-2 py-1 text-xxs uppercase font-medium text-gray-500 rounded-lg hover:scale-105 duration-200'

    const tagNode = document.createElement('div')
    tagNode.classList = TAG_NODE_CLASS
    tagNode.innerText = text
    return tagNode
}

async function createAddButtonNode() {
    const ADD_BUTTON_NODE_CLASS = 'flex w-full items-center opacity-90 hover:opacity-100 cursor-pointer'
    const HREF_BUTTON = './edit'
    const buttonNode = document.createElement('div')
    buttonNode.classList = ADD_BUTTON_NODE_CLASS
    const iconNode = await createPlusIconNode()
    buttonNode.appendChild(iconNode)
    const textNode = await createTextButtonNode()
    buttonNode.appendChild(textNode)
    buttonNode.onclick = () => goTo(HREF_BUTTON)
    return buttonNode
}

async function createPlusIconNode() {
    const PLUS_ICON_NODE_CLASS = 'h-12 w-12 flex items-center justify-center text-center text-3xl text-[#63bf9a] bg-[#63bf9a24] rounded-lg'
    const iconNode = document.createElement('div')
    iconNode.classList = PLUS_ICON_NODE_CLASS
    iconNode.innerText = '+'
    return iconNode
}

async function createTextButtonNode() {
    const TEXT_BUTTON_NODE_CLASS = 'ml-5 text-[#63bf9a] text-[0.9rem] uppercase'
    const TEXT_BUTTON = 'ДОБАВИТЬ ГРУППУ КРИТЕРИЕВ'
    const textNode = document.createElement('div')
    textNode.classList = TEXT_BUTTON_NODE_CLASS
    textNode.innerText = TEXT_BUTTON
    return textNode
}

function goTo(href) {
    window.location.href = href
}

function showStartPage() { }

window.onload = bootstrap