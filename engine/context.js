var context = () => {
    let _context = {}

    return {
        add: function (name, entry) {
            const obj = {}
            obj[name] = entry
            _context = {...obj}
            return this
        },

        current: function () {
            return _context
        }
    }
}

module.exports = context