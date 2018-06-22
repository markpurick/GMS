({
    doInit : function(component, event, helper) {
		var action = component.get("c.getSubRegionsByRegion");
        action.setParams({
            "regionId": component.get("v.recordId")
        });
        
        action.setCallback(this, function(response) {
            var data = response.getReturnValue();
            
            if (data) {
                console.log(data);
                component.set("v.subregions",data);
            }
        });
        
        $A.enqueueAction(action);
    }
})