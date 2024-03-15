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

if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone || window.navigator.msLaunchUri) {
  const installButton = document.getElementById('installButton');
  if (installButton) {
    installButton.style.display = 'none';
  }
}

// Check if the app is not already installed
window.addEventListener('beforeinstallprompt', (e) => { // Listen for the beforeinstallprompt event
  // Detect if the browser is Chromium-based
  const isChromium = window.chrome !== null && window.chrome !== undefined && window.navigator.userAgent.indexOf('Chromium') > -1;
  const isFirefox = window.navigator.userAgent.includes('Firefox');
  
  // Only run the rest of the code if the browser is Chromium-based
  if (isChromium) {
    e.preventDefault(); // Prevent Chrome 76 and later from showing the mini-infobar (or Edge/Opera/Brave/other Chromium-based browsers)
    deferredPrompt = e; // Stash the event so it can be triggered later.

    const installButton = document.getElementById('installButton'); // Add install button to header navigation
    if (installButton) { // If the button is found, show it
      installButton.style.display = 'block';
      installButton.textContent = isMobile ? 'Add to Home Screen' : 'Install App';
      installButton.addEventListener('click', showInstallPrompt);
    }
  } else if (isFirefox) {
    const installButton = document.getElementById('installButton');
    if (installButton) {
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