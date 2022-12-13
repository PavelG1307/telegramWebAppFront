const url = 'http://localhost:3000/api/v1'
const userId = 12345

const data = document.querySelector('.title')
data.innerText = window.Telegram.WebApp.initDataUnsafe.first_name + ', ваши уведомления:'

async function getCompanies() {
  const res = await axios({
    method: 'get',
    url: url + '/company',
    params: { userId }
  })
  if (res.status === 200) {
    return fillPage(res.data)
  }
  console.log(res)
}

async function fillPage(data) {
  const containerEl = document.querySelector('.container')
  containerEl.innerHTML = ''
  for (const i in data) {
    const company = document.createElement('div')
    company.classList.add('company')

    const row = document.createElement('div')
    row.classList.add('row')
    company.appendChild(row)

    const companyTitle = document.createElement('div')
    companyTitle.classList.add('company_title')
    companyTitle.innerText = data[i].name
    row.appendChild(companyTitle)
    
    const checkbox = document.createElement('input')
    checkbox.setAttribute("type", "checkbox")
    checkbox.disabled=true
    company.setAttribute("id", data[i].uuid)
    row.appendChild(checkbox)

    const branches = document.createElement('div')
    branches.classList.add('branches')
    company.appendChild(branches)

    let allBranchesEnabled = true

    for (const j in data[i].branches) {
      const branch = data[i].branches[j]
      const branchEl = document.createElement('div')
      branchEl.classList.add('company_branch')
  
      const branchTitle = document.createElement('div')
      branchTitle.classList.add('branch_title')
      branchTitle.innerText = branch.name
      branchEl.appendChild(branchTitle)

      const checkbox = document.createElement('input')
      checkbox.setAttribute('type', 'checkbox')
      checkbox.setAttribute('id', branch.uuid)
      checkbox.checked = branch.subscribe
      if (!branch.subscribe) allBranchesEnabled = false
      checkbox.addEventListener('click', changeSubscribe)
      branchEl.appendChild(checkbox)
      branches.appendChild(branchEl)
    }
    checkbox.checked = allBranchesEnabled
    containerEl.appendChild(company)
  }
}

async function changeSubscribe(event) {
  const status = event.target.checked
  const companyUUID = event.target.id
  const options = {}
  options.params = { userId, companyUUID }
  options.method = 'post'
  options.url = url + '/company' + (status ? '/subscribe' : '/unsubscribe')
  await axios(options)
  return getCompanies()
}
try{
  getCompanies()
} catch(e) {
  document.querySelector('.title').innerText = e
}