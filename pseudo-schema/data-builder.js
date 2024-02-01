/***
 * data-builder.js
 * 
 * Builds a UI derived from the form template.
 * Dynamically adds elements/controls allowing for quick 
 * data entry for building a data set.
 */


 /*
 * For each field in the form template, create their
 * elements in the data builder view. 
 */
function addData() {

		fields.sort((a, b) => a.order - b.order);
		document.getElementById("formBuilder").style.display = "none";
		document.getElementById("dataBuilder").style.display = "block";
		var header = `
		                <h1>Data Builder</h1>
		`;
		var dataBuilder = document.getElementById("dataBuilder");
		var addBtn = `
        <button class='add-btn' onclick='showJson()'>Add</button>
        `;
        let exportBtn = `
        <button class='export-btn' onclick='exportData("data")'>Export</button>
        `;
        
        let saveBtn = `
        <button class='save-data' onclick='saveData()'>Save</button>
        `;
        
        let loadBtn = `
        <button class='load-data' onclick='loadData()'>Load</button>
        `;
		dataBuilder.innerHTML = "";
		dataBuilder.innerHTML += header;
		for (var field of fields) {
			if (field.fieldType == "Text") {
				dataBuilder.innerHTML += field.fieldName +
					"<br>" + field.html;
			} 
			    else {

				dataBuilder.innerHTML += field.html;
                hideEditControls();
			}
		}
		dataBuilder.innerHTML += addBtn;
		dataBuilder.innerHTML += exportBtn;
		dataBuilder.innerHTML += saveBtn;
		dataBuilder.innerHTML += loadBtn;
		let jsonContainer = "<textarea id='jsonContainer'></textarea>";
		dataBuilder.innerHTML += jsonContainer;
}

  /**
 * Show field template contents in JSON format.
 */
function showJson() {
	let obj = {};

	for (var field of fields) {
		obj["id"] = generateGUID();
		obj[field["fieldName"]] = field["value"]
		if (field.fieldType == "Checkbox") {
			if (field["value"] == null) {
				obj[field["fieldName"]] = false;
				field["value"] = false;
			}
		}
		else if (field.fieldType == "Dropdown") {
			// Set default value of dropdown if no value slected.
				let dropdown = document.querySelector('[id="' + field.id + '"]');
				if (field["value"] == null) {
					field["value"] = dropdown.value;
					obj[field["fieldName"]] = dropdown.value;	
				}
		}
	}
	customData.push(obj);
	document.getElementById("jsonContainer").innerHTML = JSON.stringify(customData);
}

/**
 * Hides template editor elements such as add/delete node.
 */
function hideEditControls() {
    let dataBuilder = document.getElementById("dataBuilder");
    var divsToHide = dataBuilder.getElementsByClassName("disposable");
    for (var i = 0; i < divsToHide.length; i++) {
      divsToHide[i].style.display = "none";
    }
}

/**
 * Show data builder form.
 */
function buildForm() {
	document.getElementById("formBuilder").style.display = "block";
	document.getElementById("dataBuilder").style.display = "none";
}