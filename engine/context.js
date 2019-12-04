
var context = () => {
    let _context = {}

    return {
        add: function (name, entry) {
            _context[name] = entry
            return this
        },

        getValue: function (prop) {
            return prop
                    .split(' ')
                    .map(_ => 
                            { 
                                const startIndex = _.indexOf('{{{')
                                const endIndex = _.indexOf('}}}')
                                if (startIndex === -1 || endIndex === -1)
                                    return _
                                            
                                return _
                                        .replace('{{{', '')
                                        .replace('}}}', '')
                                        .split('.')
                                        .reduce((acc, item) => acc[item], _context)
                    
                            })
                        .join(' ')
        },

        current: function () {
            return _context
        }
    }
}

module.exports = context