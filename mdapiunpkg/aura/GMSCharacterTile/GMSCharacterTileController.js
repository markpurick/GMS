({
	selectCharacter : function(component, event, helper) {
        var appEvent = $A.get("e.c:GMSCharacterEvent");
        
        console.log(component);
        console.log(event);
        
        var char = component.find("charId").get("v.value");
        
        console.log('Character : ' + char);
        
        appEvent.setParams({ "character" : char });
        appEvent.fire();
    }
})