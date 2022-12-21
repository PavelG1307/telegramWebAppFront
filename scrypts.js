// const url = 'http://localhost:3000/api/v1'
let url = null
const urlParams = new URLSearchParams(window.location.search);
const userID = urlParams.get('userID');
const tg = window.Telegram.WebApp;

async function getNetworks() {
  url = document.getElementById('url').value
  console.log(url);
  const res = await axios({
    method: 'get',
    url: url + 'networks',
    params: { userID },
    headers: {
      "ngrok-skip-browser-warning": "true",
    }
  })
  return fillPage(res.data)
}

document.querySelector('.title').innerText =`user: ${userID}`
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
    checkbox.setAttribute('id', branch.id)
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
  const networkID = event.target.id
  if (status) {
    if (unsubscribe.includes(networkID)) {
      delete unsubscribe[networkID]
    } else {
      subscribe.push(networkID)
    }
  } else {
    if (subscribe.includes(networkID)) {
      delete subscribe[networkID]
    } else {
      unsubscribe.push(networkID)
    }
  }
}

async function save() {
  const data = { subscribe, unsubscribe }
  console.log(data)
  tg.sendData(JSON.stringify(data))
}

tg.expand();
tg.MainButton.isVisible = true

tg.MainButton.text = "Сохранить";
Telegram.WebApp.onEvent('mainButtonClicked', save);

function run() {
  try {
    command = document.getElementById('cmd').value
    eval(command)
  } catch(e) {
    document.querySelector('.title').innerText =e
  }
}

getNetworks()