({
    loadOptions : function(component, event, helper) {
        //helper.loadCampaignData(component, event);
        helper.loadData(component, event);
        helper.loadStatuses(component,event);
        helper.loadMemberData(component, event);
	},
    loadMembers : function(component, event, helper) {
        helper.loadStatuses(component,event);
        helper.loadMemberData(component, event);
    },
	setMonth : function(component, event, helper) {
		var resultMonth = component.find("UFMonthPickList").get("v.value");
		component.set("v.monthVar", resultMonth);
        console.log(resultMonth);
        helper.loadMemberData(component, event);
	},
	setYear : function(component, event, helper) {
		var resultYear = component.find("UFYearPickList").get("v.value");
		component.set("v.yearVar", resultYear);
        console.log(resultYear);
        helper.loadMemberData(component, event);
	},
	setDay : function(component, event, helper) {
		var resultDay = component.find("UFDayPickList").get("v.value");
		component.set("v.dayVar", resultDay);
        console.log(resultDay);
        helper.loadMemberData(component, event);
	},
	setTime : function(component, event, helper) {
		var resultTime = component.find("UFTimePickList").get("v.value");
		component.set("v.timeVar", resultTime);
        console.log(resultTime);
        helper.loadMemberData(component, event);
	}
})