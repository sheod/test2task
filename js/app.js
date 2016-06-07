'use strict';

var app = new Object();

app.__cache = {};

app.log = function (obj) {
    console.log(obj);
};

app.addObject = function (url, callbackFunc) {
    var _this = this;

    var b = function b() {
        if (!_this.__cache[url]) {
            (function () {
                _this.__cache[url] = url;
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.send();
                xhr.onreadystatechange = function () {

                    if (xhr.readyState != 4) {
                        return;
                    }
                    delete _this.__cache[url];
                    if (xhr.status != 200) {
                        return _this.error(xhr);
                    }

                    _this.response = xhr.responseText;
                    var elem = _this.__createDOMObject(JSON.parse(_this.response));
                    callbackFunc(elem);
                };
            })();
        } else {
            setTimeout(b, 10);
        }
    };
    setTimeout(b, 10);
};

app.error = function (status) {
    console.log(status.status + ' - ' + status.statusText);
};

app.__getData = function (url) {};

app.__createDOMObject = function (obj) {
    var elem = document.createElement(obj.tag);
    elem.textContent = obj.content;

    for (var attr in obj.attr) {
        elem.setAttribute(attr, obj.attr[attr]);
    }

    for (var event in obj.events) {
        elem.addEventListener(event, new Function(obj.events[event]));
    }

    for (var parameter in obj.style) {
        elem.style[parameter] = obj.style[parameter];
    }

    return elem;
};

app.addObject('json/data4.json', function (obj) {
    document.body.appendChild(obj);
});

app.addObject('json/data2.json', function (obj) {
    document.body.appendChild(obj);
});

app.addObject('json/data.json', function (obj) {
    document.body.appendChild(obj);
});

app.addObject('json/data.json', function (obj) {
    document.body.appendChild(obj);
});