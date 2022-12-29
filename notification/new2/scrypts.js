window.Telegram.WebApp.BackButton.onClick(() => {
    window.Telegram.WebApp.showConfirm('Не сохранять изменения?', () => {
        window.location.href = '../'
    })
})

window.Telegram.WebApp.MainButton.show()
window.Telegram.WebApp.MainButton.text = 'Далее'