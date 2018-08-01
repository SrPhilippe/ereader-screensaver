let dropdown = document.querySelectorAll('#menu .container>ul>li')

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(function() {
            console.log("Service Worker Registered")
        })
}

window.addEventListener('beforeinstallprompt', e => {
    prompt()
})

window.addEventListener('resize', event => {
    updateInteractions(window.innerWidth)
})

function updateInteractions(clientWidth) {
    dropdown.forEach(el => {
        if (el.children.length > 1) {
            let clicked = false
            if (clientWidth > 768) {
                el.addEventListener('mouseenter', event => {
                    console.log(event.currentTarget)
                    event.currentTarget.children.item(1).style.display = 'flex'
                })
                el.addEventListener('mouseleave', event => {
                    event.currentTarget.children.item(1).style.display = 'none'
                })
            } else {
                el.addEventListener('click', event => {
                    clicked = !clicked
                    if (clicked) {
                        event.currentTarget.children.item(1).style.display = 'flex'
                    } else {
                        event.currentTarget.children.item(1).style.display = 'none'
                    }
                })
            }
        }
    })
}

dropdown.forEach(el => {
    let iconDropdown = document.createElement('i')
    iconDropdown.classList.add('fas', 'fa-chevron-right')
    if (el.children.length > 1) {
        el.children.item(0).appendChild(iconDropdown)
        updateInteractions(window.innerWidth)
    }
})