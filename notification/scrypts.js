document.querySelector('#add_btn').addEventListener('click', () => {
    document.location.href = './new/networks'
})

document.querySelector('#delete').addEventListener('click', (event) => {
    window.Telegram.WebApp.showConfirm('Удалить группу?', () => {

    })
})

window.Telegram.WebApp.BackButton.isVisible = true