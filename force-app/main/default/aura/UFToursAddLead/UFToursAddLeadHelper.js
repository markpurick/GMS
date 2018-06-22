({
    // Load State data for adding new Leads via Modal.
    loadState : function(component, event) {
        var stateData = [
            { value: 'Alabama', label: 'AL' },
            { value: 'Alaska', label: 'AK' },
            { value: 'Arizona', label: 'AZ' },
            { value: 'Arkansas', label: 'AR' },
            { value: 'California', label: 'CA' },
            { value: 'Colorado', label: 'CO' },
            { value: 'Connecticut', label: 'CT' },
            { value: 'Delaware', label: 'DE' },
            { value: 'District of Columbia', label: 'DC' },
            { value: 'Florida', label: 'FL' },
            
            { value: 'Georgia', label: 'GA' },
            { value: 'Hawaii', label: 'HI' },
            { value: 'Idaho', label: 'ID' },
            { value: 'Illinois', label: 'IL' },
            { value: 'Indiana', label: 'IN' },
            { value: 'Iowa', label: 'IA' },
            { value: 'Kansas', label: 'KS' },
            { value: 'Kentucky', label: 'KY' },
            { value: 'Louisiana', label: 'LA' },
            { value: 'Maine', label: 'ME' },
            
            { value: 'Maryland', label: 'MD' },
            { value: 'Massachusetts', label: 'MA' },
            { value: 'Michigan', label: 'MI' },
            { value: 'Minnesota', label: 'MN' },
            { value: 'Mississippi', label: 'MS' },
            { value: 'Missouri', label: 'MO' },
            { value: 'Montana', label: 'MT' },
            { value: 'Nebraska', label: 'NE' },
            { value: 'Nevada', label: 'NV' },
            { value: 'New Hampshire', label: 'NH' },
            
            { value: 'New Jersey', label: 'NJ' },
            { value: 'New Mexico', label: 'NM' },
            { value: 'New York', label: 'NY' },
            { value: 'North Carolina', label: 'NC' },
            { value: 'North Dakota', label: 'ND' },
            { value: 'Ohio', label: 'OH' },
            { value: 'Oklahoma', label: 'OK' },
            { value: 'Oregon', label: 'OR' },
            { value: 'Pennsylvania', label: 'PA' },
            { value: 'Rhode Island', label: 'RI' },
            
            { value: 'South Carolina', label: 'SC' },
            { value: 'South Dakota', label: 'SD' },
            { value: 'Tennessee', label: 'TN' },
            { value: 'Texas', label: 'TX' },
            { value: 'Utah', label: 'UT' },
            { value: 'Vermont', label: 'VT' },
            { value: 'Virginia', label: 'VA' },
            { value: 'Washington', label: 'WA' },
            { value: 'West Virginia', label: 'WV' },
            { value: 'Wisconsin', label: 'WI' },
            
            { value: 'Wyoming', label: 'WY' }
        ];
        component.set("v.stateList", stateData);
    },
    // 
    loadLead : function(component, event) {
        var toastEvent = $A.get("e.force:showToast");
        var statusOptions = component.get("c.initiateLead");
        statusOptions.setCallback(this, function(action) {
            if (action.getState() == "SUCCESS") {
                component.set("v.tourLead", action.getReturnValue());
            }
            else if (action.getState() === "ERROR") {
                var errors = action.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "type": "error",
                            "title": "Error!",
                            "message": errors[0].message
                        });
                        toastEvent.fire();
                    }
                } else {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "type": "error",
                        "title": "Error!",
                        "message": "Unknown error"
                    });
                    toastEvent.fire();
                }
            }
            else {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "warning",
                    "title": "Warning!",
                    "message": action.getState()
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(statusOptions);
    },
    loadInterest : function(component, event) {
        var toastEvent = $A.get("e.force:showToast");
        var statusOptions = component.get("c.getAdmissionInterests");
        statusOptions.setCallback(this, function(action) {
            if (action.getState() == "SUCCESS") {
                component.set("v.interestList", action.getReturnValue());
            }
            else if (action.getState() === "ERROR") {
                var errors = action.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "type": "error",
                            "title": "Error!",
                            "message": errors[0].message
                        });
                        toastEvent.fire();
                    }
                } else {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "type": "error",
                        "title": "Error!",
                        "message": "Unknown error"
                    });
                    toastEvent.fire();
                }
            }
            else {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "warning",
                    "title": "Warning!",
                    "message": action.getState()
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(statusOptions);
    },
    switchOpenClosed : function(component, event, depth) {
		var cmpId = event.path[depth].id;
		if(cmpTarget == '' || cmpTarget == null) {}
		var cmpTarget = component.find(cmpId);
		$A.util.toggleClass(cmpTarget, 'slds-is-open');
    },
    updateEntities : function(component, event) {
        var toastEvent = $A.get("e.force:showToast");
        var attendee = component.get("c.addCampaignMember");
		var leadToUpdate = component.get("v.tourLead");
        leadToUpdate.sobjectType = "Lead";
		var campaignId = component.get("v.tourCampaign");
        var numOfAttending = component.get("v.tourAttended");
        
        attendee.setParams({
            pLead : leadToUpdate,
            pCampaignId : campaignId,
            pNumAttending : numOfAttending
        })
        attendee.setCallback(this, function(action) {
            if (action.getState() == "SUCCESS") {
                //console.log("Member added");
                component.set("v.tourLead.FirstName", "");
                component.set("v.tourLead.LastName", "");
                component.set("v.tourLead.City", "");
                component.set("v.tourLead.StateCode", "");
                component.set("v.tourLead.Admission_Interest__c", "");
                component.set("v.tourLead.Email", "");
                component.set("v.tourAttended", "");
            }
            else if (action.getState() === "ERROR") {
                var errors = action.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "type": "error",
                            "title": "Error!",
                            "message": errors[0].message
                        });
                        toastEvent.fire();
                    }
                } else {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "type": "error",
                        "title": "Error!",
                        "message": "Unknown error"
                    });
                    toastEvent.fire();
                }
            }
            else {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "warning",
                    "title": "Warning!",
                    "message": action.getState()
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(attendee);
    }
})