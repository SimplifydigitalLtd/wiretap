(function () {
    "use strict";
    var scriptElemet = document.createElement('script');

    var xhr = new XMLHttpRequest();
    xhr.open('GET', chrome.extension.getURL('content-scripts/wiretap.js'), true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            scriptElemet.innerHTML = 'var chromeExtensionId = "' + chrome.runtime.id + '"; ' + xhr.response;

            document.body.appendChild(scriptElemet);
        }
    };
    xhr.send();

}());