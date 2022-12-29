window.Telegram.WebApp.BackButton.onClick(() => {
    window.Telegram.WebApp.showConfirm('Не сохранять изменения?', () => {
        window.location.href = '../../'
    })
})

window.Telegram.WebApp.MainButton.text = 'Далее'

const DEFAULT_IMAGE_URL =  'http://ap.cd31953.tmweb.ru/sites/default/files/placeholder_image.jpg'

async function fill(networks) {
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

let allData = null
async function getData() {
    const res = await fetch("./assets/data.json")
    allData = await res.json()
    fill(allData.networks)
}
getData()

document.querySelector('#search_input').addEventListener('input', (event) => {
    const q = event.target.value
    const filtredData = allData.networks.filter((net) => net.name.toLowerCase().includes(q.toLowerCase()))
    fill(filtredData)
})

let selectedNetworks = []
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

window.Telegram.WebApp.MainButton.onClick(() => {
    window.location.href = '../settings'
})

window.Telegram.WebApp.MainButton.color = '#63bf9a'
