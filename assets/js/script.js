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
	
	document.getElementById('themeToggle').addEventListener('click', function(event) {
		event.preventDefault(); // Prevent the default action
		var body = document.body;
		if (body.classList.contains('dark-mode')) {
			// If the body has the class 'dark-mode', switch to light mode
			body.classList.remove('dark-mode');
			body.classList.add('light-mode');
			localStorage.setItem('theme', 'light'); // Store the user's preference
		} else {
			// If the body has the class 'light-mode' or no class, switch to dark mode
			body.classList.remove('light-mode');
			body.classList.add('dark-mode');
			localStorage.setItem('theme', 'dark'); // Store the user's preference
		}
	});
	
	// When the page loads, apply the user's preference
	window.addEventListener('load', function() {
		var theme = localStorage.getItem('theme'); // Get the stored preference
		var body = document.body;
		if (theme === 'light') {
			body.classList.add('light-mode');
		} else {
			body.classList.add('dark-mode');
		}
	});
};