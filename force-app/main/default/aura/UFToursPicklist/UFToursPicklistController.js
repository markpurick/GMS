({
	loadOptions : function(component, event, helper) {
        //helper.loadCampaignData(component, event);
        helper.loadData(component, event);
        helper.loadCampaignNames(component, event);
        helper.loadStatuses(component,event);
        helper.loadMemberData(component, event);
	},
    loadMembers : function(component, event, helper) {
        helper.loadCampaignNames(component, event);
        helper.loadStatuses(component,event);
        helper.loadMemberData(component, event);
    },
	switchOpenClass : function(component, event, helper) {
        //console.log(event);
		helper.switchOpenClosed(component, event, 3);
		//helper.switchOpenClosed(component, event, 1);
	},
	setMonth : function(component, event, helper) {
		var resultVal = event.target.innerText;
        var testing = event.target.dataset.ufDate;
		component.set("v.monthVar.value", testing);
		component.set("v.monthVar.label", resultVal);
        var dropDown = component.find("UFMonthPickList");
        console.log(dropDown);
		$A.util.toggleClass(dropDown, 'slds-is-open');
		component.set("v.testTimeLabel", "");
		component.set("v.testTimeValue", "");
        helper.loadCampaignNames(component, event);
        helper.loadMemberData(component, event);
	},
	setYear : function(component, event, helper) {
		var resultVal = event.target.innerText;
        var testing = event.target.dataset.ufDate;
		component.set("v.yearVar.value", testing);
		component.set("v.yearVar.label", resultVal);
        var dropDown = component.find("UFYearPickList");
		$A.util.toggleClass(dropDown, 'slds-is-open');
		component.set("v.testTimeLabel", "");
		component.set("v.testTimeValue", "");
        helper.loadCampaignNames(component, event);
        helper.loadMemberData(component, event);
	},
	setDay : function(component, event, helper) {
		var resultVal = event.target.innerText;
        var testing = event.target.dataset.ufDate;
		component.set("v.dayVar.value", testing);
		component.set("v.dayVar.label", resultVal);
        var dropDown = component.find("UFDayPickList");
		$A.util.toggleClass(dropDown, 'slds-is-open');
		component.set("v.testTimeLabel", "");
		component.set("v.testTimeValue", "");
        helper.loadCampaignNames(component, event);
        helper.loadMemberData(component, event);
	},
	setTime : function(component, event, helper) {
		var resultVal = event.target.innerText;
        var testing = event.target.dataset.ufDate;
        //var testing = component.find("UFTimePickList").get("v.value");
        console.log('SET TIME!');
        console.log(testing);
        console.log(resultVal);
		component.set("v.testTimeValue", testing);
		component.set("v.testTimeLabel", resultVal);
        var dropDown = component.find("UFTimePickList");
        
        console.log('Time Drop Down...');
        console.log(dropDown);
        
		$A.util.toggleClass(dropDown, 'slds-is-open');
		$A.util.removeClass(dropDown, 'slds-has-error');
        helper.loadMemberData(component, event);
                
        var campaignFoundEvent = component.get("e.campaignSelected");
        console.log("Did I find the event?");
        console.log(campaignFoundEvent);
        
        // fire event to update parent component's campaign variable
        campaignFoundEvent.setParams({
            campaign: testing
        }).fire();
	},
    showModalBox : function(component, event, helper) {
        var campaignId = component.get("v.testTimeValue");
        var tourPicklist = component.find("UFTimePickList");
        console.log(campaignId);
        if(campaignId == "" || campaignId == null) {
        	console.log("Test missing campaign");
        	console.log(campaignId);
        	/*var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type": "error",
                "title": "More Information Needed",
                "message": "Please select an event before adding a member"
            });
            toastEvent.fire();*/
			$A.util.addClass(tourPicklist, 'slds-has-error');
        } else {
            console.log("campaign else");
			$A.util.removeClass(tourPicklist, 'slds-has-error');
        	document.getElementById("addLeadModal").style.display = "block";
        }
    }
})