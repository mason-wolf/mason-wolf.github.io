/**
 * utils.js
 * 
 * Various helper functions.
 */
 
 
// Generates GUIDs for form objects.
function generateGUID() {
	var hexDigits = "0123456789abcdef";
	var guid = "";
	for (var i = 0; i < 32; i++) {
		guid += hexDigits.charAt(Math.floor(Math.random() * hexDigits.length));
	}
	guid = guid.substr(0, 8) + "-" + guid.substr(8, 4) + "-4" +
		guid.substr(12, 3) +
		"-" + hexDigits.charAt(8 + Math.floor(Math.random() * 4)) +
		guid.substr(16, 3) +
		"-" + guid.substr(20);
	return guid;
}

// Retrieves the type of field.
function getFieldType() {
	let value = document.getElementById("fieldType").value;
	return value;
}

// Resets template form, data builder contents,
// and clears LocalStorage.
function resetForm() {
	formTemplate.innerHTML = "";
	fields = [];
	customData = [];
	localStorage.removeItem("data-sandbox");
}

/**
 * Set the value of field to the value
 * in the element.
 */
function setValue(e, fieldId) {
	for (var field of fields) {
		if (field.id == fieldId) {
			if (field.fieldType == "Checkbox") {
				if (e.checked) {
					field.value = true;
				} else {
					field.value = false;
				}
			} else if (field.fieldType == "Radio") {
				var selected_radio = document.querySelector('input[type="radio"]:checked').value;
				field.value = selected_radio;
			} else {
				field.value = e.value;
			}
		}
	}
}