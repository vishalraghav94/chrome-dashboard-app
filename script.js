/*var currentPosition;
navigator.geolocation.getCurrentPosition(function (position) {
    currentPosition = position;
    console.log(currentPosition);
    var port = chrome.runtime.connect({name:"mycontentscript"});
    port.onMessage.addListener(function(message){
        if(message.greeting === "hello"){
            port.postMessage(
                {
                    position: JSON.parse(JSON.stringify(currentPosition)),
                    subject: 'position'
                });
        }
    });
});*/


