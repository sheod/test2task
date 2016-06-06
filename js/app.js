'use strict';
let app = new Object()

app.__cache = {}

app.log = function(obj) {
    console.log(obj)
}

app.addObject =  function(url, callbackFunc) {
    let intervalId = setInterval(() => {
        if(!this.__cache[url]) {
            this.__cache[url] = url
            let xhr = new XMLHttpRequest()
            xhr.open('GET', url, true)
            xhr.send()

            xhr.onreadystatechange = () => {

                if (xhr.readyState != 4) {
                    return
                }
                delete this.__cache[url]
                if (xhr.status != 200) {
                    clearInterval(intervalId)
                    return this.error(xhr);
                }

                this.response = xhr.responseText
                let elem = this.__createDOMObject(JSON.parse(this.response))
                callbackFunc(elem)
                clearInterval(intervalId)
            }
        }
    },10)
}



app.error = function(status) {
    console.log(`${status.status} - ${status.statusText}`)
}

app.__getData = function(url) {

}

app.__createDOMObject = function(obj) {
    let elem = document.createElement(obj.tag)
    elem.textContent = obj.content

    for (let attr in obj.attr) {
        elem.setAttribute(attr, obj.attr[attr])
    }

    for (let event in obj.events) {
        elem.addEventListener(event, new Function(obj.events[event]))
    }

    for (let parameter in obj.style) {
        elem.style[parameter] = obj.style[parameter]
    }

    return elem
}





app.addObject('json/data4.json', function(obj) {
    document.body.appendChild(obj)
})

app.addObject('json/data2.json', function(obj) {
    document.body.appendChild(obj)
})

app.addObject('json/data.json', function(obj) {
    document.body.appendChild(obj)
})

app.addObject('json/data.json', function(obj) {
    document.body.appendChild(obj)
})
