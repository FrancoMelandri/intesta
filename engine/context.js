var context = () => {
    let _context = {}

    return {
        add: function (name, entry) {
            console.log('add ' + name + ' ' + entry)
            const obj = {}
            obj[name] = entry
            _context = {...obj}
            return this
        },

        getValue: function(prop) {
            if (prop.indexOf('{{{') === -1 || prop.indexOf('}}}') === -1)
                return prop

            return prop
                    .replace('{{{', '')
                    .replace('}}}', '')
                    .split('.')
                    .reduce((acc, item) => acc[item], _context)
        },

        current: function () {
            return _context
        }
    }
}

module.exports = context