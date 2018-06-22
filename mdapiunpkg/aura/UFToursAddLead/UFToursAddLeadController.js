({
    hideModalBox : function(component, event, helper) {
    	document.getElementById("addLeadModal").style.display = "none";
        event.preventDefault();
    },
	loadOptions : function(component, event, helper) {
        helper.loadLead(component, event);
        helper.loadInterest(component, event);
        helper.loadState(component, event);
    },
	setInterest : function(component, event, helper) {
		var resultVal = event.target.innerText;
        var testing = event.target.dataset.ufDate;
		var leadToUpdate = component.get("v.tourLead");
        var dropDown = component.find("UFIntPickList");
		component.set("v.selectedInterest", { value: testing, label: resultVal, selected: "true"});
		component.set("v.tourLead.Admission_Interest__c", testing);
		$A.util.toggleClass(dropDown, 'slds-is-open');
	},
	setState : function(component, event, helper) {
		var resultVal = event.target.innerText;
        var testing = event.target.dataset.ufDate;
		component.set("v.selectedState", { value: testing, label: resultVal, selected: "true"});
		component.set("v.tourLead.StateCode", testing);
        var dropDown = component.find("UFStatePickList");
		$A.util.toggleClass(dropDown, 'slds-is-open');
	},
	switchOpenClass : function(component, event, helper) {
		helper.switchOpenClosed(component, event, 3);
	},
    addAttendee : function(component, event, helper) {          
        if(component.get("v.tourLead.LastName") !== "" || component.get("v.tourLead.Email") !== "" || component.get("v.tourAttended") !== "") {
            var parentEvent = component.getEvent("refreshMembers");
            helper.updateEntities(component, event);
            document.getElementById("addLeadModal").style.display = "none";
            event.preventDefault();
            parentEvent.fire();
        }
	},
    validateLastName : function(component, event, helper) {
        var lastName = component.get("v.tourLead.LastName");
        var cmpLastName = component.find("UFLastName");
		if(!lastName || lastName == "") {
            $A.util.addClass(cmpLastName, "slds-has-error");
        } else {
            $A.util.removeClass(cmpLastName, "slds-has-error");
        }
    },
    validateLeadEmail : function(component, event, helper) {    
        var leadEmail = component.get("v.tourLead.Email");
        var cmpLeadEmail = component.find("UFEmailAddress");
		if(!leadEmail || leadEmail == "") {
            $A.util.addClass(cmpLeadEmail, "slds-has-error");
        } else {
            $A.util.removeClass(cmpLeadEmail, "slds-has-error");
        }
    },
    validateAttended : function(component, event, helper) {    
        var cmAttended = component.get("v.tourAttended");
        var cmpAttended = component.find("UFNumOfAttendees");
		if(!cmAttended || cmAttended == "") {
            $A.util.addClass(cmpAttended, "slds-has-error");
        } else {
            $A.util.removeClass(cmpAttended, "slds-has-error");
        }
    }    
})