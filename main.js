window.onload = function() {
	var logo = document.getElementById('logo');
	logo.addEventListener('contextmenu', function(e) { // Disable right-click on logo
		e.preventDefault(); // Prevent the default context menu
	});
	logo.addEventListener('dragstart', function(e) { // Disable dragging of the logo
		e.preventDefault(); // Prevent the default drag action
	});
};