const textBtn = {
    main: 'Сохранить',
    companies: 'Выбрать',
    networks: 'Далее'
}
const prevoiceWindow = {
    main: 'networks',
    companies: 'main'
}

const windowsData = {
    main: {
        name: 'main',
        prevoice: 'networks',
        button: 'Сохранить'
    },
    companies: {
        name: 'companies',
        prevoice: 'networks',
        button: 'Выбрать'
    },
    networks: {
        name: 'networks',
        prevoice: null,
        button: 'Далее'
    }
}
let openedWindow = 'networks'

function openWindow(windowName) {
    if (!windowName) return
    closeAllWindow()
    openCurrentWindow(windowName)
    setButtonText(windowName)
}

function closeAllWindow() {
    windowsNames = Object.keys(windowsData)
    for (const i in windowsNames) {
        windowName = windowsNames[i]
        document.querySelector(`#${windowName}_window`).classList.add('hidden')
    }
}

function openCurrentWindow(windowName) {
    document.querySelector(`#${windowName}_window`).classList.remove('hidden')
    openedWindow = windowName
}

function setButtonText(windowName) {
    window.Telegram.WebApp.MainButton.text = textBtn[windowName]
    if (windowName === 'main') {
        setTitleCompanies()
    }
}
