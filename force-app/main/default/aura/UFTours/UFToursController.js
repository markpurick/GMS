({
    handleCampaignFoundEvent : function(component, event) {
        console.log("From main controller: " + event.getParam("campaign"))
        component.set("v.parentCmpCampaign", event.getParam("campaign"));
    },
    callReloadMembers : function(component, event, helper) {
        console.log("IN callReloadMembers function");
        var picklistComponent = component.find("UFToursPicklist");
        picklistComponent.reloadMembers();
    }
})