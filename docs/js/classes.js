class Dropdown {
    constructor(menu) {
        this.$menu = menu
    }
    getListLength() {
        return this.$menu.length
    }

    checkDropdowns() {
        return console.log(this.$menu)
    }
}