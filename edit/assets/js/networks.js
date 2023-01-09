const selectedNetworks = []

async function fillNetworksList(networks) {
    const networksListNode = document.querySelector('#networks_list')
    networksListNode.innerHTML = ''
    for (const i in networks) {
        const network = networks[i]
        const networkNode = await createNetworkNode(network)
        networksListNode.appendChild(networkNode)
    }
}

async function createNetworkNode(network) {
    const isSelected = isSelectedNetworks(network.id)
    const networkNodeClass = `w-[80vw] flex items-center justify-between py-[10px] px-[20px] pb-[5px] cursor-pointer border-b border-gray-300 ${isSelected ? 'opacity-100' : 'opacity-70'} hover:opacity-100`
    const networkNodeId = `net_${network.id}`
    const networkNode = document.createElement('div')
    networkNode.classList = networkNodeClass
    networkNode.id = networkNodeId
    const onClickCallback = `selectNetwork('${network.uuid}')`
    networkNode.setAttribute('onclick', onClickCallback)
    const logoNode = await createLogoNode(network.logo)
    networkNode.appendChild(logoNode)
    const textNode = await createTextNode(network)
    networkNode.appendChild(textNode)
    const checkboxNode = await createNetworkCheckbox(network.uuid)
    networkNode.appendChild(checkboxNode)
    return networkNode
}

async function isSelectedNetworks(id) {
    return selectedNetworks.includes(id)
}

async function createLogoNode(src) {
    const logoNode = document.createElement('img')
    logoNode.classList = 'h-[80px] w-[80px] object-contain border rounded-lg p-[5px]'
    logoNode.setAttribute('src', src || DEFAULT_IMAGE_URL)
    return logoNode 
}

async function createTextNode(network) {
    const textNode = document.createElement('div')
    const TEXT_NODE_CLASS = 'w-full mx-5'
    textNode.classList = TEXT_NODE_CLASS
    const nameNode = await createNameNode(network.name)
    textNode.appendChild(nameNode)
    const rubricNode = await createRubricNode(network.rubric)
    textNode.appendChild(rubricNode)
    return textNode
}

async function createNameNode(name) {
    const nameNode = document.createElement('div')
    const NAME_NODE_CLASS = 'font-bold'
    nameNode.classList = NAME_NODE_CLASS
    nameNode.innerText = name
    return nameNode
}

async function createRubricNode(rubric) {
    const rubricNode = document.createElement('div')
    const RUBRIC_NODE_CLASS = 'text-sm'
    rubricNode.classList = RUBRIC_NODE_CLASS
    rubricNode.innerText = rubric
    return rubricNode
}

async function createNetworkCheckbox(uuid){
    const checkboxNode = document.createElement('input')
    checkboxNode.setAttribute('type', 'checkbox')
    checkboxNode.classList = 'h-8 w-8'
    checkboxNode.id = uuid
    checkboxNode.setAttribute('fluency', `selectNetwork('${uuid}')`)
    return checkboxNode
}

async function selectNetwork(uuid) {
    const isSelected = await isSelectedNetworks(uuid)
    document.getElementById(uuid).checked = !isSelected
    if (isSelected) {
        const index = selectedNetworks.indexOf(uuid)
        selectedNetworks.splice(index, 1)
    } else {
        selectedNetworks.push(uuid)
    }
}
