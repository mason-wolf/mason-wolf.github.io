/***
 * template-builder.js
 * 
 * Allows for the creation of dynamic forms.
 * User specifies field types and builds data sources
 * with the data builder. Data builder isn't functional
 * without a template.
 */
 
var formTemplate = document.getElementById("formTemplate");
// Fields created from form builder.
var fields = [];
// JSON object storing custom data
let customData = [];

/**
 * Add a form element to the template.
 */
function addElement(ele) {
	formTemplate.innerHTML += ele.html + `
    <a href='javascript:void(0)' onclick='removeElement("${ele.id}")'>
    <i class='fa fa-trash disposable' id="trash"></i></a><br><br>`;
}

/**
 * Remove element from form template.
 */
function removeElement(elementId) {
	formTemplate.innerHTML = "";
	fields = fields.filter(field => field.id !== elementId);
	formTemplate.innerHTML = "";
	for (var field of fields) {
		addElement(field);
	}
}

/**
 * Adds a field to the template view based on field type.
 */
function addField() {
	
	let fieldName = document.getElementById('fieldName').value;	

	if (fieldName != "") {
		let fieldType = getFieldType();
		let field = new FormField();
		field.fieldType = fieldType;
		field.fieldName = fieldName;
		switch (fieldType) {
			// Text field.
			case ("Text"):
				let textField = `<input type='text' placeholder='${fieldName}' 
            onchange='setValue(this, "${field.id}")'
            id='${field.id}'><br>`;
				field.html = textField;
				field.order = 1;
				break;
				// Checkbox field.
			case ("Checkbox"):
				//  document.getElementById("radio-field").style.display ="block";  
				let checkBoxField = `
            <div style='width:100%;'>
            <label>
            <input type='checkbox' name='${fieldName}' value='${fieldName}' 
            onchange='setValue(this, "${field.id}")'
            id='${field.id}'>
            ${fieldName}
            </label>
            </div>
            `;
				field.html = checkBoxField;
				field.order = 3;
				break;
			case ("Radio"):
				let radioField = `
            <div style='width:100%;' id='${field.id + 1}'>
            <form>
            <fieldset id='${field.id}'>
            <legend>${fieldName}</legend>
            <input type='text' placeholder='radio name' id='${field.id}-radioName' class='disposable'>
                <a href='javascript:void(0)' onclick='addRadio(
                "${fieldName}", "${field.id}")'>
                <i class='fa fa-plus disposable' id='addRadioField'></i></a><br><br>
            </fieldset>
            </form>
            `;
				field.html = radioField;
				field.order = 2;
				break;
				// Textarea field.
			case ("Textarea"):
				let textareaField = `
            ${fieldName}:<br>
            <textarea name='${fieldName}' value='${fieldName}'
            onchange='setValue(this, "${field.id}")'
            id='${field.id}'
            ></textarea>
            `;
				field.html = textareaField;
				field.order = 6;
				break;
				// Date field.
			case ("Date"):
				let dateField = `
            ${fieldName} <input type='date' name='${fieldName}' 
            id='${fieldName}'
            onchange='setValue(this, "${field.id}")'
            >
            `;
				field.html = dateField;
				field.order = 5;
				break;
				// Dropdown
			case ("Dropdown"):
				let dropDown = `
            <div id='${field.id + 3}'>
            <label for='${field.id}'>${fieldName}:</label>
            <select name='${fieldName}' id='${field.id}' onchange='setValue(this, "${field.id}")'>
                        <input type='text' placeholder='dropdown item' id='${field.id + 1}' class="disposable">
                <a href='javascript:void(0)' onclick='addDropdown("${field.id}")'>
                <i class='fa fa-plus disposable' id='addDropdownField'></i></a><br><br>
            </div>
            `;
				field.html = dropDown;
				field.order = 4;
		}
		addElement(field);
		// Keep track of fields.
		fields.push(field);
		document.getElementById('fieldName').value = "";
	}
}

function addDropdown(id) {
	var option = document.createElement("option");
	let selectBox = document.getElementById(id + 1);
	option.textContent = selectBox.value;
	option.value = selectBox.value;
	
	document.getElementById(id).appendChild(option);
	for (var field in fields) {
		if (fields[field]["id"] == id) {
			fields[field].html = document.getElementById(id + 3).innerHTML;
		}
	}
}

function addRadio(fieldName, id) {
	let radioName = document.getElementById(id + "-radioName").value;
	let radio = `
        <input type='radio' name='${fieldName}' 
        value='${radioName}'
        class='radio-field'
        onchange='setValue(this, "${id}")'
        >${radioName}
    <br>
    `;
	document.getElementById(id).innerHTML += radio;
	for (var field in fields) {
		if (fields[field]["id"] == id) {
			fields[field].html = document.getElementById(id + 1).innerHTML;
		}
	}
}