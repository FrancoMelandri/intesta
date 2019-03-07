var context = () => {
    let _context = {}

    return {
        add: function (name, entry) {
            const obj = {}
            obj[name] = entry
            _context = {...obj}
            return this
        },

        getValue: function(prop) {
            return prop
                    .split('.')
                    .reduce((acc, item) => acc[item], _context)
        },

        current: function () {
            return _context
        }
    }
}

module.exports = context