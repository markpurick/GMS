({
    doInit : function(component, event, helper) {
		var action = component.get("c.getBaseEncountersByRegion");
        action.setParams({
            "regionId": component.get("v.recordId")
        });
        
        action.setCallback(this, function(response) {
            var data = response.getReturnValue();
            
            if (data) {
                console.log(data);
                component.set("v.encounters",data);
            }
        });
        
        $A.enqueueAction(action);
    }
})