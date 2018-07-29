let dropdown = document.querySelectorAll('#menu ul>li')

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

dropdown.forEach(el => {
    let iconDropdown = document.createElement('i');
    iconDropdown.classList.add('fas', 'fa-chevron-right');
    if (el.children.length > 1) {
        el.children.item(0).appendChild(iconDropdown)
        el.addEventListener('mouseenter', event => {

        })
        el.addEventListener('mouseleave', event => {

        })
    }
})