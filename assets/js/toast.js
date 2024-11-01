function toast ( {title = '', message = '', type = 'success', duration = 3000}) {
    const main = document.getElementById('toast')
   

    if (main) {
        const toast = document.createElement('div')

        const autoClose = setTimeout (function() {
            main.removeChild(toast)
        }, duration + 1000)

        toast.onclick = function (e) {
            if (e.target.closest('.toast__close')) {
                main.removeChild(toast)
                clearTimeout(autoClose)
            }
        }
        const icons = {
            success: 'fas fa-check-circle',
            info: 'fas fa-info-circle',
            warning: 'fas fa-exclamation-circle',
            error: 'fas fa-exclamation-circle',
        }
        const icon = icons[type]
        const delay = (duration / 1000).toFixed(2)
        toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
        toast.classList.add('toast', `toast--${type}`)
        toast.innerHTML = `
            <div class="toast__icon">
                <i class="${icon}"></i>
            </div>

            <div class="toast__body">
                <h4 class="toast__title">${title}</h4>
                <p class="toast__msg">${message}</p>
            </div>

            <div class="toast__close">
                <i class="fas fa-times"></i>
            </div>                
        `
        main.appendChild(toast)
        
    }
}

function showInfoToast () {
    toast ({
        title: 'Đã tạm thêm :>',
        message: 'Mở console ra chép vô đi đợi nhắc à :)',
        type: 'info',
        duration: 3000
    }) 
}
