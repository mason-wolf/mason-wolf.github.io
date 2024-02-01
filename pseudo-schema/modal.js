
// Get the <span> element that closes the modal
var span = document.getElementById("close");

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
	document.getElementById("radio-field").style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == document.getElementById("radio-field")) {
		document.getElementById("radio-field").style.display = "none";
	}
}

