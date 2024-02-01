/**
 * forms.js
 * 
 * Represents a form field template.
 * Each field has a type and html contents
 * which will be dynamically rendered to each builder.
 */
 
class FormField {
	constructor() {
		this.id = generateGUID();
		this.fieldType = null;
		this.fieldName = null;
		this.html = null;
		this.value = null;
		// Let's sort fields by type for a cleaner look.
		this.order = null;
	}
}