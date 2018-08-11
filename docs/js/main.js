if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js', {
            scope: './'
        })
        .then(function(registration) {
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

let newdrop = new Dropdown
$(document).ready(function() {
    let dropdown = document.querySelectorAll('#menu .container>ul>li'),
        mobileBar = document.querySelector('#menu .mobile-nav'),
        menuContent = document.querySelector('#menu>.container>ul'),
        test = new Dropdown(dropdown, true),
        clicked = false,
        slickConfig = {
            autoplay: true,
            autoplaySpeed: 3000,
            speed: 1000,
            dots: true,
            arrows: true,
            slidesToShow: 3

        }


    test.checkDropdowns()
    test.getListLength()
    $('#header .container .theater').slick(slickConfig)



    window.addEventListener('resize', event => {
        updateInteractions(window.innerWidth)

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

    function toggleDropdown(evt) {
        if (evt.type === 'mouseenter') {
            event.currentTarget.children.item(1).style.display = 'flex'
        } else if (evt.type === 'mouseleave') {
            event.currentTarget.children.item(1).style.display = 'none'
        } else if (evt.type === 'click') {
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

    dropdown.forEach(el => {
        let iconDropdown = document.createElement('i')
        iconDropdown.classList.add('fas', 'fa-chevron-right')
        if (el.children.length > 1) {
            el.children.item(0).appendChild(iconDropdown)
            updateInteractions(window.innerWidth)
        }
    })

});