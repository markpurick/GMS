({
    doInit : function(component, event, helper) {
		var action = component.get("c.getCharactersByRegion");
        action.setParams({
            "regionId": component.get("v.recordId")
        });
        
        action.setCallback(this, function(response) {
            var data = response.getReturnValue();
            
            if (data) {
                console.log(data);
                component.set("v.charList",data);
            }
        });
        
        $A.enqueueAction(action);
    }
})