"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var containerStyles = '.notify-container { position: fixed; z-index: 99999; top: 0; right: 0; margin-right: 12px; margin-top: 12px; }';
var boxStyles = '.notify-box { cursor: pointer; padding: 12px 18px; margin: 0 0 6px 0; color: #fff; border-radius: 3px; width: 300px; }';
var successBoxStyles = '.notify-box--success { background-color: #23d160; }';
var warningBoxStyles = '.notify-box--warning { background-color: #ffdd57; }';
var errorBoxStyles = '.notify-box--error { background-color: #ff3860; }';
var textStyles = '.notify-box__text { display: inline-block; vertical-align: middle; width: 240px; padding: 0 12px; }';
var titleStyles = '.notify-box__text-title { font-weight: 700; }';
var messageStyles = '.notify-box__text-message { }';
function addCss(css) {
    var head = document.getElementsByTagName('head')[0];
    var s = document.createElement('style');
    s.setAttribute('type', 'text/css');
    if (s['styleSheet']) {
        s['styleSheet'].cssText = css;
    }
    else {
        s.appendChild(document.createTextNode(css));
    }
    head.insertBefore(s, head.firstChild);
}
function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
function addClass(ele, cls) {
    if (!hasClass(ele, cls))
        ele.className += " " + cls;
}
function fadeOut(element) {
    var fadeOutInterval = setInterval(function () {
        if (element.style.opacity && element.style.opacity > 0.05) {
            element.style.opacity = element.style.opacity - 0.05;
        }
        else if (element.style.opacity && element.style.opacity <= 0.1) {
            if (element.parentNode) {
                clearInterval(fadeOutInterval);
                element.parentNode.removeChild(element);
            }
        }
        else {
            element.style.opacity = 0.9;
        }
    }, 1000 / 33);
    return fadeOutInterval;
}
;
var Notify = (function () {
    function Notify() {
        this.config = {
            default_timeout: 4000,
            container: document.createElement('div')
        };
        addCss(containerStyles + boxStyles + titleStyles + textStyles + messageStyles + successBoxStyles + warningBoxStyles + errorBoxStyles);
        addClass(this.config.container, 'notify-container');
        document.body.appendChild(this.config.container);
    }
    Notify.prototype.info = function (title, message) {
        this.notify(title, message, 'info');
    };
    Notify.prototype.warning = function (title, message) {
        this.notify(title, message, 'warning');
    };
    Notify.prototype.success = function (title, message) {
        this.notify(title, message, 'success');
    };
    Notify.prototype.error = function (title, message) {
        this.notify(title, message, 'error');
    };
    Notify.prototype.notify = function (title, message, type) {
        var _this = this;
        var fadeOutInterval;
        var fadeOutTimeout;
        var notification = document.createElement('div');
        notification.style.opacity = '1';
        addClass(notification, 'notify-box');
        fadeOutTimeout = setTimeout(function () {
            fadeOutInterval = fadeOut(notification);
        }, this.config.default_timeout);
        notification.onmouseover = function () {
            clearTimeout(fadeOutTimeout);
            clearInterval(fadeOutInterval);
            notification.style.opacity = '1';
        };
        notification.onmouseout = function () {
            fadeOutTimeout = setTimeout(function () {
                fadeOutInterval = fadeOut(notification);
            }, _this.config.default_timeout);
            notification.style.opacity = '1';
        };
        notification.onclick = function () {
            this.style.display = 'none';
        };
        switch (type) {
            case 'success':
                addClass(notification, 'notify-box--success');
                break;
            case 'error':
                addClass(notification, 'notify-box--error');
                break;
            case 'warning':
                addClass(notification, 'notify-box--warning');
                break;
            default:
                break;
        }
        var text = document.createElement('div');
        addClass(text, 'notify-box__text');
        notification.appendChild(text);
        if (title) {
            var title_text = document.createElement('div');
            addClass(title_text, 'notify-box__text-title');
            title_text.appendChild(document.createTextNode(title));
            text.appendChild(title_text);
        }
        if (message) {
            var message_text = document.createElement('div');
            addClass(message_text, 'notify-box__text-message');
            message_text.appendChild(document.createTextNode(message));
            text.appendChild(message_text);
        }
        this.config.container.insertBefore(notification, this.config.container.firstChild);
    };
    return Notify;
}());
exports.Notify = Notify;
