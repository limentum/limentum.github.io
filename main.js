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

let deferredPrompt; // This variable is used to keep the event

// Check if the app is already installed
if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
  const installButton = document.getElementById('installButton');
  if (installButton) {
    installButton.style.display = 'none';
  }
}

// Check if the app is not already installed
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); // Prevent Chrome 76 and later from showing the mini-infobar
  deferredPrompt = e; // Stash the event so it can be triggered later.

  const installButton = document.getElementById('installButton'); // Add install button to header navigation
  if (installButton) {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent); // Detect if the device is on iOS or Android
    const isFirefox = /firefox/i.test(navigator.userAgent); // Detect if the browser is Firefox
    const isFirefoxAndroid = isFirefox && isMobile; // Detect if the browser is Firefox for Android

    // Only show the install button if it's not Firefox, or if it's Firefox for Android
    if (!isFirefox || isFirefoxAndroid) {
      installButton.style.display = 'block';
      installButton.textContent = isMobile ? 'Add to Home Screen' : 'Install App';
      installButton.addEventListener('click', showInstallPrompt);
    } else {
      installButton.style.display = 'none';
    }
  }
});

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