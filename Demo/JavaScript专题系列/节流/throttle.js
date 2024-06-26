var count = 1

var container = document.getElementById("container")

function getUserAction() {
	container.innerHTML = count++
}

// 第四版
function throttle(func, wait, options) {
	var timeout, context, args, result
	var previous = 0
	if (!options) options = {}

	var later = function () {
		previous = options.leading === false ? 0 : new Date().getTime()
		timeout = null
		func.apply(context, args)
		if (!timeout) context = args = null
	}

	var throttled = function () {
		var now = new Date().getTime()
		if (!previous && options.leading === false) previous = now
		var remaining = wait - (now - previous)
		context = this
		args = arguments
		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout)
				timeout = null
			}
			previous = now
			func.apply(context, args)
			if (!timeout) context = args = null
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining)
		}
	}

	throttled.cancel = function () {
		clearTimeout(timeout)
		previous = 0
		timeout = null
	}
	return throttled
}

var setUseAction = throttle(getUserAction, 3000, { leading: false })

container.onmousemove = setUseAction

document.getElementById("button").addEventListener("click", function () {
	setUseAction.cancel()
})
