({
    // Update changes to campaign member status, total attended, and/or comments
    updateStatus : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        var updateCM = component.get("c.updateCampaignMember");
        var campaignMember = component.get("v.campaignMemberRec");
        
        if(event.currentTarget) {
            var testing = event.currentTarget.value;
            component.set("v.campaignMemberRec.Status",testing);
        }
        
        updateCM.setParams({
            campaignMember : campaignMember
        })
        updateCM.setCallback(this, function(action) {
            if (action.getState() == "SUCCESS") {
                toastEvent.setParams({
                    "type": "success",
                    "title": "Success!",
                    "message": "Updated record for " + campaignMember.FirstName + " " + campaignMember.LastName + " successfully!"
                });
                toastEvent.fire();
   				event.preventDefault();
            }
            else if (action.getState() === "ERROR") {
                var errors = action.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        toastEvent.setParams({
                            "type": "error",
                            "title": "Error!",
                            "message": errors[0].message
                        });
                        toastEvent.fire();
                    }
                } else {
                    toastEvent.setParams({
                        "type": "error",
                        "title": "Error!",
                        "message": "Unknown error"
                    });
                    toastEvent.fire();
                }
            }
            else {
                toastEvent.setParams({
                    "type": "warning",
                    "title": "Warning!",
                    "message": action.getState()
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(updateCM);
    },
    blueToOrange : function(component, event, helper) {
        var cmpTarget = component.find('UFStatusPickList');
        $A.util.removeClass(cmpTarget,'btn-UF-blu');
        $A.util.addClass(cmpTarget,'btn-UF-ora');
    },
    switchOpenClosed : function(component, event, depth) {
		var cmpId = event.path[depth].id;
		if(cmpTarget == '' || cmpTarget == null) {}
		var cmpTarget = component.find(cmpId);
		$A.util.toggleClass(cmpTarget, 'slds-is-open');
    }
})