if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('./sw.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
var deferredPrompt= false;
window.addEventListener("load", () => {
    deferredPrompt = true;
})
window.addEventListener('beforeinstallprompt', (e) => {
    if(deferredPrompt){
        e.prompt();
        e.userChoice.then(choice => {
            if(choice.outcome === "dismissed"){
                deferredPrompt = false;
            }
        })
    }else {
        console.log('trigger is not trigerred!!');
    }

});
