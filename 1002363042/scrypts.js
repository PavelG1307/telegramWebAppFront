// const url = 'http://localhost:3000/api/v1'
const url = 'https://fifthfloor.site/api/v1'
const userId = 1002363042
console.log(userId)
async function getNetworks() {
  // const res = await axios({
  //   method: 'get',
  //   url: url + '/network',
  //   params: { userId }
  // })
  return fillPage(testData)
}
document.querySelector('.title').innerText =`user: ${userId}`
async function fillPage(data) {
  const containerEl = document.querySelector('.container')
  containerEl.innerHTML = ''
  const network = document.createElement('div')
  network.classList.add('network')

  const row = document.createElement('div')
  row.classList.add('row')
  network.appendChild(row)

  const networkTitle = document.createElement('div')
  networkTitle.classList.add('network_title')
  networkTitle.innerText = "Ваши сети:"
  row.appendChild(networkTitle)

  const checkbox = document.createElement('input')
  checkbox.setAttribute("type", "checkbox")
  checkbox.disabled = true
  network.setAttribute("id", "parent")
  row.appendChild(checkbox)

  const branches = document.createElement('div')
  branches.classList.add('branches')
  network.appendChild(branches)

  let allBranchesEnabled = true

  const networks = data.NetworkSlice
  for (const j in networks) {
    const branch = networks[j]
    const branchEl = document.createElement('div')
    branchEl.classList.add('network_branch')

    const branchTitle = document.createElement('div')
    branchTitle.classList.add('branch_title')
    branchTitle.innerText = branch.name
    branchEl.appendChild(branchTitle)

    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.setAttribute('id', branch.uuid)
    checkbox.checked = branch.isSubscribed
    if (!branch.subscribe) allBranchesEnabled = false
    checkbox.addEventListener('click', changeSubscribe)
    branchEl.appendChild(checkbox)
    branches.appendChild(branchEl)
  }
  checkbox.checked = allBranchesEnabled
  containerEl.appendChild(network)
}

const subscribe = []
const unsubscribe = []

async function changeSubscribe(event) {
  const status = event.target.checked
  const networkUUID = event.target.id
  if (status) {
    if (unsubscribe.includes(networkUUID)) {
      delete unsubscribe['networkUUID']
    } else {
      subscribe.push(networkUUID)
    }
  } else {
    if (subscribe.includes(networkUUID)) {
      delete subscribe['networkUUID']
    } else {
      unsubscribe.push(networkUUID)
    }
  }
}

async function save() {
  const params = { userId, subscribe, unsubscribe }
  console.log(params)
}

const testData = {
  "Page": 1,
  "MaxPage": 56,
  "Networks": {
    "1128": "99 евро",
    "1150": "Armani Exchange",
    "1153": "Alessandro Manzoni",
    "1189": "ALOHA",
    "144": "33 комода",
    "429": "365+",
    "439": "12 Storeez",
    "700": "2smoke",
    "761": "33 комода интернет-магазин",
    "886": "BAON"
  },
  "NetworkSlice": [
    {
      "id": 439,
      "name": "12 Storeez",
      "uuid": "f1320985-7452-4f3e-bf69-547d682f455d",
      "isSubscribed": true
    },
    {
      "id": 144,
      "name": "33 комода",
      "uuid": "f2591675-2654-4cb0-be34-dba0db861ca9",
      "isSubscribed": true
    },
    {
      "id": 1189,
      "name": "ALOHA",
      "uuid": "d38afcac-e116-4ff0-8454-c700fbfaf489",
      "isSubscribed": true
    },
    {
      "id": 700,
      "name": "2smoke",
      "uuid": "047686fc-3636-451f-8e0d-aecd5967506a",
      "isSubscribed": false
    },
    {
      "id": 761,
      "name": "33 комода интернет-магазин",
      "uuid": "fcd459e4-6e6f-470e-afde-c6922733755b",
      "isSubscribed": false
    },
    {
      "id": 429,
      "name": "365+",
      "uuid": "5d18609a-ec5a-40a4-b7f4-6861ea608193",
      "isSubscribed": false
    },
    {
      "id": 1128,
      "name": "99 евро",
      "uuid": "bd7db909-f02c-4b57-877d-4cc20122087d",
      "isSubscribed": false
    },
    {
      "id": 1153,
      "name": "Alessandro Manzoni",
      "uuid": "9479a93b-1666-478f-810d-00f286bef822",
      "isSubscribed": false
    },
    {
      "id": 1150,
      "name": "Armani Exchange",
      "uuid": "3e632871-d11e-43b7-9904-9e37d976302e",
      "isSubscribed": false
    },
    {
      "id": 886,
      "name": "BAON",
      "uuid": "7645cd96-ac6d-4073-bddd-99239a244e4b",
      "isSubscribed": false
    }
  ],
  "SubscribedNetworks": {
    "1189": true,
    "144": true,
    "439": true
  }
}

getNetworks()