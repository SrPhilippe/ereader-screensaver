let dropdown = document.querySelectorAll('#menu ul>li')

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