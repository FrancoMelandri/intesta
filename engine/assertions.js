
const compares  = {
  "eq": (left, right) => left === right,
  "neq": (left, right) => left!== right
}

const assertion = (context, operation, onSuccess, onFail) => {

    if (!operation.assertions) {
        onSuccess(operation)
        return
    }

    operation
        .assertions
        .forEach(_ => {
            const left = context.getValue(_.field)
            const right = _.value
            compares[_.comparison](left, right) ?
                onSuccess(operation) :
                onFail (operation, _)
        })
}

module.exports = assertion;