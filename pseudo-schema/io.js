/**
 * io.js
 * 
 * Handle file uploads and importing/exporting data.
 * Data may be stored in LocalStorage or imported in.
 * Currently does not support importing custom data sets,
 * they only may be loaded via LocalStorage.
 */
const inputElement = document.getElementById("upload");
inputElement.addEventListener("change", handleFiles, false);

function handleFiles() {
  const fileList = this.files; 
  const reader = new FileReader();
  reader.onload = function(e) {
  	var result = JSON.parse(e.target.result);
    var uploadData = JSON.stringify(result, null, 2);
    for (var r in result) {
    	addElement(result[r]);
		// Keep track of fields.
		fields.push(result[r]);
    }
  }
  reader.readAsText(fileList.item(0))
}

let showFileSelect = false;

function showImport() {
	if (!showFileSelect) {
		document.getElementById("upload").style.display = "block";
		showFileSelect = true;
	}
	else {
		document.getElementById("upload").style.display = "none";
		showFileSelect = false;
	}
}


/**
 * Saves data to local storage.
 */
function saveData() {

	let date = new Date();
	let formName = document.getElementById("formName").value;
	if (formName == "") {
		formName = date.toUTCString();
	}
	let savedData = {
		"data_set_name" : formName,
		"data": customData,
		"template": fields
	};
	localStorage.setItem("data-sandbox", JSON.stringify(savedData));
	alert("Dataset saved.");
}

/**
 * Function to load data from local storage.
 */
function loadData() {
	
	let dataSet = JSON.parse(localStorage.getItem("data-sandbox"));
	formTemplate.innerHTML = "";
	
	fields = []
  for (var field in dataSet["template"]) {
		addElement(dataSet["template"][field]);
		fields.push(dataSet["template"][field])
  }
  
  addData();
  customData = dataSet["data"]
  document.getElementById("jsonContainer").innerHTML = JSON.stringify(dataSet["data"], null, 4);
}

/**
 * Export custom data.
 * dataType - data or template
 */
function exportData(dataType) {
	let formName = document.getElementById("formName").value;
	let data = {}
	switch(dataType) {
		case("data"):
			data = JSON.stringify(customData);
			break;
		case("template"):
			data = JSON.stringify(fields);
			break;
	}
    let blob = new Blob([data], {type: 'text/json'});
    const a = document.createElement('a');
    a.setAttribute('type', 'hidden');
    a.href = URL.createObjectURL(blob);
    if (formName == "") {
    	formName = "untitled";
    }
    
    a.download = formName + '-' + dataType + '.json';
    a.click();
    a.remove();
  }