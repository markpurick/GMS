({
	//a0C4100000E7jtOEAR
    /*getCharacter : function(component, event, helper) {
        var testId = "a0C4100000E7jtOEAR";
        component.set("v.recordId",testId);
    },*/
    handleApplicationEvent : function(component, event, helper) {
        var target = event.getSource();       
        
        console.log('Handled!' + event.getParam("character"));

        component.set("v.recordId",event.getParam("character"));
        //var result = component.get("v.recordId");
        //console.log(result);
        
        component.find("charRecordLoader").reloadRecord();
    }
})