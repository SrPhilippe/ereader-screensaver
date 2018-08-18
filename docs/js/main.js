if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
            let serviceWorker
            if (registration.installing) {
                serviceWorker = registration.installing
            } else if (registration.waiting) {
                serviceWorker = registration.waiting
            } else if (registration.active) {
                serviceWorker = registration.active
            }
            if (serviceWorker) {
                console.log(`ServiceWork state => ${serviceWorker.state}`)
                serviceWorker.addEventListener('statechange', event => {
                    console.log(event.target.state)
                })
            }
        })
    window.addEventListener('beforeinstallprompt', e => {
        prompt()
    })
}

$(document).ready(function() {
    let dropdown = document.querySelectorAll('#menu .container>ul>li'),
        mobileBar = document.querySelector('#menu .mobile-nav'),
        menuContent = document.querySelector('#menu>.container>ul'),
        clicked = false;


    $('#header .container .theater').slick({
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 1000,
        dots: true,
        arrows: true,
        slidesToShow: 3,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 2
            }
        }]
    })

    let currentDate = new Date()
    document.getElementById('footer-current-date').textContent = currentDate.getFullYear()

    updateMobile()
    window.addEventListener('resize', event => {
        updateInteractions(window.innerWidth)
        updateMobile()
    })

    function updateInteractions(clientWidth) {
        dropdown.forEach(el => {
            if (el.children.length > 1) {
                let clicked = false
                if (clientWidth > 768) {
                    el.removeEventListener('click', toggleDropdown)
                    el.addEventListener('mouseenter', toggleDropdown)
                    el.addEventListener('mouseleave', toggleDropdown)
                } else {
                    el.removeEventListener('mouseenter', toggleDropdown)
                    el.removeEventListener('mouseleave', toggleDropdown)
                    el.addEventListener('click', toggleDropdown)
                }
            }
        })
    }

    function toggleDropdown(event) {
        if (event.type === 'mouseenter') {
            event.currentTarget.children.item(1).style.display = 'flex'
        } else if (event.type === 'mouseleave') {
            event.currentTarget.children.item(1).style.display = 'none'
        } else if (event.type === 'click') {
            clicked = !clicked
            if (clicked) {
                event.currentTarget.children.item(1).style.display = 'flex'
            } else {
                event.currentTarget.children.item(1).style.display = 'none'
            }
        } else {
            console.log('Something went wrong. The event fired is not set on this element!')
        }

    }

    function updateMobile() {
        if (window.innerWidth < 768) {
            let showMenu = false
            menuContent.style.display = 'none'
            mobileBar.addEventListener('click', toggleMenu)

            function toggleMenu(event) {
                showMenu = !showMenu
                if (showMenu) {
                    menuContent.style.display = 'flex'
                } else {
                    menuContent.style.display = 'none'
                }
            }
        } else {
            menuContent.style.display = 'flex'
        }
    }

    dropdown.forEach(el => {
        let iconDropdown = document.createElement('i')
        iconDropdown.classList.add('fas', 'fa-chevron-right')
        if (el.children.length > 1) {
            el.children.item(0).appendChild(iconDropdown)
            updateInteractions(window.innerWidth)
        }
    })
});