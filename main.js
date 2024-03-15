if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service_worker.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', function(event) {
  event.preventDefault(); // Prevent the default browser install prompt
  deferredPrompt = event; // Store the event for later use
});

let hasScrolled = false;
let promptShown = false;

window.onscroll = function() {
  hasScrolled = true;
};

setTimeout(function() {
  if (hasScrolled && !promptShown) {
    showInstallPrompt();
    promptShown = true;
  }
}, 15000);

// Call this function when you want to show the prompt, for example, when a button is clicked
function showInstallPrompt() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt(); // Show the install prompt
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    deferredPrompt = null;
  });
}