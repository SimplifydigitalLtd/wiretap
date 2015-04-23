
if (postal){
    tap()
} else if (require) {
    require(['postal'], function (postal) {
        tap();
    });
} else {
    console.log('Cannot Wiretap this site and it has neither require nor postal defined.')
}



function tap(){
    chrome.runtime.sendMessage(chromeExtensionId, {type: "init"});

    postal.addWireTap( function( d, e ) {
        e.timeStamp = e.timeStamp.toString();
        chrome.runtime.sendMessage(chromeExtensionId, {data: e});
    });
}

