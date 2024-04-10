if ('serviceWorker' in navigator) {
	window.addEventListener('load', async function() {
	  try {
		const registration = await navigator.serviceWorker.register('/service_worker.js');
		console.log('ServiceWorker registration successful with scope: ', registration.scope);
	  } catch (err) {
		console.log('ServiceWorker registration failed: ', err);
	  }
	});
}

window.onload = function() {
	var logo = document.getElementById('logo');
	var menuToggle = document.getElementById('menu-toggle');
	var hamburgerMenu = document.querySelector('.hamburger-menu');
  
	logo.addEventListener('contextmenu', function(e) { // Disable right-click on logo
	  e.preventDefault(); // Prevent the default context menu
	});
	logo.addEventListener('dragstart', function(e) { // Disable dragging of the logo
	  e.preventDefault(); // Prevent the default drag action
	});
  
	// Function to check window width and update aria-hidden attribute
	function checkWindowWidth() {
	  if (window.innerWidth > 768) {
		hamburgerMenu.setAttribute('aria-hidden', 'true');
	  } else {
		hamburgerMenu.setAttribute('aria-hidden', 'false');
	  }
	}
  
	// Run checkWindowWidth function when the page loads
	checkWindowWidth();
  
	// Update aria-hidden attribute when the window is resized
	window.addEventListener('resize', checkWindowWidth);
  
	// Update aria-hidden attribute when the menu is toggled
	menuToggle.addEventListener('change', function() {
	  if (this.checked) {
		hamburgerMenu.setAttribute('aria-expanded', 'true');
	  } else {
		hamburgerMenu.setAttribute('aria-expanded', 'false');
	  }
	});
};