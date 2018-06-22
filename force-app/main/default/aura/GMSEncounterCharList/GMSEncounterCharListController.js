({
    doInit : function(component, event, helper) {
		var action = component.get("c.getEncounterCharacterList");
        action.setParams({
            "encounterId": component.get("v.recordId")
        });
        
        action.setCallback(this, function(response) {
            var data = response.getReturnValue();
            
            if (data) {
                //console.log(data);
                component.set("v.characterList",data);
            }
        });
        
        $A.enqueueAction(action);
    }
})