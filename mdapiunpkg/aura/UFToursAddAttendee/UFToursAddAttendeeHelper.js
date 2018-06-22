({
    addNewAttendee : function(component, event, helper) {
        var appEvent = $A.get("e.c:aeUpdateTourMemberList");
        var attendee = component.get("c.addCampaignMember");
        var firstName = component.get("v.firstName");
        var lastName = component.get("v.lastName");
        var emailAddress = component.get("v.emailAddress");
        var numOfAttending = component.get("v.numOfAttending");
        attendee.setParams({
            pFirstName : firstName,
            pLastName : lastName,
            pEmail : emailAddress,
            pNumAttending : numOfAttending
        })
        attendee.setCallback(this, function(action) {
            if (action.getState() == "SUCCESS") {
                console.log("Success!");
            }
            else if (action.getState() === "ERROR") {
                var errors = action.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
            else {
                console.log(action.getState());
            }
        });
        $A.enqueueAction(attendee);
        appEvent.fire();
    },
	showToast : function(component, event) {
        /*var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": "The student has been added to the Tour."
        });
        toastEvent.fire(); */
    },
    clearInputs : function(component, event) {
        var firstName = component.set("v.firstName", "");
        var lastName = component.set("v.lastName", "");
        var emailAddress = component.set("v.emailAddress", "");
        var numOfAttending = component.set("v.numOfAttending", "");
    }
})