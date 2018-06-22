({
    doInit : function(component, event, helper) {
		var action = component.get("c.getNotes");
        action.setParams({
            "parentId": component.get("v.recordId")
        });
        
        action.setCallback(this, function(response) {
            var data = response.getReturnValue();
            
            if (data) {
                console.log(data);
                component.set("v.noteList",data);
            }
        });
        
        $A.enqueueAction(action);
    }
})