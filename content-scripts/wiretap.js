if (typeof postal !== 'undefined'){
    tap(postal)
} else if (typeof require !== 'undefined' ) {
    require(['postal'], function (postal) {
        tap(postal);
    });
} else {
    console.log('Cannot Wiretap this site and it has neither require nor postal defined.')
}



function tap(postal){
    chrome.runtime.sendMessage(chromeExtensionId, {type: "init"});

    postal.addWireTap( function( d, e ) {
        e.timeStamp = e.timeStamp.toString();
        chrome.runtime.sendMessage(chromeExtensionId, {data: e});
    });
}

