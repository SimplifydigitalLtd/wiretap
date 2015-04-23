
require(['postal'], function (postal) {

    chrome.runtime.sendMessage(chromeExtensionId, {type: "init"});

    postal.addWireTap( function( d, e ) {
        chrome.runtime.sendMessage(chromeExtensionId, {data: e});
    });
});

