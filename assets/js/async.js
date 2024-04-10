let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => { // listen for beforeinstallprompt event
  event.preventDefault(); // prevent default prompt
  deferredPrompt = event; // store the event for later use
});

let hasScrolled = false;
let promptShown = false;

window.onscroll = () => { // wait for user to scroll before showing prompt
  if (!hasScrolled) { // only show prompt if user has scrolled
    hasScrolled = true; // only show prompt once
    if (!promptShown) { // only show prompt once
      setTimeout(showInstallPrompt, 15000); // show prompt after 15 seconds
    } 
  }
};

async function showInstallPrompt() { // show install prompt
  if (!deferredPrompt) return; // do nothing if prompt is not available
  deferredPrompt.prompt();// show prompt
  try {
    const choiceResult = await deferredPrompt.userChoice; // wait for user to respond to prompt
    if (choiceResult.outcome === 'accepted') { // user accepted the prompt
      console.log('User accepted the install prompt'); // log the result
    } else { // user dismissed the prompt
      console.log('User dismissed the install prompt'); // log the result
    }
    deferredPrompt = null; // reset the deferred prompt
    promptShown = true; // only show prompt once
  } catch (err) {
    console.log('Error with install prompt: ', err); // log any errors
  }
}