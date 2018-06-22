({
    updateStatus : function(component, event, helper) {
        helper.updateStatus(component, event);
        event.preventDefault();
    },
	switchOpenClass : function(component, event, helper) {
		helper.switchOpenClosed(component, event, 3);
	}
})