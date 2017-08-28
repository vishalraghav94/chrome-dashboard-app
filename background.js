chrome.runtime.onConnect.addListener(function(port){
    port.postMessage({greeting:"hello"});
    port.onMessage.addListener(function(message){
        console.log(message);
        if(message.subject === 'position'){
            console.log(message.position);
        }
    });
});

