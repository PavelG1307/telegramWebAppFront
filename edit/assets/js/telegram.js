function listenTelegramInterface() {
    window.Telegram.WebApp.MainButton.onClick(() => {
        if (openedWindow === 'main') {
            save()
            return
        }
        openWindow('main')
    })

    window.Telegram.WebApp.BackButton.onClick(() => {
        if (openedWindow === 'networks') {
            window.Telegram.WebApp.showConfirm('Не сохранять изменения?', (value) => {
                if (value) goTo('../')
            })
            return
        } else {
            openWindow(windowsData[openedWindow].prevoice)
        }
    })

    window.Telegram.WebApp.MainButton.onClick(() => {
        if (openedWindow === 'networks') {
            openWindow('main')
            return
        }
        if (openedWindow === 'main') {
            save()
            return
        }
        if (openedWindow === 'companies') {
            openWindow('main')
            return
        }
    })

    window.Telegram.WebApp.MainButton.text = 'Далее'
    window.Telegram.WebApp.MainButton.color = '#63bf9a'
    window.Telegram.WebApp.enableClosingConfirmation()
}