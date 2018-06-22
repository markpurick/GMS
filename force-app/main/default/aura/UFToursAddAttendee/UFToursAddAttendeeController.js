({
    addAttendee : function(component, event, helper) {
        helper.addNewAttendee(component, event);
        helper.showToast(component, event);
        helper.clearInputs(component, event);
    }
})