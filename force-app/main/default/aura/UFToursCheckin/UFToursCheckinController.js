({
	myAction : function(component, event, helper) {
		
	},
	loadOptions : function(component, event, helper) {
		var monOpts = [
			{ value: "January", label: "January"},
			{ value: "February", label: "February"},
			{ value: "March", label: "March"}
		];
		var yearOpts = [
			{ value: "2016", label: "2016" },
			{ value: "2017", label: "2017" },
			{ value: "2018", label: "2018" }
		];
		var dayOpts = [
			{ value: "5", label: "5" },
			{ value: "12", label: "12" },
			{ value: "15", label: "15" }
		];
		var timeOpts = [
			{ value: "10am", label: "10am" },
			{ value: "2pm", label: "2pm" }
		]
		component.set("v.monthOptions", monOpts);
		component.set("v.yearOptions", yearOpts);
		component.set("v.dayOptions", dayOpts);
		component.set("v.timeOptions", timeOpts);
	},
	switchOpenClass : function(component, event) {
		console.log('Test 4');
		console.log(event);
		var cmpId = event.path[3].id;
		console.log(cmpId);
		//var cmpSrc = component.find(cmpId).getElement();
		//console.log(cmpSrc);
		var cmpTarget = component.find(cmpId);
		//console.log("cmp target: " + cmpTarget);
		$A.util.toggleClass(cmpTarget, 'slds-is-open');
	},
	setMonth : function(component, event) {
		var resultVal = event.target.innerText;
		component.set("v.monthVar", resultVal);
	},
	setYear : function(component, event) {
		var resultVal = event.target.innerText;
		component.set("v.yearVar", resultVal);
	},
	setDay : function(component, event) {
		var resultVal = event.target.innerText;
		component.set("v.dayVar", resultVal);
		console.log(event);
	},
	setTime : function(component, event) {
		var resultVal = event.target.innerText;
		component.set("v.timeVar", resultVal);
	}
})