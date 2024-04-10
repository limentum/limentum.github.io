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
async function showInstallPrompt() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt(); // Show the install prompt
  try {
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    deferredPrompt = null;
  } catch (err) {
    console.log('Error with install prompt: ', err);
  }
}