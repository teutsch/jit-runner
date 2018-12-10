
function addStackEnv(env, obj, HEAP8) {
    
    function getI64() {
        var buffer = new ArrayBuffer(8)
        var view = new Uint8Array(buffer)
        for (var i = 0; i < 8; i++) {
            view[i] = HEAP8[64+i]
        }
        return view
    }

    var criticals = {}
    obj.step.forEach(a => criticals[a] = true)

    // Load critical steps
    var step = 0

    var stack = []

    env.countStep = function () {
        step++
        if (step % 1000 == 0) console.log(step)
        if (criticals[step]) console.log("critical", step)
        return criticals[step] || false
    }

    env.testStep = function () {
        return criticals[step+1] || false
    }
    
    env.storeArg = function () {
        return criticals[step+1] || false
    }
    
    env.storeLocalI32 = function (idx, l) {
        stack.push(l)
    }

    env.storeLocalF32 = function (idx, l) {
        stack.push(l)
    }

    env.storeLocalF64 = function (idx, l) {
        stack.push(l)
    }

    env.storeLocalI64 = function (idx) {
        stack.push(getI64())
    }

    env.adjustStackI32 = function (l) {
        if (criticals[step]) stack.push(l)
        return l
    }

    env.adjustStackF32 = function (l) {
        if (criticals[step]) stack.push(l)
        return l
    }

    env.adjustStackF64 = function (l) {
        if (criticals[step]) stack.push(l)
        return l
    }

    env.adjustStackI64 = function (idx) {
        if (criticals[step]) stack.push(getI64())
    }

    env.printStack = function () {
        console.log(stack, step)
    }

}
